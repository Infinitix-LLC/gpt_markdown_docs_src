import type { Metadata } from "next";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Code Blocks — codeBuilder, closed Flag & Selection in GptMarkdown",
  description:
    "How gpt_markdown renders fenced code blocks: default monospace display, custom codeBuilder, the closed streaming flag, width constraints, and selection caveats in Flutter v1.2.0.",
  alternates: { canonical: "https://gptmarkdown.com/docs/syntax-highlighting" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Code Blocks — codeBuilder, closed Flag & Selection in GptMarkdown",
    description:
      "How gpt_markdown renders fenced code blocks: default monospace display, custom codeBuilder, the closed streaming flag, width constraints, and selection caveats in Flutter v1.2.0.",
    url: "https://gptmarkdown.com/docs/syntax-highlighting",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Blocks — codeBuilder, closed Flag & Selection in GptMarkdown",
    description:
      "How gpt_markdown renders fenced code blocks: default monospace display, custom codeBuilder, the closed streaming flag, width constraints, and selection caveats in Flutter v1.2.0.",
    images: ["/twitter-image"],
  },
};

const defaultBehaviourCode = `// The default renderer shows the language label, a copy button,
// and the code in a monospace font. No syntax highlighting is applied
// by default — add it through codeBuilder.
GptMarkdown(r'''
\`\`\`dart
void main() {
  print('Hello, world!');
}
\`\`\`
''')`;

const codeBuilderSignatureCode = `// codeBuilder signature (typedef CodeBlockBuilder):
//
//   Widget Function(
//     BuildContext context,
//     String name,    // language identifier: "dart", "python", "" if none
//     String code,    // raw code string between the fences
//     bool closed,    // true once the closing \\\`\\\`\\\` has arrived
//   )

GptMarkdown(
  reply,
  codeBuilder: (context, name, code, closed) {
    return MyCodeBlock(language: name, code: code, isClosed: closed);
  },
)`;

const syntaxHighlightingCode = `// Add syntax highlighting with flutter_highlight or highlight_flutter.
// codeBuilder lets you own the entire widget — the package stays
// dependency-free from any highlighter.
import 'package:flutter_highlight/flutter_highlight.dart';
import 'package:flutter_highlight/themes/github.dart';

GptMarkdown(
  reply,
  codeBuilder: (context, name, code, closed) {
    return HighlightView(
      code,
      language: name.isEmpty ? 'plaintext' : name,
      theme: githubTheme,
      padding: const EdgeInsets.all(12),
      textStyle: const TextStyle(fontFamily: 'monospace', fontSize: 13),
    );
  },
)`;

const closedFlagCode = `// closed = false while the model is still streaming the code block.
// The closing \`\`\` fence has not arrived yet.
//
// Use it to show a simpler UI during streaming and switch to the
// full highlighted view once the block is complete.
codeBuilder: (context, name, code, closed) {
  if (!closed) {
    // Partial code — show plain text to avoid repeated re-highlighting.
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.grey.shade900,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        code,
        style: const TextStyle(
          fontFamily: 'monospace',
          color: Colors.white70,
          fontSize: 13,
        ),
      ),
    );
  }
  // Full highlighted view once the fence is closed.
  return MyHighlightedCodeBlock(language: name, code: code);
}`;

const widthCode = `// Code blocks expand to fill available width by default.
// Use Container or SizedBox to constrain if needed.
codeBuilder: (context, name, code, closed) {
  return Container(
    width: double.infinity,          // fills the column
    decoration: BoxDecoration(
      color: const Color(0xFF1E1E1E),
      borderRadius: BorderRadius.circular(8),
    ),
    padding: const EdgeInsets.all(16),
    child: SingleChildScrollView(
      scrollDirection: Axis.horizontal,   // scroll wide lines
      child: Text(
        code,
        style: const TextStyle(fontFamily: 'monospace', color: Colors.white),
      ),
    ),
  );
}`;

const selectionCode = `// SelectableText inside a codeBuilder works for completed blocks.
// While closed = false (streaming), the widget rebuilds every frame,
// so selection is unstable. Selection returns once closed = true.
codeBuilder: (context, name, code, closed) {
  return Container(
    width: double.infinity,
    padding: const EdgeInsets.all(12),
    color: Colors.grey.shade900,
    child: closed
        ? SelectableText(
            code,
            style: const TextStyle(fontFamily: 'monospace', color: Colors.white),
          )
        : Text(
            code,
            style: const TextStyle(fontFamily: 'monospace', color: Colors.white70),
          ),
  );
}`;

export default function SyntaxHighlightingPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Code Blocks</h1>
        <p className="text-muted-foreground leading-7">
          Fenced code blocks render out of the box with a language label and copy button.
          Syntax highlighting is <strong>not applied by default</strong> — wire your own highlighter through{" "}
          <code className="bg-muted rounded px-1 text-sm">codeBuilder</code>. The{" "}
          <code className="bg-muted rounded px-1 text-sm">closed</code> flag tells you whether the closing fence
          has arrived, which is essential for a smooth streaming experience.
        </p>
      </div>

      {/* Default behaviour */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Default behaviour</h2>
        <p className="text-muted-foreground text-sm">
          Without a <code className="bg-muted rounded px-1 text-xs">codeBuilder</code> the package renders the language
          label, a copy button (calls <code className="bg-muted rounded px-1 text-xs">onCodeCopy</code> when used), and the
          raw code in a monospace font. No token colouring is applied — add it yourself via{" "}
          <code className="bg-muted rounded px-1 text-xs">codeBuilder</code>.
        </p>
        <CodeBlock language="dart" code={defaultBehaviourCode} filename="default_code_block.dart" />
      </div>

      {/* codeBuilder */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">
          <code className="text-xl">codeBuilder</code> signature
        </h2>
        <p className="text-muted-foreground text-sm">
          The callback receives the language name, the raw code string, and the{" "}
          <code className="bg-muted rounded px-1 text-xs">closed</code> flag. Return any widget.
        </p>
        <CodeBlock language="dart" code={codeBuilderSignatureCode} filename="code_builder.dart" />
      </div>

      {/* Syntax highlighting */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Adding syntax highlighting</h2>
        <p className="text-muted-foreground text-sm">
          Use any Flutter syntax highlighting package —{" "}
          <a href="https://pub.dev/packages/flutter_highlight" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">flutter_highlight</a>,{" "}
          <a href="https://pub.dev/packages/highlight_flutter" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">highlight_flutter</a>, or{" "}
          <a href="https://pub.dev/packages/re_highlight" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">re_highlight</a>.
          The package makes no assumptions about which one you choose.
        </p>
        <CodeBlock language="dart" code={syntaxHighlightingCode} filename="syntax_highlighting.dart" />
      </div>

      {/* closed flag */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">
          The <code className="text-xl">closed</code> flag
        </h2>
        <p className="text-muted-foreground text-sm">
          When an LLM streams output, the closing{" "}
          <code className="bg-muted rounded px-1 text-xs">```</code> fence may not have arrived yet.{" "}
          <code className="bg-muted rounded px-1 text-xs">closed: false</code> means the code is still
          being written. Use a lighter rendering path during streaming and switch to the full
          highlighted view once the block is complete.
        </p>
        <CodeBlock language="dart" code={closedFlagCode} filename="closed_flag.dart" />
      </div>

      {/* Width */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Width and horizontal scroll</h2>
        <p className="text-muted-foreground text-sm">
          Code blocks fill available width by default.
          Long lines do not wrap — add a horizontal{" "}
          <code className="bg-muted rounded px-1 text-xs">SingleChildScrollView</code> inside your builder
          if lines may be wider than the screen.
        </p>
        <CodeBlock language="dart" code={widthCode} filename="wide_code.dart" />
      </div>

      {/* Selection caveats */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Selection caveats</h2>
        <p className="text-muted-foreground text-sm">
          <code className="bg-muted rounded px-1 text-xs">SelectableText</code> inside a{" "}
          <code className="bg-muted rounded px-1 text-xs">codeBuilder</code> works once the block is settled
          (<code className="bg-muted rounded px-1 text-xs">closed: true</code>). While{" "}
          <code className="bg-muted rounded px-1 text-xs">closed: false</code>, the tail is rebuilt every
          frame, making it an unstable selection target. Selection returns the moment the reply settles.
        </p>
        <CodeBlock language="dart" code={selectionCode} filename="selection.dart" />
      </div>

      {/* Bottom nav */}
      <div className="flex justify-between pt-2">
        <Link href="/docs/latex-support" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          ← LaTeX Support
        </Link>
        <Link href="/docs/streaming" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
          Streaming <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
