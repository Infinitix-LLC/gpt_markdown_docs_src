import type { Metadata } from "next";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Themes & Style Configuration — GptMarkdown v1.2.1",
  description:
    "Three-layer customization model for GptMarkdown v1.2.1: GptMarkdownStyleSheet with 12 per-component style classes, GptMarkdownThemeData for app-wide defaults, and GptMarkdownTheme for scoped overrides. Merge/precedence rules and legacy heading fields explained.",
  alternates: { canonical: "https://gptmarkdown.com/docs/themes" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Themes & Style Configuration — GptMarkdown v1.2.1",
    description:
      "Three-layer customization model for GptMarkdown v1.2.1: GptMarkdownStyleSheet with 12 per-component style classes, GptMarkdownThemeData for app-wide defaults, and GptMarkdownTheme for scoped overrides. Merge/precedence rules and legacy heading fields explained.",
    url: "https://gptmarkdown.com/docs/themes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Themes & Style Configuration — GptMarkdown v1.2.1",
    description:
      "Three-layer customization model for GptMarkdown v1.2.1: GptMarkdownStyleSheet with 12 per-component style classes, GptMarkdownThemeData for app-wide defaults, and GptMarkdownTheme for scoped overrides. Merge/precedence rules and legacy heading fields explained.",
    images: ["/twitter-image"],
  },
};

// ─── code snippets ────────────────────────────────────────────────────────────

const styleSheetWidgetCode = `// Per-widget: only this GptMarkdown is affected.
GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    blockQuote: BlockQuoteStyle(barWidth: 4, barColor: Colors.indigo),
    codeBlock: CodeBlockStyle(
      borderRadius: Radius.circular(12),
      showCopyButton: true,
    ),
    latex: LatexStyle(scrollBlockHorizontally: true),
  ),
)`;

const themeExtensionCode = `// App-wide: register GptMarkdownThemeData as a ThemeData extension.
// Light and dark each need their own — the extension lives on ThemeData.
MaterialApp(
  theme: ThemeData.light().copyWith(
    extensions: [
      GptMarkdownThemeData(
        brightness: Brightness.light,
        styleSheet: const GptMarkdownStyleSheet(
          link: LinkStyle(decoration: TextDecoration.none),
          table: TableStyle(cellPadding: EdgeInsets.all(10)),
        ),
        // Legacy heading fields — still work; a styleSheet.heading wins field-by-field.
        h1: const TextStyle(fontSize: 28, fontWeight: FontWeight.w800),
        linkColor: Colors.indigo,
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

const scopedThemeCode = `// Scoped: wrap specific widgets with GptMarkdownTheme.
// Takes priority over the ThemeData extension.
GptMarkdownTheme(
  gptThemeData: GptMarkdownThemeData(
    brightness: Brightness.light,
    h1: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900),
    linkColor: Colors.deepPurple,
    hrLineColor: Colors.grey.shade300,
    hrLineThickness: 1.5,
    hrLinePadding: const EdgeInsets.symmetric(vertical: 8),
  ),
  child: GptMarkdown(content),
)`;

const mergeCode = `// Precedence — per field, not per object:
//   widget styleSheet  →  theme styleSheet  →  package default
//
// With both set, the blockquote gets barWidth: 4 from the widget
// AND barColor from the theme. Overriding one value never discards the rest.

MaterialApp(
  theme: ThemeData(
    extensions: [
      GptMarkdownThemeData(
        brightness: Brightness.light,
        styleSheet: const GptMarkdownStyleSheet(
          blockQuote: BlockQuoteStyle(barColor: Colors.indigo),
        ),
      ),
    ],
  ),
  home: GptMarkdown(
    text,
    styleSheet: const GptMarkdownStyleSheet(
      blockQuote: BlockQuoteStyle(barWidth: 4),  // barColor still comes from theme
    ),
  ),
)`;

// ─── component ────────────────────────────────────────────────────────────────

export default function ThemesPage() {
  return (
    <div className="space-y-10">
      {/* Intro */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Themes &amp; Styles</h1>
        <p className="text-muted-foreground leading-7">
          GptMarkdown v1.2.1 has three customization layers. They never overlap — each serves a distinct purpose.
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          {[
            ["Style object", "Appearance: colours, sizes, padding, fonts", "GptMarkdownStyleSheet"],
            ["Builder", "Structure: replace the widget entirely", "codeBuilder, blockQuoteBuilder, …"],
            ["Theme data", "Defaults for the whole app or a subtree", "GptMarkdownThemeData"],
          ].map(([label, desc, example]) => (
            <div key={label} className="rounded-lg border p-4">
              <p className="font-semibold text-sm mb-1">{label}</p>
              <p className="text-xs text-muted-foreground mb-2">{desc}</p>
              <p className="font-mono text-xs text-muted-foreground">{example}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          The rule: <strong>style object for looks, builder for structure.</strong> A builder loses every future improvement to that component; a style object keeps it.
        </p>
      </div>

      {/* Layer 1 — GptMarkdownStyleSheet */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Layer 1 — GptMarkdownStyleSheet</h2>
        <p className="text-muted-foreground text-sm">
          Pass a <code className="bg-muted rounded px-1 text-xs">GptMarkdownStyleSheet</code> to a single widget.
          Every field is optional; anything unset keeps the package default — adding a style sheet never changes how
          existing content looks.
        </p>
        <CodeBlock language="dart" code={styleSheetWidgetCode} filename="widget_style.dart" />

        <details className="rounded-lg border group">
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
            All 12 style fields <span className="float-right text-xs font-normal text-muted-foreground group-open:hidden">show reference</span><span className="float-right hidden text-xs font-normal text-muted-foreground group-open:inline">hide reference</span>
          </summary>
          <div className="overflow-x-auto border-t p-4" role="region" aria-label="Style sheet fields" tabIndex={0}>
            <table className="min-w-[680px] w-full text-xs text-muted-foreground">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1 pr-4 font-medium text-foreground">Field</th>
                <th className="text-left py-1 pr-4 font-medium text-foreground">Type</th>
                <th className="text-left py-1 font-medium text-foreground">Controls</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr:last-child]:border-0">
              {[
                ["blockQuote", "BlockQuoteStyle?", "Bar width/colour/radius, background, padding, margin, text style"],
                ["heading", "HeadingStyle?", "Text style overlay, padding, showDivider, divider colour/thickness/padding"],
                ["link", "LinkStyle?", "Colour, hover colour, decoration, decorationThickness, fontWeight"],
                ["inlineCode", "InlineCodeStyle?", "Font, fontSizeFactor, colour, background, border, radius, padding, boxHeightStyle"],
                ["list", "ListStyle?", "Bullet size/colour/shape, marker text style, indent, gapAfterMarker"],
                ["checkbox", "CheckboxStyle?", "Size, checked/unchecked/check colour, borderRadius, gapAfterBox, interactive"],
                ["codeBlock", "CodeBlockStyle?", "Background, border, radius, padding, font, showLanguageLabel, copy button, labels"],
                ["table", "TableStyle?", "Border colour/width/radius, cellPadding, header background/text style, row stripe"],
                ["image", "ImageStyle?", "Border radius, padding, fit, maxWidth, maxHeight"],
                ["hr", "HrStyle?", "Thickness, colour, padding"],
                ["sourceTag", "SourceTagStyle?", "Background, text style, size, shape, padding (the [1] citation chip)"],
                ["latex", "LatexStyle?", "Text style, padding, background, border radius, scrollBlockHorizontally"],
              ].map(([field, type, desc]) => (
                <tr key={field}>
                  <td className="py-1.5 pr-4 font-mono text-foreground">{field}</td>
                  <td className="py-1.5 pr-4">{type}</td>
                  <td className="py-1.5">{desc}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </details>
      </div>

      {/* Layer 2 — GptMarkdownThemeData (app-wide) */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Layer 2 — App-wide via GptMarkdownThemeData</h2>
        <p className="text-muted-foreground text-sm">
          Register <code className="bg-muted rounded px-1 text-xs">GptMarkdownThemeData</code> as a{" "}
          <code className="bg-muted rounded px-1 text-xs">ThemeData</code> extension.
          The <code className="bg-muted rounded px-1 text-xs">brightness</code> parameter is required so default colours
          are derived correctly. Light and dark themes each need their own instance.
        </p>
        <CodeBlock language="dart" code={themeExtensionCode} filename="main.dart" />
      </div>

      {/* Layer 3 — GptMarkdownTheme (scoped) */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Layer 3 — Scoped via GptMarkdownTheme</h2>
        <p className="text-muted-foreground text-sm">
          <code className="bg-muted rounded px-1 text-xs">GptMarkdownTheme</code> is an{" "}
          <code className="bg-muted rounded px-1 text-xs">InheritedWidget</code> that overrides the{" "}
          <code className="bg-muted rounded px-1 text-xs">ThemeData</code> extension for its subtree.
          Use it when one screen needs different styling without changing the global theme.
        </p>
        <CodeBlock language="dart" code={scopedThemeCode} filename="scoped_theme.dart" />
      </div>

      {/* Merge / precedence */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Merge &amp; precedence</h2>
        <p className="text-muted-foreground text-sm">
          The merge happens <em>per field</em>, not per object. A widget-level value wins over the theme value for the
          same field, and any field left unset falls back to the package default.
        </p>
        <div className="rounded-lg bg-muted/40 border px-4 py-3 font-mono text-xs">
          widget styleSheet field &nbsp;→&nbsp; theme styleSheet field &nbsp;→&nbsp; package default
        </div>
        <CodeBlock language="dart" code={mergeCode} filename="merge_example.dart" />
      </div>

      {/* Legacy heading fields */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Legacy GptMarkdownThemeData fields</h2>
        <p className="text-muted-foreground text-sm">
          These fields from v1.1.x are still fully supported. A{" "}
          <code className="bg-muted rounded px-1 text-xs">styleSheet.heading</code> or{" "}
          <code className="bg-muted rounded px-1 text-xs">styleSheet.link</code> value wins over them field-by-field where
          both are set.
        </p>
        <details className="rounded-lg border group">
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
            Legacy field reference <span className="float-right text-xs font-normal text-muted-foreground group-open:hidden">show reference</span><span className="float-right hidden text-xs font-normal text-muted-foreground group-open:inline">hide reference</span>
          </summary>
          <div className="overflow-x-auto border-t p-4" role="region" aria-label="Legacy theme fields" tabIndex={0}>
            <table className="min-w-[680px] w-full text-xs text-muted-foreground">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1 pr-4 font-medium text-foreground">Field</th>
                <th className="text-left py-1 pr-4 font-medium text-foreground">Type</th>
                <th className="text-left py-1 font-medium text-foreground">Notes</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr:last-child]:border-0">
              {[
                ["brightness", "Brightness", "Required. Drives default colour derivation."],
                ["h1 – h6", "TextStyle?", "Per-level heading text style. HeadingStyle.textStyle is merged over these."],
                ["highlightColor", "Color?", "Legacy inline-code chip fill. Equivalent to inlineCode: InlineCodeStyle(backgroundColor: …)."],
                ["linkColor", "Color?", "Default link colour. Superseded by styleSheet.link.color."],
                ["linkHoverColor", "Color?", "Link hover colour (web). Superseded by styleSheet.link.hoverColor."],
                ["hrLineColor", "Color?", "Horizontal rule colour. Superseded by styleSheet.hr.color."],
                ["hrLineThickness", "double?", "Rule stroke width. Superseded by styleSheet.hr.thickness."],
                ["hrLinePadding", "EdgeInsets?", "Padding around rules. Superseded by styleSheet.hr.padding."],
                ["autoAddDividerLineAfterH1", "bool?", "Insert a divider after h1. Superseded by HeadingStyle.showDivider."],
                ["inlineCode", "InlineCodeStyle?", "App-wide inline code style (v1.2.0). Partial — unset fields derive from ColorScheme."],
                ["styleSheet", "GptMarkdownStyleSheet?", "App-wide per-component styles (v1.2.0)."],
              ].map(([field, type, desc]) => (
                <tr key={field}>
                  <td className="py-1.5 pr-4 font-mono text-foreground">{field}</td>
                  <td className="py-1.5 pr-4">{type}</td>
                  <td className="py-1.5">{desc}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </details>
        <div className="rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm">
          <p className="font-medium text-amber-800 dark:text-amber-300 mb-1">Dark mode needs its own extension</p>
          <p className="text-amber-700 dark:text-amber-400 text-xs leading-relaxed">
            <code className="bg-amber-100 dark:bg-amber-900 rounded px-1">GptMarkdownThemeData</code> lives on{" "}
            <code className="bg-amber-100 dark:bg-amber-900 rounded px-1">ThemeData</code>, so{" "}
            <code className="bg-amber-100 dark:bg-amber-900 rounded px-1">theme:</code> and{" "}
            <code className="bg-amber-100 dark:bg-amber-900 rounded px-1">darkTheme:</code> each need one — with{" "}
            <code className="bg-amber-100 dark:bg-amber-900 rounded px-1">brightness:</code> set to match,
            or the derived defaults will be wrong.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <Link href="/docs/syntax-highlighting" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          ← Syntax Highlighting
        </Link>
        <Link href="/docs/style-configuration" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
          API Reference <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
