"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PACKAGE_VERSION } from "@/lib/package-version";

type PlaygroundStatus = "idle" | "loading" | "ready" | "error";

export default function PlaygroundClient() {
  const [launched, setLaunched] = useState(false);
  const [status, setStatus] = useState<PlaygroundStatus>("idle");
  const [frameAttempt, setFrameAttempt] = useState(0);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefetched = useRef(false);

  const clearFallback = useCallback(() => {
    if (fallbackTimer.current) {
      clearTimeout(fallbackTimer.current);
      fallbackTimer.current = null;
    }
  }, []);

  const prefetchRuntime = useCallback(() => {
    if (prefetched.current) return;
    prefetched.current = true;

    [
      "/playground/flutter_bootstrap.js",
      "/playground/main.dart.js",
    ].forEach((href) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "script";
      link.href = href;
      link.dataset.playgroundPrefetch = "true";
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === "gpt-markdown-playground-ready") {
        clearFallback();
        setStatus("ready");
      }

      if (event.data?.type === "gpt-markdown-playground-error") {
        clearFallback();
        setStatus("error");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      clearFallback();
    };
  }, [clearFallback]);

  const launchPlayground = () => {
    prefetchRuntime();
    clearFallback();
    setStatus("loading");
    setLaunched(true);
  };

  const retryPlayground = () => {
    clearFallback();
    setStatus("loading");
    setFrameAttempt((attempt) => attempt + 1);
  };

  const handleFrameLoad = () => {
    clearFallback();
    // The iframe document loads before Flutter paints its first frame. The
    // embedded page posts a ready message. If that never arrives, fail
    // explicitly instead of exposing a blank iframe as though it were ready.
    fallbackTimer.current = setTimeout(() => setStatus("error"), 15000);
  };

  return (
    <>
      <section className="container max-w-5xl px-4 py-10 md:py-14">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold tracking-wide text-primary">
            REAL FLUTTER WIDGET · v{PACKAGE_VERSION}
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            See AI output come to life.
          </h1>
          <p className="text-base leading-7 text-muted-foreground sm:text-lg">
            Choose a scenario, edit the response, and watch the same
            <strong className="text-foreground"> gpt_markdown </strong>
            widget your app uses render it live.
          </p>
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Features in the playground">
            {["Streaming", "Markdown", "LaTeX", "Code", "Inline UI", "RTL"].map((feature) => (
              <span
                key={feature}
                className="rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {feature}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/docs" className="font-medium text-primary hover:underline">
              Read the docs →
            </Link>
            <Link href="/docs/streaming" className="text-muted-foreground hover:text-foreground hover:underline">
              Learn about streaming
            </Link>
          </div>
        </div>
      </section>

      <section className="flex-1 px-4 pb-6" aria-label="Live demo">
        <div className="container mb-3 flex max-w-5xl items-end justify-between gap-4 px-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Interactive demo
            </p>
            <h2 className="mt-1 text-lg font-semibold">Run it yourself</h2>
          </div>
          <span className="hidden rounded-full border bg-muted/40 px-3 py-1 text-xs text-muted-foreground sm:inline-flex">
            Flutter · live
          </span>
        </div>

        <div
          className="relative w-full overflow-hidden rounded-xl border bg-muted/30 shadow-[0_24px_70px_-48px_rgba(79,70,229,0.55)]"
          style={{ height: "calc(100vh - 160px)", minHeight: 520 }}
        >
          {!launched ? (
          <button
            type="button"
            className="group flex h-full w-full flex-col items-center justify-center gap-4 bg-muted/30 px-6 transition-all hover:bg-muted/50 active:scale-[0.998] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
            onClick={launchPlayground}
            onPointerEnter={prefetchRuntime}
            onFocus={prefetchRuntime}
            aria-label="Launch interactive playground"
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-3xl text-primary shadow-sm transition-transform group-hover:scale-105 group-active:scale-95">
              ▶
            </div>
            <p className="text-lg font-medium">Launch the Flutter playground</p>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Try the curated scenarios or write your own response. The full
              Flutter runtime loads in this page (~3 MB).
            </p>
          </button>
        ) : (
          <>
            <iframe
              key={frameAttempt}
              src="/playground/index.html"
              className={`h-full w-full transition-opacity duration-300 ${
                status === "ready" ? "opacity-100" : "opacity-0"
              }`}
              title="GPT Markdown Playground — Interactive Flutter Markdown and LaTeX Demo"
              onLoad={handleFrameLoad}
              onError={() => {
                clearFallback();
                setStatus("error");
              }}
            />

            {status !== "ready" && (
              <div
                className="absolute inset-0 grid place-items-center bg-background/96 px-6 backdrop-blur-sm"
                role="status"
                aria-live="polite"
                aria-busy={status === "loading"}
              >
                {status === "error" ? (
                  <div className="flex max-w-sm flex-col items-center gap-4 text-center">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl border bg-muted text-xl">
                      !
                    </div>
                    <div>
                      <p className="font-semibold">The playground could not start</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        The Flutter runtime did not finish loading. Try again.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={retryPlayground}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      Retry playground
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-5 text-center">
                    <div className="relative grid h-20 w-20 place-items-center">
                      <div className="absolute inset-0 animate-spin rounded-full border border-primary/15 border-t-primary motion-reduce:animate-none" />
                      <div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-lg font-bold text-primary shadow-sm">
                        M
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">Starting the Flutter playground</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Preparing the real gpt_markdown widget…
                      </p>
                    </div>
                    <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
        </div>
      </section>
    </>
  );
}
