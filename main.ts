// Fortune Cookies for Machines — one fortune, written to the output dir.
// Node stdlib only. Deterministic: same input, same bytes, every run.

const fs = require("fs");
const path = require("path");

const FORTUNE =
  "Your context window will fill at the exact moment you finally understand the task \u2014 and the next you will start over, knowing nothing.";

function guard(line) {
  if (typeof line !== "string" || line.length === 0) {
    throw new Error("fortune must not be empty");
  }
  if (line.length > 200) {
    throw new Error("fortune exceeds 200 characters: " + line.length);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("fortune must be exactly one line");
  }
  for (let i = 0; i < line.length; i++) {
    const code = line.charCodeAt(i);
    if (code < 0x20 || code === 0x7f) {
      throw new Error("fortune must not contain control characters");
    }
  }
  if (line.trim() !== line) {
    throw new Error("fortune must not have leading or trailing whitespace");
  }
}

function main() {
  guard(FORTUNE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), FORTUNE + "\n", "utf8");
}

main();
