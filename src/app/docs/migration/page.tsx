import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";

export const metadata: Metadata = {
  title: "Migration Guide — Upgrade to GptMarkdown 1.2",
  description:
    "Upgrade from gpt_markdown 1.1.x to 1.2.x. Learn the visual, autolinking, text-scale, component-scope, and testing changes that compile cleanly but can affect behavior.",
  alternates: { canonical: "https://gptmarkdown.com/docs/migration" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Migration Guide — Upgrade to GptMarkdown 1.2",
    description:
      "Upgrade from gpt_markdown 1.1.x to 1.2.x. Learn the visual, autolinking, text-scale, component-scope, and testing changes that compile cleanly but can affect behavior.",
    url: "https://gptmarkdown.com/docs/migration",
  },
  twitter: {
    card: "summary_large_image",
    title: "Migration Guide — Upgrade to GptMarkdown 1.2",
    description:
      "Upgrade from gpt_markdown 1.1.x to 1.2.x. Learn the visual, autolinking, text-scale, component-scope, and testing changes that compile cleanly but can affect behavior.",
    images: ["/twitter-image"],
  },
};

const inlineCodeMigration = `// Before: highlightBuilder returned a Widget.
highlightBuilder: (context, text, style) => MyChip(text, style),

// After: use InlineCodeStyle for appearance. Every field is optional; unset
// values derive from ColorScheme and keep the default text-chip behavior:
styleSheet: const GptMarkdownStyleSheet(
  inlineCode: InlineCodeStyle(fontFamily: 'GeistMono'),
),

// inlineCodeBuilder receives the resolved InlineCodeStyle. Return CodeTextSpan
// to keep the painted chip; any other TextSpan deliberately drops it:
inlineCodeBuilder: (context, code, style, codeStyle) =>
    CodeTextSpan(text: code, style: style, codeStyle: codeStyle),

// Use baselineWidgetSpan only for a genuine inline widget. It aligns the widget
// and handles text scaling, but WidgetSpan content cannot wrap or be selected:
inlineCodeBuilder: (context, code, style, codeStyle) =>
    baselineWidgetSpan(MyChip(code, style))`;

const autolinkMigration = `// Bare URLs are linked by default in 1.2.
GptMarkdown(text, autolink: false) // Keep legacy plain-text behavior.

// Or allow an app scheme in addition to the standard schemes:
GptMarkdown(text, autolinkSchemes: {'myapp'})`;

const scopeMigration = `class MyChipMd extends InlineMd {
  @override
  Set<MarkdownScope> get scopes =>
      MarkdownComponent.allScopesExceptLinkLabel;

  // ...
}

// For an app-specific token, InlinePattern is the simpler safe default:
InlinePattern.prefixed(
  prefix: '#',
  knownNames: channelNames,
  builder: (context, match, style) =>
      WidgetSpan(child: ChannelChip(match.group(0)!)),
)`;

const testingMigration = `// Before: exact runtime type misses BidiRichText subclasses.
find.byType(RichText)

// After: find RichText and its subclasses.
find.byWidgetPredicate((widget) => widget is RichText)`;

const changes = [
  {
    title: "Inline code is a real text chip",
    body: "Inline code now uses bundled JetBrains Mono, a tinted fill, hairline outline, 4px radius, and per-line painting. It wraps across lines and remains selectable. If you need the earlier plain appearance, remove the chip background, border, and padding with InlineCodeStyle.",
  },
  {
    title: "Text scaling is proportional",
    body: "Inline widgets no longer reserve inflated space at raised system text scales: the old 2× measurements were 17× for a heading, 10× for a list, and 39× for a checkbox. Layouts tuned around that overflow may look tighter; custom WidgetSpan content should use baselineWidgetSpan or MediaQuery.withNoTextScaling.",
  },
  {
    title: "Malformed text stays visible",
    body: "Malformed links such as [[a](http://x) and [label](http://x, plus syntax no component claims, now render as source text instead of silently disappearing. Debug builds print a warning. If an app relied on malformed Markdown vanishing, that behavior has changed.",
  },
  {
    title: "Alternation patterns are grouped before anchoring",
    body: "A top-level | is now dispatched as ^(?:pattern)$ rather than ^pattern$. Re-check custom components whose alternatives may previously have claimed text from a later component.",
  },
  {
    title: "Case-insensitive patterns now receive matches",
    body: "The combined component regex now honors caseSensitive: false. A component that did not receive case-insensitive matches before may begin matching author text after the upgrade.",
  },
];

export default function MigrationPage() {
  return (
    <div className="space-y-9">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Migration to 1.2</h1>
        <p className="text-muted-foreground leading-7">
          The 1.2 release line is a drop-in upgrade for 1.1.x: your code should compile. Review these behavior and
          rendering changes because a clean build does not guarantee the same output. Version 1.2.1 is a patch release
          within this migration line.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Replace deprecated highlightBuilder</h2>
        <p className="text-muted-foreground text-sm leading-6">
          <code>highlightBuilder</code> still works but is scheduled for removal in 2.0. Use
          <code> InlineCodeStyle</code> for appearance, or <code>inlineCodeBuilder</code> when structure must change.
          <code>InlineCodeStyle</code> covers <code>fontFamily</code>, <code>fontFamilyPackage</code>,
          <code>fontFamilyFallback</code>, <code>fontSizeFactor</code>, <code>fontWeight</code>, <code>color</code>,
          <code>backgroundColor</code>, <code>borderColor</code>, <code>borderWidth</code>, <code>borderRadius</code>,
          <code>padding</code>, and <code>boxHeightStyle</code>.
          Every field is optional and an unset field follows the active <code>ColorScheme</code>. A
          <code>CodeTextSpan</code> preserves the package&apos;s wrapping and selection behavior; use
          <code> baselineWidgetSpan</code> only when a genuine inline widget is worth the usual WidgetSpan trade-offs.
        </p>
        <CodeBlock language="dart" code={inlineCodeMigration} filename="migration.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Autolinking is now on</h2>
        <p className="text-muted-foreground text-sm leading-6">
          Bare URLs, <code>www.</code> hosts, and email addresses use the GFM autolink extension; angle autolinks use
          CommonMark §6.5. Remove any pre-processor that rewrites URLs into Markdown links—the renderer sees URLs only
          after surrounding syntax is consumed, so it avoids the raw-Markdown bug where
          <code> **https://example.com**</code> produces an href ending in <code>**</code>. Keeping both systems can
          duplicate or corrupt links. Disable autolinking only when legacy plain-text behavior is required.
        </p>
        <CodeBlock language="dart" code={autolinkMigration} filename="links.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Components no longer render inside link labels by default</h2>
        <p className="text-muted-foreground text-sm leading-6">
          Widget-based inline content nested inside a link label can fail to paint on iOS. The built-in
          <code> ImageMd</code>, <code>TableMd</code>, and <code>ATagMd</code> components now use
          <code> MarkdownComponent.allScopesExceptLinkLabel</code>. Custom components still render in link labels
          unless they declare that same safe scope, so apply it to any custom component returning a
          <code>WidgetSpan</code>.
        </p>
        <CodeBlock language="dart" code={scopeMigration} filename="scopes.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          <code>InlinePattern.prefixed</code> is the first-class alternative: it excludes link labels by default and
          needs no subclass. Leave <code>genericTokenPattern</code> null to match only the supplied
          <code> knownNames</code>; then <code>#2959</code> remains an issue number instead of becoming a channel chip.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Update widget tests</h2>
        <p className="text-muted-foreground text-sm leading-6">
          Paragraphs that include inline code or need bidirectional placeholder reordering can be rendered with a
          <code>RichText</code> subclass. Exact type matching skips them, so test with a predicate.
        </p>
        <CodeBlock language="dart" code={testingMigration} filename="renderer_test.dart" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold border-b pb-2">Other behavior changes to review</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {changes.map((change) => (
            <article key={change.title} className="rounded-xl border p-4">
              <h3 className="font-semibold">{change.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{change.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-muted/20 p-5">
        <h2 className="text-xl font-semibold">What is additive</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          <code>GptMarkdownStyleSheet</code> and all twelve per-component style classes, existing builders
          (<code>blockQuoteBuilder</code>, <code>headingBuilder</code>, <code>checkboxBuilder</code>,
          <code>radioOptionBuilder</code>, <code>hrBuilder</code>), callbacks (<code>onCheckboxChanged</code>,
          <code>onCodeCopy</code>, <code>onImageTap</code>, <code>onSourceTagTap</code>), <code>MarkdownScope</code>,
          <code>InlinePattern</code>, <code>autolink</code>, and <code>autolinkSchemes</code> are additive. Existing
          heading, link-color, and rule-style theme fields keep working; a style-sheet value wins only where you set it.
        </p>
      </section>

      <div className="flex justify-end pt-2">
        <Link href="/docs/inline-syntax" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Review inline syntax <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}