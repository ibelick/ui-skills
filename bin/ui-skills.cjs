#!/usr/bin/env node
const https = require("https");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const INSTALL_URL = "https://ui-skills.com/install";

const args = process.argv.slice(2);
const command = args[0];

if (command !== "init") {
  console.error("Usage: npx ui-skills init");
  process.exit(1);
}

// Share the same install: try local install.sh first if in the same repo,
// otherwise fetch from the URL.
const localInstallSh = path.join(__dirname, "..", "install.sh");

if (fs.existsSync(localInstallSh)) {
  const sh = spawn("sh", [localInstallSh], { stdio: "inherit" });
  sh.on("close", (code) => process.exit(code || 0));
} else {
  const curlArgs = ["-fsSL", INSTALL_URL];
  const curl = spawn("curl", curlArgs, { stdio: ["ignore", "pipe", "inherit"] });

  curl.on("error", () => {
    console.error("Error: curl is required to install UI Skills.");
    process.exit(1);
  });

  const sh = spawn("sh", [], { stdio: ["pipe", "inherit", "inherit"] });

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
