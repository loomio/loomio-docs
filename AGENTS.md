# AGENTS.md

Guidance for working on this repo (an mdBook site deployed to help.loomio.com via GitHub Pages).

## Commit hygiene

- No self-promotion or marketing in commits: don't add "Co-Authored-By"
  lines or similar credit/attribution for AI tooling to commit messages.
- If documenting AI-agent guidance in a file, use the standard filename
  `AGENTS.md` (this file) rather than tool-specific names like `CLAUDE.md`.

## Deploy structure — the "/en nesting" footgun

`.github/workflows/gh-pages.yml` builds the book and assembles the deployed
site like this:

```
mdbook build en                  # -> en/book/*  (real content, e.g. en/book/user_manual/foo/index.html)
cp -R static/* ./public/         # -> public/*   (top-level static files, e.g. favicon, robots.txt)
mv ./en/book/* ./public/en/      # -> public/en/*  (nests ALL book content one level under /en)
```

So on disk, book content lives at `en/book/user_manual/...` (no `en/`
segment), but on the live site it's served at `/en/user_manual/...`. Three
consequences that have caused real bugs:

1. **Redirect `from` keys in `en/book.toml` must NOT start with `/en/`.**
   mdBook writes a redirect stub file literally at `book_dir/<from>`. If
   `from` already starts with `/en/`, deploy nests it *again*, producing
   `/en/en/...` — a path nothing ever requests, so the redirect silently
   404s. Correct form: `"/user_manual/groups/foo/index.html" = "/en/user_manual/bar/index.html"`
   — no `/en` on the left (from), full `/en/...` path on the right (to,
   since that's the real browser-facing URL used in the meta-refresh/canonical tag).
2. **Internal markdown links must include the `/en/` prefix**, e.g.
   `/en/user_manual/groups/settings/`, not `/user_manual/groups/settings/`.
   A link missing `/en/` can *look* fine when checked against the local
   `en/book/` directory (the relative path happens to exist there), but on
   the live site paths without `/en/` only resolve against top-level
   `static/*` content — so it 404s in production despite passing a naive
   local check. This exact bug shipped and was only caught by crawling the
   live site (see below).
3. **If a page's public URL changes, add a redirect from the old URL.**
   Renaming or moving a source file or directory can break existing links and
   bookmarks even when `SUMMARY.md` is updated. Add an `[output.html.redirect]`
   entry in `en/book.toml` for every old page URL. As above, the `from` key
   must omit `/en/`, while the target must include the full browser-facing
   `/en/` path, for example:
   `"/user_manual/discussions/old_name/index.html" = "/en/user_manual/discussions/new_name/index.html"`.

Any time you touch `book.toml` redirects or add/edit internal links, keep
this nesting model in mind — it's the single most common source of "works
locally, 404s live" bugs in this repo.

## Link style convention

Internal links to pages use a **trailing slash** (`/en/user_manual/groups/settings/`),
not `/index.html` (`/en/user_manual/groups/settings/index.html`) and not a
bare path with neither (`/en/user_manual/groups/settings`). All three
technically resolve on GitHub Pages, but the bare form costs an extra
301 round-trip (GH Pages redirects `/foo` → `/foo/` before serving
`index.html`), and it's also the shape that's easiest to typo into a
missing-`/en/`-prefix bug. Prefer trailing slash when writing or editing
links in `en/src/**/*.md`.

## Checking scripts

Three scripts validate the site during deploy and are wired into
`.github/workflows/gh-pages.yml`:

- `check-redirects.sh` — for every `[output.html.redirect]` entry in
  `en/book.toml`, verifies the target page actually exists in the built
  book, and flags any `from` key that starts with `/en/` (the double-nest
  bug above).
- `check-links.sh` — walks every built HTML page, extracts every `<a href>`
  and `<img src>`, and verifies the target resolves — correctly modeling
  the `/en` nesting split between `en/book/` and `static/`, and accepting
  GitHub Pages' directory-index resolution (`/foo/` or `/foo/index.html`
  both count as valid, matching real server behavior). It also rejects links
  to legacy redirect stubs: internal links must point directly to the
  canonical page.
- `check-seo.sh` — runs after the deploy tree is assembled and metadata and
  the sitemap are generated. It verifies that every sitemap entry is a real,
  self-canonical content page with a title and description, and that redirect
  stubs and non-canonical aliases are excluded.

Run the first two locally after `mdbook build en` before pushing changes that touch
redirects or links:

```
mdbook build en
./check-redirects.sh
./check-links.sh
```

`generate-meta-descriptions.js` uses the first substantive paragraph on each
page for its search description. When that is not a useful summary, add an
override near the top of the Markdown source:

```html
<!-- seo-description: A concise, page-specific description for search results. -->
```

These build-tree checks do not catch everything, though. The redirect-nesting bug above shipped once already
despite `check-redirects.sh` passing, because the script checked "does the
target file exist" but not "does the `from` path actually reach that file
once deployed." If you suspect something is broken only in production,
crawl the live site directly:

```bash
curl -s https://help.loomio.com/sitemap.xml | grep -oE '<loc>[^<]+</loc>' | sed -E 's/<\/?loc>//g'
# then fetch each page, extract internal <a>/<img> targets, HEAD each one
```

This is slow (real HTTP round-trips) but is ground truth — it's what
actually caught both the redirect-nesting bug and three markdown links
that were missing their `/en/` prefix.

## mdBook behavior notes

- mdBook auto-rewrites `.md` links (even absolute ones like
  `/en/user_manual/foo/bar.md`) to `.html` at build time — this is normal
  and expected, don't "fix" these.
- `SUMMARY.md` is the source of truth for what actually gets built into a
  page. A `.md` file can exist under `en/src/` with real content and still
  never be built into HTML if it isn't referenced from `SUMMARY.md` — this
  caused an orphaned page (`engaging_with_discussions`) whose old redirect
  target silently never existed.

## SEO follow-ups after merging into Loomio

The GitHub Pages deployment now excludes redirect stubs and non-canonical
aliases from the sitemap, generates page descriptions, and runs
`check-seo.sh` before deployment. After the documentation is merged into the
main Loomio repository, complete these remaining tasks when practical:

1. Replace mdBook's HTTP 200 meta-refresh redirect stubs with real permanent
   HTTP `301` or `308` redirects when a custom help server or proxy is
   available. Preserve every mapping in `[output.html.redirect]`, and keep
   the redirects indefinitely if possible so old bookmarks and search signals
   continue to reach the canonical pages.
2. Search the main Loomio repository, including translated locale files, for
   links to legacy help paths. Update controlled links to point directly to
   the canonical URLs instead of passing through redirect stubs.
3. Submit the corrected `https://help.loomio.com/sitemap.xml` in Google Search
   Console. Inspect representative old and new URL pairs, request indexing for
   important feature pages, and monitor Page Indexing for redirect or
   Google-selected-canonical problems.
4. Preserve established public documentation URLs. Prefer changing page
   headings and navigation labels without moving source paths; when a move is
   necessary, add and test a permanent redirect before deploying it.
