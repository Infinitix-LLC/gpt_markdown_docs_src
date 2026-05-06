import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Syntax Highlighting — Flutter Markdown Code Blocks",
  description:
    "Render syntax-highlighted code blocks in Flutter with gpt_markdown. Supports 50+ languages out of the box. Customize with codeBuilder for full control, including streaming-aware rendering.",
  alternates: { canonical: "https://gptmarkdown.com/docs/syntax-highlighting" },
};

const defaultCode = `// Syntax highlighting works out of the box.
// Just include a fenced code block in your Markdown:
GptMarkdown(r'''
\`\`\`dart
void main() {
  print('Hello, world!');
}
\`\`\`

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`
''')`;

const customBuilderCode = `import 'package:flutter/material.dart';
import 'package:gpt_markdown/gpt_markdown.dart';

GptMarkdown(
  content,
  // name     = language identifier (e.g. "dart", "python", "js")
  // code     = the raw code string
  // closed   = false while streaming (incomplete fence), true when done
  codeBuilder: (context, name, code, closed) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E1E),
        borderRadius: BorderRadius.circular(8),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (name.isNotEmpty)
            Text(
              name,
              style: const TextStyle(
                color: Colors.grey,
                fontSize: 12,
              ),
            ),
          const SizedBox(height: 8),
          SelectableText(
            code,
            style: const TextStyle(
              fontFamily: 'monospace',
              color: Colors.greenAccent,
              fontSize: 13,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  },
)`;

const streamingCode = `// The 'closed' parameter tells you whether the code fence is complete.
// Use it to show a placeholder while the model is still streaming.
codeBuilder: (context, name, code, closed) {
  if (!closed) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.grey.shade900,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        code,
        style: const TextStyle(fontFamily: 'monospace', color: Colors.white70),
      ),
    );
  }
  // Full renderer once complete
  return MyHighlightedCodeBlock(language: name, code: code);
}`;

export default function SyntaxHighlightingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Syntax Highlighting</h1>
        <p className="text-muted-foreground leading-7">
          Code blocks are highlighted automatically. Use <code className="bg-muted rounded px-1 text-sm">codeBuilder</code> to
          replace the default renderer with your own widget.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Default behaviour</h2>
        <p className="text-muted-foreground text-sm">
          Fenced code blocks with a language identifier are highlighted out of the box — no configuration needed.
        </p>
        <CodeBlock language="dart" code={defaultCode} filename="example.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Custom code block renderer</h2>
        <p className="text-muted-foreground text-sm">
          The <code className="bg-muted rounded px-1 text-xs">codeBuilder</code> callback receives the language name, raw code string,
          and a <code className="bg-muted rounded px-1 text-xs">closed</code> flag — return any widget you like.
        </p>
        <CodeBlock language="dart" code={customBuilderCode} filename="custom_code_block.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Streaming-aware rendering</h2>
        <p className="text-muted-foreground text-sm">
          When an LLM streams output, the closing <code className="bg-muted rounded px-1 text-xs">```</code> fence
          may not have arrived yet. The <code className="bg-muted rounded px-1 text-xs">closed</code> parameter
          lets you show a different UI while the code block is still being written.
        </p>
        <CodeBlock language="dart" code={streamingCode} filename="streaming_code.dart" />
      </div>

      <div className="flex justify-between pt-2">
        <Link href="/docs/latex-support" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          ← LaTeX Support
        </Link>
        <Link href="/docs/themes" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
          Themes <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
