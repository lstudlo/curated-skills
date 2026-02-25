---
name: phased-implementation
description: Implement complex work in phases with intermediate commits. Use for multi-feature projects, large refactors, or tasks that can be split into complete, testable units.
---

# Phased Implementation

## Four Core Principles

### 1. Divide Meaningful Phases

Break work into independent, testable chunks where each phase is a complete, logical unit.

**Phase types:**

- **Feature-based:** One complete feature per phase
- **Layer-based:** Database → API → Frontend → Tests
- **Dependency-based:** Base types → Data → Service → Presentation

**Phase must be:**

- Logically independent (testable in isolation)
- Clearly bounded (obvious when done)
- Committable (produces working code)

### 2. Git Worktree-based Workflow

Use git worktrees to isolate each phase in its own working directory.

**Workflow:**
```bash
# Create worktree
git worktree add ../<phase-name> main

# Implement phase, commit changes

# Merge to main, then remove
git worktree remove ../<phase-name>
```

### 3. Commit After Each Phase

Every completed phase is committed before starting the next. Use the [git-commit skill](.agents/skills/git-commit/SKILL.md) for proper commit message formatting.

**Commit format:** Describe the specific unit completed

```
feat: add user registration form component
- Implement form fields (username, email, password)
- Add validation logic
- Connect to registration API
```

**❌ Avoid:** `WIP: started working on user features`, `feat(phase-1): xxx`, `feat(auth-phase): xxx` — phase labels make commits meaningless

### 4. Ground with MCP Documentation

**MANDATORY:** Before any implementation, research using MCP docs/web search for current, version-specific documentation. Never rely on training data or assumptions.

## Implementation Workflow

```
0. Research documentation (MCP tools) → 1. Plan phases →
2. Execute phase → 3. Verify → 4. Commit → 5. Repeat
```

## When NOT to Use

- **Single-phase work:** Small changes, one-off adjustments
- **Tightly coupled changes:** Must be atomic to work
- **Hotfixes:** Urgent fixes where speed > phased approach

## Examples

**E-commerce Checkout Flow (3 phases):**

```
Phase 1: Shopping cart implementation
Phase 2: Payment integration
Phase 3: Order confirmation and email notifications
```

**Full-stack Authentication System (5 phases):**

```
Phase 1: Database schema (users, sessions, tokens)
Phase 2: Backend API (register, login, logout, refresh)
Phase 3: JWT token handling and middleware
Phase 4: Frontend authentication components
Phase 5: Protected routes and role-based access
```
