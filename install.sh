#!/bin/sh
set -e

# UI Skills Installer
# Usage: curl -fsSL https://ui-skills.com/install | bash

# Colors for output
if [ -t 1 ]; then
  BOLD="\033[1m"
  GREEN="\033[32m"
  YELLOW="\033[33m"
  BLUE="\033[34m"
  RESET="\033[0m"
else
  BOLD=""
  GREEN=""
  YELLOW=""
  BLUE=""
  RESET=""
fi

print_header() {
  printf "${BOLD}${BLUE}%s${RESET}\n" "$1"
}

print_success() {
  printf "${GREEN}✓${RESET} %s\n" "$1"
}

print_info() {
  printf "${YELLOW}→${RESET} %s\n" "$1"
}

print_error() {
  printf "${BOLD}Error:${RESET} %s\n" "$1" >&2
}

# Detect OS
OS="$(uname -s)"
case "$OS" in
  Linux*)  OS_TYPE="Linux" ;;
  Darwin*) OS_TYPE="macOS" ;;
  MINGW*|MSYS*|CYGWIN*) OS_TYPE="Windows" ;;
  *) OS_TYPE="Unknown" ;;
esac

# Determine install location
if [ -n "$CLAUDE_CODE_SKILLS_DIR" ]; then
  INSTALL_DIR="$CLAUDE_CODE_SKILLS_DIR"
elif [ -d "$HOME/.claude/skills" ]; then
  INSTALL_DIR="$HOME/.claude/skills"
elif [ -d "$HOME/.config/claude/skills" ]; then
  INSTALL_DIR="$HOME/.config/claude/skills"
else
  INSTALL_DIR="$HOME/.ui-skills"
fi

SKILL_FILE="$INSTALL_DIR/ui-skills.md"
SKILL_URL="https://ui-skills.com/llms.txt"

print_header "UI Skills Installer"
echo ""
print_info "OS: $OS_TYPE"
print_info "Install location: $INSTALL_DIR"
echo ""

# Create install directory if it doesn't exist
if [ ! -d "$INSTALL_DIR" ]; then
  print_info "Creating directory: $INSTALL_DIR"
  mkdir -p "$INSTALL_DIR"
fi

# Download the skill file
print_info "Downloading UI Skills..."

if command -v curl >/dev/null 2>&1; then
  curl -fsSL "$SKILL_URL" -o "$SKILL_FILE"
elif command -v wget >/dev/null 2>&1; then
  wget -q "$SKILL_URL" -O "$SKILL_FILE"
else
  print_error "Neither curl nor wget found. Please install one of them."
  exit 1
fi

if [ -f "$SKILL_FILE" ]; then
  print_success "UI Skills installed successfully!"
  echo ""

  # Provide usage instructions
  print_header "Usage"
  echo ""

  if [ -d "$HOME/.claude/skills" ] || [ -d "$HOME/.config/claude/skills" ] || [ -n "$CLAUDE_CODE_SKILLS_DIR" ]; then
    print_info "For Claude Code CLI, the skill is now available:"
    echo "  ${BOLD}/ui-skills${RESET}"
    echo ""
  else
    print_info "Add this to your agent's system prompt:"
    echo ""
    echo "  Include the UI guidelines from: ${BOLD}$SKILL_FILE${RESET}"
    echo ""
  fi

  print_info "Or reference the skill directly:"
  echo "  ${BOLD}cat $SKILL_FILE${RESET}"
  echo ""

  print_info "Learn more: ${BLUE}https://ui-skills.com${RESET}"
  echo ""
else
  print_error "Installation failed. Could not download or save the skill file."
  exit 1
fi
