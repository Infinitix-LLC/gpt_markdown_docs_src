import type { Metadata } from "next";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "LaTeX Support — Render Math Equations in Flutter",
  description:
    "Render inline and block LaTeX math in Flutter with gpt_markdown. Supports \\( \\) and $...$ syntax, block equations, custom LaTeX builders, and AI output normalization.",
  alternates: { canonical: "https://gptmarkdown.com/docs/latex-support" },
  openGraph: {
    ...sharedOpenGraph,
    title: "LaTeX Support — Render Math Equations in Flutter",
    description:
      "Render inline and block LaTeX math in Flutter with gpt_markdown. Supports \\( \\) and $...$ syntax, block equations, custom LaTeX builders, and AI output normalization.",
    url: "https://gptmarkdown.com/docs/latex-support",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaTeX Support — Render Math Equations in Flutter",
    description:
      "Render inline and block LaTeX math in Flutter with gpt_markdown. Supports \\( \\) and $...$ syntax, block equations, custom LaTeX builders, and AI output normalization.",
    images: ["/twitter-image"],
  },
};

const inlineCode = `// Backslash-paren syntax (always enabled)
GptMarkdown(r'The formula is \\( E = mc^2 \\) — inline.')

// Dollar-sign syntax (opt-in)
GptMarkdown(
  r'The formula is \$E = mc^2\$ — inline.',
  useDollarSignsForLatex: true,
)`;

const blockCode = `// Backslash-bracket syntax (always enabled)
GptMarkdown(r'''
The quadratic formula:
\\[ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\]
''')

// Double-dollar syntax (opt-in)
GptMarkdown(
  r'''
  \$\$
  \\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
  \$\$
  ''',
  useDollarSignsForLatex: true,
)`;

const workaroundCode = `// Some AI models output "\\\\(" instead of "\\("
// Use latexWorkaround to normalize it
GptMarkdown(
  aiResponse,
  latexWorkaround: (tex) => tex.replaceAll('\\\\\\\\', '\\\\'),
)`;

const customBuilderCode = `import 'package:flutter_math_fork/flutter_math.dart';

GptMarkdown(
  content,
  latexBuilder: (context, latex, textStyle, inline) {
    if (inline) {
      return Math.tex(
        latex,
        textStyle: textStyle,
      );
    }
    return Center(
      child: Math.tex(
        latex,
        textStyle: textStyle?.copyWith(fontSize: 20),
      ),
    );
  },
)`;

export default function LatexSupportPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">LaTeX Support</h1>
        <p className="text-muted-foreground leading-7">
          LaTeX math rendering is built in via <code className="bg-muted rounded px-1 text-sm">flutter_math_fork</code> —
          no setup required. Supports both inline and block equations.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Inline math</h2>
        <p className="text-muted-foreground text-sm">
          Two syntaxes are available. The backslash-paren syntax is always on.
          Dollar-sign syntax requires <code className="bg-muted rounded px-1 text-xs">useDollarSignsForLatex: true</code>.
        </p>
        <CodeBlock language="dart" code={inlineCode} filename="inline_math.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Block math</h2>
        <p className="text-muted-foreground text-sm">
          Block equations are centered and rendered at display size.
        </p>
        <CodeBlock language="dart" code={blockCode} filename="block_math.dart" />
      </div>

      <div className="rounded-lg border p-4 text-sm space-y-2">
        <p className="font-medium">Syntax summary</p>
        <table className="w-full text-xs text-muted-foreground">
          <thead>
            <tr className="border-b">
              <th className="text-left py-1 pr-4">Type</th>
              <th className="text-left py-1 pr-4">Default syntax</th>
              <th className="text-left py-1">Dollar-sign syntax</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-1.5 pr-4 font-medium text-foreground">Inline</td>
              <td className="py-1.5 pr-4 font-mono">{`\\( ... \\)`}</td>
              <td className="py-1.5 font-mono">$...$</td>
            </tr>
            <tr>
              <td className="py-1.5 pr-4 font-medium text-foreground">Block</td>
              <td className="py-1.5 pr-4 font-mono">{`\\[ ... \\]`}</td>
              <td className="py-1.5 font-mono">$$...$$</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Fixing AI output quirks</h2>
        <p className="text-muted-foreground text-sm">
          Some models (like GPT-4) double-escape backslashes. Use <code className="bg-muted rounded px-1 text-xs">latexWorkaround</code> to normalize before rendering.
        </p>
        <CodeBlock language="dart" code={workaroundCode} filename="workaround.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Custom LaTeX renderer</h2>
        <p className="text-muted-foreground text-sm">
          Replace the default renderer entirely with your own widget via <code className="bg-muted rounded px-1 text-xs">latexBuilder</code>.
        </p>
        <CodeBlock language="dart" code={customBuilderCode} filename="custom_latex.dart" />
      </div>

      <div className="flex justify-between pt-2">
        <Link href="/docs/markdown-features" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          ← Markdown Features
        </Link>
        <Link href="/docs/syntax-highlighting" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
          Syntax Highlighting <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
