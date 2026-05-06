import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const quickStart = `import 'package:gpt_markdown/gpt_markdown.dart';

GptMarkdown(
  r'**Hello!** Inline math: \\( E = mc^2 \\)',
)`;

const sections = [
  { href: "/docs/installation",       title: "Installation",         desc: "Add the package to your project in one command." },
  { href: "/docs/usage",              title: "Basic Usage",          desc: "Simple and advanced usage examples." },
  { href: "/docs/markdown-features",  title: "Markdown Features",    desc: "Full list of supported Markdown elements." },
  { href: "/docs/latex-support",      title: "LaTeX Support",        desc: "Inline and block math, dollar-sign syntax, custom builder." },
  { href: "/docs/syntax-highlighting",title: "Syntax Highlighting",  desc: "Built-in code highlighting and custom codeBuilder." },
  { href: "/docs/themes",             title: "Themes",               desc: "Dark/light theming with GptMarkdownTheme." },
  { href: "/docs/style-configuration",title: "Style & Parameters",   desc: "Complete reference for every widget parameter." },
];

export default function DocsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">
          GPT Markdown
        </h1>
        <p className="text-lg text-muted-foreground leading-7">
          A Flutter widget for rendering Markdown and LaTeX — optimized for AI-generated content from ChatGPT, Gemini, and Claude.
          Drop it in anywhere you display text from an LLM.
        </p>
      </div>

      <div>
        <h2 className="scroll-m-20 text-2xl font-semibold mb-4">Quick start</h2>
        <CodeBlock language="bash" code="flutter pub add gpt_markdown" filename="terminal" />
        <div className="mt-4">
          <CodeBlock language="dart" code={quickStart} filename="main.dart" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          That&apos;s it. LaTeX, bold, tables, code blocks, and more work out of the box — no extra configuration needed.
        </p>
      </div>

      <div>
        <h2 className="scroll-m-20 text-2xl font-semibold mb-4">Documentation</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {sections.map(({ href, title, desc }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-lg border p-4 hover:border-foreground transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
