import { MetadataRoute } from "next";
import { defaultComponents } from "@/lib/default-components";

const base = "https://gptmarkdown.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base,                                   changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/docs`,                         changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/docs/installation`,            changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/usage`,                   changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/markdown-features`,       changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/inline-syntax`,           changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/latex-support`,           changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/syntax-highlighting`,     changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/docs/streaming`,                changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/customization`,            changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs/themes`,                  changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/docs/style-configuration`,     changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/docs/custom-components`,       changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/docs/components`,              changeFrequency: "monthly", priority: 0.8 },
    ...defaultComponents.map(({ slug }) => ({
      url: `${base}/docs/components/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${base}/docs/testing`,                 changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/docs/migration`,               changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/playground`,                   changeFrequency: "monthly", priority: 0.8 },
  ];
}
