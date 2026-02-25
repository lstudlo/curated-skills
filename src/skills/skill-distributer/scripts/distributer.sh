#!/bin/bash

# Skill Distribution Script
# Symlinks skills from ~/.agents/skills to other agent skill directories

set -euo pipefail

# Source directory (where skills are created)
SOURCE_DIR="$HOME/.agents/skills"

# Target directories for different agents
CLAUDE_DIR="$HOME/.claude/skills"
GEMINI_DIR="$HOME/.gemini/antigravity/skills"

# Verify source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory does not exist: $SOURCE_DIR"
    exit 1
fi

# Function to create symlinks for a target directory
distribute_to_target() {
    local target_dir="$1"
    local agent_name="$2"

    # Skip if this is the source directory
    if [ "$target_dir" = "$SOURCE_DIR" ]; then
        return 0
    fi

    echo "Distributing to $agent_name..."

    # Create target directory if it doesn't exist
    mkdir -p "$target_dir"

    # Loop through all directories in source
    for dir in "$SOURCE_DIR"/*/; do
        # Get just the folder name
        folder_name=$(basename "$dir")

        # Skip if it's hidden or not a directory
        [[ "$folder_name" == .* ]] && continue
        [ ! -d "$dir" ] && continue

        target_path="$target_dir/$folder_name"

        # Skip if symlink already exists and points to correct location
        if [ -L "$target_path" ]; then
            if [ "$(readlink "$target_path")" = "$dir" ]; then
                echo "  ✓ $folder_name (already linked)"
                continue
            else
                echo "  Replacing broken symlink: $folder_name"
                rm "$target_path"
            fi
        fi

        # Remove existing directory if present (not a symlink)
        if [ -d "$target_path" ] && [ ! -L "$target_path" ]; then
            echo "  Warning: Removing existing directory: $folder_name"
            rm -rf "$target_path"
        fi

        # Create symlink
        ln -s "$dir" "$target_path"
        echo "  → $folder_name"
    done

    echo "Done for $agent_name!"
}

# Distribute to Claude
if [ -n "${CLAUDE_DIR:-}" ]; then
    distribute_to_target "$CLAUDE_DIR" "Claude"
fi

# Distribute to Gemini/Antigravity
if [ -n "${GEMINI_DIR:-}" ]; then
    distribute_to_target "$GEMINI_DIR" "Gemini/Antigravity"
fi

echo ""
echo "✓ All skills distributed successfully!"
echo "Source: $SOURCE_DIR"
echo "Targets:"
[ -n "${CLAUDE_DIR:-}" ] && echo "  - Claude: $CLAUDE_DIR"
[ -n "${GEMINI_DIR:-}" ] && echo "  - Gemini: $GEMINI_DIR"
