#!/bin/sh
set -e

# UI Skills installer
# Installs the skill into the current project's .claude directory
# and optional command locations for supported tools.

# Colors (only if stdout is a TTY)
if [ -t 1 ]; then
  BOLD="\033[1m"
  GREEN="\033[32m"
  YELLOW="\033[33m"
  DIM="\033[2m"
  RESET="\033[0m"
else
  BOLD=""
  GREEN=""
  YELLOW=""
  DIM=""
  RESET=""
fi

print_header() {
  printf "${BOLD}%s${RESET}\n" "$1"
}

print_success() {
  printf "${GREEN}✓${RESET} %s\n" "$1"
}

print_info() {
  printf "${YELLOW}→${RESET} %s\n" "$1"
}

print_dim() {
  printf "${DIM}%s${RESET}\n" "$1"
}

print_error() {
  printf "${BOLD}Error:${RESET} %s\n" "$1" >&2
}

# Configuration
SKILL_URL="https://ui-skills.com/llms.txt"
INSTALL_NAME="ui-skills.md"
INSTALL_DIRNAME="ui-skills"

print_header "UI Skills Installer"
printf "\n"

# Prepare temp files for raw skill and command content
TMP_SKILL="$(mktemp)"
TMP_COMMAND="$(mktemp)"

cleanup() {
  rm -f "$TMP_SKILL" "$TMP_COMMAND"
}
trap cleanup EXIT

# Download the skill once
print_info "Downloading UI Skills..."
if command -v curl >/dev/null 2>&1; then
  curl -fsSL "$SKILL_URL" -o "$TMP_SKILL"
elif command -v wget >/dev/null 2>&1; then
  wget -q "$SKILL_URL" -O "$TMP_SKILL"
else
  print_error "Neither curl nor wget found. Please install one of them."
  exit 1
fi

if [ ! -s "$TMP_SKILL" ]; then
  print_error "Download failed or returned empty content."
  exit 1
fi

# Strip YAML frontmatter for command-style installs
sed '1,/^---$/d' "$TMP_SKILL" | sed '1,/^---$/d' > "$TMP_COMMAND"

printf "\n"

OPTIONAL_INSTALLED=0

# Project skill (current working directory)
PROJECT_DIR="${PWD}/.claude/skills/${INSTALL_DIRNAME}"
PROJECT_FILE="${PROJECT_DIR}/SKILL.md"
print_info "Project install: $PROJECT_DIR"
mkdir -p "$PROJECT_DIR"
cp "$TMP_SKILL" "$PROJECT_FILE"
print_success "Project skill installed: $PROJECT_FILE"

# Claude Code (personal skills directory, if detected)
CLAUDE_SKILLS_DIR=""
if [ -n "$CLAUDE_CODE_SKILLS_DIR" ]; then
  CLAUDE_SKILLS_DIR="$CLAUDE_CODE_SKILLS_DIR"
elif [ -d "$HOME/.claude/skills" ]; then
  CLAUDE_SKILLS_DIR="$HOME/.claude/skills"
elif [ -d "$HOME/.config/claude/skills" ]; then
  CLAUDE_SKILLS_DIR="$HOME/.config/claude/skills"
fi

if [ -n "$CLAUDE_SKILLS_DIR" ]; then
  CLAUDE_SKILL_DIR="${CLAUDE_SKILLS_DIR}/${INSTALL_DIRNAME}"
  CLAUDE_SKILL_FILE="${CLAUDE_SKILL_DIR}/SKILL.md"
  mkdir -p "$CLAUDE_SKILL_DIR"
  cp "$TMP_SKILL" "$CLAUDE_SKILL_FILE"
  print_success "Claude Code skill installed: $CLAUDE_SKILL_FILE"
  OPTIONAL_INSTALLED=$((OPTIONAL_INSTALLED + 1))
fi

# Cursor (commands folder)
if [ -d "$HOME/.cursor" ]; then
  CURSOR_DIR="$HOME/.cursor/commands"
  mkdir -p "$CURSOR_DIR"
  cp "$TMP_COMMAND" "$CURSOR_DIR/$INSTALL_NAME"
  print_success "Cursor command installed: $CURSOR_DIR/$INSTALL_NAME"
  OPTIONAL_INSTALLED=$((OPTIONAL_INSTALLED + 1))
fi

# OpenCode (command folder)
if command -v opencode >/dev/null 2>&1 || [ -d "$HOME/.config/opencode" ]; then
  OPENCODE_DIR="$HOME/.config/opencode/command"
  mkdir -p "$OPENCODE_DIR"
  cp "$TMP_COMMAND" "$OPENCODE_DIR/$INSTALL_NAME"
  print_success "OpenCode command installed: $OPENCODE_DIR/$INSTALL_NAME"
  OPTIONAL_INSTALLED=$((OPTIONAL_INSTALLED + 1))
fi

# Windsurf (append to global_rules.md)
MARKER="# UI Skills"
if [ -d "$HOME/.codeium" ] || [ -d "$HOME/Library/Application Support/Windsurf" ]; then
  WINDSURF_DIR="$HOME/.codeium/windsurf/memories"
  RULES_FILE="$WINDSURF_DIR/global_rules.md"
  mkdir -p "$WINDSURF_DIR"
  if [ -f "$RULES_FILE" ] && grep -q "$MARKER" "$RULES_FILE"; then
    print_success "Windsurf rules already include UI Skills"
  else
    if [ -f "$RULES_FILE" ]; then
      printf "\n" >> "$RULES_FILE"
    fi
    printf "%s\n\n" "$MARKER" >> "$RULES_FILE"
    cat "$TMP_COMMAND" >> "$RULES_FILE"
    printf "\n" >> "$RULES_FILE"
    print_success "Windsurf rules updated: $RULES_FILE"
  fi
  OPTIONAL_INSTALLED=$((OPTIONAL_INSTALLED + 1))
fi

# Gemini CLI (TOML command format)
if command -v gemini >/dev/null 2>&1 || [ -d "$HOME/.gemini" ]; then
  GEMINI_DIR="$HOME/.gemini/commands"
  TOML_FILE="$GEMINI_DIR/ui-skills.toml"
  mkdir -p "$GEMINI_DIR"
  cat > "$TOML_FILE" << 'TOMLEOF'
description = "Review UI code with UI Skills constraints"
prompt = """
TOMLEOF
  cat "$TMP_COMMAND" >> "$TOML_FILE"
  printf "\n\"\"\"\n" >> "$TOML_FILE"
  print_success "Gemini CLI command installed: $TOML_FILE"
  OPTIONAL_INSTALLED=$((OPTIONAL_INSTALLED + 1))
fi

printf "\n"

if [ "$OPTIONAL_INSTALLED" -eq 0 ]; then
  print_dim "No additional tool locations detected."
  print_dim "If you use Claude Code globally, copy the project skill into ~/.claude/skills/ui-skills/SKILL.md."
fi

print_header "Done"
print_info "Try: /ui-skills path/to/file.tsx"
printf "\n"
