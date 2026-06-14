#!/usr/bin/env python3
"""Publish TWISTORES share packs to Buffer.

Examples:
    export BUFFER_API_KEY=...
    python3 tools/social/publish_to_buffer.py list-channels --organization-id org_123
    python3 tools/social/publish_to_buffer.py publish \
        --page index.html \
        --config social/buffer.channels.json \
        --channel linkedin-main,x-main
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path
from typing import Any
from urllib import error, request

BUFFER_API_URL = "https://api.buffer.com"

LIST_CHANNELS_QUERY = """
query GetChannels($organizationId: ID!) {
  channels(input: { organizationId: $organizationId }) {
    id
    name
    displayName
    service
    avatar
    isQueuePaused
  }
}
"""

CREATE_POST_MUTATION = """
mutation CreatePost(
  $text: String!,
  $channelId: ID!,
  $schedulingType: SchedulingType!,
  $mode: CreatePostMode!,
  $dueAt: DateTime
) {
  createPost(input: {
    text: $text,
    channelId: $channelId,
    schedulingType: $schedulingType,
    mode: $mode,
    dueAt: $dueAt
  }) {
    ... on PostActionSuccess {
      post {
        id
        text
      }
    }
    ... on MutationError {
      message
    }
  }
}
"""

TEXT_COPY_BY_SERVICE = {
    "twitter": "x",
    "x": "x",
    "linkedin": "linkedin",
    "facebook": "linkedin",
    "mastodon": "x",
    "threads": "x",
}

UNSUPPORTED_SERVICES = {"instagram", "tiktok", "youtube", "pinterest"}


def buffer_request(api_key: str, query: str, variables: dict[str, Any] | None = None) -> dict[str, Any]:
    payload = json.dumps({"query": query, "variables": variables or {}}).encode("utf-8")
    req = request.Request(
        BUFFER_API_URL,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )
    try:
        with request.urlopen(req, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))
    except error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise SystemExit(f"Buffer API HTTP {exc.code}: {body}") from exc


def require_api_key() -> str:
    api_key = os.environ.get("BUFFER_API_KEY")
    if not api_key:
        raise SystemExit("Missing BUFFER_API_KEY environment variable.")
    return api_key


def list_channels(api_key: str, organization_id: str) -> int:
    data = buffer_request(api_key, LIST_CHANNELS_QUERY, {"organizationId": organization_id})
    print(json.dumps(data, ensure_ascii=False, indent=2))
    return 0


def build_share_pack(page: str, site_url: str) -> Path:
    with tempfile.TemporaryDirectory() as tmpdir:
        cmd = [
            sys.executable,
            "tools/social/build_share_pack.py",
            page,
            "--site-url",
            site_url,
            "--output-dir",
            tmpdir,
        ]
        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
        output_path = Path(result.stdout.strip())
        target = Path("social/share-packs") / output_path.name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(output_path.read_text(encoding="utf-8"), encoding="utf-8")
        return target


def load_share_pack(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def load_channel_config(path: Path) -> dict[str, Any]:
    config = json.loads(path.read_text(encoding="utf-8"))
    if "channels" not in config or not isinstance(config["channels"], list):
        raise SystemExit("Invalid channel config: missing channels list.")
    return config


def pick_copy_key(service: str, explicit_copy_key: str | None) -> str:
    if explicit_copy_key and explicit_copy_key != "auto":
        return explicit_copy_key
    return TEXT_COPY_BY_SERVICE.get(service.lower(), "linkedin")


def select_channels(config: dict[str, Any], names: list[str] | None) -> list[dict[str, Any]]:
    channels = config["channels"]
    if not names:
        return channels
    wanted = {name.strip() for name in names if name.strip()}
    selected = [
        channel
        for channel in channels
        if channel.get("key") in wanted or channel.get("id") in wanted or channel.get("service") in wanted
    ]
    if not selected:
        raise SystemExit("No matching channels found in config for the requested selection.")
    return selected


def publish(
    api_key: str,
    share_pack: dict[str, Any],
    channels: list[dict[str, Any]],
    mode: str,
    due_at: str | None,
    copy_key: str | None,
    scheduling_type: str,
    dry_run: bool,
) -> int:
    results = []
    copies = share_pack.get("copies", {})

    for channel in channels:
        service = str(channel.get("service", "")).lower()
        if service in UNSUPPORTED_SERVICES:
            results.append(
                {
                    "channel": channel.get("key") or channel.get("id"),
                    "service": service,
                    "status": "skipped",
                    "reason": "unsupported_service_for_text_post",
                }
            )
            continue

        chosen_copy_key = pick_copy_key(service, copy_key)
        text = copies.get(chosen_copy_key) or copies.get("linkedin") or share_pack.get("url", "")
        variables = {
            "text": text,
            "channelId": channel["id"],
            "schedulingType": scheduling_type,
            "mode": mode,
            "dueAt": due_at,
        }

        if dry_run:
            results.append(
                {
                    "channel": channel.get("key") or channel.get("id"),
                    "service": service,
                    "status": "dry_run",
                    "copy_key": chosen_copy_key,
                    "text": text,
                    "variables": variables,
                }
            )
            continue

        data = buffer_request(api_key, CREATE_POST_MUTATION, variables)
        payload = data.get("data", {}).get("createPost", {})
        if "message" in payload:
            results.append(
                {
                    "channel": channel.get("key") or channel.get("id"),
                    "service": service,
                    "status": "error",
                    "message": payload.get("message"),
                }
            )
            continue

        post = payload.get("post", {})
        results.append(
            {
                "channel": channel.get("key") or channel.get("id"),
                "service": service,
                "status": "published",
                "post_id": post.get("id"),
                "copy_key": chosen_copy_key,
            }
        )

    print(json.dumps({"share_pack": share_pack.get("slug"), "results": results}, ensure_ascii=False, indent=2))
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Publish TWISTORES pages to Buffer.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    list_cmd = subparsers.add_parser("list-channels", help="List Buffer channels for an organization.")
    list_cmd.add_argument("--organization-id", required=True)

    publish_cmd = subparsers.add_parser("publish", help="Publish or schedule a share pack to Buffer.")
    source = publish_cmd.add_mutually_exclusive_group(required=True)
    source.add_argument("--page", help="HTML page to convert into a share pack before publishing.")
    source.add_argument("--share-pack", help="Existing share pack JSON.")
    publish_cmd.add_argument("--site-url", default="https://twistores.vercel.app")
    publish_cmd.add_argument("--config", required=True, help="Path to Buffer channel config JSON.")
    publish_cmd.add_argument(
        "--channel",
        help="Comma-separated channel keys, service names, or ids from the config. Defaults to all channels in config.",
    )
    publish_cmd.add_argument(
        "--mode",
        default="addToQueue",
        choices=["addToQueue", "shareNext", "shareNow", "customScheduled"],
    )
    publish_cmd.add_argument("--due-at", help="ISO timestamp required when mode=customScheduled.")
    publish_cmd.add_argument(
        "--scheduling-type",
        default="automatic",
        choices=["automatic", "notification"],
        help="Buffer schedulingType argument.",
    )
    publish_cmd.add_argument(
        "--copy-key",
        default="auto",
        help="Which copy variant to use (auto, x, linkedin, instagram, telegram, whatsapp).",
    )
    publish_cmd.add_argument("--dry-run", action="store_true", help="Print the planned mutations without calling Buffer.")

    args = parser.parse_args()
    api_key = require_api_key()

    if args.command == "list-channels":
        return list_channels(api_key, args.organization_id)

    if args.mode == "customScheduled" and not args.due_at:
        raise SystemExit("--due-at is required when --mode customScheduled.")

    if args.page:
        share_pack_path = build_share_pack(args.page, args.site_url)
    else:
        share_pack_path = Path(args.share_pack)

    share_pack = load_share_pack(share_pack_path)
    config = load_channel_config(Path(args.config))
    selected_channels = select_channels(config, args.channel.split(",") if args.channel else None)
    return publish(
        api_key=api_key,
        share_pack=share_pack,
        channels=selected_channels,
        mode=args.mode,
        due_at=args.due_at,
        copy_key=args.copy_key,
        scheduling_type=args.scheduling_type,
        dry_run=args.dry_run,
    )


if __name__ == "__main__":
    raise SystemExit(main())
