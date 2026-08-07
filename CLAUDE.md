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

## Docs-sync harness

This repo carries a platform-vs-docs audit harness. When the user asks
to compare the platform and the docs ("lance l'audit", "/docs-sync"),
follow `.claude/skills/docs-sync/SKILL.md`.

Non-negotiables:

- The harness NEVER edits doc pages and NEVER opens PRs. It files one
  digest issue per run with evidence-backed findings and options; PRs
  happen manually with Seb from the issue discussion.
- No findings = no issue. Silence is a valid outcome.
- Docs speak to users only: internal tools (Phoenix, ...), team info,
  and env vars outside self-hosted sections are leaks
  (`references/AUDIENCE.md`).
- Feature pages must cover the situations of `references/CASE-MATRIX.md`
  (cloud/self-hosted, fresh/upgrade, existing agents, subscriptions).
- Findings rejected by Seb (`references/decisions.md`) are never
  re-raised unless the platform changed again on that point.
- Invariants are machine-checked: `node scripts/check-coherence.mjs` must be GREEN before any issue is filed or any docs PR is pushed. Reversing a recorded decision requires the written derivation of the reversal protocol (see the docs-sync skill).
