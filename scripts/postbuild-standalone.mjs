// Next.js `output: "standalone"` does NOT copy static assets or /public into
// the standalone folder — you have to do it yourself, or every asset 404s.
// This runs after `next build` (see the "build:standalone" npm script).
import { cp, access } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const STANDALONE = join(ROOT, ".next", "standalone");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

if (!(await exists(join(STANDALONE, "server.js")))) {
  console.error(
    "✗ .next/standalone/server.js not found. Is `output: \"standalone\"` set in next.config and did `next build` run?",
  );
  process.exit(1);
}

await cp(join(ROOT, ".next", "static"), join(STANDALONE, ".next", "static"), {
  recursive: true,
});
await cp(join(ROOT, "public"), join(STANDALONE, "public"), { recursive: true });

console.log(
  "✓ Copied .next/static and public/ into .next/standalone — run: node .next/standalone/server.js",
);
