"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, FileText, GitFork, Sparkles } from "lucide-react";

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

export function HomeWrapper() {
  return (
    <div className="flex min-h-screen flex-col w-full items-center justify-center">
      <SiteHeader />
      <section className="space-y-6 pb-8 pt-10 md:pb-12 md:pt-16 lg:py-32 ">
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
              A comprehensive Flutter package for rendering rich Markdown and
              LaTeX content in your apps, designed for seamless integration with
              AI outputs like ChatGPT and Gemini.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/docs" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="https://pub.dev/packages/gpt_markdown"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2">
                View on pub.dev <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
      <section className="container space-y-6 py-8 md:py-12 lg:py-16">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Features
          </h2>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            GPT Markdown offers a comprehensive set of features for rendering
            rich content in your Flutter apps.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-b-4 border-primary">
            <CardHeader>
              <Sparkles className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Rich Markdown Support</CardTitle>
              <CardDescription>
                Comprehensive support for standard Markdown syntax with extended
                features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Complete support for tables, task lists, blockquotes, and more to
              render complex content.
            </CardContent>
          </Card>
          <Card className="border-b-4 border-primary">
            <CardHeader>
              <FileText className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>LaTeX Math Rendering</CardTitle>
              <CardDescription>
                Built-in support for LaTeX mathematical expressions and
                equations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Render complex mathematical expressions, equations, and formulas
              with ease directly in your Flutter apps.
            </CardContent>
          </Card>
          <Card className="border-b-4 border-primary">
            <CardHeader>
              <Code className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Code Syntax Highlighting</CardTitle>
              <CardDescription>
                Beautiful code blocks with syntax highlighting for multiple
                languages.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Display code snippets with proper syntax coloring and formatting
              for a better reading experience.
            </CardContent>
          </Card>
          <Card className="border-b-4 border-primary">
            <CardHeader>
              <GitFork className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>AI Integration</CardTitle>
              <CardDescription>
                Optimized for AI outputs from ChatGPT, Gemini, and other LLMs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Specially designed to handle the output format of large language
              models for seamless integration in AI applications.
            </CardContent>
          </Card>
          <Card className="border-b-4 border-primary sm:col-span-2 lg:col-span-2">
            <CardHeader>
              <Sparkles className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Highly Customizable</CardTitle>
              <CardDescription>
                Extensive theme and styling options to match your app&apos;s design.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Customize every aspect of the rendering from colors and typography
              to spacing and layout to perfectly match your app&apos;s design system.
            </CardContent>
            <CardFooter>
              <Button variant="ghost" asChild className="gap-1">
                <Link href="/docs/themes">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      <section className="container py-8 md:py-12 lg:py-16">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Ready to get started?
          </h2>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Enhance your Flutter app with powerful Markdown and LaTeX rendering
            capabilities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
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
