#!/usr/bin/env node
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const INSTALL_URL = "https://ui-skills.com/install";

const args = process.argv.slice(2);
const command = args[0];
const subcommand = args[1];

const BASELINE_SKILL = "baseline-ui";

const printUsage = () => {
  console.error("Usage:");
  console.error("  npx ui-skills init");
  console.error("  npx ui-skills add <skill>");
  console.error("  npx ui-skills add --all");
};

let installArgs = [];

if (command === "init") {
  installArgs = [BASELINE_SKILL];
} else if (command === "add") {
  if (subcommand === "--all") {
    installArgs = ["--all"];
  } else if (subcommand) {
    installArgs = [subcommand];
  } else {
    printUsage();
    process.exit(1);
  }
} else {
  printUsage();
  process.exit(1);
}

const installEnv = {
  ...process.env,
  UI_SKILLS_COMMAND: command,
  UI_SKILLS_SUBCOMMAND: subcommand || "",
};

// Share the same install: try local install.sh first if in the same repo,
// otherwise fetch from the URL.
const localInstallSh = path.join(__dirname, "..", "install.sh");

if (fs.existsSync(localInstallSh)) {
  const sh = spawn("sh", [localInstallSh, ...installArgs], {
    stdio: "inherit",
    env: installEnv,
  });
  sh.on("close", (code) => process.exit(code || 0));
} else {
  const curlArgs = ["-fsSL", INSTALL_URL];
  const curl = spawn("curl", curlArgs, {
    stdio: ["ignore", "pipe", "inherit"],
  });

  curl.on("error", () => {
    console.error("Error: curl is required to install UI Skills.");
    process.exit(1);
  });

  const sh = spawn("sh", ["-s", "--", ...installArgs], {
    stdio: ["pipe", "inherit", "inherit"],
    env: installEnv,
  });

  sh.on("error", () => {
    console.error("Error: sh is required to run the installer.");
    process.exit(1);
  });

  curl.stdout.pipe(sh.stdin);

  curl.on("close", (code) => {
    if (code !== 0) {
      console.error("Error: failed to download installer.");
      process.exit(code || 1);
    }
  });

  sh.on("close", (code) => {
    process.exit(code || 0);
  });
}
