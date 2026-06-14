# Social Automation

Este directorio sirve para automatizar la preparación de publicaciones sociales a partir de las páginas públicas de TWISTORES.

## Generar un paquete de difusión

```bash
python3 tools/social/build_share_pack.py index.html
python3 tools/social/build_share_pack.py pages/venezolanos-galicia-chinita-ourense.html
```

Cada comando genera un JSON en `social/share-packs/` con:

- `title`
- `description`
- `url`
- `image`
- copys sugeridos para `x`, `linkedin`, `whatsapp`, `telegram` e `instagram`

## Publicación con Buffer

El proyecto queda preparado para usar `Buffer` como pasarela de publicación.

### 1. Crear la clave API

Según la documentación oficial de Buffer:

- la API está en `https://api.buffer.com`
- se autentica con `Authorization: Bearer YOUR_TOKEN`
- la API permite recuperar organizaciones/canales y crear posts

Fuentes:

- [Quick Start](https://developers.buffer.com/guides/getting-started.html)
- [Authentication](https://developers.buffer.com/guides/authentication.html)
- [Get Channels](https://developers.buffer.com/examples/get-channels.html)
- [Create Text Post](https://developers.buffer.com/examples/create-text-post.html)
- [Create Scheduled Post](https://developers.buffer.com/examples/create-scheduled-post.html)

### 2. Exportar el token

```bash
export BUFFER_API_KEY=tu_token
```

### 3. Listar canales

```bash
python3 tools/social/publish_to_buffer.py list-channels --organization-id org_xxx
```

### 4. Crear tu config local

Duplica `social/buffer.channels.example.json` como `social/buffer.channels.json` y rellena los IDs reales.

### 5. Publicar o programar

Publicar usando una página HTML:

```bash
python3 tools/social/publish_to_buffer.py publish \
  --page index.html \
  --config social/buffer.channels.json \
  --channel x-main,linkedin-main
```

Programar una publicación:

```bash
python3 tools/social/publish_to_buffer.py publish \
  --page pages/laboratorio-sintesis-sc.html \
  --config social/buffer.channels.json \
  --channel linkedin-main \
  --mode customScheduled \
  --due-at 2026-06-16T08:00:00Z
```

Probar sin publicar:

```bash
python3 tools/social/publish_to_buffer.py publish \
  --page index.html \
  --config social/buffer.channels.json \
  --dry-run
```

## Limitaciones actuales

- El flujo implementado ahora está orientado a canales de texto/enlace como `X`, `LinkedIn`, `Facebook`, `Threads` o `Mastodon`.
- `Instagram` no se publica todavía desde este script porque requiere un flujo de medios distinto.
- El script usa los copys generados por `share-packs` y el enlace público para que la tarjeta social la resuelva cada red.
