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

## Language rule (added after run 1, hardened after Seb's feedback)

The issue is read by a HUMAN first, agents second. Every finding is
structured as:

1. **One plain sentence** stating the problem and what Seb must decide
   or do ("Il manque une image de la page Settings montrant le bouton
   Enable logs"). Eight words beat three bullet lists. No UI-component
   jargon, no file names, no code references in this sentence.
2. The options (for findings that need a decision), each one line.
3. All evidence (doc quotes, file:line, PR numbers, rationale) goes in
   a collapsed block the human can ignore:
   `<details><summary>Preuves (pour l'agent)</summary>...</details>`

An IMAGE finding is ONLY the plain sentence plus the details block: no
options, no rationale paragraph. If Seb cannot know what to do after
reading one sentence, the finding fails the format.
