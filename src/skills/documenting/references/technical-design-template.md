# Technical Design Template

Use this template for engineering-facing design decisions. Keep it decision-oriented and cut sections that do not affect implementation or review.

## Suggested Path

```text
/docs/technical/[technical_design_name]/YYMMDD_[technical_design_name].md
```

## Template

```md
# [Technical Design Title]

Status: Draft | In Review | Approved | Implemented
Owner: [Name or team]
Last Updated: [YYYY-MM-DD]

## Summary

1 short paragraph. State the design goal and the proposed approach.

## Context

1 short paragraph. Explain only the background that affects the design.

## Goals

- Goal 1
- Goal 2
- Goal 3

## Non-Goals

- Non-goal 1
- Non-goal 2

## Constraints and Assumptions

- Constraint 1
- Assumption 1

## Proposed Design

Explain the design at the level needed for review. Focus on boundaries and major decisions.

## Components, Data Flow, and Interfaces

- Component 1
- Data flow step 1
- Interface or API contract

## Implemented Details

Include only when documenting an already-built or partially-built system.

- What was actually built
- Important deviations from the planned design
- Important maintenance notes

## Alternatives Considered

- Alternative 1 and why it was not chosen
- Alternative 2 and why it was not chosen

## Risks and Tradeoffs

- Risk 1
- Tradeoff 1

## Rollout, Testing, and Observability

- Rollout or migration plan
- Validation or testing strategy
- Logs, metrics, alerts, or debug hooks

## Open Questions

- Question 1
- Question 2
```

## Style Rules

- Keep summaries short.
- Use diagrams only when they clarify data flow or ownership.
- If one decision needs durable history, create or recommend an ADR.
