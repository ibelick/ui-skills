import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(rootDir, "public/analytics/stonks.js");
const sourceUrl = "https://assets.onedollarstats.com/stonks.js";

function patchStonks(source) {
  let patched = source;

  patched = patched.replace(
    /String\.fromCharCode\(\.\.\.([A-Za-z_$][\w$]*)\)/,
    'Array.from($1,(b)=>String.fromCharCode(b)).join("")',
  );

  patched = patched.replace(
    "function J(){return/Mobile|Android/i.test(navigator.userAgent)?!1:!navigator.plugins||navigator.plugins.length===0}",
    "function J(){return!1}",
  );

  patched = patched.replace(
    "(!n.plugins||n.plugins.length===0)",
    "(!1)",
  );

  if (patched === source) {
    throw new Error("stonks.js patch targets were not found; upstream script may have changed");
  }

  return patched;
}

const response = await fetch(sourceUrl);
if (!response.ok) {
  throw new Error(`Failed to download stonks.js (${response.status})`);
}

const source = await response.text();
const patched = patchStonks(source);

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, patched, "utf8");

const existing = await readFile(outputPath, "utf8");
if (existing.length === 0) {
  throw new Error("stonks.js sync produced an empty file");
}

console.log(`Synced patched stonks.js to ${path.relative(rootDir, outputPath)}`);
