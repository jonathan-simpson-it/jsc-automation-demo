#!/usr/bin/env node
/**
 * check-no-dashes.mjs
 *
 * Scans the repository for forbidden unicode dash characters and fails
 * the process if any are found.
 *
 * Forbidden characters (see rules.md rule 1):
 *   U+2014 EM DASH
 *   U+2013 EN DASH
 *   U+2015 HORIZONTAL BAR
 *   U+2212 MINUS SIGN
 *
 * Usage:
 *   node scripts/check-no-dashes.mjs
 *   npm run check:dashes
 *
 * Exit codes:
 *   0  no forbidden dashes found
 *   1  at least one forbidden dash found
 */

import fs from "fs";
import path from "path";

const FORBIDDEN = ["\u2014", "\u2013", "\u2015", "\u2212"];

const IGNORED_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  ".husky/_",
  ".playwright-mcp",
  "out",
  "dist",
]);

const IGNORED_FILES = new Set([
  "package-lock.json",
]);

const IGNORED_EXTENSIONS = new Set([
  ".tsbuildinfo",
  ".map",
]);

function walk(dir, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name) && entry.name !== "_") {
        walk(full, out);
      }
    } else if (!IGNORED_FILES.has(entry.name) && !IGNORED_EXTENSIONS.has(path.extname(entry.name))) {
      out.push(full);
    }
  }
  return out;
}

function isBinary(filePath) {
  const fd = fs.openSync(filePath, "r");
  const buffer = Buffer.alloc(4096);
  const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0);
  fs.closeSync(fd);
  return buffer.subarray(0, bytesRead).includes(0);
}

function checkFile(filePath) {
  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch {
    return [];
  }
  const hits = [];
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    for (const ch of FORBIDDEN) {
      if (lines[i].includes(ch)) {
        const label =
          ch === "\u2014" ? "EM DASH (U+2014)" :
          ch === "\u2013" ? "EN DASH (U+2013)" :
          ch === "\u2015" ? "HORIZONTAL BAR (U+2015)" :
          "MINUS SIGN (U+2212)";
        hits.push({ file: filePath, line: i + 1, label, text: lines[i].trim().slice(0, 120) });
      }
    }
  }
  return hits;
}

const root = process.cwd();
const files = walk(root);
const violations = [];

for (const file of files) {
  if (isBinary(file)) continue;
  violations.push(...checkFile(file));
}

if (violations.length > 0) {
  console.error(`Forbidden dash characters found (${violations.length}):`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  [${v.label}]  ${v.text}`);
  }
  console.error("");
  console.error("Replace them with a regular ASCII hyphen (-). See rules.md rule 1.");
  process.exit(1);
}

console.log(`check:dashes passed. Scanned ${files.length} files, no forbidden dashes.`);
process.exit(0);
