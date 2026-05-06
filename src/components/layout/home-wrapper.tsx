"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, FileText, GitFork, Sparkles, Copy, Check, Star, Download, Award, Heart } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/site-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <button onClick={copy} className="text-muted-foreground hover:text-foreground transition-colors shrink-0" title="Copy">
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

const stats = [
  { icon: Heart,    label: "pub.dev likes",      value: "289"     },
  { icon: Download, label: "downloads / month",  value: "75K+"    },
  { icon: Award,    label: "pub points",          value: "160/160" },
  { icon: Star,     label: "GitHub stars",        value: "171"     },
];

const demoSnippets = [
  {
    label: "Markdown",
    input: `# Hello World

**Bold**, _italic_, and ~~strikethrough~~.

- Item one
- Item two
- Item three

> A blockquote with \`inline code\`

| Feature | Supported |
|---------|-----------|
| Tables  | ✅        |
| LaTeX   | ✅        |`,
  },
  {
    label: "LaTeX",
    input: `Inline math: \\( E = mc^2 \\)

Block equation:
\\[ \\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2} \\]

Matrix:
\\[ A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\]`,
  },
  {
    label: "Mixed (AI output)",
    input: `## Summary

The **gradient descent** update rule is:

\\[ \\theta := \\theta - \\alpha \\nabla J(\\theta) \\]

where \\( \\alpha \\) is the learning rate.

\`\`\`python
for epoch in range(100):
    grad = compute_gradient(X, y, theta)
    theta -= alpha * grad
\`\`\``,
  },
];

export function HomeWrapper() {
  const [activeSnippet, setActiveSnippet] = useState(0);

  return (
    <div className="flex min-h-screen flex-col w-full items-center">
      <SiteHeader />

      {/* Hero */}
      <section className="w-full py-16 md:py-24 lg:py-32 border-b">
        <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium mb-4 border">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              v1.1.6 &mdash; 160/160 pub points &middot; WASM ready
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mt-4">
              GPT Markdown
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Markdown and LaTeX renderer for Flutter &mdash; built for AI-generated
            content. Drop in one widget and render ChatGPT, Gemini, or Claude
            responses beautifully.
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
                <Link href="/examples" className="gap-2">
                  Try the playground <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href="https://pub.dev/packages/gpt_markdown" target="_blank" rel="noopener noreferrer" className="gap-2">
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
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
            {stats.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="flex flex-col items-center gap-1 py-6 px-4 text-center">
                <Icon className="h-5 w-5 text-muted-foreground mb-1" />
                <span className="text-3xl font-bold tracking-tight">{value}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <section className="w-full py-16 md:py-20 border-b">
        <div className="container mx-auto px-4 max-w-[64rem]">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">See what it renders</h2>
            <p className="text-muted-foreground">
              Select a sample — this is exactly what your users will see.
            </p>
          </div>
          <div className="flex gap-2 mb-6 justify-center flex-wrap">
            {demoSnippets.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActiveSnippet(i)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeSnippet === i
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground border-border hover:border-foreground"
                }`}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4 items-start">
            {/* Input pane */}
            <div className="rounded-lg border bg-muted/50 overflow-hidden">
              <div className="px-4 py-2 border-b bg-muted text-xs text-muted-foreground font-mono flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-2">Raw text from LLM</span>
              </div>
              <pre className="p-4 text-xs font-mono leading-relaxed overflow-auto whitespace-pre-wrap text-muted-foreground min-h-[200px]">
                {demoSnippets[activeSnippet].input}
              </pre>
            </div>
            {/* Output pane */}
            <div className="rounded-lg border overflow-hidden">
              <div className="px-4 py-2 border-b bg-muted text-xs text-muted-foreground font-mono flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-2">GptMarkdown widget output</span>
              </div>
              <div className="p-4 text-sm leading-relaxed min-h-[200px]">
                {activeSnippet === 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold">Hello World</h3>
                    <p><strong>Bold</strong>, <em>italic</em>, and <span className="line-through">strikethrough</span>.</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Item one</li><li>Item two</li><li>Item three</li>
                    </ul>
                    <blockquote className="border-l-4 pl-3 text-muted-foreground italic text-sm">
                      A blockquote with <code className="bg-muted px-1 rounded text-xs">inline code</code>
                    </blockquote>
                    <table className="text-xs w-full border-collapse">
                      <thead><tr className="border-b"><th className="text-left py-1 pr-4 font-semibold">Feature</th><th className="text-left py-1 font-semibold">Supported</th></tr></thead>
                      <tbody>
                        <tr className="border-b"><td className="py-1 pr-4">Tables</td><td>✅</td></tr>
                        <tr><td className="py-1 pr-4">LaTeX</td><td>✅</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {activeSnippet === 1 && (
                  <div className="space-y-4">
                    <p className="text-sm">Inline math: <span className="font-mono bg-muted px-2 py-0.5 rounded text-xs font-medium">E = mc²</span></p>
                    <div className="bg-muted rounded-lg p-4 text-center font-mono text-sm">
                      ∫₀<sup>∞</sup> e<sup>-x²</sup> dx = √π / 2
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center font-mono text-sm">
                      A = <span className="inline-flex items-center gap-1">
                        <span className="border-t border-b border-l px-1 py-2 text-xs leading-none">a b<br/>c d</span>
                        <span className="border-t border-b border-r px-0.5 py-2 text-xs"> </span>
                      </span>
                    </div>
                  </div>
                )}
                {activeSnippet === 2 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold">Summary</h3>
                    <p className="text-sm">The <strong>gradient descent</strong> update rule is:</p>
                    <div className="bg-muted rounded-lg p-3 text-center font-mono text-xs">
                      θ := θ &minus; α ∇J(θ)
                    </div>
                    <p className="text-sm">where <code className="bg-muted px-1 rounded text-xs">α</code> is the learning rate.</p>
                    <div className="bg-[#131212] text-green-400 rounded-lg p-3 font-mono text-xs leading-relaxed">
                      <div className="text-zinc-500">for epoch in range(100):</div>
                      <div className="pl-4 text-blue-400">    grad = compute_gradient(X, y, theta)</div>
                      <div className="pl-4 text-blue-400">    theta -= alpha * grad</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/examples" className="gap-2">
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
            <h2 className="text-3xl font-bold mb-3">Everything you need</h2>
            <p className="text-muted-foreground">
              One widget. Full support for the content AI actually outputs.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-b-4 border-primary">
              <CardHeader>
                <Sparkles className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Rich Markdown</CardTitle>
                <CardDescription>Full Markdown spec — tables, task lists, blockquotes, links, images, and more.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Including inline HTML like &lt;u&gt;underline&lt;/u&gt; and radio/checkbox inputs — features other packages skip.
              </CardContent>
            </Card>
            <Card className="border-b-4 border-primary">
              <CardHeader>
                <FileText className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>LaTeX Math</CardTitle>
                <CardDescription>Built-in LaTeX rendering via flutter_math_fork — no extra setup needed.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Inline and block math, complex equations, and matrices. Supports both \( \) and $ $ syntax.
              </CardContent>
            </Card>
            <Card className="border-b-4 border-primary">
              <CardHeader>
                <Code className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Code Highlighting</CardTitle>
                <CardDescription>Syntax highlighted code blocks for multiple languages.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Beautiful code blocks with proper syntax coloring and full support for custom renderers.
              </CardContent>
            </Card>
            <Card className="border-b-4 border-primary">
              <CardHeader>
                <GitFork className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>AI-Ready</CardTitle>
                <CardDescription>Optimized for ChatGPT, Gemini, and Claude outputs.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Handles mixed Markdown and LaTeX the way LLMs actually output it — no preprocessing needed.
              </CardContent>
            </Card>
            <Card className="border-b-4 border-primary sm:col-span-2">
              <CardHeader>
                <Sparkles className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Fully Customizable</CardTitle>
                <CardDescription>Builder callbacks for every element — code blocks, LaTeX, links, and more.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Override any component with your own widget. RTL support, selectable text, and theming all built in.
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild className="gap-1 -ml-3">
                  <Link href="/docs">See all parameters <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-[58rem] flex flex-col items-center text-center gap-6">
          <h2 className="text-3xl md:text-5xl font-bold">Start in 30 seconds</h2>
          <p className="text-muted-foreground sm:text-lg max-w-[36rem]">
            Add the package, drop in the widget, done. Your AI responses render beautifully on every platform.
          </p>
          <InstallCommand />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/docs" className="gap-2">Read the docs <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://github.com/Infinitix-LLC/gpt_markdown" target="_blank" rel="noopener noreferrer" className="gap-2">
                View on GitHub <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
