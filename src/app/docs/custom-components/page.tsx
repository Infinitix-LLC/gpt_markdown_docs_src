import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Custom Components — Extend Flutter Markdown Rendering",
  description:
    "Register custom Flutter widgets as Markdown elements in gpt_markdown. Use block components and inline components to render custom tags, badges, callouts, and AI citation references.",
  alternates: { canonical: "https://gptmarkdown.com/docs/custom-components" },
  openGraph: {
    title: "Custom Components — Extend Flutter Markdown Rendering",
    description:
      "Register custom Flutter widgets as Markdown elements in gpt_markdown. Use block components and inline components to render custom tags, badges, callouts, and AI citation references.",
    url: "https://gptmarkdown.com/docs/custom-components",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Components — Extend Flutter Markdown Rendering",
    description:
      "Register custom Flutter widgets as Markdown elements in gpt_markdown. Use block components and inline components to render custom tags, badges, callouts, and AI citation references.",
    images: ["/twitter-image"],
  },
};

const blockComponentCode = `import 'package:flutter/material.dart';
import 'package:gpt_markdown/gpt_markdown.dart';

// A custom block component that renders a styled callout box.
// Triggered when the AI outputs: <callout type="warning">text</callout>

final calloutComponent = MarkdownComponent(
  exp: RegExp(r'<callout type="(\\w+)">(.*?)</callout>', dotAll: true),
  builder: (context, match, style) {
    final type = match.group(1) ?? 'info';
    final text = match.group(2) ?? '';
    final colors = {
      'warning': (Colors.orange.shade50, Colors.orange.shade400),
      'error':   (Colors.red.shade50,    Colors.red.shade400),
      'info':    (Colors.blue.shade50,   Colors.blue.shade400),
    };
    final (bg, border) = colors[type] ?? colors['info']!;
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: bg,
        border: Border(left: BorderSide(color: border, width: 4)),
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(text, style: style),
    );
  },
);

// Register it:
GptMarkdown(
  content,
  components: [calloutComponent],
)`;

const inlineComponentCode = `import 'package:flutter/material.dart';
import 'package:gpt_markdown/gpt_markdown.dart';

// A custom inline component that renders colored badges.
// Triggered by: <badge color="green">NEW</badge>

final badgeComponent = InlineMarkdownComponent(
  exp: RegExp(r'<badge color="(\\w+)">(.*?)</badge>'),
  builder: (context, match, style) {
    final color = match.group(1) ?? 'blue';
    final label = match.group(2) ?? '';
    final colorMap = {
      'green':  Colors.green,
      'blue':   Colors.blue,
      'red':    Colors.red,
      'orange': Colors.orange,
    };
    final c = colorMap[color] ?? Colors.blue;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: c.withOpacity(0.15),
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: c.withOpacity(0.4)),
      ),
      child: Text(
        label,
        style: style?.copyWith(
          color: c.shade700,
          fontSize: 11,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.3,
        ),
      ),
    );
  },
);

// Register it:
GptMarkdown(
  content,
  inlineComponents: [badgeComponent],
)`;

const multipleCode = `GptMarkdown(
  content,
  components: [
    calloutComponent,
    sectionDividerComponent,
    codePlaygroundComponent,
  ],
  inlineComponents: [
    badgeComponent,
    tooltipComponent,
  ],
)`;

const sourceTagCode = `// The package has built-in support for AI citation tags like:
// <source>1</source> or [1] style references.
// Use sourceTagBuilder to render them your way:

GptMarkdown(
  content,
  sourceTagBuilder: (context, sources) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: sources.map((src) => GestureDetector(
        onTap: () => openSource(src),
        child: Container(
          margin: const EdgeInsets.only(left: 2),
          padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
          decoration: BoxDecoration(
            color: Colors.blue.shade50,
            borderRadius: BorderRadius.circular(4),
          ),
          child: Text(
            src,
            style: const TextStyle(fontSize: 10, color: Colors.blue),
          ),
        ),
      )).toList(),
    );
  },
)`;

export default function CustomComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Custom Components</h1>
        <p className="text-muted-foreground leading-7">
          Register your own Flutter widgets as Markdown elements. Block components replace whole lines;
          inline components can appear inside a sentence alongside text.
          Both use regular expressions to match custom syntax in the Markdown string.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {[
          ["components", "Block-level", "Match multi-line patterns, replace with any widget"],
          ["inlineComponents", "Inline", "Match within a line, rendered alongside text"],
          ["sourceTagBuilder", "Citations", "Render AI citation/source references"],
        ].map(([param, label, desc]) => (
          <div key={param} className="rounded-lg border p-4">
            <p className="font-mono text-xs text-muted-foreground mb-1">{param}</p>
            <p className="font-semibold text-sm mb-1">{label}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Block component</h2>
        <p className="text-muted-foreground text-sm">
          A block component that turns <code className="bg-muted rounded px-1 text-xs">{`<callout type="warning">...</callout>`}</code> into
          a styled callout box — useful when your AI model is prompted to output structured annotations.
        </p>
        <CodeBlock language="dart" code={blockComponentCode} filename="callout_component.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Inline component</h2>
        <p className="text-muted-foreground text-sm">
          An inline component that renders{" "}
          <code className="bg-muted rounded px-1 text-xs">{`<badge color="green">NEW</badge>`}</code>{" "}
          as a colored pill badge, rendered within a sentence.
        </p>
        <CodeBlock language="dart" code={inlineComponentCode} filename="badge_component.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Registering multiple</h2>
        <p className="text-muted-foreground text-sm">
          Pass any number of components in the list — they are tested in order.
        </p>
        <CodeBlock language="dart" code={multipleCode} filename="registration.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Citation / source tags</h2>
        <p className="text-muted-foreground text-sm">
          The package has first-class support for AI citation tags via <code className="bg-muted rounded px-1 text-xs">sourceTagBuilder</code>.
        </p>
        <CodeBlock language="dart" code={sourceTagCode} filename="source_tags.dart" />
      </div>

      <div className="rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm">
        <p className="font-medium text-amber-800 dark:text-amber-300 mb-1">Tip — prompt your AI to use custom tags</p>
        <p className="text-amber-700 dark:text-amber-400 text-xs leading-relaxed">
          Custom components work best when you include tag instructions in your system prompt.
          For example: <em>&quot;When highlighting a warning, wrap it in <code className="bg-amber-100 dark:bg-amber-900 rounded px-1">{`<callout type="warning">...</callout>`}</code>.&quot;</em>
        </p>
      </div>

      <div className="flex justify-start pt-2">
        <Link href="/docs/style-configuration" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          ← Style & Parameters
        </Link>
      </div>
    </div>
  );
}
