import { MetadataRoute } from "next";

const base = "https://gptmarkdown.com";
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base,                                   lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/docs`,                         lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/docs/installation`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/usage`,                   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/markdown-features`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/latex-support`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/syntax-highlighting`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/docs/themes`,                  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/docs/style-configuration`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/docs/custom-components`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/examples`,                     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
