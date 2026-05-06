"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, FileText, GitFork, Sparkles, Copy, Check } from "lucide-react";
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
    <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3 font-mono text-sm w-full max-w-md">
      <span className="flex-1 text-left">{`$ ${cmd}`}</span>
      <button onClick={copy} className="text-muted-foreground hover:text-foreground transition-colors">
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function HomeWrapper() {
  return (
    <div className="flex min-h-screen flex-col w-full items-center justify-center">
      <SiteHeader />
      <section className="space-y-6 pb-8 pt-10 md:pb-12 md:pt-16 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              GPT Markdown
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Markdown and LaTeX renderer for Flutter — built for AI-generated
              content. Drop in one widget and render ChatGPT, Gemini, or Claude
              responses beautifully.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-4 w-full">
            <InstallCommand />
            <div className="flex flex-wrap items-center justify-center gap-4">
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
                <a
                  href="https://pub.dev/packages/gpt_markdown"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2">
                  View on pub.dev <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="container space-y-6 py-8 md:py-12 lg:py-16">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Features
          </h2>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Everything you need to render rich content in your Flutter app.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-b-4 border-primary">
            <CardHeader>
              <Sparkles className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Rich Markdown</CardTitle>
              <CardDescription>
                Full Markdown spec — tables, task lists, blockquotes, links,
                images, and more.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Including inline HTML like &lt;u&gt;underline&lt;/u&gt; and
              radio/checkbox inputs — features other packages skip.
            </CardContent>
          </Card>
          <Card className="border-b-4 border-primary">
            <CardHeader>
              <FileText className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>LaTeX Math</CardTitle>
              <CardDescription>
                Built-in LaTeX rendering — no extra package needed.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Inline and block math, complex equations, and matrices. Supports
              both \( \) and $ $ syntax.
            </CardContent>
          </Card>
          <Card className="border-b-4 border-primary">
            <CardHeader>
              <Code className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Code Highlighting</CardTitle>
              <CardDescription>
                Syntax highlighted code blocks for multiple languages.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Beautiful code blocks with proper syntax coloring and full support
              for custom renderers.
            </CardContent>
          </Card>
          <Card className="border-b-4 border-primary">
            <CardHeader>
              <GitFork className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>AI-Ready</CardTitle>
              <CardDescription>
                Optimized for ChatGPT, Gemini, and Claude outputs.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Handles mixed Markdown and LaTeX the way LLMs actually output it
              — no preprocessing needed.
            </CardContent>
          </Card>
          <Card className="border-b-4 border-primary sm:col-span-2 lg:col-span-2">
            <CardHeader>
              <Sparkles className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Fully Customizable</CardTitle>
              <CardDescription>
                Builder callbacks for every element — code blocks, LaTeX,
                links, and more.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Override any component with your own widget. RTL support,
              selectable text, and theming all built in.
            </CardContent>
            <CardFooter>
              <Button variant="ghost" asChild className="gap-1">
                <Link href="/docs">
                  See all parameters <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      <section className="container py-8 md:py-12 lg:py-16">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            See it in action
          </h2>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Try the live playground — type any Markdown or LaTeX and see it
            rendered instantly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/examples" className="gap-1">
                Open playground <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs" className="gap-1">
                Read the docs <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
