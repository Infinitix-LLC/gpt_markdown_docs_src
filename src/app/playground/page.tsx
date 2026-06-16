import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import PlaygroundClient from "./PlaygroundClient";

export const metadata: Metadata = {
  title: "Live Playground — Interactive Flutter Markdown & LaTeX Demo",
  description:
    "Try gpt_markdown live in the browser. Type any Markdown or LaTeX and see it rendered instantly — headings, bold, tables, code blocks, inline and block LaTeX math, and more.",
  alternates: { canonical: "https://gptmarkdown.com/playground" },
  openGraph: {
    title: "Live Playground — Interactive Flutter Markdown & LaTeX Demo",
    description:
      "Try gpt_markdown live in the browser. Type any Markdown or LaTeX and see it rendered instantly — headings, bold, tables, code blocks, inline and block LaTeX math, and more.",
    url: "https://gptmarkdown.com/playground",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Playground — Interactive Flutter Markdown & LaTeX Demo",
    description:
      "Try gpt_markdown live in the browser. Type any Markdown or LaTeX and see it rendered instantly — headings, bold, tables, code blocks, inline and block LaTeX math, and more.",
    images: ["/twitter-image"],
  },
};

export default function PlaygroundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd />
      <SiteHeader />
      <main className="flex-1 flex flex-col">
        <PlaygroundClient />
      </main>
    </div>
  );
}
