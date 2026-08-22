import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gptmarkdown.com"),
  title: {
    default: "GPT Markdown — Flutter Renderer for AI Output",
    template: "%s | GPT Markdown",
  },
  description:
    "The Flutter renderer for AI output. Render streaming Markdown, LaTeX, code, tables, citations, and custom inline UI in production Flutter apps.",
  keywords: ["flutter", "markdown", "latex", "dart", "gpt", "ai", "chatgpt", "gemini", "pub.dev"],
  applicationName: "GPT Markdown",
  category: "technology",
  creator: "Infinitix LLC",
  publisher: "Infinitix LLC",
  authors: [
    { name: "Mohammad Asfour" },
    { name: "Samin Sohag" },
    { name: "Laith Siam" },
    { name: "Infinitix LLC" },
  ],
  openGraph: {
    type: "website",
    url: "https://gptmarkdown.com",
    title: "GPT Markdown — Flutter Renderer for AI Output",
    description:
      "Built for production Flutter AI interfaces. Render streaming Markdown, LaTeX, code, tables, citations, and custom inline UI with one widget.",
    siteName: "GPT Markdown",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GPT Markdown — the Flutter renderer for AI output",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPT Markdown — Flutter Renderer for AI Output",
    description:
      "Built for production Flutter AI interfaces. Render streaming Markdown, LaTeX, code, tables, citations, and custom inline UI with one widget.",
    images: ["/twitter-image"],
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
