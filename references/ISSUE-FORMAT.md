# ISSUE-FORMAT — the digest issue filed by docs-sync

One issue per audit run, on mnfst/docs, label `docs-sync` plus one
label per finding category present. No findings = no issue = no noise.

## Title

`Docs audit — <date> (PRs #<from>–#<to>)`

## Body structure

```
Audited: mnfst/manifest PRs #<from> to #<to> (<n> merged PRs), against
the docs at <docs commit sha>.

## Findings

### 1 · [OBSOLETE] <one-line claim>
- Doc: <file.mdx> — "<the exact sentence>"
- Platform: <evidence: PR #n / file:line> — <what the code actually does>
- Impact: <one sentence: what a user experiences if they follow the doc>
- Options:
  1. <option>
  2. <option>
  3. <option>
- Suggested wording (option X): <tech-writer draft, when applicable>

### 2 · [MISSING-CASE] ...
```

Categories: OBSOLETE · INTERNAL-LEAK · WRONG · MISSING-CASE · IMAGE.

IMAGE findings have no options; they say where the image goes, what it
must show, and why that spot (Seb produces the images elsewhere).

## Footer (always included, verbatim)

```
---
Répondre avec le numéro du finding et l'option choisie
(ex: "3 → option 2", ou "3: autre idée, discutons").
Les PRs se font ensuite manuellement avec l'agent, jamais par le harness.
Findings rejetés = répondre "N → reject" : ils ne seront plus re-signalés.
```

## Iron rules

- Every finding carries BOTH sides of the evidence (doc sentence +
  code/PR reference). A finding without verifiable evidence does not
  ship.
- Options, never decisions. The agent may recommend ("option 2
  recommended because...") but never presents a single path.
- Findings previously rejected by Seb (see memory) are not re-raised
  unless the platform changed again on that exact point — then the
  finding says so explicitly.

## Language rule (added after run 1)

Findings are written for Seb, in plain language. No UI-component jargon
("drawer", "Frame", component or file names) in the claim, impact, or
options — code references live only in the evidence lines. An IMAGE
finding is one simple sentence: where in the doc, what photo to take,
what it must show. If a finding cannot be said simply, it is not
understood well enough to be filed.
