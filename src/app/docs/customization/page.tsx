import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";

export const metadata: Metadata = {
  title: "Customization — Styles, Builders & Callbacks in GptMarkdown",
  description:
    "Copy-paste customization recipes for every gpt_markdown component: headings, links, inline code, lists, checkboxes, block quotes, code blocks, tables, images, rules, citations, and LaTeX.",
  alternates: { canonical: "https://gptmarkdown.com/docs/customization" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Customization — Styles, Builders & Callbacks in GptMarkdown",
    description:
      "Copy-paste customization recipes for every gpt_markdown component: headings, links, inline code, lists, checkboxes, block quotes, code blocks, tables, images, rules, citations, and LaTeX.",
    url: "https://gptmarkdown.com/docs/customization",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customization — Styles, Builders & Callbacks in GptMarkdown",
    description:
      "Copy-paste customization recipes for every gpt_markdown component: headings, links, inline code, lists, checkboxes, block quotes, code blocks, tables, images, rules, citations, and LaTeX.",
    images: ["/twitter-image"],
  },
};

/* ------------------------------------------------------------------ */
/* Where styles go                                                     */
/* ------------------------------------------------------------------ */

const widgetStyleCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    blockQuote: BlockQuoteStyle(barWidth: 4),
  ),
)`;

const appThemeCode = `MaterialApp(
  theme: ThemeData(
    extensions: [
      GptMarkdownThemeData(
        brightness: Brightness.light,
        styleSheet: const GptMarkdownStyleSheet(
          blockQuote: BlockQuoteStyle(barColor: Colors.indigo),
          codeBlock: CodeBlockStyle(borderRadius: Radius.circular(12)),
        ),
      ),
      // Dark needs its own — the extension is per ThemeData.
    ],
  ),
)`;

/* ------------------------------------------------------------------ */
/* Per-component recipes                                               */
/* ------------------------------------------------------------------ */

const headingStyleCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    heading: HeadingStyle(
      textStyle: TextStyle(letterSpacing: -0.5),
      padding: EdgeInsets.only(top: 8, bottom: 4),
      showDivider: false,
    ),
  ),
)`;

const headingLevelsCode = `GptMarkdownThemeData(
  brightness: Brightness.light,
  h1: Theme.of(context).textTheme.headlineMedium,
  h2: Theme.of(context).textTheme.titleLarge,
)`;

const headingBuilderCode = `GptMarkdown(
  text,
  headingBuilder: (context, level, content, style) => Row(
    crossAxisAlignment: CrossAxisAlignment.baseline,
    textBaseline: TextBaseline.alphabetic,
    children: [
      Flexible(child: content),
      IconButton(icon: const Icon(Icons.link), onPressed: () {}),
    ],
  ),
)`;

const linkStyleCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    link: LinkStyle(
      color: Color(0xFF0B57D0),
      hoverColor: Color(0xFF0842A0),
      decoration: TextDecoration.none,
      fontWeight: FontWeight.w500,
    ),
  ),
)`;

const linkTapCode = `GptMarkdown(text, onLinkTap: (url, title) => launchUrlString(url))`;

const linkConfirmCode = `onLinkTap: (url, title) async {
  final ok = await confirm('Open "$title"?\\n$url');
  if (ok) await launchUrlString(url);
},`;

const inlineCodeFontCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    inlineCode: InlineCodeStyle(fontFamily: 'GeistMono'),
  ),
)`;

const inlineCodeChipCode = `// A GitHub-ish chip:
inlineCode: InlineCodeStyle(
  backgroundColor: const Color(0x14656D76),
  borderColor: Colors.transparent,
  borderRadius: const Radius.circular(6),
  padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
),

// No chip at all, just monospace:
inlineCode: InlineCodeStyle(
  backgroundColor: Colors.transparent,
  borderWidth: 0,
  padding: EdgeInsets.zero,
),`;

const inlineCodeBuilderCode = `GptMarkdown(
  text,
  inlineCodeBuilder: (context, code, style, codeStyle) => CodeTextSpan(
    text: code,
    style: style,
    codeStyle: codeStyle.copyWith(
      backgroundColor: code.startsWith('TODO') ? Colors.amber : null,
    ),
  ),
)`;

const listStyleCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    list: ListStyle(
      bulletSize: 5,
      bulletColor: Colors.indigo,
      bulletShape: BoxShape.rectangle,
      indent: 12,
      gapAfterMarker: 12,
      markerTextStyle: TextStyle(fontWeight: FontWeight.w600),
    ),
  ),
)`;

const checkboxStyleCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    checkbox: CheckboxStyle(
      size: 18,
      checkedColor: Colors.green,
      borderRadius: Radius.circular(4),
      gapAfterBox: 8,
    ),
  ),
)`;

const checkboxInteractiveCode = `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    checkbox: CheckboxStyle(interactive: true),
  ),
  onCheckboxChanged: (value) {
    // Rewrite the source, or the tick reverts on the next build.
    setState(() => markdown = toggleFirstUnchecked(markdown));
  },
)`;

const blockQuoteStyleCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    blockQuote: BlockQuoteStyle(
      barWidth: 4,
      barColor: Color(0xFF6366F1),
      barRadius: Radius.circular(2),
      backgroundColor: Color(0x0A6366F1),
      padding: EdgeInsetsDirectional.only(start: 12, top: 8, bottom: 8),
      margin: EdgeInsets.symmetric(vertical: 8),
      textStyle: TextStyle(fontStyle: FontStyle.italic),
    ),
  ),
)`;

const blockQuoteBuilderCode = `GptMarkdown(
  text,
  blockQuoteBuilder: (context, content, style) => Card(
    color: Theme.of(context).colorScheme.surfaceContainerHighest,
    child: Padding(padding: const EdgeInsets.all(12), child: content),
  ),
)`;

const codeBlockStyleCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    codeBlock: CodeBlockStyle(
      backgroundColor: Color(0xFF1E1E1E),
      textColor: Color(0xFFD4D4D4),
      borderRadius: Radius.circular(12),
      padding: EdgeInsets.all(20),
      fontFamily: 'GeistMono',
      showLanguageLabel: true,
      showCopyButton: true,
    ),
  ),
)`;

const codeBlockLocalizeCode = `// Localise the copy button without replacing the block:
codeBlock: CodeBlockStyle(
  copyLabel: AppLocalizations.of(context).copyCode,
  copiedLabel: AppLocalizations.of(context).copied,
),

// React to a copy:
GptMarkdown(text, onCodeCopy: (code) => analytics.log('code_copied'))`;

const codeBlockWrapCode = `GptMarkdown(
  text,
  codeBuilder: (context, name, code, closed) => Container(
    width: double.infinity,
    padding: const EdgeInsets.all(12),
    color: Theme.of(context).colorScheme.surfaceContainerHighest,
    child: SelectableText(code, style: const TextStyle(fontFamily: 'monospace')),
  ),
)`;

const tableStyleCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    table: TableStyle(
      borderColor: Color(0x1F000000),
      borderWidth: 1,
      borderRadius: Radius.circular(8),
      cellPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      headerBackground: Color(0x0A000000),
      headerTextStyle: TextStyle(fontWeight: FontWeight.w600),
    ),
  ),
)`;

const imageStyleCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    image: ImageStyle(
      borderRadius: Radius.circular(8),
      padding: EdgeInsets.symmetric(vertical: 8),
      maxHeight: 320,
    ),
  ),
)`;

const imageBuilderCode = `GptMarkdown(
  text,
  imageBuilder: (context, url, width, height) => CachedNetworkImage(
    imageUrl: url,
    width: width,
    height: height,
    placeholder: (context, _) => const SizedBox(
      height: 120,
      child: Center(child: CircularProgressIndicator()),
    ),
    errorWidget: (context, _, __) => const Icon(Icons.broken_image),
  ),
  onImageTap: (url) => openLightbox(url),
)`;

const hrStyleCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    hr: HrStyle(
      thickness: 2,
      color: Color(0x1F000000),
      padding: EdgeInsets.symmetric(vertical: 16),
    ),
  ),
)`;

const hrBuilderCode = `GptMarkdown(
  text,
  hrBuilder: (context, style) => const Padding(
    padding: EdgeInsets.symmetric(vertical: 12),
    child: DottedLine(),
  ),
)`;

const sourceTagCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    sourceTag: SourceTagStyle(
      size: 18,
      backgroundColor: Color(0xFFE8DEF8),
      shape: BoxShape.rectangle,
      textStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w600),
    ),
  ),
  onSourceTagTap: (content) => showSource(content),
)`;

const latexStyleCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    latex: LatexStyle(
      scrollBlockHorizontally: true,
      padding: EdgeInsets.symmetric(vertical: 8),
      backgroundColor: Color(0x08000000),
      borderRadius: Radius.circular(6),
    ),
  ),
)`;

/* ------------------------------------------------------------------ */
/* Builders & callbacks                                                */
/* ------------------------------------------------------------------ */

const builderResolvedCode = `blockQuoteBuilder: (context, content, style) => DecoratedBox(
  decoration: BoxDecoration(
    border: BorderDirectional(
      start: BorderSide(
        // Follows the theme, because the resolved style is passed in.
        color: style.barColor ?? Colors.grey,
        width: style.barWidth ?? 3,
      ),
    ),
  ),
  child: content,
),`;

const baselineSpanCode = `inlineCodeBuilder: (context, code, style, codeStyle) =>
    baselineWidgetSpan(MyChip(code: code, style: style)),`;

const callbackCode = `GptMarkdown(
  text,
  onLinkTap: (url, title) => launchUrlString(url),
  onImageTap: (url) => openLightbox(url),
  onCodeCopy: (code) => analytics.log('code_copied'),
  onSourceTagTap: (content) => showSource(content),
  onCheckboxChanged: (value) => persist(value), // needs interactive: true
)`;

const builderRows = [
  ["headingBuilder", "(context, int level, Widget content, HeadingStyle style)"],
  ["blockQuoteBuilder", "(context, Widget content, BlockQuoteStyle style)"],
  ["checkboxBuilder", "(context, bool checked, Widget content, CheckboxStyle style)"],
  ["radioOptionBuilder", "(context, bool selected, Widget content, CheckboxStyle style)"],
  ["hrBuilder", "(context, HrStyle style)"],
  ["codeBuilder", "(context, String name, String code, bool closed)"],
  ["tableBuilder", "(context, rows, TextStyle style, GptMarkdownConfig config)"],
  ["imageBuilder", "(context, String url, double? width, double? height)"],
  ["latexBuilder", "(context, String tex, TextStyle style, bool inline)"],
  ["linkBuilder", "(context, InlineSpan label, String url, TextStyle style)"],
  ["inlineCodeBuilder", "(context, String code, TextStyle style, InlineCodeStyle codeStyle)"],
  ["sourceTagBuilder", "(context, String content, TextStyle style)"],
  ["orderedListBuilder", "(context, String no, Widget child, GptMarkdownConfig config)"],
  ["unOrderedListBuilder", "(context, Widget child, GptMarkdownConfig config)"],
];

/* ------------------------------------------------------------------ */
/* Section helpers                                                     */
/* ------------------------------------------------------------------ */

function FieldList({ fields }: { fields: string }) {
  return (
    <p className="font-mono text-xs leading-6 text-muted-foreground">{fields}</p>
  );
}

function Note({ tone = "note", title, children }: { tone?: "note" | "warning" | "tip"; title: string; children: React.ReactNode }) {
  const styles =
    tone === "warning"
      ? "border-amber-200 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/20"
      : tone === "tip"
        ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/20"
        : "border-border bg-muted/20";
  const titleColor =
    tone === "warning"
      ? "text-amber-900 dark:text-amber-200"
      : tone === "tip"
        ? "text-emerald-900 dark:text-emerald-200"
        : "text-foreground";
  return (
    <div className={`rounded-lg border p-4 text-sm ${styles}`}>
      <strong className={titleColor}>{title}</strong>
      <div className="mt-1 leading-6 text-muted-foreground">{children}</div>
    </div>
  );
}

export default function CustomizationPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Customization</h1>
        <p className="text-muted-foreground leading-7">
          Every component below comes with a copy-paste recipe. Use style objects for appearance — colours, sizes,
          padding, fonts — and builders when the structure itself must change. Every component supports both.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">The one rule: appearance vs. structure</h2>
        <div className="overflow-x-auto rounded-xl border" role="region" aria-label="Customization choices" tabIndex={0}>
          <table className="w-full min-w-[560px] text-sm">
            <thead className="border-b bg-muted/40 text-left text-muted-foreground">
              <tr><th className="px-4 py-3 font-medium">Use</th><th className="px-4 py-3 font-medium">For</th><th className="px-4 py-3 font-medium">Example</th></tr>
            </thead>
            <tbody className="divide-y">
              <tr><td className="px-4 py-3 font-semibold">Style object</td><td className="px-4 py-3">Colours, sizes, padding, fonts</td><td className="px-4 py-3 font-mono text-xs">BlockQuoteStyle(barWidth: 4)</td></tr>
              <tr><td className="px-4 py-3 font-semibold">Builder</td><td className="px-4 py-3">A replacement widget or structure</td><td className="px-4 py-3 font-mono text-xs">blockQuoteBuilder: …</td></tr>
            </tbody>
          </table>
        </div>
        <Note tone="tip" title="Reaching for a builder to change a colour? Stop.">
          There is a style field for it. Builders lose the default structure, and with it every future improvement to
          that component.
        </Note>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Where a style goes</h2>
        <p className="text-sm leading-6 text-muted-foreground">The same object is accepted in two places. On one widget:</p>
        <CodeBlock language="dart" code={widgetStyleCode} filename="per_widget.dart" />
        <p className="text-sm leading-6 text-muted-foreground">Or for the whole app:</p>
        <CodeBlock language="dart" code={appThemeCode} filename="app_theme.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          The merge is per field — <span className="font-mono text-xs">widget field → theme field → package default</span>.
          With both of the above in force, the quote gets <code>barWidth: 4</code> from the widget <em>and</em>{" "}
          <code>barColor: Colors.indigo</code> from the theme. Overriding one value never discards the rest, and adding
          a style sheet never changes how existing content looks.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">HeadingStyle</h2>
        <FieldList fields="textStyle · padding · showDivider · dividerColor · dividerThickness · dividerPadding" />
        <CodeBlock language="dart" code={headingStyleCode} filename="heading_style.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          <code>textStyle</code> is merged <strong>over</strong> the per-level style, so you change one property without
          restating the size. Per-level sizes still come from the theme:
        </p>
        <CodeBlock language="dart" code={headingLevelsCode} filename="heading_levels.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          <code>showDivider: false</code> removes the rule an <code>h1</code> draws by default; leave it null to keep
          following <code>autoAddDividerLineAfterH1</code>. Restructure with a builder — for example, anchors on every
          heading. <code>level</code> is 1–6, so one builder handles all six:
        </p>
        <CodeBlock language="dart" code={headingBuilderCode} filename="heading_anchors.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">LinkStyle</h2>
        <FieldList fields="color · hoverColor · decoration · decorationThickness · fontWeight" />
        <CodeBlock language="dart" code={linkStyleCode} filename="link_style.dart" />
        <Note tone="warning" title="Links do nothing on tap unless you handle them.">
          The package deliberately does not depend on a URL launcher.
        </Note>
        <CodeBlock language="dart" code={linkTapCode} filename="link_tap.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          <code>title</code> is the label text, which is useful for confirmation dialogs:
        </p>
        <CodeBlock language="dart" code={linkConfirmCode} filename="link_confirm.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">InlineCodeStyle</h2>
        <FieldList fields="fontFamily · fontFamilyPackage · fontFamilyFallback · fontSizeFactor · fontWeight · color · backgroundColor · borderColor · borderWidth · borderRadius · padding · boxHeightStyle" />
        <p className="text-sm leading-6 text-muted-foreground">Your app&apos;s mono font:</p>
        <CodeBlock language="dart" code={inlineCodeFontCode} filename="inline_code_font.dart" />
        <p className="text-sm leading-6 text-muted-foreground">Two ready-made chip treatments:</p>
        <CodeBlock language="dart" code={inlineCodeChipCode} filename="inline_code_chips.dart" />
        <Note tone="tip" title="fontSizeFactor is a factor, not a size.">
          Inline code scales with whatever it sits in — a heading, a table cell, body text. Setting an absolute size
          breaks that.
        </Note>
        <p className="text-sm leading-6 text-muted-foreground">
          Inline code is a real <code>TextSpan</code> with the chip painted underneath, once per line fragment. It wraps
          across lines, stays selectable, sits on the baseline, and works inside a link label. Per-code styling needs
          the builder — returning <code>CodeTextSpan</code> keeps the painted chip; return a plain <code>TextSpan</code>{" "}
          to drop it:
        </p>
        <CodeBlock language="dart" code={inlineCodeBuilderCode} filename="inline_code_builder.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">ListStyle</h2>
        <FieldList fields="bulletSize · bulletColor · bulletShape · markerTextStyle · indent · gapAfterMarker" />
        <CodeBlock language="dart" code={listStyleCode} filename="list_style.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          <code>markerTextStyle</code> is the <code>1.</code> on an ordered list. <code>bulletSize</code> and{" "}
          <code>bulletColor</code> default to values derived from the surrounding text, so they track your font size
          unless you pin them.
        </p>
        <Note title="Bullets and numbers keep separate spacing defaults.">
          7/10 for bullets, 6/6 for numbers. Setting <code>indent</code> or <code>gapAfterMarker</code> applies to both.
        </Note>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">CheckboxStyle</h2>
        <FieldList fields="size · checkedColor · uncheckedColor · checkColor · borderRadius · gapAfterBox · interactive" />
        <p className="text-sm leading-6 text-muted-foreground">
          Applies to both <code>- [x]</code> task lists and <code>(x)</code> radio options.
        </p>
        <CodeBlock language="dart" code={checkboxStyleCode} filename="checkbox_style.dart" />
        <Note tone="warning" title="Checkboxes are read-only by default.">
          A Markdown checkbox renders the source text — ticking it does not change the text, so the change would be lost
          on the next rebuild. To make them interactive you must opt in <em>and</em> persist the result yourself:
        </Note>
        <CodeBlock language="dart" code={checkboxInteractiveCode} filename="interactive_checkbox.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">BlockQuoteStyle</h2>
        <FieldList fields="barWidth · barColor · barRadius · backgroundColor · padding · margin · textStyle" />
        <CodeBlock language="dart" code={blockQuoteStyleCode} filename="block_quote_style.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          A background is only drawn when you ask for one — no extra widget in the tree otherwise. A callout style with
          a builder:
        </p>
        <CodeBlock language="dart" code={blockQuoteBuilderCode} filename="quote_callout.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">CodeBlockStyle</h2>
        <FieldList fields="backgroundColor · borderColor · borderWidth · borderRadius · padding · headerPadding · fontFamily · fontFamilyPackage · fontSize · textColor · showLanguageLabel · languageStyle · showCopyButton · copyLabel · copiedLabel" />
        <CodeBlock language="dart" code={codeBlockStyleCode} filename="code_block_style.dart" />
        <CodeBlock language="dart" code={codeBlockLocalizeCode} filename="code_block_copy.dart" />
        <Note tone="warning" title="Code lines do not wrap.">
          On a phone at a raised text scale a long line overflows horizontally. The block scrolls sideways, but if you
          need it to wrap, replace it. <code>closed</code> is false while a fence is still being streamed — useful for
          showing a &quot;generating&quot; state:
        </Note>
        <CodeBlock language="dart" code={codeBlockWrapCode} filename="wrapping_code_block.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">TableStyle</h2>
        <FieldList fields="borderColor · borderWidth · borderRadius · cellPadding · headerBackground · headerTextStyle · rowStripeColor" />
        <CodeBlock language="dart" code={tableStyleCode} filename="table_style.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          Tables already scroll horizontally when they exceed the available width.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">ImageStyle</h2>
        <FieldList fields="borderRadius · padding · fit · maxWidth · maxHeight" />
        <CodeBlock language="dart" code={imageStyleCode} filename="image_style.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          Cached network images, with a placeholder and error state. <code>width</code> and <code>height</code> come
          from the alt text when written as <code>WxH</code>:
        </p>
        <CodeBlock language="dart" code={imageBuilderCode} filename="cached_images.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">HrStyle</h2>
        <FieldList fields="thickness · color · padding" />
        <CodeBlock language="dart" code={hrStyleCode} filename="hr_style.dart" />
        <p className="text-sm leading-6 text-muted-foreground">A dotted rule:</p>
        <CodeBlock language="dart" code={hrBuilderCode} filename="dotted_rule.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">SourceTagStyle</h2>
        <FieldList fields="backgroundColor · textStyle · size · shape · padding" />
        <p className="text-sm leading-6 text-muted-foreground">
          The chip drawn for a <code>[1]</code> citation, common in RAG answers:
        </p>
        <CodeBlock language="dart" code={sourceTagCode} filename="source_tag.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">LatexStyle</h2>
        <FieldList fields="textStyle · padding · backgroundColor · borderRadius · scrollBlockHorizontally" />
        <CodeBlock language="dart" code={latexStyleCode} filename="latex_style.dart" />
        <Note tone="warning" title="Rendered maths cannot wrap.">
          Without <code>scrollBlockHorizontally: true</code>, a wide formula overflows on a phone. This is the single
          most common LaTeX complaint. Maths still needs a renderer — see{" "}
          <Link href="/docs/latex-support" className="font-medium text-primary hover:underline">LaTeX support</Link>.
        </Note>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Builders receive resolved styles</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Each builder receives the <strong>fully resolved</strong> style, so it never has to guess a default or restate
          a theme colour. Reuse the style you are given rather than hard-coding:
        </p>
        <CodeBlock language="dart" code={builderResolvedCode} filename="resolved_style.dart" />
        <div className="overflow-x-auto rounded-xl border" role="region" aria-label="Builder signatures" tabIndex={0}>
          <table className="w-full min-w-[760px] text-sm"><tbody className="divide-y">
            {builderRows.map(([name, signature]) => <tr key={name}><td className="px-4 py-2.5 font-mono text-xs font-medium">{name}</td><td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{signature}</td></tr>)}
          </tbody></table>
        </div>
        <Note tone="warning" title="inlineCodeBuilder returns a span, not a widget — deliberately.">
          A <code>Widget</code> has to be wrapped in a <code>WidgetSpan</code>, which cannot wrap across lines, is
          skipped by text selection, and sits off the baseline. If you genuinely need a widget,{" "}
          <code>baselineWidgetSpan</code> aligns it on the text baseline and handles text-scale compensation — a bare{" "}
          <code>WidgetSpan</code> does neither:
        </Note>
        <CodeBlock language="dart" code={baselineSpanCode} filename="baseline_widget_span.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Callbacks</h2>
        <CodeBlock language="dart" code={callbackCode} filename="callbacks.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          Every style class implements <code>lerp</code>, so a theme transition animates rather than snapping — colours,
          widths, radii and padding all interpolate. Nothing to configure; it follows <code>ThemeData</code> like any
          other extension.
        </p>
      </section>

      <section className="rounded-xl border bg-muted/20 p-5">
        <h2 className="text-xl font-semibold">Common mistakes</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
          <li><strong className="text-foreground">Changing a builder at runtime does nothing.</strong> Builders are closures and cannot be compared when spans are cached. Give the widget a <code>key</code> that changes with the builder, or set it once. Styles, patterns, and component lists <em>are</em> compared and do update live.</li>
          <li><strong className="text-foreground">A raw WidgetSpan scales twice.</strong> A paragraph lays inline children out in scaled space and multiplies their reported size back; a child that also scales its own text reserves far more room than it needs at a raised system font setting. Use <code>baselineWidgetSpan</code>, or wrap the child in <code>MediaQuery.withNoTextScaling</code>.</li>
          <li><strong className="text-foreground">Dark mode needs its own extension.</strong> <code>GptMarkdownThemeData</code> lives on <code>ThemeData</code>, so <code>theme:</code> and <code>darkTheme:</code> each need one — with <code>brightness:</code> set to match, or the derived defaults will be wrong.</li>
        </ul>
      </section>

      <div className="flex flex-wrap justify-between gap-3 pt-2">
        <Link href="/docs/themes" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Theme layers <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/docs/style-configuration" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          API &amp; builder reference <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
