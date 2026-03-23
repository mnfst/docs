# Manifest Docs

Mintlify docs site. MDX files with YAML frontmatter.

## Dev server

After changing any doc file, reload the dev server on the **same port** (default 48721):

```bash
lsof -ti:48721 | xargs kill -9 2>/dev/null; npx --yes mintlify dev --port 48721
```

Run this in the background so the user can check the result in their browser.

## Icons

This project uses the **Lucide** icon library. Do not use FontAwesome icon names (e.g., use `life-buoy` not `life-ring`). Verify icon names at https://lucide.dev/icons/.
