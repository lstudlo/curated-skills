---
name: market-research
description: Conduct deep, evidence-grounded market competitiveness research for any product using a consistent framework with mandatory evidence sufficiency gates and STP (Segmentation, Targeting, Positioning) analysis.
---

# Market Research Skill

Use this skill when the user asks for market research, competitor analysis, ICP clarification, positioning strategy, or pricing/market competitiveness assessment.

## Core Principles

1. Be evidence-first, not opinion-first.
2. Use current online sources for all time-sensitive facts.
3. Cover large, mid, and niche competitors.
4. Clearly separate facts, inferences, and recommendations.
5. Use STP as the core strategy lens.

## Mandatory Report Structure

Always structure output with these sections:

1. Community / Customer Needs / Pain Points (Online Evidence)
2. Product Core Value Proposition vs Public Market
3. Reasons Product May Fail
4. Reasons Product May Work Well
5. High-Value Improvements / Differentiators

Add when useful:
- Executive Summary
- STP Analysis
- Confidence and Method
- Sources

## STP Framework (Required)

## 1) Segmentation
Define clear segments based on real behavior and buying context, not demographics alone.

For each segment, capture:
1. Primary job-to-be-done.
2. Current alternatives.
3. Core pain intensity.
4. Willingness-to-pay signal.
5. Adoption friction.

## 2) Targeting
Prioritize segments by attractiveness and fit.

Score each segment on:
1. Pain severity.
2. Market accessibility.
3. Competitive pressure.
4. Product capability fit.
5. Monetization likelihood.

Then declare:
- Primary target segment (now)
- Secondary segment (next)
- Deprioritized segments (later/avoid)

## 3) Positioning
Write a clear positioning statement with proof.

Template:
- For [target segment], [product] is the [category/frame of reference] that [primary outcome], unlike [main alternatives], because [proof points].

Positioning checks:
1. Is it differentiated from substitutes?
2. Is it credible given current product capabilities?
3. Is it easy to communicate in one sentence?
4. Does it imply a concrete roadmap and pricing logic?

## Evidence Sufficiency Protocol (Mandatory)

Do not finalize the report until evidence is sufficient. Keep researching in loops until all gates pass.

### Research loop
1. Search broad market archetypes.
2. Extract hard facts from primary sources (official pricing/help/docs).
3. Add community pain signals (qualitative only).
4. Identify weak/unsupported claims.
5. Repeat targeted searches to close gaps.

### Minimum evidence gates
1. Competitor coverage includes: large + mid-size + niche players.
2. Total sources: at least 15–25, with at least 70% primary sources.
3. Each major claim (pain, threat, differentiator) has at least 2 independent sources.
4. Time-sensitive facts (pricing/limits/features) are verified against current pages.
5. STP section is fully supported by evidence (not assumption-only).
6. Confidence statement is explicit:
    - High: all gates pass
    - Medium: minor gaps remain (list gaps)
    - Low: major gaps remain (do not conclude strategically)

### Stop rule
If any gate fails, continue online research. Do not output final strategic recommendations yet.

## Scope Lock (First Step)

Before research, explicitly lock:
1. Product definition and intended positioning.
2. In-scope and out-of-scope competitor types.
3. Primary vs secondary use cases.
4. Geography and date context.
5. User constraints (for example: exclude developer-oriented tools).

## Research Workflow

### Step 1: Build market map
Group competitors into:
1. Direct competitors.
2. Adjacent substitutes.
3. Workflow incumbents.
4. Niche/long-tail alternatives.

### Step 2: Collect hard evidence
Prioritize:
1. Official pricing pages.
2. Official help/docs.
3. Terms/policies when relevant.
4. Product docs for workflow behavior.

Capture:
- limits, permissions, expiry behavior, approval flow depth, integrations, pricing floor.

### Step 3: Collect pain evidence
Use community/review sources for qualitative friction patterns.
Label these explicitly as anecdotal signals.

### Step 4: Synthesize
Convert evidence into:
1. repeated customer pains,
2. switching barriers,
3. willingness-to-pay indicators.

### Step 5: Apply STP
Run segmentation, targeting, positioning with evidence-backed rationale.

### Step 6: Produce strategy
Output:
1. clear fail/work reasons,
2. differentiated roadmap priorities,
3. pricing/packaging implications,
4. KPI suggestions.

## Quality Rules

1. Mark time-sensitive claims with concrete date context.
2. Avoid generic recommendations.
3. Tie every strategic recommendation to observed evidence.
4. State uncertainties explicitly.
5. Keep analysis aligned with user constraints.

## Output Template

# [Product] Market Competitiveness Report
- Prepared: [YYYY-MM-DD, timezone]
- Scope:
- Exclusions:

## Executive Summary

## Method and Confidence

## STP Analysis
### Segmentation
### Targeting
### Positioning

## 1) Community / Customer Needs / Pain Points (Online Evidence)

## 2) [Product] Core Value Proposition vs Public Market

## 3) Reasons [Product] May Fail

## 4) Reasons [Product] May Work Well

## 5) High-Value Improvements / Differentiators

## Sources
- Primary sources
- Community sources (qualitative)

## Export Rule

If user asks to export, write the report to requested path (example: `docs/<date>/market_search.md`) with this structure and full source links.
