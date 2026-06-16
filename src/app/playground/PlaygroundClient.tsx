"use client";

import { useState } from "react";
import Link from "next/link";
import { PACKAGE_VERSION } from "@/lib/package-version";

export default function PlaygroundClient() {
  const [launched, setLaunched] = useState(false);

  return (
    <>
      {/* ── Crawlable header & intro ── */}
      <section className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-3">
          Interactive Flutter Markdown &amp; LaTeX Playground
        </h1>
        <p className="text-muted-foreground text-lg mb-6">
          Experiment with <strong>gpt_markdown</strong> live in the browser.
          Type any Markdown or LaTeX expression and watch it render instantly —
          no install needed. The playground runs the real Flutter widget so
          every result matches exactly what you ship in your app.
        </p>

        {/* ── Feature bullets ── */}
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm mb-8 list-none">
          {[
            "Headings, bold, italic, strikethrough",
            "Ordered and unordered lists",
            "Fenced code blocks with syntax highlighting",
            "Inline code and blockquotes",
            "Tables with alignment",
            "Inline LaTeX — e.g. \\(E = mc^2\\)",
            "Block LaTeX — e.g. \\[\\int_0^\\infty e^{-x}\\,dx = 1\\]",
            "Clickable links and images",
            "Horizontal rules and line breaks",
            "AI-streamed text rendered token by token",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary mt-0.5">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* ── Static example snippets ── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Markdown example
            </h2>
            <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto whitespace-pre-wrap">
{`## Getting started

Install the package:

\`\`\`yaml
dependencies:
  gpt_markdown: ^${PACKAGE_VERSION}
\`\`\`

Then render any string:

\`\`\`dart
GptMarkdown(text: markdownString)
\`\`\``}
            </pre>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              LaTeX example
            </h2>
            <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto whitespace-pre-wrap">
{`Inline math renders inside prose:
The area of a circle is \\(A = \\pi r^2\\).

Display math renders on its own line:

\\[
  \\sum_{n=1}^{\\infty} \\frac{1}{n^2}
    = \\frac{\\pi^2}{6}
\\]

Works with AI-streamed partial tokens too.`}
            </pre>
          </div>
        </div>

        {/* ── Contextual links ── */}
        <nav aria-label="Related documentation" className="flex flex-wrap gap-x-6 gap-y-1 text-sm mb-8">
          <Link href="/docs/installation" className="text-primary hover:underline">
            Installation guide →
          </Link>
          <Link href="/docs/usage" className="text-primary hover:underline">
            Basic usage →
          </Link>
          <Link href="/docs/markdown-features" className="text-primary hover:underline">
            Supported Markdown features →
          </Link>
          <Link href="/docs/latex-support" className="text-primary hover:underline">
            LaTeX / math rendering →
          </Link>
          <Link href="/docs/style-configuration" className="text-primary hover:underline">
            Widget parameters →
          </Link>
        </nav>
      </section>

      {/* ── Live demo ── */}
      <section className="flex-1 px-4 pb-6" aria-label="Live demo">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3 container max-w-4xl">
          Live demo
        </h2>

        {!launched ? (
          <div
            className="w-full rounded-lg border bg-muted/40 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-muted/60 transition-colors"
            style={{ height: "calc(100vh - 160px)" }}
            onClick={() => setLaunched(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setLaunched(true)}
            aria-label="Launch interactive playground"
          >
            <div className="text-5xl select-none">▶</div>
            <p className="text-lg font-medium">Launch Interactive Playground</p>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Loads the full Flutter demo in this browser tab — requires a
              moment to download the runtime (~3 MB).
            </p>
          </div>
        ) : (
          <iframe
            src="/playground/index.html"
            className="w-full rounded-lg border"
            style={{ height: "calc(100vh - 160px)" }}
            title="GPT Markdown Playground — Interactive Flutter Markdown and LaTeX Demo"
          />
        )}
      </section>
    </>
  );
}
