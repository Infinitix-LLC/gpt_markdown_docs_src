"use client";

import { usePathname } from "next/navigation";
import { defaultComponentBySlug } from "@/lib/default-components";

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
  "/docs/components": "Default components",
  "/playground": "Playground",
};

export function BreadcrumbJsonLd() {
  const pathname = usePathname();
  const componentSlug = pathname?.startsWith("/docs/components/") ? pathname.split("/").pop() : undefined;
  const isComponentDetail = Boolean(componentSlug && defaultComponentBySlug[componentSlug]);
  const pageTitle = componentSlug && defaultComponentBySlug[componentSlug]
    ? defaultComponentBySlug[componentSlug].name
    : PAGE_TITLES[pathname ?? ""] ?? "Documentation";
  const isTopLevel = pathname === "/docs" || pathname === "/playground";

  const items = isTopLevel
    ? [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://gptmarkdown.com" },
        { "@type": "ListItem", position: 2, name: pageTitle, item: `https://gptmarkdown.com${pathname}` },
      ]
    : isComponentDetail
      ? [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://gptmarkdown.com" },
          { "@type": "ListItem", position: 2, name: "Documentation", item: "https://gptmarkdown.com/docs" },
          { "@type": "ListItem", position: 3, name: "Default components", item: "https://gptmarkdown.com/docs/components" },
          { "@type": "ListItem", position: 4, name: pageTitle, item: `https://gptmarkdown.com${pathname}` },
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
