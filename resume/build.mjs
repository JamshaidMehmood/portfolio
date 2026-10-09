#!/usr/bin/env node
/**
 * Renders resume/resume.html to the PDF the site serves.
 *
 * The previous source for this PDF was a LibreOffice .docx that lived
 * outside the repo and was lost; keeping the source here means the file
 * the site links to can always be rebuilt from a commit.
 *
 *   node resume/build.mjs
 */
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, copyFileSync, rmSync, statSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "resume.html");
const out = resolve(
  here,
  "../public/Jamshaid_Mehmood_Frontend_Engineer_Resume.pdf",
);

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
];

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error(
    "No Chrome/Chromium found. Install one, or add its path to CHROME_CANDIDATES.",
  );
  process.exit(1);
}

// Chrome refuses --print-to-pdf into some locations and needs a writable
// profile dir, so render to a temp dir and copy the result into place.
const tmp = mkdtempSync(join(tmpdir(), "resume-"));
const staged = join(tmp, "resume.pdf");

/** Chrome writes the PDF and then sometimes fails to exit, so poll for a
 *  file that has stopped growing and kill the process ourselves. */
async function waitForPdf(proc, path, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  let lastSize = -1;
  while (Date.now() < deadline) {
    if (existsSync(path)) {
      const size = statSync(path).size;
      if (size > 0 && size === lastSize) return true;
      lastSize = size;
    }
    if (proc.exitCode !== null && existsSync(path)) return true;
    await sleep(500);
  }
  return false;
}

try {
  const proc = spawn(
    chrome,
    [
      "--headless=old",
      "--disable-gpu",
      "--no-sandbox",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--disable-background-networking",
      "--disable-sync",
      // Without a virtual-time budget the headless renderer can sit
      // waiting on the page forever instead of printing and exiting.
      "--virtual-time-budget=8000",
      "--run-all-compositor-stages-before-draw",
      "--no-pdf-header-footer",
      `--user-data-dir=${join(tmp, "profile")}`,
      `--print-to-pdf=${staged}`,
      `file://${src}`,
    ],
    { stdio: "inherit" },
  );

  const ok = await waitForPdf(proc, staged);
  proc.kill("SIGKILL");

  if (!ok || !existsSync(staged)) throw new Error("Chrome produced no PDF");
  copyFileSync(staged, out);
  console.log(`Wrote ${out}`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
