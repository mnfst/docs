# AUDIENCE — who the docs speak to, and the hard bans

The docs speak to Manifest USERS: developers installing, configuring,
and running Manifest, in cloud or self-hosted. They never speak to the
Manifest team. Every sentence must survive the question: "does a user
need this to succeed?"

## Hard bans (each one is an INTERNAL-LEAK finding)

1. **Internal tools never appear.** The docs must never name an
   internal-only tool or service. The list of such names is NOT written
   here (this repo is public): the platform-engineer identifies
   internal tools while reading the code and lists them in its report,
   and the auditor treats ANY of those names appearing in a docs page
   as a leak. Same rule for this repo's own files and issues: never
   write the names down.
   **Scope of the ban**: it covers names with NO user-facing existence
   (internal tools, dev-only credentials, team URLs). Anything already
   printed in the public docs or in the product's own user-facing
   output (an env var in a deploy guide, a name in an error message)
   is public API surface: findings MUST name it in clear text —
   hiding it makes the finding unreadable, as issue #49 finding 5
   proved.
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

## Naming in harness memory files

`decisions.md`, `learnings.md`, and `backlog.md` live in this public
repo. They use DESCRIPTORS ("the instance-mode env var", "the internal
healing service"), never the literal name — even when the name is
currently public elsewhere. Literal names appear only inside a finding
when the finding is unreadable without them.
