import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Live Playground — Interactive Flutter Markdown Demo",
  description:
    "Try gpt_markdown live in the browser. Type any Markdown or LaTeX and see it rendered instantly — headings, bold, tables, code blocks, inline and block LaTeX math, and more.",
  alternates: { canonical: "https://gptmarkdown.com/playground" },
};

export default function ExamplesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd />
      <SiteHeader />
      <main className="flex-1 flex flex-col">
        <div className="container py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Playground</h1>
            <p className="text-muted-foreground">
              Type any Markdown or LaTeX and see it rendered live.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <a
              href="/playground/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2">
              Open full screen <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <div className="flex-1 px-4 pb-4">
          <iframe
            src="/playground/index.html"
            className="w-full rounded-lg border"
            style={{ height: "calc(100vh - 160px)" }}
            title="GPT Markdown Playground — Interactive Flutter Markdown and LaTeX Demo"
          />
        </div>
      </main>
    </div>
  );
}
