#!/bin/bash
# Verify every internal <a href> and <img src> in the built book resolves to
# a real file. Run after `mdbook build en`.
set -euo pipefail

BOOK_DIR="en/book"
STATIC_DIR="static"

if [ ! -d "$BOOK_DIR" ]; then
  echo "error: $BOOK_DIR not found. Run 'mdbook build en' first." >&2
  exit 1
fi

python3 - "$BOOK_DIR" "$STATIC_DIR" <<'PYEOF'
import sys, os, re
from html.parser import HTMLParser
from urllib.parse import urlsplit

book_dir = sys.argv[1]
static_dir = sys.argv[2]

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []  # (attr, value)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a" and attrs.get("href"):
            self.links.append(("href", attrs["href"]))
        elif tag == "img" and attrs.get("src"):
            self.links.append(("src", attrs["src"]))

def is_external(url):
    return (
        url.startswith("http://") or url.startswith("https://")
        or url.startswith("mailto:") or url.startswith("tel:")
        or url.startswith("//")
    )

failures = 0
checked = 0

for root, dirs, files in os.walk(book_dir):
    for fname in files:
        if not fname.endswith(".html"):
            continue
        fpath = os.path.join(root, fname)
        with open(fpath, encoding="utf-8", errors="replace") as f:
            content = f.read()

        parser = LinkParser()
        parser.feed(content)

        for attr, raw_url in parser.links:
            url = raw_url.strip()
            if not url or url.startswith("#") or is_external(url):
                continue

            split = urlsplit(url)
            path_part = split.path
            if not path_part:
                # pure fragment or query, already excluded above but be safe
                continue

            checked += 1

            if path_part.startswith("/"):
                # Absolute paths are site-root-relative (e.g. "/en/user_manual/...").
                # The live site nests the whole book one level under "/en"
                # (see gh-pages.yml: `mv en/book/* public/en/`), but the book
                # itself is NOT built with that "en/" segment on disk, so it
                # must be stripped before resolving against book_dir.
                rel = path_part.lstrip("/")
                if rel == "en" or rel.startswith("en/"):
                    rel = rel[len("en"):].lstrip("/")
                target = os.path.join(book_dir, rel)
            else:
                target = os.path.normpath(os.path.join(root, path_part))

            # GitHub Pages resolves extensionless/directory paths to
            # "<path>/index.html" (redirecting "/foo" -> "/foo/" first), so
            # accept that form too before calling a link broken.
            resolved = os.path.isfile(target) or os.path.isfile(os.path.join(target, "index.html"))

            # Deploy also copies static/* over the same "/en/..." tree
            # (see gh-pages.yml: `cp -R static/* public/`), so files that
            # live under static/ (e.g. static/en/foo.pdf) are real too.
            if not resolved and path_part.startswith("/"):
                static_target = os.path.join(static_dir, path_part.lstrip("/"))
                resolved = os.path.isfile(static_target)

            if not resolved:
                rel_source = os.path.relpath(fpath, book_dir)
                print(f'BROKEN {attr}: "{raw_url}" in {rel_source} (no file at {target} or {target}/index.html)')
                failures += 1

print()
print(f"checked {checked} links/images, {failures} broken")
sys.exit(1 if failures else 0)
PYEOF
