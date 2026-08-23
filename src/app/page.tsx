import type { Metadata } from "next";
import { HomeWrapper } from "@/components/layout/home-wrapper";
import { JsonLd } from "@/components/JsonLd";
import { PACKAGE_VERSION } from "@/lib/package-version";

export const metadata: Metadata = {
  title: "GPT Markdown — Flutter Renderer for AI Output",
  description:
    "Render streaming AI output, Markdown, LaTeX, code, tables, citations, and custom inline UI in production Flutter apps with one widget.",
  keywords: [
    "flutter markdown",
    "markdown flutter",
    "flutter latex",
    "latex flutter",
    "flutter markdown package",
    "flutter markdown renderer",
    "flutter latex renderer",
    "flutter ai markdown",
    "flutter ai renderer",
    "flutter streaming markdown",
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
    "The Flutter renderer for AI output. Render streaming assistant replies, Markdown, LaTeX, code, tables, citations, and custom inline UI with production-ready styling and extension points.",
  url: "https://gptmarkdown.com",
  downloadUrl: "https://pub.dev/packages/gpt_markdown",
  softwareVersion: PACKAGE_VERSION,
  datePublished: "2024-03-01",
  dateModified: "2026-08-22",
  license: "https://opensource.org/licenses/BSD-3-Clause",
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
  description: "The Flutter renderer for AI output — documentation and playground",
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
