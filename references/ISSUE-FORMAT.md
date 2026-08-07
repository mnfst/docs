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
Reply with the finding number and the chosen option
(e.g. "3 → option 2", or "3: other idea, let's discuss").
PRs are then made manually with the agent, never by the harness.
Rejected findings: reply "N → reject" and they will never be re-raised.
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
   `<details><summary>Evidence (for the agent)</summary>...</details>`

An IMAGE finding is ONLY the plain sentence plus the details block: no
options, no rationale paragraph. If Seb cannot know what to do after
reading one sentence, the finding fails the format.

## Language of publication (absolute rule)

Everything published on GitHub — issue titles, bodies, comments, labels,
PR descriptions — is written in ENGLISH, always. mnfst/docs is a public
repo with an international audience. French is for the private
conversation with Seb only. An issue drafted in French fails
verification.
