import type { Metadata } from "next";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation — The Flutter Renderer for AI Output",
  description:
    "Build production Flutter AI interfaces with gpt_markdown. Learn rendering, streaming, Markdown, LaTeX, styles, builders, inline patterns, and custom components.",
  alternates: { canonical: "https://gptmarkdown.com/docs" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Documentation — The Flutter Renderer for AI Output",
    description:
      "Learn rendering, streaming, Markdown, LaTeX, styles, builders, inline patterns, and custom components.",
    url: "https://gptmarkdown.com/docs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation — The Flutter Renderer for AI Output",
    description:
      "Learn rendering, streaming, Markdown, LaTeX, styles, builders, inline patterns, and custom components.",
    images: ["/twitter-image"],
  },
};

const quickStart = `import 'package:gpt_markdown/gpt_markdown.dart';

GptMarkdown(
  r'**Hello!** Inline math: \\( E = mc^2 \\)',
)`;

const guideGroups = [
  {
    title: "Get started",
    guides: [
      { href: "/docs/installation", title: "Install", desc: "Add the v1.2.1 package and verify your first render." },
      { href: "/docs/usage", title: "Render a response", desc: "Put a real AI response in a scrollable Flutter screen." },
    ],
  },
  {
    title: "Core guides",
    guides: [
      { href: "/docs/markdown-features", title: "Markdown & AI output", desc: "See the supported Markdown, citations, links, lists, tables, and more." },
      { href: "/docs/inline-syntax", title: "Inline syntax", desc: "Use autolinks, app URL schemes, mentions, channels, emoji, and safe text spans." },
      { href: "/docs/streaming", title: "Streaming", desc: "Reveal a reply as it arrives, then finish cleanly." },
      { href: "/docs/latex-support", title: "LaTeX", desc: "Render equations, choose delimiters, and handle wide formulas." },
      { href: "/docs/syntax-highlighting", title: "Code blocks", desc: "Control fenced code, copy actions, and incomplete streamed fences." },
    ],
  },
  {
    title: "Customize",
    guides: [
      { href: "/docs/themes", title: "Themes & styles", desc: "Change appearance locally or across your entire app." },
      { href: "/docs/custom-components", title: "Custom inline UI", desc: "Turn mentions, citations, and custom syntax into native app UI." },
    ],
  },
  {
    title: "Reference",
    guides: [
      { href: "/docs/style-configuration", title: "Widget API & builders", desc: "Look up every parameter, callback, and supported replacement hook." },
      { href: "/docs/testing", title: "Testing", desc: "Test rendered spans, streaming, text scale, style merges, goldens, and documentation snippets." },
      { href: "/docs/migration", title: "Migration to 1.2", desc: "Upgrade from 1.1.x without missing the behavioral changes a compiler cannot catch." },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">
          gpt_markdown documentation
        </h1>
        <p className="text-lg text-muted-foreground leading-7">
          The complete guide to gpt_markdown. Start with one widget, then learn every supported rendering behavior,
          customization layer, inline extension point, test strategy, and migration consideration.
        </p>
      </div>

      <div>
        <h2 className="scroll-m-20 text-2xl font-semibold mb-4">Quick start</h2>
        <CodeBlock language="bash" code="flutter pub add gpt_markdown" filename="terminal" />
        <div className="mt-4">
          <CodeBlock language="dart" code={quickStart} filename="main.dart" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          This renders common Markdown and LaTeX immediately. Use a <code>latexBuilder</code> only when your app needs to replace the default math widget.
        </p>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-5 dark:border-blue-900 dark:bg-blue-950/20">
        <h2 className="mt-0 text-xl font-semibold">Three ways to customize</h2>
        <ol className="mb-0 mt-3 space-y-2 text-sm text-muted-foreground">
          <li><strong className="text-foreground">Style sheets and themes</strong> change appearance without replacing the renderer.</li>
          <li><strong className="text-foreground">Builders and callbacks</strong> replace supported structures or connect interactions to your app.</li>
          <li><strong className="text-foreground">Patterns and components</strong> turn app-specific tokens such as <code>@mentions</code> into native inline UI.</li>
        </ol>
      </div>

      <div className="rounded-xl border bg-muted/20 p-5">
        <h2 className="mt-0 text-xl font-semibold">Complete package coverage</h2>
        <p className="mb-0 mt-2 text-sm leading-6 text-muted-foreground">
          These pages cover the package&apos;s full documentation set in the website itself: getting started,
          customization, streaming, inline syntax, custom components, testing, and migration—alongside focused
          rendering and API references.
        </p>
      </div>

      {guideGroups.map(({ title, guides }) => (
        <section key={title}>
          <h2 className="scroll-m-20 text-2xl font-semibold mb-4">{title}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {guides.map(({ href, title: guideTitle, desc }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-lg border p-4 hover:border-blue-400 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{guideTitle}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
