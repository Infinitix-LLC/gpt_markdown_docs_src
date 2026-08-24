import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const NavCard = ({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) => (
  <Link
    href={href}
    className="rounded-lg border p-4 block hover:border-primary/60 transition-colors group"
  >
    <h3 className="text-base font-semibold group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-muted-foreground text-sm mt-1">{description}</p>
    <span className="inline-flex items-center gap-1 text-primary text-sm mt-2">
      Read more <ArrowRight className="h-3 w-3" />
    </span>
  </Link>
);

export function BestPractices() {
  return (
    <div className="space-y-10">
      {/* Common mistakes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Common mistakes</h2>

        <div className="space-y-3">
          <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30 p-3 text-sm text-red-900 dark:text-red-200">
            <strong>Wrapping in <code className="bg-red-100 dark:bg-red-900/50 rounded px-1 text-xs">Expanded</code> without a scroll view.</strong>{" "}
            The widget reports its content height; constraining it with{" "}
            <code className="bg-red-100 dark:bg-red-900/50 rounded px-1 text-xs">Expanded</code> without a scroll view clips the reply.
            Always put a <code className="bg-red-100 dark:bg-red-900/50 rounded px-1 text-xs">SingleChildScrollView</code> between them.
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 p-3 text-sm text-blue-900 dark:text-blue-200">
            <strong>Streaming a long response without the streaming path.</strong>{" "}
            The package&apos;s measured 7.7 kB / 120-append case is 14.6 ms per token with{" "}
            <code className="bg-blue-100 dark:bg-blue-900/50 rounded px-1 text-xs">animation: none</code> versus 11.0 ms
            with the split/cached fade path, which stays flat as the reply grows. Use the{" "}
            <Link href="/docs/streaming" className="underline">streaming guide</Link> for generated replies.
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30 p-3 text-sm text-red-900 dark:text-red-200">
            <strong>Rebuilding builder closures on every frame.</strong>{" "}
            Builders (<code className="bg-red-100 dark:bg-red-900/50 rounded px-1 text-xs">latexBuilder</code>,{" "}
            <code className="bg-red-100 dark:bg-red-900/50 rounded px-1 text-xs">codeBuilder</code>, etc.) are not compared when deciding
            whether to re-render, so a changed closure is silently ignored until the widget remounts.
            Define them once, outside <code className="bg-red-100 dark:bg-red-900/50 rounded px-1 text-xs">build</code>, or key the widget
            if you genuinely need to swap them.
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30 p-3 text-sm text-red-900 dark:text-red-200">
            <strong>Leaving <code className="bg-red-100 dark:bg-red-900/50 rounded px-1 text-xs">isStreaming: true</code> after the reply finishes.</strong>{" "}
            The ticker keeps running and the tail keeps rebuilding for nothing. Always flip it on{" "}
            <code className="bg-red-100 dark:bg-red-900/50 rounded px-1 text-xs">onDone</code> — including error paths.
          </div>
        </div>
      </div>

      {/* Where next */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Where next</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NavCard
            href="/docs/streaming"
            title="Streaming"
            description="Accumulating text, animation modes, isStreaming lifecycle, pacing, reduced motion, and chat-list pitfalls."
          />
          <NavCard
            href="/docs/markdown-features"
            title="Markdown Features"
            description="Every supported construct — tables, task lists, citations, autolinks, scope and limitations."
          />
          <NavCard
            href="/docs/latex-support"
            title="LaTeX Support"
            description="Delimiters, dollar-sign opt-in, caller-provided renderer, horizontal scroll for wide equations."
          />
          <NavCard
            href="/docs/syntax-highlighting"
            title="Syntax Highlighting"
            description="Code block behaviour, custom codeBuilder, the closed flag, and selection caveats."
          />
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex justify-between items-center pt-2">
        <Link
          href="/docs/installation"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Installation
        </Link>
        <Link
          href="/docs/streaming"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
        >
          Streaming <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
