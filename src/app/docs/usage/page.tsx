import type { Metadata } from "next";
import sharedOpenGraph from "@/lib/og";
import { SimpleImplementation } from "./SimpleImplementation";
import { AdvancedUsage } from "./AdvancedUsage";
import { BestPractices } from "./BestPractices";

export const metadata: Metadata = {
  title: "Basic Usage — GptMarkdown v1.2.0",
  description:
    "Install gpt_markdown and render your first reply in minutes. Covers scrollable layouts, SelectionArea, link taps, RTL, text scaling, LaTeX, code blocks, and streaming AI output.",
  alternates: { canonical: "https://gptmarkdown.com/docs/usage" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Basic Usage — GptMarkdown v1.2.0",
    description:
      "Install gpt_markdown and render your first reply in minutes. Covers scrollable layouts, SelectionArea, link taps, RTL, text scaling, LaTeX, code blocks, and streaming AI output.",
    url: "https://gptmarkdown.com/docs/usage",
  },
  twitter: {
    card: "summary_large_image",
    title: "Basic Usage — GptMarkdown v1.2.0",
    description:
      "Install gpt_markdown and render your first reply in minutes. Covers scrollable layouts, SelectionArea, link taps, RTL, text scaling, LaTeX, code blocks, and streaming AI output.",
    images: ["/twitter-image"],
  },
};

export default function UsagePage() {
  return (
    <div className="space-y-6">
      <SimpleImplementation />
      <AdvancedUsage />
      <BestPractices />
    </div>
  );
}
