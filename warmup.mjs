// Pre-warms all routes after dev server starts so first-visit latency is eliminated
const PORT = process.env.PORT || 5000;
const ROUTES = [
  "/",
  "/docs",
  "/docs/installation",
  "/docs/usage",
  "/docs/latex-support",
  "/docs/markdown-features",
  "/docs/syntax-highlighting",
  "/docs/style-configuration",
  "/docs/themes",
  "/playground",
  "/playground/index.html",
];
const INITIAL_DELAY_MS = 250;
const RETRY_DELAY_MS = 500;
const MAX_STARTUP_ATTEMPTS = 30;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForServer() {
  for (let attempt = 1; attempt <= MAX_STARTUP_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(`http://localhost:${PORT}/`);
      if (response.ok) return true;
    } catch {
      // The dev server is still starting. Retry instead of skipping warmup.
    }
    await sleep(RETRY_DELAY_MS);
  }
  return false;
}

setTimeout(async () => {
  if (!(await waitForServer())) {
    console.log("[warmup] server did not become ready");
    return;
  }

  for (const route of ROUTES) {
    try {
      const response = await fetch(`http://localhost:${PORT}${route}`);
      console.log(`[warmup] ${route} ${response.ok ? "ready" : `returned ${response.status}`}`);
    } catch {
      console.log(`[warmup] ${route} skipped`);
    }
  }
}, INITIAL_DELAY_MS);
