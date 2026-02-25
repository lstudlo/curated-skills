---
name: skill-distributer
description: Distribute skills from ~/.agents/skills to other agent directories via symlinks. Use when creating new skills to ensure they are available to all coding agents (Claude, Gemini/Antigravity, etc.). Run this skill after creating or updating any skill to sync it across all agent environments.
---

# Skill Distributer

## Overview

Automatically symlinks skills from `~/.agents/skills` to other agent skill directories so all coding agents have access to the same skills.

## How It Works

The script creates symlinks from the source directory (`~/.agents/skills`) to:

- **Claude**: `~/.claude/skills`
- **Gemini/Antigravity**: `~/.gemini/antigravity/skills`

This ensures that any skill created or updated in `~/.agents/skills` is immediately available to all agents without manual copying.

## Usage

After creating or updating a skill in `~/.agents/skills`:

1. **Run the distribution script**:

   ```bash
   bash ~/.agents/skills/skill-distributer/scripts/distributer.sh
   ```

2. **Verify the distribution**:

   ```bash
   # Check Claude skills
   ls -la ~/.claude/skills

   # Check Gemini skills
   ls -la ~/.gemini/antigravity/skills
   ```

## Script Behavior

The script:

- Creates target directories if they don't exist
- Replaces broken or incorrect symlinks
- Preserves existing symlinks that point to the correct location
- Warns before removing non-symlink directories
- Skips hidden directories

## When to Use

- After creating a new skill in `~/.agents/skills`
- After updating an existing skill
- After packaging a skill (`*.skill` file)
- To verify all agents have access to latest skills

## Example Workflow

```bash
# 1. Create a new skill
python3 ~/.agents/skills/skill-creator/scripts/init_skill.py my-skill --path ~/.agents/skills

# 2. Implement the skill
# ... edit SKILL.md, add scripts, etc.

# 3. Package the skill
python3 ~/.agents/skills/skill-creator/scripts/package_skill.py ~/.agents/skills/my-skill

# 4. Distribute to all agents
bash ~/.agents/skills/skill-distributer/scripts/distributer.sh

# 5. Verify
ls -la ~/.claude/skills/my-skill
ls -la ~/.gemini/antigravity/skills/my-skill
```
