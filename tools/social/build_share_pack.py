#!/usr/bin/env python3
"""Generate a share pack from a TWISTORES HTML page.

Usage:
    python3 tools/social/build_share_pack.py index.html
    python3 tools/social/build_share_pack.py pages/soundscapes.html --site-url https://twistores.vercel.app
"""

from __future__ import annotations

import argparse
import json
import re
from html import unescape
from pathlib import Path
from urllib.parse import urljoin


RE_META = re.compile(
    r'<meta\s+(?:property|name)="(?P<name>[^"]+)"\s+content="(?P<content>[^"]*)"',
    re.IGNORECASE,
)
RE_TITLE = re.compile(r"<title>(?P<title>.*?)</title>", re.IGNORECASE | re.DOTALL)
RE_CANONICAL = re.compile(r'<link\s+rel="canonical"\s+href="(?P<href>[^"]+)"', re.IGNORECASE)
RE_H1 = re.compile(r"<h1[^>]*>(?P<text>.*?)</h1>", re.IGNORECASE | re.DOTALL)
RE_TAGS = re.compile(r"<[^>]+>")


def strip_tags(value: str) -> str:
    return " ".join(RE_TAGS.sub(" ", unescape(value)).split())


def parse_head(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    data: dict[str, str] = {}
    for match in RE_META.finditer(text):
        data[match.group("name")] = unescape(match.group("content"))

    title_match = RE_TITLE.search(text)
    if title_match:
        data.setdefault("title", strip_tags(title_match.group("title")))

    canonical_match = RE_CANONICAL.search(text)
    if canonical_match:
        data.setdefault("canonical", unescape(canonical_match.group("href")))

    h1_match = RE_H1.search(text)
    if h1_match:
        data.setdefault("h1", strip_tags(h1_match.group("text")))

    return data


def infer_slug(path: Path) -> str:
    if path.name == "index.html":
        return "home"
    return path.stem


def resolve_url(path: Path, site_url: str, canonical: str | None) -> str:
    if canonical:
        return canonical
    relative = path.as_posix()
    return urljoin(site_url.rstrip("/") + "/", relative)


def build_copies(title: str, description: str, url: str) -> dict[str, str]:
    short_desc = description.strip()
    if len(short_desc) > 180:
        short_desc = short_desc[:177].rstrip() + "..."

    x_copy = f"{title}\n\n{short_desc}\n\n{url}"
    linkedin_copy = (
        f"{title}\n\n"
        f"{short_desc}\n\n"
        f"Publicado en TWISTORES:\n{url}"
    )
    whatsapp_copy = f"{title}\n{short_desc}\n{url}"
    telegram_copy = f"{title}\n\n{short_desc}\n\n{url}"
    instagram_caption = (
        f"{title}\n\n"
        f"{short_desc}\n\n"
        f"Enlace en bio o acceso directo:\n{url}"
    )

    return {
        "x": x_copy,
        "linkedin": linkedin_copy,
        "whatsapp": whatsapp_copy,
        "telegram": telegram_copy,
        "instagram": instagram_caption,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate a social share pack for a TWISTORES page.")
    parser.add_argument("page", help="Path to the HTML page, relative to repo root.")
    parser.add_argument(
        "--site-url",
        default="https://twistores.vercel.app",
        help="Public site base URL.",
    )
    parser.add_argument(
        "--output-dir",
        default="social/share-packs",
        help="Directory where the generated JSON file will be written.",
    )
    args = parser.parse_args()

    page_path = Path(args.page)
    if not page_path.exists():
        raise SystemExit(f"Page not found: {page_path}")

    meta = parse_head(page_path)
    title = meta.get("og:title") or meta.get("twitter:title") or meta.get("title") or meta.get("h1") or page_path.stem
    description = meta.get("og:description") or meta.get("twitter:description") or meta.get("description") or ""
    image = meta.get("og:image") or meta.get("twitter:image") or ""
    url = resolve_url(page_path, args.site_url, meta.get("og:url") or meta.get("canonical"))
    slug = infer_slug(page_path)

    payload = {
        "slug": slug,
        "source": page_path.as_posix(),
        "title": title,
        "description": description,
        "url": url,
        "image": image,
        "copies": build_copies(title, description, url),
    }

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{slug}.json"
    output_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
