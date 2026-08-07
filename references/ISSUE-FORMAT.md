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

The issue is read by a HUMAN first, agents second. This is a TEMPLATE:
every agent, whatever the harness or machine, copies the skeleton below
verbatim and fills the blanks. No reordering, no omissions, no extra
sections.

```
### <N> · [<CATEGORY>] <one plain sentence: the false claim and the truth>

Page: <live docs URL> (<section name in words>)

What actually happens:
1. <user-language step>
2. <user-language step>

Fix: <one line>            ← when one obvious fix
Options:                   ← when a real choice exists
1. <different outcome>. Recommended.
2. <different outcome>.

<details><summary>Evidence (for the agent)</summary>

- <doc file:line — exact quote>
- <code path:line — what it does>
- <user impact, one line>
</details>
```

Element by element:

1. **One plain sentence** stating the problem ("An image of the
   Settings page showing the Enable logs switch is missing"). Eight
   words beat three bullet lists. No UI-component jargon, no file
   names, no code references in this sentence. An optional second
   sentence may add ONE fact that changes how Seb decides; never
   restate the first sentence.
2. **Page** (visible): the LIVE docs URL where the problem sits
   (https://manifest.build/docs/<slug>), with the section named in
   words ("First request, the Send a request step"). Seb opens it and
   sees the problem. The file path stays in the details block.
3. **What actually happens** (visible, not folded): the user journey
   as established from the code, 2 to 6 numbered steps, pure user
   language (screens, fields, buttons, what the user sees and does).
   No file names, no code words. This block lets Seb verify the
   behavior from his own knowledge of the product BEFORE judging the
   options, and it is the basis of the future fix's wording. Every
   step must be backed by a code reference in the details block.
4. **Fix or Options.** One obvious fix → a single `Fix:` line. A real
   choice → `Options:`, each ONE line, each a genuinely different
   outcome. An option must never restate the problem, describe context,
   or say what the doc "already does" (that is evidence). Mark the
   recommendation with the word "Recommended." at the end of its line,
   once, without repeating why beyond a parenthesis.
5. All evidence (doc quotes, file:line, PR numbers, rationale) goes in
   a collapsed block the human can ignore:
   `<details><summary>Evidence (for the agent)</summary>...</details>`
   When the behavior can be reproduced with one cheap API request
   (a harness key is available on Seb's machines and the VM), DO it
   and put the request + verbatim response in the evidence:
   reproduction beats code citation.

Voice: see the self-contained "Voice" section below. It applies to
every finding.

An IMAGE finding is ONLY the plain sentence plus the details block: no
options, no rationale paragraph. If Seb cannot know what to do after
reading one sentence, the finding fails the format.

## Language of publication (absolute rule)

Everything published on GitHub — issue titles, bodies, comments, labels,
PR descriptions — is written in ENGLISH, always. mnfst/docs is a public
repo with an international audience. French is for the private
conversation with Seb only. An issue drafted in French fails
verification.

## Voice (self-contained — do not depend on any external skill)

- Short sentences. Direct. Like a senior engineer writing a bug report.
- No em dashes. Use colons, commas, or periods.
- No filler words: robust, comprehensive, leverage, utilize, enhance,
  streamline, seamlessly, facilitate.
- Exact quotes, exact error codes, exact paths. Never paraphrase a
  quote.
- Every sentence carries new information. If a sentence repeats the
  title or another sentence, delete it.

## Canonical example (imitate this shape exactly)

### 3 · [WRONG] The doc says an unknown model name "falls back to your routing config". False: the request fails with M302

Page: https://manifest.build/docs/self-hosted (First request, the "Send a request" step)

What actually happens:
1. Your app sends a request with a model name.
2. If the name is `auto`, Manifest picks the model for you (routing).
3. If it is a real model name, Manifest sends the request to that exact model, no substitution.
4. If that model is unreachable, the request fails with error M302. Nothing falls back.

Options:
1. Replace with the sentence `llm-gateway.mdx:89` already uses: unlisted model ID → M302, send `auto` for routing. Recommended.
2. Delete the false half of the sentence, keep the rest.

<details><summary>Evidence (for the agent)</summary>

- `self-hosted.mdx:150` — "Any other name is treated as an explicit choice, and falls back to your routing config if it matches nothing you have connected."
- Code: `proxy.service.ts:899-916` (resolution), `:275-287` (M302 raise). No fallback path for explicit models.
- A user believes a typo'd model is caught by routing. It fails.
</details>

Why this example is right: the title states the false claim and the
truth in one line; the journey lets Seb verify the behavior himself in
four user-language steps; the options are two different outcomes, one
line each; the recommendation is one word; everything else is folded.
