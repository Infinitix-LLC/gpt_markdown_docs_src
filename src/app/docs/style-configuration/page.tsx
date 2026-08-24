import type { Metadata } from "next";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "GptMarkdown API Reference — All Constructor Parameters v1.2.1",
  description:
    "Complete v1.2.1 API reference for the GptMarkdown widget: every constructor parameter, all builder typedefs with exact signatures, callbacks, deprecated highlightBuilder, and the full builder/callback matrix.",
  alternates: { canonical: "https://gptmarkdown.com/docs/style-configuration" },
  openGraph: {
    ...sharedOpenGraph,
    title: "GptMarkdown API Reference — All Constructor Parameters v1.2.1",
    description:
      "Complete v1.2.1 API reference for the GptMarkdown widget: every constructor parameter, all builder typedefs with exact signatures, callbacks, deprecated highlightBuilder, and the full builder/callback matrix.",
    url: "https://gptmarkdown.com/docs/style-configuration",
  },
  twitter: {
    card: "summary_large_image",
    title: "GptMarkdown API Reference — All Constructor Parameters v1.2.1",
    description:
      "Complete v1.2.1 API reference for the GptMarkdown widget: every constructor parameter, all builder typedefs with exact signatures, callbacks, deprecated highlightBuilder, and the full builder/callback matrix.",
    images: ["/twitter-image"],
  },
};

// ─── code snippets ────────────────────────────────────────────────────────────

const fullSignatureCode = `const GptMarkdown(
  this.data, {           // required positional String
  super.key,

  // ── Text ───────────────────────────────────────────
  this.style,            // TextStyle?
  this.textDirection = TextDirection.ltr,
  this.textAlign,        // TextAlign?
  this.textScaler,       // TextScaler?
  this.maxLines,         // int?
  this.overflow,         // TextOverflow?

  // ── Appearance ─────────────────────────────────────
  this.styleSheet,       // GptMarkdownStyleSheet?  — 12 per-component styles
  this.inlineCodeStyle,  // InlineCodeStyle?        — inline code only

  // ── Links ──────────────────────────────────────────
  this.followLinkColor = false,
  this.onLinkTap,        // void Function(String url, String title)?
  this.linkBuilder,      // LinkBuilder?

  // ── Autolinks ──────────────────────────────────────
  this.autolink = true,
  this.autolinkSchemes = const <String>{},

  // ── LaTeX ──────────────────────────────────────────
  this.useDollarSignsForLatex = false,
  this.latexWorkaround,  // String Function(String tex)?
  this.latexBuilder,     // LatexBuilder?

  // ── Code blocks ────────────────────────────────────
  this.codeBuilder,      // CodeBlockBuilder?

  // ── Inline code ────────────────────────────────────
  this.inlineCodeBuilder,  // InlineCodeBuilder?   — returns InlineSpan, not Widget
  @Deprecated('Use inlineCodeBuilder. Will be removed in 2.0.0.')
  this.highlightBuilder,   // HighlightBuilder?    — returns Widget

  // ── Images ─────────────────────────────────────────
  this.imageBuilder,     // ImageBuilder?
  this.onImageTap,       // void Function(String url)?

  // ── Lists ──────────────────────────────────────────
  this.orderedListBuilder,   // OrderedListBuilder?
  this.unOrderedListBuilder, // UnOrderedListBuilder?

  // ── Tables ─────────────────────────────────────────
  this.tableBuilder,     // TableBuilder?

  // ── Headings ───────────────────────────────────────
  this.headingBuilder,   // HeadingBuilder?

  // ── Block quotes ───────────────────────────────────
  this.blockQuoteBuilder, // BlockQuoteBuilder?

  // ── Checkboxes / radio ─────────────────────────────
  this.checkboxBuilder,    // CheckboxBuilder?
  this.radioOptionBuilder, // RadioOptionBuilder?
  this.onCheckboxChanged,  // void Function(bool value)?

  // ── Horizontal rules ───────────────────────────────
  this.hrBuilder,        // HrBuilder?

  // ── Source tags (citations) ────────────────────────
  this.sourceTagBuilder, // SourceTagBuilder?
  this.onSourceTagTap,   // void Function(String content)?

  // ── Copy ───────────────────────────────────────────
  this.onCodeCopy,       // void Function(String code)?

  // ── Custom components ──────────────────────────────
  this.components,       // List<MarkdownComponent>?  — replaces block defaults if set
  this.inlineComponents, // List<MarkdownComponent>?  — replaces inline defaults if set
  this.inlinePatterns,   // List<InlinePattern>?      — @mention, #channel, :emoji:

  // ── Streaming ──────────────────────────────────────
  this.animation = GptMarkdownAnimation.none,
  this.isStreaming = true,
  this.charactersPerSecond = 300,
})`;

const builderSignaturesCode = `// ── Builders ─────────────────────────────────────────────────────────────────

typedef HeadingBuilder =
    Widget Function(BuildContext context, int level, Widget content, HeadingStyle style);

typedef BlockQuoteBuilder =
    Widget Function(BuildContext context, Widget content, BlockQuoteStyle style);

typedef CheckboxBuilder =
    Widget Function(BuildContext context, bool checked, Widget content, CheckboxStyle style);

typedef RadioOptionBuilder =
    Widget Function(BuildContext context, bool selected, Widget content, CheckboxStyle style);

typedef HrBuilder = Widget Function(BuildContext context, HrStyle style);

typedef CodeBlockBuilder =
    Widget Function(BuildContext context, String name, String code, bool closed);

typedef TableBuilder =
    Widget Function(BuildContext context, List<CustomTableRow> tableRows,
                    TextStyle textStyle, GptMarkdownConfig config);

typedef ImageBuilder =
    Widget Function(BuildContext context, String imageUrl, double? width, double? height);

typedef LatexBuilder =
    Widget Function(BuildContext context, String tex, TextStyle textStyle, bool inline);

typedef LinkBuilder =
    Widget Function(BuildContext context, InlineSpan text, String url, TextStyle style);

// Returns InlineSpan. Return CodeTextSpan to keep the package's painted,
// baseline-aligned, selectable, wrappable chip; another TextSpan drops the chip.
typedef InlineCodeBuilder =
    InlineSpan Function(BuildContext context, String code, TextStyle style,
                        InlineCodeStyle codeStyle);

typedef SourceTagBuilder =
    Widget Function(BuildContext context, String content, TextStyle textStyle);

typedef OrderedListBuilder =
    Widget Function(BuildContext context, String no, Widget child, GptMarkdownConfig config);

typedef UnOrderedListBuilder =
    Widget Function(BuildContext context, Widget child, GptMarkdownConfig config);

// ── Deprecated ───────────────────────────────────────────────────────────────

// highlightBuilder: returns Widget (wrapped in WidgetSpan — cannot wrap across
// lines, skipped by selection, invisible on iOS inside a link label).
// Deprecated in v1.2.0. Will be removed in 2.0.0.
// Prefer inlineCodeStyle for restyling, or inlineCodeBuilder for a custom span.
@Deprecated('Use inlineCodeBuilder. Will be removed in 2.0.0.')
typedef HighlightBuilder =
    Widget Function(BuildContext context, String text, TextStyle style);`;

const inlineCodeMigrationCode = `// Before (highlightBuilder — deprecated)
GptMarkdown(
  text,
  highlightBuilder: (context, code, style) => MyChip(code, style),
)

// After — restyle only, no builder needed
GptMarkdown(
  text,
  inlineCodeStyle: const InlineCodeStyle(fontFamily: 'GeistMono'),
)

// After — custom span (stays on baseline, wraps, stays selectable)
GptMarkdown(
  text,
  inlineCodeBuilder: (context, code, style, codeStyle) => CodeTextSpan(
    text: code,
    style: style,
    codeStyle: codeStyle.copyWith(
      backgroundColor: code.startsWith('TODO') ? Colors.amber : null,
    ),
  ),
)

// After — widget genuinely required
GptMarkdown(
  text,
  inlineCodeBuilder: (context, code, style, codeStyle) =>
      baselineWidgetSpan(MyChip(code: code, style: style)),
)`;

// ─── parameter table data ─────────────────────────────────────────────────────

type Param = { name: string; type: string; req: boolean; group: string; desc: string };

const params: Param[] = [
  // Text
  { name: "data", type: "String", req: true, group: "Text", desc: "The Markdown string to render. Positional." },
  { name: "style", type: "TextStyle?", req: false, group: "Text", desc: "Base text style applied to all text." },
  { name: "textDirection", type: "TextDirection", req: false, group: "Text", desc: "LTR (default) or RTL for Arabic, Hebrew, etc." },
  { name: "textAlign", type: "TextAlign?", req: false, group: "Text", desc: "Text alignment within the widget." },
  { name: "textScaler", type: "TextScaler?", req: false, group: "Text", desc: "Scales text size; also propagated to inline widgets via MediaQuery." },
  { name: "maxLines", type: "int?", req: false, group: "Text", desc: "Limit rendered lines. null = unlimited." },
  { name: "overflow", type: "TextOverflow?", req: false, group: "Text", desc: "Overflow behaviour when maxLines is set." },
  // Appearance
  { name: "styleSheet", type: "GptMarkdownStyleSheet?", req: false, group: "Appearance", desc: "12 per-component style objects. Widget values win over theme values per field." },
  { name: "inlineCodeStyle", type: "InlineCodeStyle?", req: false, group: "Appearance", desc: "Inline code style for this widget only. Unset fields derive from ColorScheme." },
  // Links
  { name: "followLinkColor", type: "bool", req: false, group: "Links", desc: "If true, links inherit the base text colour instead of linkColor." },
  { name: "onLinkTap", type: "void Function(String url, String title)?", req: false, group: "Links", desc: "Callback when a Markdown link is tapped. title is the label text." },
  { name: "linkBuilder", type: "LinkBuilder?", req: false, group: "Links", desc: "Fully replace the link widget. Receives the resolved label InlineSpan." },
  // Autolinks
  { name: "autolink", type: "bool", req: false, group: "Autolinks", desc: "Bare URLs, www. hosts, emails and <…> autolinks become links. Default true." },
  { name: "autolinkSchemes", type: "Set<String>", req: false, group: "Autolinks", desc: "Extra URI schemes linked bare (http/https/mailto/xmpp always included)." },
  // LaTeX
  { name: "useDollarSignsForLatex", type: "bool", req: false, group: "LaTeX", desc: "Enable $…$ and $$…$$ syntax in addition to \\(…\\) and \\[…\\]." },
  { name: "latexWorkaround", type: "String Function(String)?", req: false, group: "LaTeX", desc: "Transform LaTeX strings before rendering (normalise AI output quirks)." },
  { name: "latexBuilder", type: "LatexBuilder?", req: false, group: "LaTeX", desc: "Replace the default LaTeX renderer. inline is true for \\(…\\)." },
  // Code blocks
  { name: "codeBuilder", type: "CodeBlockBuilder?", req: false, group: "Code", desc: "Replace the fenced code block renderer. closed is false while still streaming." },
  // Inline code
  { name: "inlineCodeBuilder", type: "InlineCodeBuilder?", req: false, group: "Code", desc: "Replace inline `code` span. Return CodeTextSpan to retain the painted chip, baseline alignment, selection, and wrapping; another TextSpan drops the chip." },
  { name: "highlightBuilder ⚠️", type: "HighlightBuilder? (deprecated)", req: false, group: "Code", desc: "Deprecated. Returns Widget, causing baseline/selection/iOS issues. Use inlineCodeStyle or inlineCodeBuilder." },
  // Images
  { name: "imageBuilder", type: "ImageBuilder?", req: false, group: "Images", desc: "Replace the image renderer. width/height come from alt text parsed as WxH." },
  { name: "onImageTap", type: "void Function(String url)?", req: false, group: "Images", desc: "Called with the image URL when an image is tapped." },
  // Lists
  { name: "orderedListBuilder", type: "OrderedListBuilder?", req: false, group: "Lists", desc: "Replace the ordered list item renderer. no is the number string, e.g. '1'." },
  { name: "unOrderedListBuilder", type: "UnOrderedListBuilder?", req: false, group: "Lists", desc: "Replace the unordered list item renderer." },
  // Tables
  { name: "tableBuilder", type: "TableBuilder?", req: false, group: "Tables", desc: "Replace the table renderer. Receives List<CustomTableRow>, the resolved TextStyle and GptMarkdownConfig." },
  // Headings
  { name: "headingBuilder", type: "HeadingBuilder?", req: false, group: "Headings", desc: "Replace the whole heading widget. level is 1–6. Owns the h1 divider rule." },
  // Block quotes
  { name: "blockQuoteBuilder", type: "BlockQuoteBuilder?", req: false, group: "Block quotes", desc: "Replace the whole blockquote. content is already-rendered; style is resolved BlockQuoteStyle." },
  // Checkboxes
  { name: "checkboxBuilder", type: "CheckboxBuilder?", req: false, group: "Checkboxes", desc: "Replace the task-list checkbox row. Wire taps through onCheckboxChanged." },
  { name: "radioOptionBuilder", type: "RadioOptionBuilder?", req: false, group: "Checkboxes", desc: "Replace the radio option row." },
  { name: "onCheckboxChanged", type: "void Function(bool)?", req: false, group: "Checkboxes", desc: "Called on checkbox tap. Only fires when CheckboxStyle(interactive: true)." },
  // Horizontal rules
  { name: "hrBuilder", type: "HrBuilder?", req: false, group: "Horizontal rules", desc: "Replace the horizontal rule. style is the resolved HrStyle." },
  // Source tags
  { name: "sourceTagBuilder", type: "SourceTagBuilder?", req: false, group: "Citations", desc: "Render [1] citation chips. content is the number/text inside the brackets." },
  { name: "onSourceTagTap", type: "void Function(String)?", req: false, group: "Citations", desc: "Called with the tag content when a citation chip is tapped." },
  // Copy
  { name: "onCodeCopy", type: "void Function(String code)?", req: false, group: "Code", desc: "Called with the code string after the copy button is used." },
  // Custom components
  { name: "components", type: "List<MarkdownComponent>?", req: false, group: "Custom", desc: "Replaces the block component list entirely if set. Prepend custom items and append MarkdownComponent.globalComponents." },
  { name: "inlineComponents", type: "List<MarkdownComponent>?", req: false, group: "Custom", desc: "Replaces the inline component list entirely if set. Prepend custom items and append MarkdownComponent.inlineComponents." },
  { name: "inlinePatterns", type: "List<InlinePattern>?", req: false, group: "Custom", desc: "@mention, #channel, :emoji: patterns. Matched ahead of built-ins. Default scope excludes link labels." },
  // Streaming
  { name: "animation", type: "GptMarkdownAnimation", req: false, group: "Streaming", desc: "GptMarkdownAnimation.none (default) or .fade for a streaming reveal." },
  { name: "isStreaming", type: "bool", req: false, group: "Streaming", desc: "Whether more text may still arrive. Flip to false when the stream ends." },
  { name: "charactersPerSecond", type: "double", req: false, group: "Streaming", desc: "Baseline reveal speed. The reveal auto-accelerates when behind the incoming text." },
];

const groups = [...new Set(params.map((p) => p.group))];

// ─── component ────────────────────────────────────────────────────────────────

export default function StyleConfigurationPage() {
  return (
    <div className="space-y-10">
      {/* Intro */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">API Reference</h1>
        <p className="text-muted-foreground leading-7">
          Use the{" "}
          <Link href="/docs/usage" className="text-primary hover:underline">basic guide</Link>{" "}
          first. This page is the lookup sheet for parameters, builders, and advanced customization.
        </p>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-5 dark:border-blue-900 dark:bg-blue-950/20">
        <h2 className="mt-0 text-xl font-semibold">The three things you usually need</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3 text-sm">
          <div><strong>Looks?</strong><p className="mt-1 text-xs text-muted-foreground">Use <code>styleSheet</code>.</p></div>
          <div><strong>Different widget?</strong><p className="mt-1 text-xs text-muted-foreground">Use a component builder.</p></div>
          <div><strong>App-specific token?</strong><p className="mt-1 text-xs text-muted-foreground">Use <code>inlinePatterns</code>.</p></div>
        </div>
      </div>

      {/* Full signature */}
      <details className="rounded-xl border group">
        <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-lg [&::-webkit-details-marker]:hidden">
          Full constructor signature <span className="float-right text-sm font-normal text-muted-foreground group-open:hidden">show</span><span className="float-right hidden text-sm font-normal text-muted-foreground group-open:inline">hide</span>
        </summary>
        <div className="border-t p-4">
          <CodeBlock language="dart" code={fullSignatureCode} filename="gpt_markdown.dart" />
        </div>
      </details>

      {/* Parameter table */}
      <details className="rounded-xl border group">
        <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-lg [&::-webkit-details-marker]:hidden">
          All parameters <span className="float-right text-sm font-normal text-muted-foreground group-open:hidden">show reference</span><span className="float-right hidden text-sm font-normal text-muted-foreground group-open:inline">hide reference</span>
        </summary>
        <div className="border-t p-4 space-y-3">
          <p className="text-sm text-muted-foreground">Open a category only when you need to look up a specific option.</p>
          {groups.map((group) => {
            const groupParams = params.filter((p) => p.group === group);
            return (
              <div key={group} className="rounded-xl border overflow-x-auto mb-4" role="region" aria-label={`${group} parameter reference`} tabIndex={0}>
                <div className="bg-muted/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group}
                </div>
                <table className="min-w-[760px] w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left px-4 py-2 font-medium text-xs text-muted-foreground w-[210px]">Parameter</th>
                      <th className="text-left px-4 py-2 font-medium text-xs text-muted-foreground w-[190px]">Type</th>
                      <th className="text-left px-4 py-2 font-medium text-xs text-muted-foreground w-[50px]">Req.</th>
                      <th className="text-left px-4 py-2 font-medium text-xs text-muted-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupParams.map(({ name, type, req, desc }, i) => (
                      <tr key={name} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                        <td className={`px-4 py-2.5 font-mono text-xs ${name.includes("⚠️") ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`}>
                          {name}
                        </td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground">{type}</td>
                        <td className="px-4 py-2.5 text-center text-xs">{req ? "✅" : ""}</td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </details>

      {/* Builder signatures */}
      <details className="rounded-xl border group">
        <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-lg [&::-webkit-details-marker]:hidden">
          Builder &amp; callback signatures <span className="float-right text-sm font-normal text-muted-foreground group-open:hidden">show reference</span><span className="float-right hidden text-sm font-normal text-muted-foreground group-open:inline">hide reference</span>
        </summary>
        <div className="border-t p-4 space-y-3">
          <p className="text-muted-foreground text-sm">
            Builder arguments depend on the component. Builders that accept a style receive the resolved style; other
            builders receive component data such as code, dimensions, or the streaming <code>closed</code> flag.
            <code className="bg-muted rounded px-1 text-xs">inlineCodeBuilder</code> returns an{" "}
            <code className="bg-muted rounded px-1 text-xs">InlineSpan</code>. Return a{" "}
            <code className="bg-muted rounded px-1 text-xs">CodeTextSpan</code> to preserve the package&apos;s painted
            chip, baseline alignment, selection, and wrapping; a different <code className="bg-muted rounded px-1 text-xs">TextSpan</code> deliberately drops the chip.
          </p>
          <CodeBlock language="dart" code={builderSignaturesCode} filename="typedefs.dart" />
        </div>
      </details>

      {/* Deprecated highlightBuilder migration */}
      <details className="rounded-xl border group">
        <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-lg [&::-webkit-details-marker]:hidden">
          Migrating from highlightBuilder <span className="float-right text-sm font-normal text-muted-foreground group-open:hidden">show migration</span><span className="float-right hidden text-sm font-normal text-muted-foreground group-open:inline">hide migration</span>
        </summary>
        <div className="border-t p-4 space-y-3">
          <div className="rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm">
            <p className="font-medium text-amber-800 dark:text-amber-300 mb-1">Deprecated — scheduled for removal in 2.0.0</p>
            <p className="text-amber-700 dark:text-amber-400 text-xs leading-relaxed">
              <code className="bg-amber-100 dark:bg-amber-900 rounded px-1">highlightBuilder</code> returned a Widget
              wrapped in a WidgetSpan at a hardcoded <code className="bg-amber-100 dark:bg-amber-900 rounded px-1">PlaceholderAlignment.middle</code>.
              That placement sat off the baseline, could not wrap across lines, was skipped by text selection, and did not
              paint on iOS inside a link label. Most callers only needed restyling and no longer need a builder at all.
            </p>
          </div>
          <CodeBlock language="dart" code={inlineCodeMigrationCode} filename="migration.dart" />
        </div>
      </details>

      {/* Builder/callback matrix */}
      <details className="rounded-xl border group">
        <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-lg [&::-webkit-details-marker]:hidden">
          Builder &amp; callback matrix <span className="float-right text-sm font-normal text-muted-foreground group-open:hidden">show reference</span><span className="float-right hidden text-sm font-normal text-muted-foreground group-open:inline">hide reference</span>
        </summary>
        <div className="border-t p-4 space-y-3">
          <p className="text-muted-foreground text-sm">
            Use this as a lookup table when you know which component you want to replace.
          </p>
          <div className="rounded-xl border overflow-x-auto" role="region" aria-label="Builder and callback matrix" tabIndex={0}>
            <table className="min-w-[640px] w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/60">
                <th className="text-left px-4 py-2 font-semibold text-muted-foreground">Component</th>
                <th className="text-left px-4 py-2 font-semibold text-muted-foreground">Style class</th>
                <th className="text-left px-4 py-2 font-semibold text-muted-foreground">Builder param</th>
                <th className="text-left px-4 py-2 font-semibold text-muted-foreground">Callback param</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr:last-child]:border-0">
              {[
                ["Heading", "HeadingStyle", "headingBuilder", "—"],
                ["Block quote", "BlockQuoteStyle", "blockQuoteBuilder", "—"],
                ["Horizontal rule", "HrStyle", "hrBuilder", "—"],
                ["Checkbox / task list", "CheckboxStyle", "checkboxBuilder", "onCheckboxChanged"],
                ["Radio option", "CheckboxStyle", "radioOptionBuilder", "onCheckboxChanged"],
                ["Fenced code block", "CodeBlockStyle", "codeBuilder", "onCodeCopy"],
                ["Inline code", "InlineCodeStyle", "inlineCodeBuilder", "—"],
                ["Table", "TableStyle", "tableBuilder", "—"],
                ["Image", "ImageStyle", "imageBuilder", "onImageTap"],
                ["Link", "LinkStyle", "linkBuilder", "onLinkTap"],
                ["Ordered list item", "ListStyle", "orderedListBuilder", "—"],
                ["Unordered list item", "ListStyle", "unOrderedListBuilder", "—"],
                ["LaTeX (block & inline)", "LatexStyle", "latexBuilder", "—"],
                ["Citation chip [1]", "SourceTagStyle", "sourceTagBuilder", "onSourceTagTap"],
              ].map(([comp, style, builder, callback]) => (
                <tr key={comp} className="even:bg-muted/20">
                  <td className="px-4 py-2 font-medium text-foreground">{comp}</td>
                  <td className="px-4 py-2 font-mono text-muted-foreground">{style}</td>
                  <td className="px-4 py-2 font-mono text-muted-foreground">{builder}</td>
                  <td className="px-4 py-2 font-mono text-muted-foreground">{callback}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </details>

      {/* Common mistakes */}
      <details className="rounded-xl border group">
        <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-lg [&::-webkit-details-marker]:hidden">
          Common mistakes <span className="float-right text-sm font-normal text-muted-foreground group-open:hidden">show tips</span><span className="float-right hidden text-sm font-normal text-muted-foreground group-open:inline">hide tips</span>
        </summary>
        <div className="border-t p-4">
          <div className="space-y-3">
          <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-4 text-sm">
            <p className="font-medium text-red-800 dark:text-red-300 mb-1">Changing a builder at runtime does nothing</p>
            <p className="text-red-700 dark:text-red-400 text-xs leading-relaxed">
              <code className="bg-red-100 dark:bg-red-900 rounded px-1">GptMarkdownConfig.isSame</code> cannot
              compare closures — a consumer that writes builders inline creates a new one every build, so span
              regeneration would happen on every frame. Builder changes therefore require a key change or a remount.
              Style objects compare by value and update live. Pattern and component lists use element identity:
              rebuilding the list is fine when it contains the same instances, but replace an element instance when
              its matching behavior changes.
            </p>
          </div>
          <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-4 text-sm">
            <p className="font-medium text-red-800 dark:text-red-300 mb-1">A raw WidgetSpan scales twice</p>
            <p className="text-red-700 dark:text-red-400 text-xs leading-relaxed">
              A paragraph lays inline children out in scaled space and multiplies their reported size back. A child that
              also scales its own text is counted twice — up to 39× excess at a 2× system font setting. Use{" "}
              <code className="bg-red-100 dark:bg-red-900 rounded px-1">baselineWidgetSpan</code>, or wrap the child in{" "}
              <code className="bg-red-100 dark:bg-red-900 rounded px-1">MediaQuery.withNoTextScaling</code>.{" "}
              <code className="bg-red-100 dark:bg-red-900 rounded px-1">InlinePattern</code> does this for you.
            </p>
          </div>
          </div>
        </div>
      </details>

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <Link href="/docs/themes" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          ← Themes &amp; Styles
        </Link>
        <Link href="/docs/custom-components" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
          Custom Components <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
