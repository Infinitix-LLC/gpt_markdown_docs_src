import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { BrandMark } from "@/components/layout/brand-mark";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border/40 bg-transparent">
      <div className="flex w-full flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between md:px-8 lg:px-10">
        <div className="space-y-3">
          <Link href="/" className="inline-flex items-center gap-2.5 font-semibold">
            <BrandMark className="h-7 w-7 object-contain" />
            <span>
              GPT Markdown <span className="font-normal text-muted-foreground">by Val</span>
            </span>
          </Link>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            GPT Markdown is Val&apos;s open-source production renderer for rich AI
            output in Flutter.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          <Link href="/docs" className="text-muted-foreground transition-colors hover:text-foreground">
            Documentation
          </Link>
          <a
            href="https://useval.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            Explore Val
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://github.com/Infinitix-LLC/gpt_markdown"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}