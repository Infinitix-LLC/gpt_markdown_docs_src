import type { Metadata } from "next";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "LaTeX Support — Built-In Math & Custom Renderers in GptMarkdown",
  description:
    "Render inline and block LaTeX in Flutter with gpt_markdown. A default math renderer is included; latexBuilder replaces it when you need custom UI. Covers \\( \\), \\[ \\], dollar-sign syntax risks, fallback, and horizontal scroll.",
  alternates: { canonical: "https://gptmarkdown.com/docs/latex-support" },
  openGraph: {
    ...sharedOpenGraph,
    title: "LaTeX Support — Built-In Math & Custom Renderers in GptMarkdown",
    description:
      "Render inline and block LaTeX in Flutter with gpt_markdown. A default math renderer is included; latexBuilder replaces it when you need custom UI. Covers \\( \\), \\[ \\], dollar-sign syntax risks, fallback, and horizontal scroll.",
    url: "https://gptmarkdown.com/docs/latex-support",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaTeX Support — Built-In Math & Custom Renderers in GptMarkdown",
    description:
      "Render inline and block LaTeX in Flutter with gpt_markdown. A default math renderer is included; latexBuilder replaces it when you need custom UI. Covers \\( \\), \\[ \\], dollar-sign syntax risks, fallback, and horizontal scroll.",
    images: ["/twitter-image"],
  },
};

const howItWorksCode = `// gpt_markdown includes a default Math.tex renderer with an error fallback.
// No configuration is needed for standard inline or block math:
GptMarkdown(r'The formula is \\( E = mc^2 \\).')

// latexBuilder is an override hook. Add flutter_math_fork (or another renderer)
// to your app only when you want to replace the default:
import 'package:flutter_math_fork/flutter_math.dart';

GptMarkdown(
  reply,
  latexBuilder: (context, tex, textStyle, inline) => Math.tex(
    tex,
    textStyle: textStyle,
    onErrorFallback: (err) => Text(tex, style: textStyle),
  ),
)`;

const inlineCode = `// \\( … \\) — always on, no configuration needed.
GptMarkdown(r'The formula is \\( E = mc^2 \\) — inline.')

// \\[ … \\] — block, always on.
GptMarkdown(r'''
The quadratic formula:
\\[ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\]
''')`;

const dollarCode = `// Dollar-sign syntax is OFF by default.
// Enable only when your content will not contain prices or currency.

GptMarkdown(
  r'''
  Inline: \$E = mc^2\$

  Block:
  \$\$
  \\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
  \$\$
  ''',
  useDollarSignsForLatex: true,
)

// WARNING: leave this off if the text may contain prices.
// "\$5 and \$10" would be interpreted as math, not currency.`;

const fallbackCode = `// Always provide onErrorFallback — the TeX from an LLM is not always valid.
latexBuilder: (context, tex, textStyle, inline) {
  return Math.tex(
    tex,
    textStyle: textStyle,
    onErrorFallback: (err) {
      // Render the raw string so the user still sees something.
      return Text(tex, style: textStyle);
    },
  );
}`;

const horizontalScrollCode = `// Wide block equations overflow on phones.
// Option 1: handle it yourself in latexBuilder.
latexBuilder: (context, tex, textStyle, inline) {
  final math = Math.tex(
    tex,
    textStyle: textStyle,
    onErrorFallback: (err) => Text(tex, style: textStyle),
  );
  if (inline) return math;
  return SingleChildScrollView(
    scrollDirection: Axis.horizontal,
    child: math,
  );
}

// Option 2: let the package scroll its built-in renderer.
GptMarkdown(
  reply,
  styleSheet: const GptMarkdownStyleSheet(
    latex: LatexStyle(scrollBlockHorizontally: true),
  ),
)`;

const workaroundCode = `// Some models (e.g. GPT-4) double-escape backslashes: \\\\( instead of \\(.
// Normalise with latexWorkaround before the delimiters are parsed.
GptMarkdown(
  aiResponse,
  latexWorkaround: (tex) => tex.replaceAll('\\\\\\\\', '\\\\'),
)`;

const inlineVsBlockCode = `latexBuilder: (context, tex, textStyle, inline) {
  // inline = true  →  rendered inside a paragraph (\\( … \\) or \$…\$)
  // inline = false →  rendered as a display-mode block (\\[ … \\] or \$\$…\$\$)
  if (inline) {
    return Math.tex(tex, textStyle: textStyle,
        onErrorFallback: (e) => Text(tex, style: textStyle));
  }
  return Center(
    child: Math.tex(
      tex,
      textStyle: textStyle?.copyWith(fontSize: 20),
      onErrorFallback: (e) => Text(tex, style: textStyle),
    ),
  );
}`;

export default function LatexSupportPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">LaTeX Support</h1>
        <p className="text-muted-foreground leading-7">
          <code className="bg-muted rounded px-1 text-sm">GptMarkdown</code> renders standard LaTeX with its included
          default math renderer. <code className="bg-muted rounded px-1 text-sm">latexBuilder</code> is an optional
          replacement hook when your app needs different math UI or error handling.
        </p>
      </div>

      {/* How it works */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">How it works</h2>
        <p className="text-muted-foreground text-sm">
          The default renderer uses a safe fallback for invalid TeX. Add a{" "}
          <code className="bg-muted rounded px-1 text-xs">latexBuilder</code> only when you need a custom renderer or
          custom fallback:
        </p>
        <CodeBlock language="dart" code={howItWorksCode} filename="latex_builder.dart" />
      </div>

      {/* Delimiters */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Delimiters</h2>
        <p className="text-muted-foreground text-sm">
          Two delimiter pairs are always active — no configuration needed:
        </p>

        <div className="rounded-lg border overflow-x-auto" role="region" aria-label="LaTeX delimiter reference" tabIndex={0}>
          <table className="min-w-[620px] w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/60">
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Mode</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Default syntax</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Dollar-sign syntax (opt-in)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-background">
                <td className="px-4 py-2.5 font-medium text-sm">Inline</td>
                <td className="px-4 py-2.5 font-mono text-xs">{`\\( … \\)`}</td>
                <td className="px-4 py-2.5 font-mono text-xs">$…$</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="px-4 py-2.5 font-medium text-sm">Block</td>
                <td className="px-4 py-2.5 font-mono text-xs">{`\\[ … \\]`}</td>
                <td className="px-4 py-2.5 font-mono text-xs">$$…$$</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock language="dart" code={inlineCode} filename="delimiters.dart" />
      </div>

      {/* Dollar-sign opt-in */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Dollar-sign syntax risk</h2>
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 p-3 text-sm text-amber-900 dark:text-amber-200">
          <strong>Warning:</strong> Enable <code className="bg-amber-100 dark:bg-amber-900/50 rounded px-1 text-xs">useDollarSignsForLatex</code>{" "}
          only when your content will not contain prices or currency symbols.{" "}
          <code className="bg-amber-100 dark:bg-amber-900/50 rounded px-1 text-xs">$5 and $10</code> would be parsed as a math expression.
        </div>
        <CodeBlock language="dart" code={dollarCode} filename="dollar_signs.dart" />
      </div>

      {/* Inline vs block */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Inline vs block in the builder</h2>
        <p className="text-muted-foreground text-sm">
          The <code className="bg-muted rounded px-1 text-xs">inline</code> parameter tells you which context you are in
          so you can choose display-mode sizing and centering for block equations:
        </p>
        <CodeBlock language="dart" code={inlineVsBlockCode} filename="inline_vs_block.dart" />
      </div>

      {/* Fallback */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Fallback on parse error</h2>
        <p className="text-muted-foreground text-sm">
          LLM-produced TeX is not always valid. The built-in renderer already falls back to the raw string.
          If you replace it with <code className="bg-muted rounded px-1 text-xs">latexBuilder</code>, provide an
          equivalent <code className="bg-muted rounded px-1 text-xs">onErrorFallback</code>:
        </p>
        <CodeBlock language="dart" code={fallbackCode} filename="fallback.dart" />
      </div>

      {/* Horizontal scroll */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Horizontal scroll for wide equations</h2>
        <p className="text-muted-foreground text-sm">
          Rendered math cannot wrap. A wide block equation overflows on a phone screen. Either wrap it yourself
          in <code className="bg-muted rounded px-1 text-xs">latexBuilder</code>, or set{" "}
          <code className="bg-muted rounded px-1 text-xs">LatexStyle(scrollBlockHorizontally: true)</code>:
        </p>
        <CodeBlock language="dart" code={horizontalScrollCode} filename="horizontal_scroll.dart" />
      </div>

      {/* AI quirks */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Normalising AI output</h2>
        <p className="text-muted-foreground text-sm">
          Some models double-escape backslashes (<code className="bg-muted rounded px-1 text-xs">{"\\\\("}</code> instead of{" "}
          <code className="bg-muted rounded px-1 text-xs">{"\\("}</code>).
          Use <code className="bg-muted rounded px-1 text-xs">latexWorkaround</code> to normalise the string
          before the delimiters are parsed:
        </p>
        <CodeBlock language="dart" code={workaroundCode} filename="workaround.dart" />
      </div>

      {/* Bottom nav */}
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
