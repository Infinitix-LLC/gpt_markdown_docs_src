import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";

export const metadata: Metadata = {
  title: "Testing GptMarkdown — Widget Tests, Goldens & Documentation Snippets",
  description:
    "Test rendered Markdown reliably: inspect RichText spans, handle streaming and text-scale behavior, validate styles, and maintain Linux goldens.",
  alternates: { canonical: "https://gptmarkdown.com/docs/testing" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Testing GptMarkdown — Widget Tests, Goldens & Documentation Snippets",
    description:
      "Test rendered Markdown reliably: inspect RichText spans, handle streaming and text-scale behavior, validate styles, and maintain Linux goldens.",
    url: "https://gptmarkdown.com/docs/testing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testing GptMarkdown — Widget Tests, Goldens & Documentation Snippets",
    description:
      "Test rendered Markdown reliably: inspect RichText spans, handle streaming and text-scale behavior, validate styles, and maintain Linux goldens.",
    images: ["/twitter-image"],
  },
};

const plainTextCode = `String plainText(WidgetTester tester) {
  final buffer = StringBuffer();
  for (final richText in tester.widgetList<RichText>(
    find.byWidgetPredicate((widget) => widget is RichText),
  )) {
    buffer.write(richText.text.toPlainText(includePlaceholders: false));
  }
  return buffer.toString();
}

testWidgets('renders Markdown text', (tester) async {
  await tester.pumpWidget(const MaterialApp(
    home: Scaffold(body: GptMarkdown('hello **world**')),
  ));

  expect(plainText(tester), contains('hello world'));
})`;

const builderCode = `// A new closure is not a meaningful rendering identity.
// Changing it at runtime does not regenerate the parsed spans:
await tester.pumpWidget(app(codeBuilder: builderA));
await tester.pumpWidget(app(codeBuilder: builderB)); // still builderA

// Remount when the builder identity should change:
GptMarkdown(
  text,
  key: ValueKey(builderId),
  codeBuilder: builder,
)`;

const streamingCode = `// Test one frame of the reveal:
await tester.pump(const Duration(milliseconds: 16));

// Or let a finite reply finish:
await tester.pumpAndSettle(const Duration(seconds: 5));

// For a test unrelated to animation, take the static path:
GptMarkdown(text, animation: GptMarkdownAnimation.none)
// or:
GptMarkdown(text, animation: GptMarkdownAnimation.fade, isStreaming: false)`;

const styleCode = `testWidgets('the quote bar follows the theme', (tester) async {
  await tester.pumpWidget(
    MaterialApp(
      theme: ThemeData(extensions: [
        GptMarkdownThemeData(
          brightness: Brightness.light,
          styleSheet: const GptMarkdownStyleSheet(
            blockQuote: BlockQuoteStyle(barWidth: 7),
          ),
        ),
      ]),
      home: const Scaffold(body: GptMarkdown('> quoted')),
    ),
  );

  final quote = tester.widget<BlockQuoteWidget>(
    find.byType(BlockQuoteWidget),
  );
  expect(quote.width, 7);
})`;

export default function TestingPage() {
  return (
    <div className="space-y-9">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Testing</h1>
        <p className="text-muted-foreground leading-7">
          Rendered Markdown is mostly spans and widgets, not a collection of standalone <code>Text</code> nodes.
          Test the rendered structure and behavior rather than assuming a plain paragraph.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Find the rendered text</h2>
        <p className="text-muted-foreground text-sm leading-6">
          <code>find.text(&apos;hello&apos;)</code> often fails because the visible text belongs to a span tree inside
          <code>RichText</code>. Read the text from each rich-text subtree instead. Use a predicate rather than
          <code>find.byType(RichText)</code>, because paragraphs needing inline-code or bidirectional handling can be
          rendered through a <code>RichText</code> subclass.
        </p>
        <CodeBlock language="dart" code={plainTextCode} filename="gpt_markdown_test.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Builders, patterns, and remounting</h2>
        <p className="text-muted-foreground text-sm leading-6">
          Styles, patterns, and component lists are compared and can update live. Builder closures are intentionally
          not compared: closures cannot be meaningfully compared without defeating the render cache. Give the widget a
          changing key when replacing a builder at runtime.
        </p>
        <CodeBlock language="dart" code={builderCode} filename="builder_test.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Text scale and expected overflow</h2>
        <p className="text-muted-foreground text-sm leading-6">
          Long code lines, wide tables, and block math can overflow horizontally at raised text scales. That is an
          expected scroll affordance, not necessarily a rendering regression. Drain the expected exception only in the
          focused test; do not silence exceptions globally or new overflow bugs will be hidden.
        </p>
        <CodeBlock language="dart" code={`await tester.pumpAndSettle();\nwhile (tester.takeException() != null) {}`} filename="overflow_test.dart" />
        <div className="rounded-lg border p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Do not compare total paragraph height as a scale ratio.</strong> A
          scaled paragraph can wrap to more lines. Measure line height or test with a wide surface where it cannot wrap.
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Streaming tests</h2>
        <p className="text-muted-foreground text-sm leading-6">
          A streaming reveal is an animation, so a normal <code>pumpAndSettle</code> can wait for the whole answer.
          Pump one frame when you are asserting an intermediate state, or disable animation when the test is about
          parsing or layout instead.
        </p>
        <CodeBlock language="dart" code={streamingCode} filename="streaming_test.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Test styles at the component boundary</h2>
        <p className="text-muted-foreground text-sm leading-6">
          Assert the widget that consumes a resolved style, not a screenshot pixel. Also test precedence: define one
          field on the app theme and another on the widget-level style sheet, then verify that both survive the merge.
        </p>
        <CodeBlock language="dart" code={styleCode} filename="styles_test.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Goldens, screenshots, and documentation snippets</h2>
        <div className="grid gap-3 sm:grid-cols-3 text-sm">
          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Linux goldens</h3>
            <p className="mt-2 text-muted-foreground">Default-look goldens run on Linux because text rasterization differs by platform. Regenerate only after reviewing an intentional visual change.</p>
          </div>
          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">README images</h3>
            <p className="mt-2 text-muted-foreground">Showcase images are documentation assets. Regenerate them separately, commit the PNGs, and bump their cache-busting URL version in the README.</p>
          </div>
          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Compiled docs</h3>
            <p className="mt-2 text-muted-foreground">Package documentation snippets are compiled by the test suite, so an API rename cannot quietly leave the source guides stale.</p>
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-2">
        <Link href="/docs/custom-components" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Test a custom component <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}