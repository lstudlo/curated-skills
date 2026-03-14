# Feature Spec Template

Use this template for product-facing docs. Keep it short. Remove any section that does not change scope, priority, or success.

## Suggested Path

```text
/docs/features/[feature_name]/YYMMDD_[feature].md
```

Default naming pattern:

```text
/docs/features/[feature-slug]/260314_[feature-slug].md
```

## Template

```md
# [Feature Name]

Status: Draft | In Review | Approved | Implemented
Owner: [Name or team]
Last Updated: [YYYY-MM-DD]

## Summary

2 to 4 sentences. State the user, the action, and the value.

## Problem

1 short paragraph. Name the pain or gap directly.

## Goals

- Goal 1
- Goal 2
- Goal 3

## Non-Goals

- Non-goal 1
- Non-goal 2

## Users and Use Cases

- Primary user: [who]
- Use case 1
- Use case 2

## Requirements

- Requirement 1
- Requirement 2
- Requirement 3

Write each requirement as one sentence. Make it testable or reviewable.

## Mental Model

- Core concept
- Expected user assumption
- Expected user action

Keep this to 3 bullets unless the feature is truly complex.

## Success Metrics

- Metric 1
- Metric 2

## Current Implementation

Include only if the feature already exists.

- What is already shipped
- Where current behavior differs from the intended behavior
- Known gaps or follow-up items

## Open Questions

- Question 1
- Question 2

Keep to blockers only.

## Out of Scope

- Item 1
- Item 2
```

## Style Rules

- Prefer bullets over long paragraphs.
- Prefer direct wording over framing language.
- Cut generic claims unless they are measurable.

Avoid:

- `This feature aims to provide a seamless and intuitive experience for users.`

Prefer:

- `Users can search by title, tag, or author from any page.`

Avoid:

- `The system should support flexible and scalable future enhancements.`

Prefer:

- `The first release supports one saved filter per user.`
