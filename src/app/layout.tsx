import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gptmarkdown.com"),
  title: {
    default: "GPT Markdown — Markdown & LaTeX for Flutter",
    template: "%s | GPT Markdown",
  },
  description:
    "A Flutter package for rendering rich Markdown and LaTeX content in your apps. Optimized for AI-generated text from ChatGPT, Gemini, and Claude. 160/160 pub points, WASM ready.",
  keywords: ["flutter", "markdown", "latex", "dart", "gpt", "ai", "chatgpt", "gemini", "pub.dev"],
  authors: [{ name: "Infinitix LLC" }],
  openGraph: {
    type: "website",
    url: "https://gptmarkdown.com",
    title: "GPT Markdown — Markdown & LaTeX for Flutter",
    description:
      "Render Markdown and LaTeX in Flutter apps with one widget. Optimized for AI output. 160/160 pub points · 75K+ downloads/mo · WASM ready.",
    siteName: "GPT Markdown",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPT Markdown — Markdown & LaTeX for Flutter",
    description:
      "Render Markdown and LaTeX in Flutter apps with one widget. Optimized for AI output. 160/160 pub points · 75K+ downloads/mo · WASM ready.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
