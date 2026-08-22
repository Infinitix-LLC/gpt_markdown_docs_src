"use client";

import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/docs": "Getting Started",
  "/docs/installation": "Installation",
  "/docs/usage": "Render a response",
  "/docs/markdown-features": "Markdown & AI output",
  "/docs/latex-support": "LaTeX",
  "/docs/syntax-highlighting": "Code blocks",
  "/docs/streaming": "Streaming",
  "/docs/themes": "Themes & styles",
  "/docs/style-configuration": "Widget API & builders",
  "/docs/custom-components": "Custom inline UI",
  "/playground": "Playground",
};

export function BreadcrumbJsonLd() {
  const pathname = usePathname();
  const pageTitle = PAGE_TITLES[pathname ?? ""] ?? "Documentation";
  const isTopLevel = pathname === "/docs" || pathname === "/playground";

  const items = isTopLevel
    ? [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://gptmarkdown.com" },
        { "@type": "ListItem", position: 2, name: pageTitle, item: `https://gptmarkdown.com${pathname}` },
      ]
    : [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://gptmarkdown.com" },
        { "@type": "ListItem", position: 2, name: "Documentation", item: "https://gptmarkdown.com/docs" },
        { "@type": "ListItem", position: 3, name: pageTitle, item: `https://gptmarkdown.com${pathname}` },
      ];

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
