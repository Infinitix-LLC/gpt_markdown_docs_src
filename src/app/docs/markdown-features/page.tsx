import type { Metadata } from "next";
import FeatureTable from "@/components/ui/FeatureTable";

export const metadata: Metadata = {
  title: "Markdown Features — Flutter Markdown Support",
  description:
    "Complete list of Markdown syntax supported by gpt_markdown in Flutter: headings, bold, italic, tables, code blocks, lists, task lists, blockquotes, images, links, LaTeX, and more.",
  alternates: { canonical: "https://gptmarkdown.com/docs/markdown-features" },
  openGraph: {
    title: "Markdown Features — Flutter Markdown Support",
    description:
      "Complete list of Markdown syntax supported by gpt_markdown in Flutter: headings, bold, italic, tables, code blocks, lists, task lists, blockquotes, images, links, LaTeX, and more.",
    url: "https://gptmarkdown.com/docs/markdown-features",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Features — Flutter Markdown Support",
    description:
      "Complete list of Markdown syntax supported by gpt_markdown in Flutter: headings, bold, italic, tables, code blocks, lists, task lists, blockquotes, images, links, LaTeX, and more.",
    images: ["/twitter-image"],
  },
};

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Markdown Features</h1>
        <p className="text-muted-foreground leading-7">
          Every Markdown element supported by <code className="bg-muted rounded px-1 text-sm">GptMarkdown</code>.
          All features work out of the box with no configuration.
        </p>
      </div>
      <FeatureTable />
    </div>
  );
}
