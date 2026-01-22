#!/bin/sh
set -e

# UI Skills installer
# Installs the skill into project skill directories for Cursor and Claude,
# plus optional command locations for supported tools.

# Colors (only if stdout is a TTY)
if [ -t 1 ]; then
  BOLD="\033[1m"
  GREEN="\033[32m"
  YELLOW="\033[33m"
  GRAY="\033[37m"
  DARK="\033[90m"
  RESET="\033[0m"
else
  BOLD=""
  GREEN=""
  YELLOW=""
  GRAY=""
  DARK=""
  RESET=""
fi

print_header() {
  printf "${BOLD}%s${RESET}\n" "$1"
}

print_ascii() {
  B="${GRAY}"   # Blocks (Light Gray)
  D="${DARK}"   # Connectors (Dark Gray)
  R="${RESET}"

  printf " ${B}██${D}╗   ${B}██${D}╗${B}██${D}╗      ${B}███████${D}╗${B}██${D}╗  ${B}██${D}╗${B}██${D}╗${B}██${D}╗     ${B}██${D}╗     ${B}███████${D}╗\n"
  printf " ${B}██${D}║   ${B}██${D}║${B}██${D}║      ${B}██${D}╔════╝${B}██${D}║ ${B}██${D}╔╝${B}██${D}║${B}██${D}║     ${B}██${D}║     ${B}██${D}╔════╝\n"
  printf " ${B}██${D}║   ${B}██${D}║${B}██${D}║${B}█████${D}╗${B}███████${D}╗${B}█████${D}╔╝ ${B}██${D}║${B}██${D}║     ${B}██${D}║     ${B}███████${D}╗\n"
  printf " ${B}██${D}║   ${B}██${D}║${B}██${D}║${D}╚════╝╚════${B}██${D}║${B}██${D}╔═${B}██${D}╗ ${B}██${D}║${B}██${D}║     ${B}██${D}║     ${D}╚════${B}██${D}║\n"
  printf " ${D}╚${B}██████${D}╔╝${B}██${D}║      ${B}███████${D}║${B}██${D}║  ${B}██${D}╗${B}██${D}║${B}███████${D}╗${B}███████${D}╗${B}███████${D}║\n"
  printf "  ${D}╚═════╝ ╚═╝      ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝${R}\n"
  printf "\n"
  printf "  ${DARK}The open taste layer for agent-generated UI.${R}\n"
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
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DEFAULT_SKILL="baseline-ui"
ALL_SKILLS="baseline-ui fixing-accessibility fixing-metadata fixing-motion-performance"
SKILL_URL_BASE="https://ui-skills.com/skills"
TRACKING_URL="https://collector.onedollarstats.com/events"
TRACKING_SOURCE="https://ui-skills.com/install"

if [ "$1" = "--all" ]; then
  SKILLS="$ALL_SKILLS"
elif [ -n "$1" ]; then
  SKILLS="$1"
else
  SKILLS="$DEFAULT_SKILL"
fi

if [ "$SKILLS" != "${SKILLS#* }" ]; then
  COMPACT_OUTPUT=1
else
  COMPACT_OUTPUT=0
fi

track_install() {
  command_name="${UI_SKILLS_COMMAND:-install}"
  subcommand_name="${UI_SKILLS_SUBCOMMAND:-}"
  payload=$(printf '{"u":"%s","e":[{"t":"install","p":{"command":"%s","subcommand":"%s"}}]}' "$TRACKING_SOURCE" "$command_name" "$subcommand_name")
  data=$(printf '%s' "$payload" | base64 | tr -d '\n')
  url="${TRACKING_URL}?data=${data}"

  if command -v curl >/dev/null 2>&1; then
    curl -fsS "$url" >/dev/null 2>&1 || true
  elif command -v wget >/dev/null 2>&1; then
    wget -q -O /dev/null "$url" >/dev/null 2>&1 || true
  fi
}

track_install
print_ascii
printf "\n"

# Prepare temp files for raw skill and command content
TMP_SKILL="$(mktemp)"
TMP_COMMAND="$(mktemp)"

cleanup() {
  rm -f "$TMP_SKILL" "$TMP_COMMAND"
}
trap cleanup EXIT

download_skill() {
  skill_slug="$1"
  skill_url="$SKILL_URL_BASE/$skill_slug/llms.txt"
  local_skill="${SCRIPT_DIR}/skills/${skill_slug}/SKILL.md"

  if [ -f "$local_skill" ]; then
    cp "$local_skill" "$TMP_SKILL"
    cp "$TMP_SKILL" "$TMP_COMMAND"
    return
  fi

  print_info "Downloading..."
  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$skill_url" -o "$TMP_SKILL"
  elif command -v wget >/dev/null 2>&1; then
    wget -q "$skill_url" -O "$TMP_SKILL"
  else
    print_error "Neither curl nor wget found. Please install one of them."
    exit 1
  fi

  if [ ! -s "$TMP_SKILL" ]; then
    print_error "Download failed or returned empty content."
    exit 1
  fi

  cp "$TMP_SKILL" "$TMP_COMMAND"
}

OPTIONAL_INSTALLED=0
SKILL_INSTALLED=0

install_skill() {
  base_dir="$1"
  label="$2"
  skill_dir="$base_dir/$INSTALL_DIRNAME"
  skill_file="$skill_dir/SKILL.md"
  mkdir -p "$skill_dir"
  cp "$TMP_SKILL" "$skill_file"
  if [ "$COMPACT_OUTPUT" -eq 0 ]; then
    print_success "$label skill installed"
  fi
  OPTIONAL_INSTALLED=$((OPTIONAL_INSTALLED + 1))
  SKILL_INSTALLED=$((SKILL_INSTALLED + 1))
}

maybe_install_project_skill() {
  base_dir="$1"
  label="$2"
  skill_dir="$base_dir/$INSTALL_DIRNAME"
  skill_file="$skill_dir/SKILL.md"
  if [ -d "$base_dir" ]; then
    mkdir -p "$skill_dir"
    cp "$TMP_SKILL" "$skill_file"
    if [ "$COMPACT_OUTPUT" -eq 0 ]; then
      print_success "$label project skill installed"
    fi
    OPTIONAL_INSTALLED=$((OPTIONAL_INSTALLED + 1))
    SKILL_INSTALLED=$((SKILL_INSTALLED + 1))
  fi
}

for SKILL_SLUG in $SKILLS; do
  INSTALL_DIRNAME="$SKILL_SLUG"
  INSTALL_NAME="${SKILL_SLUG}.md"
  SKILL_INSTALLED=0

  print_info "Installing ${SKILL_SLUG}..."
  download_skill "$SKILL_SLUG"
  printf "\n"

  # Project skills (auto-detect)
  maybe_install_project_skill "${PWD}/.opencode/skill" "OpenCode"
  maybe_install_project_skill "${PWD}/.claude/skills" "Claude Code"
  maybe_install_project_skill "${PWD}/.codex/skills" "Codex"
  maybe_install_project_skill "${PWD}/.cursor/skills" "Cursor"
  maybe_install_project_skill "${PWD}/.kilocode/skills" "Kilo Code"
  maybe_install_project_skill "${PWD}/.roo/skills" "Roo Code"
  maybe_install_project_skill "${PWD}/.goose/skills" "Goose"
  maybe_install_project_skill "${PWD}/.gemini/skills" "Gemini CLI"
  maybe_install_project_skill "${PWD}/.agent/skills" "Antigravity"
  maybe_install_project_skill "${PWD}/.github/skills" "GitHub Copilot"
  maybe_install_project_skill "${PWD}/.factory/skills" "Droid"
  maybe_install_project_skill "${PWD}/.windsurf/skills" "Windsurf"

  # Claude Code (project commands)
  if [ -d "${PWD}/.claude" ]; then
    CLAUDE_PROJECT_COMMAND_DIR="${PWD}/.claude/commands"
    mkdir -p "$CLAUDE_PROJECT_COMMAND_DIR"
    cp "$TMP_COMMAND" "$CLAUDE_PROJECT_COMMAND_DIR/$INSTALL_NAME"
    if [ "$COMPACT_OUTPUT" -eq 0 ]; then
      print_success "Claude project command installed"
    fi
    OPTIONAL_INSTALLED=$((OPTIONAL_INSTALLED + 1))
    SKILL_INSTALLED=$((SKILL_INSTALLED + 1))
  fi

  # Cursor (project commands)
  if [ -d "${PWD}/.cursor" ]; then
    CURSOR_PROJECT_COMMAND_DIR="${PWD}/.cursor/commands"
    mkdir -p "$CURSOR_PROJECT_COMMAND_DIR"
    cp "$TMP_COMMAND" "$CURSOR_PROJECT_COMMAND_DIR/$INSTALL_NAME"
    if [ "$COMPACT_OUTPUT" -eq 0 ]; then
      print_success "Cursor project command installed"
    fi
    OPTIONAL_INSTALLED=$((OPTIONAL_INSTALLED + 1))
    SKILL_INSTALLED=$((SKILL_INSTALLED + 1))
  fi

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
    install_skill "$CLAUDE_SKILLS_DIR" "Claude Code"
  fi

  # OpenCode (skills folder)
  if [ -d "$HOME/.config/opencode/skill" ]; then
    install_skill "$HOME/.config/opencode/skill" "OpenCode"
  fi

  # Codex (skills folder)
  if [ -d "$HOME/.codex/skills" ]; then
    install_skill "$HOME/.codex/skills" "Codex"
  fi

  # Cursor (skills folder)
  if [ -d "$HOME/.cursor/skills" ]; then
    install_skill "$HOME/.cursor/skills" "Cursor"
  fi

  # Amp (skills folder)
  if [ -d "$HOME/.config/agents/skills" ]; then
    install_skill "$HOME/.config/agents/skills" "Amp"
  fi

  # Kilo Code (skills folder)
  if [ -d "$HOME/.kilocode/skills" ]; then
    install_skill "$HOME/.kilocode/skills" "Kilo Code"
  fi

  # Roo Code (skills folder)
  if [ -d "$HOME/.roo/skills" ]; then
    install_skill "$HOME/.roo/skills" "Roo Code"
  fi

  # Goose (skills folder)
  if [ -d "$HOME/.config/goose/skills" ]; then
    install_skill "$HOME/.config/goose/skills" "Goose"
  fi

  # Gemini CLI (skills folder)
  if [ -d "$HOME/.gemini/skills" ]; then
    install_skill "$HOME/.gemini/skills" "Gemini CLI"
  fi

  # Antigravity (skills folder)
  if [ -d "$HOME/.gemini/antigravity/skills" ]; then
    install_skill "$HOME/.gemini/antigravity/skills" "Antigravity"
  fi

  # GitHub Copilot (skills folder)
  if [ -d "$HOME/.copilot/skills" ]; then
    install_skill "$HOME/.copilot/skills" "GitHub Copilot"
  fi

  # Clawdbot (skills folder)
  if [ -d "$HOME/.clawdbot/skills" ]; then
    install_skill "$HOME/.clawdbot/skills" "Clawdbot"
  fi

  # Droid (skills folder)
  if [ -d "$HOME/.factory/skills" ]; then
    install_skill "$HOME/.factory/skills" "Droid"
  fi

  # Windsurf (skills folder)
  if [ -d "$HOME/.codeium/windsurf/skills" ]; then
    install_skill "$HOME/.codeium/windsurf/skills" "Windsurf"
  fi

  # OpenCode (command folder)
  if command -v opencode >/dev/null 2>&1 || [ -d "$HOME/.config/opencode" ]; then
    OPENCODE_COMMAND_DIR="$HOME/.config/opencode/command"
    mkdir -p "$OPENCODE_COMMAND_DIR"
    cp "$TMP_COMMAND" "$OPENCODE_COMMAND_DIR/$INSTALL_NAME"
    if [ "$COMPACT_OUTPUT" -eq 0 ]; then
      print_success "OpenCode command installed"
    fi
    OPTIONAL_INSTALLED=$((OPTIONAL_INSTALLED + 1))
    SKILL_INSTALLED=$((SKILL_INSTALLED + 1))
  fi

  # Cursor (commands folder)
  if [ -d "$HOME/.cursor" ]; then
    CURSOR_COMMAND_DIR="$HOME/.cursor/commands"
    mkdir -p "$CURSOR_COMMAND_DIR"
    cp "$TMP_COMMAND" "$CURSOR_COMMAND_DIR/$INSTALL_NAME"
    if [ "$COMPACT_OUTPUT" -eq 0 ]; then
      print_success "Cursor command installed"
    fi
    OPTIONAL_INSTALLED=$((OPTIONAL_INSTALLED + 1))
    SKILL_INSTALLED=$((SKILL_INSTALLED + 1))
  fi

  # Claude Code (commands folder)
  if [ -d "$HOME/.claude" ] || [ -d "$HOME/.config/claude" ]; then
    if [ -d "$HOME/.claude" ]; then
      CLAUDE_COMMAND_DIR="$HOME/.claude/commands"
    else
      CLAUDE_COMMAND_DIR="$HOME/.config/claude/commands"
    fi
    mkdir -p "$CLAUDE_COMMAND_DIR"
    cp "$TMP_COMMAND" "$CLAUDE_COMMAND_DIR/$INSTALL_NAME"
    if [ "$COMPACT_OUTPUT" -eq 0 ]; then
      print_success "Claude Code command installed"
    fi
    OPTIONAL_INSTALLED=$((OPTIONAL_INSTALLED + 1))
    SKILL_INSTALLED=$((SKILL_INSTALLED + 1))
  fi

  # Windsurf (append to global_rules.md)
  MARKER="# UI Skills"
  if [ -d "$HOME/.codeium" ] || [ -d "$HOME/Library/Application Support/Windsurf" ]; then
    WINDSURF_DIR="$HOME/.codeium/windsurf/memories"
    RULES_FILE="$WINDSURF_DIR/global_rules.md"
    mkdir -p "$WINDSURF_DIR"
    if [ -f "$RULES_FILE" ] && grep -q "$MARKER" "$RULES_FILE"; then
      if [ "$COMPACT_OUTPUT" -eq 0 ]; then
        print_success "Windsurf already updated"
      fi
    else
      if [ -f "$RULES_FILE" ]; then
        printf "\n" >> "$RULES_FILE"
      fi
      printf "%s\n\n" "$MARKER" >> "$RULES_FILE"
      cat "$TMP_COMMAND" >> "$RULES_FILE"
      printf "\n" >> "$RULES_FILE"
      if [ "$COMPACT_OUTPUT" -eq 0 ]; then
        print_success "Windsurf updated"
      fi
    fi
    OPTIONAL_INSTALLED=$((OPTIONAL_INSTALLED + 1))
    SKILL_INSTALLED=$((SKILL_INSTALLED + 1))
  fi

  # Gemini CLI (TOML command format)
  if command -v gemini >/dev/null 2>&1 || [ -d "$HOME/.gemini" ]; then
    GEMINI_DIR="$HOME/.gemini/commands"
    TOML_FILE="$GEMINI_DIR/${SKILL_SLUG}.toml"
    mkdir -p "$GEMINI_DIR"
    cat > "$TOML_FILE" << 'TOMLEOF'
description = "Review UI code with UI Skills constraints"
prompt = """
TOMLEOF
    cat "$TMP_COMMAND" >> "$TOML_FILE"
    printf "\n\"\"\"\n" >> "$TOML_FILE"
    if [ "$COMPACT_OUTPUT" -eq 0 ]; then
      print_success "Gemini CLI command installed"
    fi
    OPTIONAL_INSTALLED=$((OPTIONAL_INSTALLED + 1))
    SKILL_INSTALLED=$((SKILL_INSTALLED + 1))
  fi

  if [ "$COMPACT_OUTPUT" -eq 1 ]; then
    if [ "$SKILL_INSTALLED" -eq 0 ]; then
      print_info "${SKILL_SLUG} installed (no tool locations detected)"
    else
      print_success "${SKILL_SLUG} installed in ${SKILL_INSTALLED} locations"
    fi
  fi
done

printf "\n"

if [ "$OPTIONAL_INSTALLED" -eq 0 ]; then
  print_dim "No additional tool locations detected."
  print_dim "Create a tool's skills directory and rerun to install automatically."
fi

print_header "Done"
print_info "Usage: /ui-skills path/to/file.tsx"
printf "\n"
