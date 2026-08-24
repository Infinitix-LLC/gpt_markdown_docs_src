import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";

export const metadata: Metadata = {
  title: "Customization — Styles, Builders & Callbacks in GptMarkdown",
  description:
    "The complete gpt_markdown customization guide: style sheets, themes, builders, callbacks, per-component behavior, text scaling, and dark-mode rules.",
  alternates: { canonical: "https://gptmarkdown.com/docs/customization" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Customization — Styles, Builders & Callbacks in GptMarkdown",
    description:
      "The complete gpt_markdown customization guide: style sheets, themes, builders, callbacks, per-component behavior, text scaling, and dark-mode rules.",
    url: "https://gptmarkdown.com/docs/customization",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customization — Styles, Builders & Callbacks in GptMarkdown",
    description:
      "The complete gpt_markdown customization guide: style sheets, themes, builders, callbacks, per-component behavior, text scaling, and dark-mode rules.",
    images: ["/twitter-image"],
  },
};

const widgetStyleCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    blockQuote: BlockQuoteStyle(barWidth: 4),
  ),
)`;

const mergeCode = `MaterialApp(
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
      // barColor still comes from the theme:
      blockQuote: BlockQuoteStyle(barWidth: 4),
    ),
  ),
)`;

const inlineCodeCode = `GptMarkdown(
  text,
  styleSheet: const GptMarkdownStyleSheet(
    inlineCode: InlineCodeStyle(
      backgroundColor: Color(0x14656D76),
      borderColor: Colors.transparent,
      borderRadius: Radius.circular(6),
      padding: EdgeInsets.symmetric(horizontal: 5, vertical: 2),
    ),
  ),
)

// Per-code behavior without losing the painted chip:
inlineCodeBuilder: (context, code, style, codeStyle) => CodeTextSpan(
  text: code,
  style: style,
  codeStyle: codeStyle.copyWith(
    backgroundColor: code.startsWith('TODO') ? Colors.amber : null,
  ),
)`;

const checkboxCode = `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    checkbox: CheckboxStyle(interactive: true),
  ),
  onCheckboxChanged: (value) {
    // Rewrite/persist the Markdown source or the tick reverts next build.
    setState(() => markdown = toggleFirstUnchecked(markdown));
  },
)`;

const builderCode = `// Every builder receives a fully resolved style.
blockQuoteBuilder: (context, content, style) => DecoratedBox(
  decoration: BoxDecoration(
    border: BorderDirectional(
      start: BorderSide(
        color: style.barColor ?? Colors.grey,
        width: style.barWidth ?? 3,
      ),
    ),
  ),
  child: content,
)`;

const callbackCode = `GptMarkdown(
  text,
  onLinkTap: (url, title) => launchUrlString(url),
  onImageTap: (url) => openLightbox(url),
  onCodeCopy: (code) => analytics.log('code_copied'),
  onSourceTagTap: (content) => showSource(content),
  onCheckboxChanged: (value) => persist(value), // interactive: true required
)`;

const componentRows = [
  ["HeadingStyle", "textStyle, padding, divider controls", "textStyle merges over h1–h6; null showDivider follows autoAddDividerLineAfterH1."],
  ["LinkStyle", "color, hoverColor, decoration, weight", "A link still needs onLinkTap or linkBuilder to do something."],
  ["InlineCodeStyle", "mono font, factor, chip colors, radius, padding", "A TextSpan-based chip wraps, selects, aligns, and works in a link label."],
  ["ListStyle", "bullet/marker appearance, indent, gap", "Bullets default to 7/10 spacing; ordered markers default to 6/6."],
  ["CheckboxStyle", "colors, size, radius, interactive", "Task lists and radio options are read-only until interactive is enabled and state is persisted."],
  ["BlockQuoteStyle", "bar, background, padding, margin, text", "No background widget is created unless a background is supplied."],
  ["CodeBlockStyle", "surface, mono font, labels, copy controls", "Lines do not wrap; the default scrolls horizontally. closed is false for an unfinished streamed fence."],
  ["TableStyle", "border, cells, header, stripes", "Wide tables already scroll horizontally."],
  ["ImageStyle", "radius, padding, fit, max size", "imageBuilder receives width/height parsed from an alt text written as WxH."],
  ["HrStyle", "thickness, color, padding", "Use hrBuilder when the rule structure itself must change."],
  ["SourceTagStyle", "citation chip fill, shape, text, size", "Styles the [1] citation chip; sourceTagBuilder replaces its structure."],
  ["LatexStyle", "text, surface, radius, scroll behavior", "Set scrollBlockHorizontally for wide block formulae."],
];

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

export default function CustomizationPage() {
  return (
    <div className="space-y-9">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Customization</h1>
        <p className="text-muted-foreground leading-7">
          This is the complete customization contract for <code>gpt_markdown</code>: use style objects for appearance,
          builders for structure, and theme data for shared defaults.
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
        <p className="text-sm leading-6 text-muted-foreground">
          Every component supports both. If the goal is a different colour or radius, prefer a style: a builder discards
          the default structure and every future package improvement to that component.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Where styles go and how they merge</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Put <code>GptMarkdownStyleSheet</code> on one widget, in <code>GptMarkdownThemeData</code> for an app-wide
          default, or in <code>GptMarkdownTheme</code> for a subtree. Merge happens per field:
          widget field → theme field → package default. Leaving a field unset retains the package&apos;s prior appearance;
          adding a style sheet is not a visual reset.
        </p>
        <CodeBlock language="dart" code={widgetStyleCode} filename="per_widget.dart" />
        <CodeBlock language="dart" code={mergeCode} filename="style_merge.dart" />
        <p className="text-sm text-muted-foreground">
          Light and dark <code>ThemeData</code> objects each need their own <code>GptMarkdownThemeData</code>, with
          matching <code>brightness</code>, because derived defaults belong to the active theme extension.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Every component style, including its behavior</h2>
        <div className="overflow-x-auto rounded-xl border" role="region" aria-label="Component style guide" tabIndex={0}>
          <table className="w-full min-w-[840px] text-sm">
            <thead className="border-b bg-muted/40 text-left text-muted-foreground">
              <tr><th className="px-4 py-3 font-medium">Style</th><th className="px-4 py-3 font-medium">Controls</th><th className="px-4 py-3 font-medium">Important behavior</th></tr>
            </thead>
            <tbody className="divide-y">
              {componentRows.map(([name, controls, behavior]) => (
                <tr key={name}><td className="px-4 py-3 font-mono text-xs font-medium">{name}</td><td className="px-4 py-3">{controls}</td><td className="px-4 py-3 text-muted-foreground">{behavior}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Inline code, lists, and interactive checkboxes</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          <code>fontSizeFactor</code> is deliberately a factor rather than an absolute size, so inline code remains
          proportional in headings, cells, and body copy. Keep <code>CodeTextSpan</code> when customizing code that
          still needs a wrapping, selectable, baseline-aligned chip; a plain <code>TextSpan</code> deliberately drops
          that painted chip.
        </p>
        <CodeBlock language="dart" code={inlineCodeCode} filename="inline_code.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          Checkboxes and radio options render from Markdown source and are read-only by default. Turning interaction on
          without persisting the source only produces a tick that reverts on the next build.
        </p>
        <CodeBlock language="dart" code={checkboxCode} filename="interactive_checkbox.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Builders receive resolved styles</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          A builder receives the final, merged style; reuse it instead of hard-coding a fallback that drifts from your
          theme. This is the full builder surface:
        </p>
        <CodeBlock language="dart" code={builderCode} filename="quote_builder.dart" />
        <div className="overflow-x-auto rounded-xl border" role="region" aria-label="Builder signatures" tabIndex={0}>
          <table className="w-full min-w-[760px] text-sm"><tbody className="divide-y">
            {builderRows.map(([name, signature]) => <tr key={name}><td className="px-4 py-2.5 font-mono text-xs font-medium">{name}</td><td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{signature}</td></tr>)}
          </tbody></table>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-4 text-sm dark:border-amber-900 dark:bg-amber-950/20">
          <strong className="text-amber-900 dark:text-amber-200">Why inlineCodeBuilder returns a span.</strong>
          <p className="mt-1 text-amber-800 dark:text-amber-300">
            A <code>WidgetSpan</code> cannot wrap across lines, is skipped by selection, and can sit off the baseline.
            If a real widget is unavoidable, use <code>baselineWidgetSpan</code>; it aligns the widget and applies the
            correct text-scale compensation.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Callbacks and theme animation</h2>
        <CodeBlock language="dart" code={callbackCode} filename="callbacks.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          Every style class implements <code>lerp</code>, so normal <code>ThemeData</code> transitions interpolate
          colours, widths, radii, and padding instead of snapping. Nothing extra is required.
        </p>
      </section>

      <section className="rounded-xl border bg-muted/20 p-5">
        <h2 className="text-xl font-semibold">Two non-obvious safeguards</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
          <li><strong className="text-foreground">Builder changes need a remount.</strong> Builders are closures and are not compared when spans are cached. Change the widget key when replacing a builder; style objects, patterns, and component lists do update live.</li>
          <li><strong className="text-foreground">Do not return a bare WidgetSpan.</strong> At raised system text scales it can reserve far too much room. Use <code>baselineWidgetSpan</code> or wrap the child in <code>MediaQuery.withNoTextScaling</code>. <code>InlinePattern</code> handles this automatically.</li>
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