import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*",            allow: "/" },
      { userAgent: "GPTBot",       allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Claude-Web",   allow: "/" },
      { userAgent: "ClaudeBot",    allow: "/" },
      { userAgent: "PerplexityBot",allow: "/" },
      { userAgent: "CCBot",        allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Googlebot",    allow: "/" },
    ],
    sitemap: "https://gptmarkdown.com/sitemap.xml",
  };
}
