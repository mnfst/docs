# AUDIENCE — who the docs speak to, and the hard bans

The docs speak to Manifest USERS: developers installing, configuring,
and running Manifest, in cloud or self-hosted. They never speak to the
Manifest team. Every sentence must survive the question: "does a user
need this to succeed?"

## Hard bans (each one is an INTERNAL-LEAK finding)

1. **Internal tools never appear.** Known internal tools as of
   2026-08: Phoenix. If a page tells a user to do anything in an
   internal tool (put a key, check a dashboard), it is a leak. When the
   platform-engineer discovers a new internal-only tool in the
   codebase, add it to this list in the same PR that fixes the leak.
2. **Team-only knowledge never appears**: release process, internal
   URLs, staging environments, credentials handling, internal Slack or
   Discord channels.
3. **Environment variables are self-hosted material.** Cloud users
   never touch env vars. Any env var mentioned outside a self-hosted
   section (or the self-hosted side of a toggle) is a finding.

## The Cloud / Self-hosted rule

- Any section whose instructions differ between cloud and self-hosted
  uses the toggle (`scripts/deploy-mode-toggle.js`). Default view:
  Cloud.
- The chosen mode is sticky: a user who picked Self-hosted keeps
  seeing Self-hosted while navigating.
- A page that mixes both modes in one flow without the toggle is a
  WRONG finding.

## Situation completeness

Instructions must say WHERE the user starts. "Enable Auto-fix" is not
a doc; "on a fresh install the activation is suggested; on an upgraded
self-hosted instance with existing agents, go to Settings and enable
it" is. The full grid lives in `CASE-MATRIX.md`.

## Editorial principles (from Seb's verdicts)

1. **Less beats confusing.** When the platform's history is convoluted
   (a feature added, removed, re-added), do not narrate it. Say the
   simple useful thing instead: "to make sure your logs are on, go to
   Settings → Logs". Prefer saying less over trying to say everything.
2. **Product vocabulary**: "logs" (never "recording" in user-facing
   text), "request", "attempt", "Autofix", "harness". The Requests page
   URL is still `/messages`; use the visible name, not the URL.
3. **Glossary is the home of concepts.** request, attempt, Autofix (its
   scope: it fixes the request, not the prompt) belong in the glossary,
   explained in end-user language, never in code words.
