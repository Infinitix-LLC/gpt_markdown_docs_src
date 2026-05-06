// Pre-warms all routes after dev server starts so first-visit latency is eliminated
const PORT = process.env.PORT || 5000;
const ROUTES = ["/", "/docs", "/examples"];
const DELAY_MS = 3000;

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
