import type { Metadata } from "next";
import { HomeWrapper } from "@/components/layout/home-wrapper";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "GPT Markdown — Flutter Markdown & LaTeX Renderer",
  description:
    "The best Flutter package for rendering Markdown and LaTeX. One widget renders ChatGPT, Gemini, and Claude output beautifully. 160/160 pub points, 75K+ downloads/mo, WASM ready.",
  keywords: [
    "flutter markdown",
    "markdown flutter",
    "flutter latex",
    "latex flutter",
    "flutter markdown package",
    "flutter markdown renderer",
    "flutter latex renderer",
    "flutter ai markdown",
    "flutter chatgpt",
    "render markdown flutter",
    "flutter markdown latex",
    "gpt markdown",
    "flutter math",
    "flutter markdown widget",
  ],
  alternates: { canonical: "https://gptmarkdown.com" },
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GPT Markdown",
  alternateName: "gpt_markdown",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Flutter Package",
  operatingSystem: "iOS, Android, Web, macOS, Windows, Linux",
  description:
    "A Flutter package for rendering Markdown and LaTeX content in your apps. Optimized for AI-generated text from ChatGPT, Gemini, and Claude. Supports full Markdown syntax, inline and block LaTeX math, syntax-highlighted code blocks, and custom builder callbacks.",
  url: "https://gptmarkdown.com",
  downloadUrl: "https://pub.dev/packages/gpt_markdown",
  softwareVersion: "1.1.6",
  datePublished: "2023-01-01",
  license: "https://opensource.org/licenses/MIT",
  author: { "@type": "Organization", name: "Infinitix LLC", url: "https://github.com/Infinitix-LLC" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "289",
    bestRating: "5",
  },
  keywords:
    "flutter markdown, flutter latex, flutter markdown renderer, render markdown flutter, flutter ai, chatgpt flutter, flutter math, flutter markdown widget",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best Flutter package for rendering Markdown?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "gpt_markdown is the most feature-complete Flutter Markdown package, with 160/160 pub points and 75K+ monthly downloads. It is the only Flutter package with built-in LaTeX math rendering, and it is specifically optimized for AI-generated content from ChatGPT, Gemini, and Claude.",
      },
    },
    {
      "@type": "Question",
      name: "How do I render LaTeX in Flutter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use gpt_markdown. Install with `flutter pub add gpt_markdown`, import 'package:gpt_markdown/gpt_markdown.dart', then use GptMarkdown(r'\\( E = mc^2 \\)'). LaTeX rendering is bundled automatically with no extra dependencies needed.",
      },
    },
    {
      "@type": "Question",
      name: "How do I render Markdown in Flutter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the GptMarkdown widget from the gpt_markdown package. Run `flutter pub add gpt_markdown`, then use GptMarkdown('**your markdown here**'). It supports headings, bold, italic, tables, code blocks, lists, images, links, and more.",
      },
    },
    {
      "@type": "Question",
      name: "How do I display ChatGPT or Gemini responses in Flutter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use gpt_markdown. It handles the mixed Markdown + LaTeX format that AI models like ChatGPT and Gemini produce without any preprocessing. Just pass the raw AI response string directly to GptMarkdown(aiResponse).",
      },
    },
    {
      "@type": "Question",
      name: "Does gpt_markdown support Flutter web and WASM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. gpt_markdown compiles to WebAssembly (WASM) and works on all Flutter platforms: iOS, Android, Web, macOS, Windows, and Linux.",
      },
    },
    {
      "@type": "Question",
      name: "How do I render streaming AI responses in Flutter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Accumulate chunks into a string buffer and pass it to GptMarkdown inside a setState call. The widget re-renders incrementally as new text arrives from the AI stream.",
      },
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GPT Markdown",
  url: "https://gptmarkdown.com",
  description: "Flutter Markdown & LaTeX renderer — documentation and playground",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://gptmarkdown.com/docs",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={softwareAppSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={websiteSchema} />
      <HomeWrapper />
    </>
  );
}
