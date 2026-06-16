import type { Metadata } from "next";
import { HomeWrapper } from "@/components/layout/home-wrapper";
import { JsonLd } from "@/components/JsonLd";
import { PACKAGE_VERSION } from "@/lib/package-version";

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
  softwareVersion: PACKAGE_VERSION,
  datePublished: "2024-03-01",
  dateModified: "2025-05-23",
  license: "https://opensource.org/licenses/MIT",
  author: [
    { "@type": "Organization", name: "Infinitix LLC", url: "https://github.com/Infinitix-LLC" },
    { "@type": "Person", name: "Mohammad Asfour" },
    { "@type": "Person", name: "Samin Sohag" },
    { "@type": "Person", name: "Laith Siam" },
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  keywords:
    "flutter markdown, flutter latex, flutter markdown renderer, render markdown flutter, flutter ai, chatgpt flutter, flutter math, flutter markdown widget",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GPT Markdown",
  url: "https://gptmarkdown.com",
  description: "Flutter Markdown & LaTeX renderer — documentation and playground",
};

export default function Home() {
  return (
    <>
      <JsonLd data={softwareAppSchema} />
      <JsonLd data={websiteSchema} />
      <HomeWrapper />
    </>
  );
}
