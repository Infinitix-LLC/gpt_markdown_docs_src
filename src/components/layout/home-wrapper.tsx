"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GitFork, Sparkles, Copy, Check, Star, Download, Award, Heart, Cpu, Palette, Radio, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { PACKAGE_VERSION } from "@/lib/package-version";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const cmd = "flutter pub add gpt_markdown";

  const copy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3 font-mono text-sm w-full max-w-md border">
      <span className="text-muted-foreground select-none">$</span>
      <span className="flex-1 text-left">{cmd}</span>
      <button
        onClick={copy}
        className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
        aria-label={copied ? "Install command copied" : "Copy install command"}
        title={copied ? "Copied" : "Copy install command"}>
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Install command copied" : ""}
      </span>
    </div>
  );
}

const stats = [
  { icon: Heart,    label: "pub.dev likes",     value: "310",     href: "https://pub.dev/packages/gpt_markdown" },
  { icon: Download, label: "downloads / 30 days", value: "150K+",  href: "https://pub.dev/packages/gpt_markdown" },
  { icon: Award,    label: "pub points",        value: "160/160", href: "https://pub.dev/packages/gpt_markdown/score" },
  { icon: Star,     label: "GitHub stars",      value: "175",     href: "https://github.com/Infinitix-LLC/gpt_markdown" },
];

const demoScenarios = [
  {
    id: "streaming",
    label: "Streaming",
    input: `## Release brief

A streaming renderer should feel like a considered part of the interface, not text arriving in chunks.

It keeps the readable rhythm intact as the answer becomes useful.`,
  },
  {
    id: "markdown",
    label: "Markdown",
    input: `## Launch checklist

**Ready for review** — the renderer keeps rich AI output readable.

- [x] Headings and emphasis
- [x] Links and inline code
- [ ] Add a custom builder

> Keep the response useful before it is complete.

See https://gptmarkdown.com for the full guide.

\`\`\`dart
GptMarkdown(response);
\`\`\`

| Format | Status |
| --- | --- |
| Tables | Ready |`,
  },
  {
    id: "math",
    label: "Math",
    input: `## Distribution

For independent events:

\\[ P(A \\cap B) = P(A) \\cdot P(B) \\]

So the result is \\( \\frac{3}{7} \\).`,
  },
  {
    id: "code",
    label: "Code + tables",
    input: `## Deployment check

\`\`\`dart
final answer = GptMarkdown(reply);
\`\`\`

| Signal | Status |
| --- | --- |
| Streaming | Ready |
| Selection | Ready |`,
  },
  {
    id: "citations",
    label: "Citations",
    input: `@maya: The model's confidence improved after the evaluation pass. [1]

[1] Evaluation report, §4`,
  },
  {
    id: "rtl",
    label: "RTL",
    input: `## ملخص

تُعرض المعادلة \\( E = mc^2 \\) والنص المضمّن بالترتيب البصري الصحيح.`,
  },
] as const;

type DemoScenario = (typeof demoScenarios)[number]["id"];

const streamingAnswer =
  "A streaming renderer should feel like a considered part of your interface, not text arriving in chunks.";

function DemoOutput({
  scenario,
  streamedText,
  isStreaming,
  extensionsEnabled,
}: {
  scenario: DemoScenario;
  streamedText: string;
  isStreaming: boolean;
  extensionsEnabled: boolean;
}) {
  if (scenario === "markdown") {
    return (
      <div className="space-y-3">
        <h3 className="text-xl font-bold">Launch checklist</h3>
        <p className="text-sm">
          <strong>Ready for review</strong> — the renderer keeps rich AI output readable.
        </p>
        <ul className="list-none space-y-1.5 text-sm">
          <li><span className="mr-2 text-green-600 dark:text-green-400">✓</span>Headings and emphasis</li>
          <li><span className="mr-2 text-green-600 dark:text-green-400">✓</span>Links and inline code</li>
          <li><span className="mr-2 text-muted-foreground">○</span>Add a custom builder</li>
        </ul>
        <blockquote className="border-l-4 pl-3 text-sm italic text-muted-foreground">
          Keep the response useful before it is complete.
        </blockquote>
        <p className="text-sm">
          See{" "}
          <a href="https://gptmarkdown.com" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 underline underline-offset-2 dark:text-blue-400">
            gptmarkdown.com
          </a>{" "}
          for the full guide.
        </p>
        <div className="rounded-lg bg-[#131212] p-3 font-mono text-xs leading-relaxed text-green-400">
          <span className="text-zinc-500">GptMarkdown</span>(response);
        </div>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="py-1.5 font-medium">Format</th>
              <th className="py-1.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-1.5">Tables</td>
              <td className="py-1.5 font-medium text-green-600 dark:text-green-400">Ready</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (scenario === "math") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Distribution</h3>
        <p className="text-sm text-muted-foreground">For independent events:</p>
        <div className="rounded-lg bg-muted p-4 text-center font-mono text-sm">
          P(A ∩ B) = P(A) · P(B)
        </div>
        <p className="text-sm">
          So the result is{" "}
          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-medium">3/7</span>.
        </p>
      </div>
    );
  }

  if (scenario === "code") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Deployment check</h3>
        <div className="rounded-lg bg-[#131212] p-3 font-mono text-xs leading-relaxed text-green-400">
          <div className="text-zinc-500">final answer =</div>
          <div className="pl-4 text-blue-300">GptMarkdown(reply);</div>
        </div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="py-2 font-medium">Signal</th>
              <th className="py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Streaming</td>
              <td className="py-2 font-medium text-green-600 dark:text-green-400">Ready</td>
            </tr>
            <tr>
              <td className="py-2">Selection</td>
              <td className="py-2 font-medium text-green-600 dark:text-green-400">Ready</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (scenario === "citations") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Evaluation update</h3>
        <p className="text-sm leading-7">
          {extensionsEnabled ? (
            <span className="mr-1 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
              Maya
            </span>
          ) : (
            <span className="font-medium">@maya</span>
          )}
          : The model&apos;s confidence improved after the evaluation pass.{" "}
          {extensionsEnabled ? (
            <span className="inline-flex rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">[1] Source</span>
          ) : (
            <span className="font-medium">[1]</span>
          )}
        </p>
        <div className="rounded-lg border bg-muted/50 p-3 text-xs text-muted-foreground">
          Evaluation report, §4
        </div>
      </div>
    );
  }

  if (scenario === "rtl") {
    return (
      <div dir="rtl" className="space-y-4 text-right">
        <h3 className="text-lg font-bold">ملخص</h3>
        <p className="text-sm leading-7">
          تُعرض المعادلة{" "}
          <span dir="ltr" className="inline-block rounded bg-muted px-1.5 py-0.5 font-mono text-xs">E = mc²</span>{" "}
          والنص المضمّن بالترتيب البصري الصحيح.
        </p>
        <p className="border-r-4 pr-3 text-sm italic text-muted-foreground">
          دعم الاتجاه الصحيح جزء من تجربة القراءة، وليس تفصيلاً ثانوياً.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
          AI
        </span>
        Assistant response
      </div>
      <p className="text-base leading-7">
        {streamedText}
        {isStreaming && <span aria-hidden="true" className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-blue-500 align-[-2px]" />}
      </p>
      {!isStreaming && streamedText && (
        <p className="text-sm text-muted-foreground">
          The final answer preserves the readable rhythm your product needs.
        </p>
      )}
    </div>
  );
}

export function HomeWrapper() {
  const [activeScenario, setActiveScenario] = useState<DemoScenario>("streaming");
  const [streamIndex, setStreamIndex] = useState(0);
  const [streamRun, setStreamRun] = useState(0);
  const [extensionsEnabled, setExtensionsEnabled] = useState(true);
  const activeDemo = demoScenarios.find((scenario) => scenario.id === activeScenario) ?? demoScenarios[0];
  const isStreaming = activeScenario === "streaming" && streamIndex < streamingAnswer.length;

  useEffect(() => {
    if (activeScenario !== "streaming") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStreamIndex(streamingAnswer.length);
      return;
    }

    setStreamIndex(0);
    const timer = window.setInterval(() => {
      setStreamIndex((current) => {
        if (current >= streamingAnswer.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 2;
      });
    }, 26);

    return () => window.clearInterval(timer);
  }, [activeScenario, streamRun]);

  return (
    <div className="flex min-h-screen flex-col w-full items-center">
      <SiteHeader />

      {/* Hero */}
      <section className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32 border-b">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-96 opacity-70 dark:opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 10%, rgba(59, 130, 246, 0.13), transparent 34%), radial-gradient(circle at 75% 5%, rgba(139, 92, 246, 0.10), transparent 32%)",
          }}
        />
        <div className="container relative flex max-w-[64rem] flex-col items-center gap-6 text-center mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium mb-4 border">
              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.12)]" />
              New in v{PACKAGE_VERSION} &mdash; streaming, themes, and inline patterns
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mt-4">
              The Flutter renderer
              <br className="hidden sm:block" /> for AI output.
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            <span className="font-medium text-foreground">
              Built for production Flutter AI interfaces.
            </span>{" "}
            Render streaming assistant replies, Markdown, LaTeX, code, tables,
            citations, and custom inline UI with one widget.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-4 w-full">
            <InstallCommand />
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/docs" className="gap-2">
                  Read the docs <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/playground" className="gap-2">
                  Try the playground <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href="https://pub.dev/packages/gpt_markdown" target="_blank" rel="noopener noreferrer" className="gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400">
                  View on pub.dev <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="w-full border-b bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center pt-4">
            <span className="text-xs font-medium text-muted-foreground">
              Open-source rendering for production Flutter AI interfaces.
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
            {stats.map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="flex flex-col items-center gap-1 py-6 px-4 text-center hover:bg-muted/60 transition-colors cursor-pointer">
                <Icon className="h-5 w-5 text-muted-foreground mb-1" />
                <span className="text-3xl font-bold tracking-tight">{value}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive AI output demo */}
      <section className="w-full border-b bg-gradient-to-b from-blue-50/40 via-background to-background py-16 dark:from-blue-950/10 md:py-20">
        <div className="container mx-auto px-4 max-w-[64rem]">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-blue-500 dark:text-blue-400 mb-3">AI output lab</p>
            <h2 className="text-3xl font-bold mb-3">See real AI output render</h2>
            <p className="text-muted-foreground">
              Compare incoming model text with the native Flutter experience your users receive.
            </p>
          </div>
          <div className="flex gap-2 mb-6 justify-center flex-wrap">
            {demoScenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setActiveScenario(scenario.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                  activeScenario === scenario.id
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "border-border bg-background text-muted-foreground hover:border-blue-300 hover:text-foreground dark:hover:border-blue-700"
                }`}
                aria-pressed={activeScenario === scenario.id}>
                {scenario.label}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4 items-start">
            {/* Input pane */}
            <div className="overflow-hidden rounded-xl border bg-muted/40 shadow-sm">
              <div className="px-4 py-2 border-b bg-muted text-xs text-muted-foreground font-mono flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-2">Incoming model output</span>
              </div>
              <pre className="p-4 text-xs font-mono leading-relaxed overflow-auto whitespace-pre-wrap text-muted-foreground min-h-[200px]">
                {activeDemo.input}
              </pre>
            </div>
            {/* Output pane */}
            <div className="overflow-hidden rounded-xl border bg-background shadow-[0_20px_60px_-42px_rgba(59,130,246,0.55)]">
              <div className="px-4 py-2 border-b bg-muted text-xs text-muted-foreground font-mono flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-2">GptMarkdown widget output</span>
                </div>
                {activeScenario === "streaming" && (
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400" role="status" aria-live="polite">
                    {isStreaming ? <Radio className="h-3 w-3 animate-pulse" /> : <Check className="h-3 w-3" />}
                    {isStreaming ? "Streaming" : "Complete"}
                  </span>
                )}
              </div>
              <motion.div
                key={activeScenario}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 text-sm leading-relaxed min-h-[200px]">
                <DemoOutput
                  scenario={activeScenario}
                  streamedText={streamingAnswer.slice(0, streamIndex)}
                  isStreaming={isStreaming}
                  extensionsEnabled={extensionsEnabled}
                />
              </motion.div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30 px-4 py-3">
                {activeScenario === "streaming" ? (
                  <button
                    onClick={() => setStreamRun((run) => run + 1)}
                    className="inline-flex items-center gap-2 rounded text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label="Replay streaming answer">
                    <RotateCcw className="h-3.5 w-3.5" />
                    Replay stream
                  </button>
                ) : (
                  <span className="text-xs text-muted-foreground">Rendered as native Flutter content</span>
                )}
                {activeScenario === "citations" && (
                  <button
                    onClick={() => setExtensionsEnabled((enabled) => !enabled)}
                    role="switch"
                    aria-checked={extensionsEnabled}
                    className="inline-flex items-center gap-2 rounded text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                    <span className={`h-4 w-7 rounded-full p-0.5 transition-colors ${extensionsEnabled ? "bg-blue-500" : "bg-muted-foreground/40"}`}>
                      <span className={`block h-3 w-3 rounded-full bg-white shadow-sm transition-transform ${extensionsEnabled ? "translate-x-3" : "translate-x-0"}`} />
                    </span>
                    App-native inline UI
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/playground" className="gap-2">
                Try it yourself in the live playground <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-16 md:py-20 border-b">
        <div className="container mx-auto px-4 max-w-[64rem]">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Built for production AI output</h2>
            <p className="text-muted-foreground">
              The rendering details that make assistant output feel native to your product.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Sparkles,
                color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
                title: "AI-ready rendering",
                desc: "Markdown, LaTeX, code, tables, citations, RTL, and selectable text render together without preprocessing the model response.",
              },
              {
                icon: Cpu,
                color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
                title: "Streaming that stays fast",
                desc: "Reveal replies with intentional pacing while only the unfinished tail rebuilds, then finish cleanly when generation stops.",
              },
              {
                icon: Palette,
                color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
                title: "Fits your design system",
                desc: "Twelve component style classes, app-wide theme support, builders, and callbacks give appearance and structure separate controls.",
              },
              {
                icon: GitFork,
                color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
                title: "Extensible by default",
                desc: "Autolinks, inline patterns, and scoped custom components add app-specific UI without claiming the wrong text.",
              },
            ].map(({ icon: Icon, color, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 * i }}
                className="group rounded-xl border bg-card p-6 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-default">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="ghost" asChild className="gap-1">
              <Link href="/docs">See all parameters & options <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Release highlights */}
      <section className="w-full py-16 md:py-20 border-b bg-muted/20">
        <div className="container mx-auto px-4 max-w-[56rem]">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-blue-500 dark:text-blue-400 mb-3">
              New in v{PACKAGE_VERSION}
            </p>
            <h2 className="text-3xl font-bold mb-3">A stronger rendering layer</h2>
            <p className="text-muted-foreground">
              v1.2.0 focuses on streaming behavior, design-system control, and safer extension points.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Streaming reveal", "Split-document caching keeps settled content stable while the live tail rebuilds."],
              ["Component style sheet", "Style Markdown parts per widget or app-wide without replacing their structure."],
              ["Inline patterns and scopes", "Add mentions, channels, and custom components with explicit nesting rules."],
              ["Better edge-case handling", "Autolinks, RTL ordering, text scaling, reduced motion, and runtime theme changes."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-xl border bg-background p-5">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button asChild variant="outline">
              <a href="https://github.com/Infinitix-LLC/gpt_markdown/blob/main/MIGRATION.md" target="_blank" rel="noopener noreferrer" className="gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400">
                Read the v1.2.0 migration guide <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-[58rem] flex flex-col items-center text-center gap-6">
          <h2 className="text-3xl md:text-5xl font-bold">Give AI output the same care as the rest of your app.</h2>
          <p className="text-muted-foreground sm:text-lg max-w-[36rem]">
            Add one widget, keep control of the details, and ship a response surface that feels native on every Flutter platform.
          </p>
          <InstallCommand />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/docs" className="gap-2">Read the docs <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://pub.dev/packages/gpt_markdown" target="_blank" rel="noopener noreferrer" className="gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400">
                View on pub.dev <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href="https://github.com/Infinitix-LLC/gpt_markdown" target="_blank" rel="noopener noreferrer" className="gap-2">
                View on GitHub <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
