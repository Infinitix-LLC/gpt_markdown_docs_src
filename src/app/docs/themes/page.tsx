import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const themeExtensionCode = `import 'package:flutter/material.dart';
import 'package:gpt_markdown/gpt_markdown.dart';

MaterialApp(
  theme: ThemeData.light().copyWith(
    extensions: [
      GptMarkdownThemeData(
        brightness: Brightness.light,
        linkColor: Colors.indigo,
        linkHoverColor: Colors.indigoAccent,
        highlightColor: Colors.yellow.withOpacity(0.3),
        autoAddDividerLineAfterH1: true,
      ),
    ],
  ),
  darkTheme: ThemeData.dark().copyWith(
    extensions: [
      GptMarkdownThemeData(
        brightness: Brightness.dark,
        linkColor: Colors.lightBlueAccent,
      ),
    ],
  ),
  home: const MyApp(),
)`;

const wrapperCode = `import 'package:gpt_markdown/gpt_markdown.dart';

// Or wrap a specific widget instead of the whole app
GptMarkdownTheme(
  gptThemeData: GptMarkdownThemeData(
    brightness: Brightness.light,
    h1: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900),
    h2: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
    linkColor: Colors.deepPurple,
    hrLineColor: Colors.grey.shade300,
    hrLineThickness: 1.5,
    hrLinePadding: const EdgeInsets.symmetric(vertical: 8),
  ),
  child: GptMarkdown(content),
)`;

const headingsCode = `GptMarkdownThemeData(
  brightness: Brightness.light,

  // Style each heading level independently
  h1: const TextStyle(fontSize: 32, fontWeight: FontWeight.w900, letterSpacing: -0.5),
  h2: const TextStyle(fontSize: 24, fontWeight: FontWeight.w700),
  h3: const TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
  // h4, h5, h6 follow the same pattern

  // Horizontal rule (--- in Markdown)
  hrLineColor: Colors.grey.shade300,
  hrLineThickness: 1.0,
  hrLinePadding: const EdgeInsets.symmetric(vertical: 12),

  // Inline code / highlight background
  highlightColor: Colors.amber.withOpacity(0.2),

  // Whether # headings get a divider line below them
  autoAddDividerLineAfterH1: false,
)`;

export default function ThemesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Themes</h1>
        <p className="text-muted-foreground leading-7">
          <code className="bg-muted rounded px-1 text-sm">GptMarkdown</code> automatically picks up your app&apos;s
          light/dark theme. You can fine-tune it via a <code className="bg-muted rounded px-1 text-sm">ThemeData</code> extension
          or wrap specific widgets with <code className="bg-muted rounded px-1 text-sm">GptMarkdownTheme</code>.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">App-wide theme via ThemeData</h2>
        <p className="text-muted-foreground text-sm">
          Register <code className="bg-muted rounded px-1 text-xs">GptMarkdownThemeData</code> as a{" "}
          <code className="bg-muted rounded px-1 text-xs">ThemeData</code> extension.
          Separate light and dark themes are both supported.
        </p>
        <CodeBlock language="dart" code={themeExtensionCode} filename="main.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Scoped theme with GptMarkdownTheme</h2>
        <p className="text-muted-foreground text-sm">
          Use the <code className="bg-muted rounded px-1 text-xs">GptMarkdownTheme</code> widget to apply a theme
          only to a specific part of the widget tree.
        </p>
        <CodeBlock language="dart" code={wrapperCode} filename="scoped_theme.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">All theme properties</h2>
        <CodeBlock language="dart" code={headingsCode} filename="theme_properties.dart" />
      </div>

      <div className="rounded-lg border p-4 text-sm">
        <p className="font-medium mb-3">GptMarkdownThemeData reference</p>
        <table className="w-full text-xs text-muted-foreground">
          <thead>
            <tr className="border-b">
              <th className="text-left py-1 pr-4 font-medium text-foreground">Property</th>
              <th className="text-left py-1 pr-4 font-medium text-foreground">Type</th>
              <th className="text-left py-1 font-medium text-foreground">Description</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-b [&>tr:last-child]:border-0">
            {[
              ["brightness", "Brightness", "Required. Sets default colors for light or dark mode."],
              ["h1 – h6", "TextStyle?", "Override heading text styles individually."],
              ["highlightColor", "Color?", "Background color for inline code spans."],
              ["linkColor", "Color?", "Default link color."],
              ["linkHoverColor", "Color?", "Link color on hover (web)."],
              ["hrLineColor", "Color?", "Color of horizontal rule lines."],
              ["hrLineThickness", "double?", "Stroke width of horizontal rules."],
              ["hrLinePadding", "EdgeInsets?", "Padding around horizontal rules."],
              ["autoAddDividerLineAfterH1", "bool?", "Insert a divider line below H1 headings."],
            ].map(([prop, type, desc]) => (
              <tr key={prop}>
                <td className="py-1.5 pr-4 font-mono text-foreground">{prop}</td>
                <td className="py-1.5 pr-4">{type}</td>
                <td className="py-1.5">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between pt-2">
        <Link href="/docs/syntax-highlighting" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          ← Syntax Highlighting
        </Link>
        <Link href="/docs/style-configuration" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
          Style & Parameters <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
