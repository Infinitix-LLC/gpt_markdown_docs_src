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
  "/examples",
];
const DELAY_MS = 1500;

setTimeout(async () => {
  for (const route of ROUTES) {
    try {
      await fetch(`http://localhost:${PORT}${route}`);
      console.log(`[warmup] ${route} ready`);
    } catch {
      console.log(`[warmup] ${route} skipped`);
    }
  }
}, DELAY_MS);
