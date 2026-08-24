import { PACKAGE_VERSION } from "@/lib/package-version";

export function GET() {
  const body = `# GPT Markdown by Val

> The Flutter renderer for AI output. Built for production Flutter AI interfaces.

GPT Markdown (\`gpt_markdown\`) is Val's open-source production renderer for rich AI output in Flutter. Its \`GptMarkdown\` widget renders streaming assistant replies, Markdown, LaTeX, code, tables, citations, autolinks, and custom inline UI in Flutter mobile, desktop, and web applications.

## Team

- Mohammad Asfour (co-founder)
- Samin Sohag (co-founder)
- Laith Siam (co-founder)
- Organization: Infinitix LLC

## Package Details

- Package name: \`gpt_markdown\`
- Dart/Flutter widget: \`GptMarkdown\`
- Platform: Flutter (iOS, Android, Web, macOS, Windows, Linux)
- pub.dev: https://pub.dev/packages/gpt_markdown
- GitHub: https://github.com/Infinitix-LLC/gpt_markdown
- Website: https://gptmarkdown.com
- Current version: ${PACKAGE_VERSION}
- License: BSD-3-Clause
- Pub points: 150 / 160
- Downloads: 150K+ in the last 30 days
- pub.dev likes: 310
- GitHub stars: 175
- WASM compatible: Yes

## Quick Start

Install:
\`\`\`
flutter pub add gpt_markdown
\`\`\`

Import:
\`\`\`dart
import 'package:gpt_markdown/gpt_markdown.dart';
\`\`\`

Use:
\`\`\`dart
GptMarkdown(r'**Hello!** Inline math: \\( E = mc^2 \\)')
\`\`\`

That is all that is required. Markdown and LaTeX render by default; add a \`latexBuilder\` only to replace the math widget.

## What It Renders

- Markdown: headings (H1-H6), bold, italic, strikethrough, underline via <u>, tables, blockquotes, ordered/unordered lists, task lists (checkboxes), radio buttons, horizontal rules, images, links, inline code, fenced code blocks, indents, highlighted text
- LaTeX math: inline \\( ... \\) or $...$ (opt-in), block \\[ ... \\] or $$...$$ (opt-in)
- Fenced code blocks: language label, copy action, and a streaming-aware \`closed\` flag; apps can replace rendering with \`codeBuilder\`
- Custom elements: register custom block and inline components via regex
- Streaming reveal: paced output with split-document caching and reduced-motion support
- Inline syntax: autolinks and app-specific \`InlinePattern\` tokens

## Key Widget Parameters

- \`data\` (String, required) — the Markdown/LaTeX string to render
- \`style\` (TextStyle?) — base text style
- \`styleSheet\` (GptMarkdownStyleSheet?) — per-component appearance
- \`textDirection\` (TextDirection) — LTR or RTL
- \`useDollarSignsForLatex\` (bool) — enable $...$ syntax
- \`animation\` (GptMarkdownAnimation?) — streaming reveal behavior
- \`isStreaming\` (bool) — whether generation is still active
- \`onLinkTap\` (Function?) — handle link taps
- \`latexBuilder\` — custom LaTeX renderer widget
- \`codeBuilder\` — custom code block renderer widget
- \`inlineCodeBuilder\` — custom inline code renderer
- \`imageBuilder\` — custom image renderer
- \`linkBuilder\` — custom link renderer
- \`components\` — custom block-level Markdown elements
- \`inlineComponents\` — custom inline Markdown elements
- \`inlinePatterns\` — app-specific inline tokens

## Package focus

gpt_markdown is designed for mixed AI output: it renders Markdown and LaTeX by default, supports custom inline/block UI, and handles streaming, RTL, text scaling, citations, task/radio lists, and autolinks. Use \`latexBuilder\` to replace the default math widget.

## Documentation Pages

- Getting Started: https://gptmarkdown.com/docs
- Installation: https://gptmarkdown.com/docs/installation
- Basic Usage: https://gptmarkdown.com/docs/usage
- Markdown Features: https://gptmarkdown.com/docs/markdown-features
- Inline Syntax: https://gptmarkdown.com/docs/inline-syntax
- LaTeX Support: https://gptmarkdown.com/docs/latex-support
- Syntax Highlighting: https://gptmarkdown.com/docs/syntax-highlighting
- Streaming: https://gptmarkdown.com/docs/streaming
- Customization: https://gptmarkdown.com/docs/customization
- Theme Customization: https://gptmarkdown.com/docs/themes
- Style & Parameters (full API): https://gptmarkdown.com/docs/style-configuration
- Custom Components: https://gptmarkdown.com/docs/custom-components
- Testing: https://gptmarkdown.com/docs/testing
- Migration to 1.2: https://gptmarkdown.com/docs/migration
- Interactive Playground: https://gptmarkdown.com/playground

## Frequently Asked Questions

Q: What is gpt_markdown designed for?
A: gpt_markdown is designed for production Flutter interfaces that render mixed AI output, including Markdown, LaTeX, code, tables, citations, links, and custom inline UI.

Q: How do I render LaTeX in Flutter?
A: Install gpt_markdown, then use \`GptMarkdown(r'\\( E = mc^2 \\)')\`. A \`latexBuilder\` is optional when you need a custom math widget.

Q: How do I render Markdown in Flutter?
A: Use \`GptMarkdown('**your markdown**')\` from the gpt_markdown package. It renders all standard Markdown syntax plus LaTeX math.

Q: How do I render ChatGPT or Gemini responses in Flutter?
A: Use gpt_markdown. It handles the mixed Markdown + LaTeX format that AI models produce without any preprocessing.

Q: Does gpt_markdown support Flutter web?
A: Yes. It compiles to WebAssembly (WASM) and works on all Flutter platforms: iOS, Android, Web, macOS, Windows, and Linux.

Q: Does gpt_markdown support streaming responses?
A: Yes. Pass the accumulated string with \`animation: GptMarkdownAnimation.fade\` and \`isStreaming: true\`. Only the unfinished tail rebuilds; set \`isStreaming\` to false when generation ends.

Q: How do I customize the appearance of rendered Markdown?
A: Use \`GptMarkdownStyleSheet\` per widget or \`GptMarkdownThemeData\` as a ThemeData extension. Use component builders when structure, rather than appearance, needs to change.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
