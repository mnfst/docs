# CASE-MATRIX — the situations every feature page must cover

The auditor walks each documented feature through this grid. A cell
where the platform behaves differently and the docs stay silent is a
MISSING-CASE finding.

## Dimensions

1. **Deployment**: Cloud · Self-hosted.
2. **Install state** (self-hosted): fresh install · upgrade of an
   existing instance.
3. **Agents**: no agent yet · one or more existing agents · creating a
   new agent while others exist.
4. **Providers / billing**: no provider connected · API keys · one or
   more subscriptions (and: subscription expired or revoked).
5. **Feature activation**: enabled by default · suggested at creation ·
   must be enabled manually in Settings (and WHERE exactly).

## How to audit a page against the grid

For each behavior the page documents, ask:

- Does it hold in cloud AND self-hosted? If not, is the toggle used?
- Does it hold on an upgrade, or only on a fresh install? (Defaults
  often apply only to new installs — the Auto-fix case: suggested for
  new agents, OFF for pre-existing agents after an upgrade, must be
  enabled in Settings.)
- Does it hold for existing agents, or only newly created ones?
- Does it assume a subscription or a provider that the user may not
  have?
- If activation is manual, does the doc give the exact path?

Not every page needs every cell written out: the finding exists when
the platform's behavior DIFFERS across a dimension and the doc doesn't
say so. One behavior, one sentence; divergent behaviors, a toggle or a
case list.

## Reference examples (real past failures)

- Auto-fix: docs described the fresh-install flow only; upgraded
  self-hosted instances with existing agents had to enable it in
  Settings, undocumented.
- Auto-fix env vars: applied to self-hosted only, but were shown to
  everyone (fixed by marking the section self-hosted).
