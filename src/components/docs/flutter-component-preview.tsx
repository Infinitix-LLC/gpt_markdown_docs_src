"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type PreviewStatus = "loading" | "ready" | "error";

type FlutterComponentPreviewProps = {
  componentName: string;
  markdown: string;
  className?: string;
};

function currentTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function FlutterComponentPreview({
  componentName,
  markdown,
  className,
}: FlutterComponentPreviewProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [status, setStatus] = useState<PreviewStatus>("loading");
  const [attempt, setAttempt] = useState(0);

  const clearTimeoutFallback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    const updateTheme = () => setTheme(currentTheme());
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== frameRef.current?.contentWindow
      ) {
        return;
      }

      if (event.data?.type === "gpt-markdown-component-preview-ready") {
        clearTimeoutFallback();
        setStatus("ready");
      }

      if (event.data?.type === "gpt-markdown-component-preview-error") {
        clearTimeoutFallback();
        setStatus("error");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeoutFallback();
    };
  }, [clearTimeoutFallback]);

  useEffect(() => {
    clearTimeoutFallback();
    setStatus("loading");
  }, [attempt, clearTimeoutFallback, theme]);

  const source = useMemo(() => {
    const query = new URLSearchParams({
      embed: "component",
      theme,
      markdown,
    });
    return `/component-preview/index.html?${query.toString()}`;
  }, [markdown, theme]);

  const retry = () => {
    clearTimeoutFallback();
    setAttempt((value) => value + 1);
  };

  const onFrameLoad = () => {
    clearTimeoutFallback();
    timeoutRef.current = setTimeout(() => setStatus("error"), 15000);
  };

  return (
    <div
      className={cn(
        "relative h-[320px] overflow-hidden rounded-lg border border-border/70 bg-muted/45 shadow-inner sm:h-[360px]",
        className,
      )}
    >
      <iframe
        ref={frameRef}
        key={`${theme}-${attempt}`}
        src={source}
        title={`${componentName} — live Flutter GptMarkdown preview`}
        className={cn(
          "h-full w-full border-0 transition-opacity duration-200",
          status === "ready" ? "opacity-100" : "opacity-0",
        )}
        onLoad={onFrameLoad}
        onError={() => {
          clearTimeoutFallback();
          setStatus("error");
        }}
      />

      {status !== "ready" && (
        <div
          className="absolute inset-0 grid place-items-center bg-background/95 px-6 text-center backdrop-blur-sm"
          role="status"
          aria-live="polite"
          aria-busy={status === "loading"}
        >
          {status === "error" ? (
            <div className="max-w-xs">
              <p className="font-medium">The Flutter preview could not start</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                The real widget did not finish loading. Try it again.
              </p>
              <button
                type="button"
                onClick={retry}
                className="mt-4 inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Retry preview
              </button>
            </div>
          ) : (
            <div className="flex max-w-xs flex-col items-center gap-3">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary/20 border-t-primary motion-reduce:animate-none" />
              <div>
                <p className="font-medium">Starting the Flutter widget</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Rendering this component with gpt_markdown…
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}