---
name: git-commit
description: 'Execute git commit with conventional commit message analysis, intelligent staging, and message generation. Use when user asks to commit changes, create a git commit, or mentions "/commit". Supports: (1) Auto-detecting type and scope from changes, (2) Generating conventional commit messages from diff, (3) Interactive commit with optional type/scope/description overrides, (4) Intelligent file staging for logical grouping'
license: MIT
allowed-tools: Bash
---

# Git Commit with Conventional Commits

## Overview

Create standardized, semantic git commits using the Conventional Commits specification. This tool analyzes diffs to determine types, offers 
multiple staging strategies, provides optional verification before execution, and handles optional pushing to remote.

## Conventional Commit Format


```

<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

```

## Commit Types

| Type       | Purpose                        |
| ---------- | ------------------------------ |
| `feat`     | New feature                    |
| `fix`      | Bug fix                        |
| `docs`     | Documentation only             |
| `style`    | Formatting/style (no logic)    |
| `refactor` | Code refactor (no feature/fix) |
| `perf`     | Performance improvement        |
| `test`     | Add/update tests               |
| `build`    | Build system/dependencies      |
| `ci`       | CI/config changes              |
| `chore`    | Maintenance/misc               |
| `revert`   | Revert commit                  |

## Formatting & Examples

**Scope Strategy**
- **Single:** `billing`, `api`, `llm`
- **Multiple:** `billing, dashboard` (comma-separated for cross-component changes)

**The 50/72 Rule**
- **Subject:** Max 50 chars. Present tense ("add" not "added"). Lowercase (except proper nouns). No period.
- **Body:** Wrap at 72 chars. Use bullet points. Explain **WHAT** and **WHY** (not HOW).

**Examples**
*Simple:*
`fix(auth): resolve JWT expiration by adding null check`

*With Body:*

```

feat(billing): add billing management and revamp dashboard

* implement subscription lifecycle (create/cancel/downgrade)
* add proration for mid-cycle changes
* integrate Polar API for payment processing

```

## Breaking Changes


```

# Exclamation mark after type/scope

feat!: remove deprecated endpoint

# BREAKING CHANGE footer

feat: allow config to extend other configs

BREAKING CHANGE: `extends` key behavior changed

```

## Workflow

### 1. Analyze Diff

```bash
# If files are staged, use staged diff
git diff --staged

# If nothing staged, use working tree diff
git diff

# Also check status
git status --porcelain

```

### 2. Stage Files (Smart & Multiple Strategies)

Determine the staging strategy based on user intent:

**Option A: Standard (Default)**
If no specific restriction is requested, stage all changes:

```bash
git add .

```

**Option B: Session Staging (--session)**
If user requests `--session` flag, "only this", "current session", or "my changes only":

1. Identify files modified in the current context/session.
2. Stage **ONLY** those files.

```bash
git add <path/to/file1> <path/to/file2>

```

**Option C: Manual & Pattern Staging (--manual)**
If the user requests `--manual` flag, explicitly lists files, or wants to group changes differently:

```bash
# Stage specific files
git add path/to/file1 path/to/file2

# Stage by pattern
git add *.test.*
git add src/components/*

# Interactive staging (for splitting files)
git add -p

```

**Never commit secrets** (.env, credentials.json, private keys).

### 3. Generate Commit Message

Analyze the diff to determine:

* **Type**: Based on the table above.
* **Scope**: Identify affected modules.
* **Content**: Apply the 50/72 rule and formatting guidelines defined above.

### 4. Verification (--verify)

**If the user includes `--verify` flag or asks to "confirm" or "check first":**

**🛑 STOP! DO NOT PROCEED UNTIL USER CONFIRMS**

Present the plan and **WAIT**:

```
Changes to be committed:
1. <file> - <summary of change>
2. <file> - <summary of change>

Proposed commit message:
<type>(<scope>): <description>

Proceed with this commit? (Y/n)

```

**CRITICAL:** You must stop here. Do NOT execute `git commit` until the user explicitly responds with "Y" or "yes".

### 5. Execute Commit

**⚠️ PRE-COMMIT CHECK:** Verify that author field contains ONLY human names/emails. NO AI agents (Claude, Copilot, etc.) may be listed as author or co-author. Refer to "CRITICAL WARNINGS" above.

Once staged (and verified if required), execute the commit:

```bash
# Single line
git commit -m "<type>[scope]: <description>"

# Multi-line with body/footer
git commit -m "$(cat <<'EOF'
<type>[scope]: <description>

<optional body>

<optional footer>
EOF
)"

```

### 6. Push to Remote (--push)

**Only execute this step if the user explicitly includes `--push` flag or asks to "commit and push".**

```bash
git push

```

**If `--push` is NOT mentioned:**
Do NOT push. The commit remains local.

### 7. Post-Commit Summary

After the workflow is complete, display the following summary:

```
✓ Commit successful
  Message: <type>(<scope>): <subject>
  Status:  [Local Only | Pushed to Remote]
  Files:   <number> changed, <insertions> insertions(+), <deletions> deletions(-)

```

## Best Practices

* One logical change per commit
* Reference issues: `Closes #123`, `Refs #456`
* Maintain clean history (amend/rebase before pushing)

## ⚠️ CRITICAL WARNINGS

### 🚨 AI Agent Attribution - ABSOLUTELY FORBIDDEN

**WARNING: NEVER add Claude, Copilot, or ANY other AI/coding agent as co-author or author in commits!**

This is a hard rule with NO EXCEPTIONS:
- DO NOT use `--author` or `--co-author` flags with any AI agent name/email
- DO NOT add "Co-authored-by:" trailers for AI assistants
- DO NOT credit LLMs, coding agents, or automated tools in commit metadata
- DO NOT include AI attribution in commit messages (footers, trailers, or body)

**Why this matters:**
- AI-generated code is a tool, not a collaborator
- Legal/ethical standards require human responsibility attribution
- Attribution to AI agents undermines true human contribution
- Git authorship represents actual human decisions and oversight

**Bottom line:** If you didn't write the code yourself (or direct the AI to write it on your behalf with specific intent), you have NO business claiming AI as a co-author. AI agents are tools—using them does not make them collaborators.

**Verification check:** Before ANY commit execution, confirm that the author field contains ONLY human names/emails. If you see any AI agent names (Claude, Copilot, GPT, etc.), ABORT and correct the authorship.

---

## Git Safety Protocol

* NEVER update git config
* NEVER run destructive commands (--force, hard reset) without explicit request
* NEVER skip hooks (--no-verify) unless user asks
* NEVER force push to main/master
