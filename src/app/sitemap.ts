import { MetadataRoute } from "next";

const base = "https://gptmarkdown.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base,                                   lastModified: "2026-06-16", changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/docs`,                         lastModified: "2026-06-16", changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/docs/installation`,            lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/usage`,                   lastModified: "2025-05-23", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/markdown-features`,       lastModified: "2025-05-23", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/latex-support`,           lastModified: "2025-05-23", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/syntax-highlighting`,     lastModified: "2025-05-23", changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/docs/themes`,                  lastModified: "2025-05-23", changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/docs/style-configuration`,     lastModified: "2025-05-23", changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/docs/custom-components`,       lastModified: "2025-05-23", changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/playground`,                   lastModified: "2025-05-23", changeFrequency: "monthly", priority: 0.8 },
  ];
}
