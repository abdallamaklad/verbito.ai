#!/usr/bin/env bash
set -euo pipefail

archive="${1:-/tmp/verbito-dist.tar.gz}"
stamp="$(date +%Y%m%d%H%M%S)"
release="/var/www/verbito/releases/$stamp"
compose="/root/qulture/docker-compose.prod.yml"
caddyfile="/root/qulture/deploy/Caddyfile"

if [ ! -f "$archive" ]; then
  echo "Missing deployment archive: $archive" >&2
  exit 1
fi

mkdir -p "$release"
tar -xzf "$archive" -C "$release"
ln -sfn "$release" /var/www/verbito/current
chown -R root:root /var/www/verbito

cp "$compose" "$compose.bak.$stamp"
cp "$caddyfile" "$caddyfile.bak.$stamp"

python3 - <<'PY'
from pathlib import Path

compose = Path("/root/qulture/docker-compose.prod.yml")
text = compose.read_text()
mount = "      - /var/www/verbito/current:/srv/verbito:ro\n"
if mount not in text:
    anchor = "      - /var/www/html:/srv/wearequantara:ro\n"
    if anchor not in text:
        raise SystemExit("Could not find Caddy volume anchor in compose file")
    text = text.replace(anchor, anchor + "      # Verbito static site.\n" + mount)
    compose.write_text(text)

caddyfile = Path("/root/qulture/deploy/Caddyfile")
text = caddyfile.read_text()
marker = "# Verbito static app."
block = """# Verbito static app.
verbito.ai, www.verbito.ai {
\tencode zstd gzip
\troot * /srv/verbito

\thandle /assets/* {
\t\theader Cache-Control "public, max-age=31536000, immutable"
\t\tfile_server
\t}

\t@staticAssets path *.jpg *.jpeg *.png *.webp *.svg *.ico *.woff *.woff2
\thandle @staticAssets {
\t\theader Cache-Control "public, max-age=604800"
\t\tfile_server
\t}

\thandle {
\t\theader Cache-Control "no-cache"
\t\ttry_files {path} {path}.html {path}/index.html /index.html
\t\tfile_server
\t}

\theader {
\t\tStrict-Transport-Security "max-age=31536000; includeSubDomains"
\t\tX-Content-Type-Options "nosniff"
\t\tReferrer-Policy "strict-origin-when-cross-origin"
\t\tX-Frame-Options "SAMEORIGIN"
\t}
}
"""

def replace_marked_block(source: str, block_marker: str, replacement: str) -> str:
    start = source.find(block_marker)
    if start == -1:
        return source.rstrip() + "\n\n" + replacement

    open_brace = source.find("{", start)
    if open_brace == -1:
        raise SystemExit(f"Could not find opening brace for {block_marker}")

    depth = 0
    end = None
    for index in range(open_brace, len(source)):
        char = source[index]
        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                end = index + 1
                break

    if end is None:
        raise SystemExit(f"Could not find closing brace for {block_marker}")

    return source[:start].rstrip() + "\n\n" + replacement + "\n" + source[end:].lstrip()

if marker in text:
    text = replace_marked_block(text, marker, block)
else:
    text = text.rstrip() + "\n\n" + block

caddyfile.write_text(text)
PY

cd /root/qulture
docker compose -f docker-compose.prod.yml --env-file .env config >/tmp/qulture-compose-check.yml
# The Caddy container bind-mounts /var/www/verbito/current. Because that path is a
# symlink to a release directory, recreate the container so Docker remounts the
# newly selected release target.
docker compose -f docker-compose.prod.yml --env-file .env up -d --force-recreate caddy
docker exec qulture-caddy-1 caddy validate --config /etc/caddy/Caddyfile

find /var/www/verbito/releases -mindepth 1 -maxdepth 1 -type d | sort | head -n -5 | xargs -r rm -rf

echo "VERBITO_RELEASE=$release"
