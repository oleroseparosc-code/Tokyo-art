import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const viteConfig = readFileSync(new URL("../vite.config.js", import.meta.url), "utf8");
const workflow = readFileSync(
  new URL("../.github/workflows/deploy-pages.yml", import.meta.url),
  "utf8",
);
const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);
const publishScript = readFileSync(
  new URL("../scripts/publish-update.mjs", import.meta.url),
  "utf8",
);

assert.ok(viteConfig.includes('base: "./"'), "Vite should use relative asset paths for GitHub Pages");
assert.ok(workflow.includes("actions/deploy-pages"), "Workflow should deploy to GitHub Pages");
assert.ok(workflow.includes("npm.cmd run build") || workflow.includes("npm run build"), "Workflow should build the app");
assert.equal(packageJson.scripts.publish, "node scripts/publish-update.mjs");
assert.ok(publishScript.includes('"push", "origin", "main"'), "Publish script should push main to GitHub");
assert.ok(publishScript.includes("npm.cmd"), "Publish script should run npm commands on Windows");

console.log("github pages checks passed");
