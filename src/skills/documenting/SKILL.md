---
name: documenting
description: "Write short, explicit product and engineering docs from rough input. Use when asked to create or refine a feature spec, product spec, requirements doc, implementation detail doc, technical design doc, or mental model doc. Supports two modes: feature-spec and technical-design. Enforces doc locations: feature specs in /docs/features/[feature_name]/YYMMDD_[feature].md and technical design docs in /docs/technical/[technical_design_name]/YYMMDD_[technical_design_name].md."
metadata:
  author: lightiichen
  version: "1.1.0"
---

# Documenting

This skill writes reviewable docs with minimal fluff. Default to fewer words. If a sentence does not change scope, decisions, implementation, or review, cut it.

## Modes

### `feature-spec`

Use for:

- problem and user need
- scope and non-goals
- requirements
- success criteria
- user or team mental model

Write to:

```text
/docs/features/[feature_name]/YYMMDD_[feature].md
```

Rules:

- `feature_name` and `[feature]` must be `kebab-case`
- prefix the file with the creation date in `YYMMDD_` format
- default `[feature]` to the same slug as the folder
- preferred pattern:

```text
/docs/features/unified-search/260314_unified-search.md
```

- if the feature folder already exists, update the latest relevant doc instead of creating a duplicate

Writing rules:

- summary: 2 to 4 sentences
- goals: 3 bullets max
- requirements: 3 to 7 bullets, one sentence each
- mental model: 3 bullets max unless complexity requires more
- open questions: 5 max
- prefer bullets over paragraphs
- do not use filler such as `seamless`, `robust`, `user-friendly`, `intuitive`, or `scalable` unless you define what they mean

### `technical-design`

Use for:

- architecture and boundaries
- interfaces and data flow
- implementation approach
- tradeoffs
- rollout, migration, testing, or observability

Write to:

```text
/docs/technical/[technical_design_name]/YYMMDD_[technical_design_name].md
```

Rules:

- `technical_design_name` must be `kebab-case`
- prefix the file with the creation date in `YYMMDD_` format
- default the file slug to the same slug as the folder
- preferred pattern:

```text
/docs/technical/session-rotation/260314_session-rotation.md
```

- if the design folder already exists, update the latest relevant doc instead of creating a duplicate

Writing rules:

- summary: 1 short paragraph
- major decisions: 3 to 5 if possible
- alternatives: only include real contenders
- open questions: unresolved design decisions only
- remove product background that does not affect the design

## Mode Selection

- use `feature-spec` for `what` and `why`
- use `technical-design` for `how` and `why this design`
- if the user asks for both, write two docs instead of mixing concerns

## Workflow

1. Pick the mode.
2. Derive a short `kebab-case` slug and add the current `YYMMDD_` prefix.
3. Check for an existing doc in the target folder. Update before creating a new one.
4. Draft with the right reference template.
5. Run the concision pass.

## Concision Pass

Before finalizing, remove:

- repeated background
- restated goals
- vague adjectives
- implementation detail inside feature specs unless it changes scope or UX
- long paragraphs that can become bullets
- open questions that are not blockers

Prefer:

- concrete nouns
- direct verbs
- short sentences
- one idea per bullet
- links instead of pasted support material

## Already-Implemented Work

If documenting something that already exists:

- in `feature-spec`, add `Current Implementation` only when it explains shipped behavior, gaps, or follow-up work
- in `technical-design`, add `Implemented Details` only when the as-built system matters for maintenance or future changes

Do not turn either doc into a changelog.

## References

Load only when needed:

- `references/feature-spec-template.md`
- `references/technical-design-template.md`
- `references/document-quality-checklist.md`
