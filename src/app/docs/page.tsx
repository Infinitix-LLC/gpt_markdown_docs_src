import { CodeBlock } from "@/components/ui/components/ui/code-block";
import React from "react";

const DocsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          GPT Markdown & LaTeX for Flutter
        </h1>
        <p className="text-lg text-muted-foreground">
          A Flutter package for rendering rich Markdown and LaTeX content,
          designed for seamless integration with AI outputs like ChatGPT and
          Gemini.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <CodeBlock
          language="bash"
          code="flutter pub add gpt_markdown"
          filename="terminal"
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
        <CodeBlock
          language="dart"
          filename="main.dart"
          code={`import 'package:gpt_markdown/gpt_markdown.dart';

GptMarkdown(
  r'**Hello!** Inline LaTeX: \\( E = mc^2 \\)',
)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Parameters</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold">Parameter</th>
                <th className="text-left py-2 pr-4 font-semibold">Type</th>
                <th className="text-left py-2 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">style</td>
                <td className="py-2 pr-4">TextStyle?</td>
                <td className="py-2">Base text style</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">textDirection</td>
                <td className="py-2 pr-4">TextDirection</td>
                <td className="py-2">LTR or RTL support</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">useDollarSignsForLatex</td>
                <td className="py-2 pr-4">bool</td>
                <td className="py-2">Enable $...$ LaTeX syntax</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onLinkTap</td>
                <td className="py-2 pr-4">Function?</td>
                <td className="py-2">Handle link taps</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">latexBuilder</td>
                <td className="py-2 pr-4">Widget Function?</td>
                <td className="py-2">Custom LaTeX renderer</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">codeBuilder</td>
                <td className="py-2 pr-4">Widget Function?</td>
                <td className="py-2">Custom code block renderer</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-xs">highlightBuilder</td>
                <td className="py-2 pr-4">Widget Function?</td>
                <td className="py-2">Custom inline code renderer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Supported Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Markdown</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
              <li>Headings, bold, italic, strikethrough</li>
              <li>Underline via &lt;u&gt; tag</li>
              <li>Tables, blockquotes, indents</li>
              <li>Ordered &amp; unordered lists</li>
              <li>Code blocks with syntax highlighting</li>
              <li>Links and images</li>
              <li>Radio buttons &amp; checkboxes</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">LaTeX</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
              <li>Inline math: \( ... \)</li>
              <li>Block math: \[ ... \]</li>
              <li>Dollar sign syntax: $ ... $</li>
              <li>Complex equations &amp; matrices</li>
              <li>Custom LaTeX renderer support</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Links</h2>
        <ul className="space-y-2 text-muted-foreground text-sm">
          <li>
            <a
              href="https://pub.dev/packages/gpt_markdown"
              className="text-primary hover:underline">
              pub.dev package
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Infinitix-LLC/gpt_markdown"
              className="text-primary hover:underline">
              GitHub repository
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Infinitix-LLC/gpt_markdown/issues"
              className="text-primary hover:underline">
              Issue tracker
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default DocsPage;
