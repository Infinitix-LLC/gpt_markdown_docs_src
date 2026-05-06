import type { Metadata } from "next";
import { SimpleImplementation } from "./SimpleImplementation";
import { AdvancedUsage } from "./AdvancedUsage";
import { BestPractices } from "./BestPractices";

export const metadata: Metadata = {
  title: "Basic Usage — Flutter Markdown & LaTeX with GptMarkdown",
  description:
    "Learn how to use gpt_markdown in Flutter. Covers simple rendering, AI streaming output, link handling, custom code blocks, LaTeX builders, RTL support, and more.",
  alternates: { canonical: "https://gptmarkdown.com/docs/usage" },
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
