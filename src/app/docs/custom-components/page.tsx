import type { Metadata } from "next";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Custom Components — Block, Inline & InlinePattern (GptMarkdown v1.2.1)",
  description:
    "Register custom block and inline Markdown components without wiping built-ins. InlinePattern and InlinePattern.prefixed for @mention and #channel. MarkdownScope safety, source tags, TextSpan vs WidgetSpan guidance, ordering and matching caveats.",
  alternates: { canonical: "https://gptmarkdown.com/docs/custom-components" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Custom Components — Block, Inline & InlinePattern (GptMarkdown v1.2.1)",
    description:
      "Register custom block and inline Markdown components without wiping built-ins. InlinePattern and InlinePattern.prefixed for @mention and #channel. MarkdownScope safety, source tags, TextSpan vs WidgetSpan guidance, ordering and matching caveats.",
    url: "https://gptmarkdown.com/docs/custom-components",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Components — Block, Inline & InlinePattern (GptMarkdown v1.2.1)",
    description:
      "Register custom block and inline Markdown components without wiping built-ins. InlinePattern and InlinePattern.prefixed for @mention and #channel. MarkdownScope safety, source tags, TextSpan vs WidgetSpan guidance, ordering and matching caveats.",
    images: ["/twitter-image"],
  },
};

// ─── code snippets ────────────────────────────────────────────────────────────

const twoListsCode = `// components    → block pass: headings, lists, tables, fences, …
// inlineComponents → inline pass: bold, links, code, images, …

GptMarkdown(
  text,
  components: [...],
  inlineComponents: [...],
)

// WARNING: passing a list REPLACES the defaults — bold, links, and code
// stop working unless you keep the built-ins.

// Wrong — loses all built-in inline syntax:
inlineComponents: [MyComponent()],

// Right — prepend your component, keep built-ins:
inlineComponents: [MyComponent(), ...MarkdownComponent.inlineComponents],

// Block list equivalent:
components: [MyBlockComponent(), ...MarkdownComponent.globalComponents],`;

const inlineComponentCode = `import 'package:flutter/material.dart';
import 'package:gpt_markdown/gpt_markdown.dart';

// Renders !!SHOUT!! in uppercase bold.
class ShoutMd extends InlineMd {
  @override
  RegExp get exp => RegExp(r'!![A-Za-z]+!!');

  // allScopesExceptLinkLabel prevents a WidgetSpan from nesting inside
  // the link's own WidgetSpan — which does not paint on iOS.
  @override
  Set<MarkdownScope> get scopes => MarkdownComponent.allScopesExceptLinkLabel;

  @override
  InlineSpan span(BuildContext context, String text, GptMarkdownConfig config) {
    // text is the whole matched string; re-run the regex for groups.
    return TextSpan(
      text: text.replaceAll('!!', '').toUpperCase(),
      style: config.style?.copyWith(fontWeight: FontWeight.bold),
    );
  }
}

// Register — keep built-in inline syntax:
GptMarkdown(
  'This is !!important!! text.',
  inlineComponents: [ShoutMd(), ...MarkdownComponent.inlineComponents],
)`;

const blockComponentCode = `import 'package:flutter/material.dart';
import 'package:gpt_markdown/gpt_markdown.dart';

// Renders :::warning\\n…\\n::: as a styled callout box.
class CalloutMd extends BlockMd {
  @override
  String get expString => r':::(\w+)\n([\s\S]*?)\n:::';

  @override
  Widget build(BuildContext context, String text, GptMarkdownConfig config) {
    final match = exp.firstMatch(text);
    final kind = match?.group(1) ?? 'note';
    final body = match?.group(2) ?? '';

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(kind == 'warning' ? Icons.warning : Icons.info),
          const SizedBox(width: 8),
          // Recurse — render body as Markdown too.
          Flexible(child: GptMarkdown(body, style: config.style)),
        ],
      ),
    );
  }
}

// Register — keep built-in block syntax:
GptMarkdown(
  text,
  components: [CalloutMd(), ...MarkdownComponent.globalComponents],
)`;

const inlinePatternSimpleCode = `import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:gpt_markdown/gpt_markdown.dart';

// inlinePatterns — the recommended API for @mention / #channel / :emoji:
// No subclassing. Matched AHEAD of built-in components.

GptMarkdown(
  text,
  inlinePatterns: [
    InlinePattern(
      // Anchor with lookarounds, not ^ — patterns match the whole document.
      pattern: RegExp(r'(?<![\w-])GH-(\d+)\b'),
      builder: (context, match, style) => TextSpan(
        text: match.group(0),
        style: style.copyWith(
          color: Theme.of(context).colorScheme.primary,
          fontWeight: FontWeight.w600,
        ),
        recognizer: TapGestureRecognizer()
          ..onTap = () => openIssue(match.group(1)!),
      ),
      // TextSpan is safe inside link labels — opt back in:
      scopes: MarkdownComponent.allScopes,
    ),
  ],
)`;

const inlinePatternPrefixedCode = `// InlinePattern.prefixed — helper for @name and #channel.
// Handles boundary rules so @user in user@example.com is not claimed,
// and #frag in https://x.com/#frag is not claimed.

GptMarkdown(
  text,
  inlinePatterns: [
    InlinePattern.prefixed(
      prefix: '#',
      // Longer names win — #design-review is not shadowed by #design.
      knownNames: channelNames,   // ['general', 'design-review', …]
      builder: (context, match, style) => WidgetSpan(
        alignment: PlaceholderAlignment.baseline,
        baseline: TextBaseline.alphabetic,
        child: ChannelChip(name: match.group(0)!.substring(1)),
      ),
      // Default scope already excludes link labels (WidgetSpan safety).
      // scopes: MarkdownComponent.allScopesExceptLinkLabel,
    ),
    InlinePattern.prefixed(
      prefix: '@',
      knownNames: memberNames,
      builder: (context, match, style) => TextSpan(
        text: match.group(0),
        style: style.copyWith(color: Colors.indigo),
        recognizer: TapGestureRecognizer()
          ..onTap = () => openProfile(match.group(0)!.substring(1)),
      ),
      // Returns TextSpan — safe to include link labels:
      scopes: MarkdownComponent.allScopes,
    ),
  ],
)

// Leave genericTokenPattern null to match ONLY known names.
// A generic fallback chips #2959 when the author meant issue 2959 — a real
// production bug. Only supply one when you genuinely want every #token.`;

const markdownScopeCode = `// MarkdownScope — where a component is allowed to render.
//
// enum MarkdownScope { content, linkLabel, tableCell, heading }
//
// allScopes                — every context (default for all components)
// allScopesExceptLinkLabel — everything except inside [label](url)
//
// A WidgetSpan nested inside a link's WidgetSpan does not paint on iOS.
// Declare allScopesExceptLinkLabel on any component that returns a WidgetSpan.

class MyChipMd extends InlineMd {
  @override
  Set<MarkdownScope> get scopes => MarkdownComponent.allScopesExceptLinkLabel;

  @override
  RegExp get exp => RegExp(r'#[A-Za-z0-9_-]+');

  @override
  InlineSpan span(BuildContext context, String text, GptMarkdownConfig config) {
    return WidgetSpan(
      child: MediaQuery.withNoTextScaling(child: MyChip(text)),
    );
  }
}

// Alternatively, restrict to prose only:
// scopes: const {MarkdownScope.content}`;

const sourceTagCode = `// Built-in support for AI citation chips: [1], [2], …
// sourceTagBuilder receives the content between the brackets.

GptMarkdown(
  content,
  sourceTagBuilder: (context, content, textStyle) {
    return GestureDetector(
      onTap: () => openSource(content),
      child: Container(
        margin: const EdgeInsets.only(left: 2),
        padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.primaryContainer,
          borderRadius: BorderRadius.circular(4),
        ),
        child: Text(
          content,
          style: textStyle.copyWith(fontSize: 11),
        ),
      ),
    );
  },
  // Or use the callback without replacing the widget:
  onSourceTagTap: (content) => showSource(content),
)`;

const textSpanVsWidgetSpanCode = `// TextSpan — prefer this when possible.
//   ✅ Stays selectable
//   ✅ Wraps across lines
//   ✅ Sits on text baseline
//   ✅ Safe inside link labels ([label](url))

builder: (context, match, style) => TextSpan(
  text: match.group(0),
  style: style.copyWith(color: Colors.indigo),
),

// WidgetSpan — only when a real widget is needed (icon, rounded chip, image).
//   ⚠️ Cannot wrap across lines
//   ⚠️ Excluded from text selection
//   ⚠️ MUST be excluded from link labels (allScopesExceptLinkLabel) or
//      it renders as nothing on iOS — no error, no warning.
//   ⚠️ MUST suppress text scaling or it reserves far more space than needed.

// Wrong at raised text scales:
return WidgetSpan(child: MyChip());

// Right — scale compensation + baseline alignment:
return baselineWidgetSpan(MyChip());
// or:
return WidgetSpan(child: MediaQuery.withNoTextScaling(child: MyChip()));

// InlinePattern and InlinePatternMd do scale compensation automatically.`;

const orderingCode = `// List order controls two things:
//   1. Which alternative the combined regex matches (first match wins).
//   2. Which handler claims that match.
// Earlier items win both — prepend to override a built-in.

// Cache the component instances. The config compares list entries by identity:
// a fresh list with the same instances is fine, but a new component instance
// tells the renderer to regenerate its spans.
late final _inline = [ShoutMd(), ...MarkdownComponent.inlineComponents];

GptMarkdown(text, inlineComponents: _inline)

// On failure, return the source text — never an empty span:
// Wrong:  if (match == null) return const TextSpan();
// Right:  if (match == null) return TextSpan(text: text, style: config.style);

// Case sensitivity is contagious: one caseSensitive: false component makes
// the entire combined regex case-insensitive.`;

// ─── component ────────────────────────────────────────────────────────────────

export default function CustomComponentsPage() {
  return (
    <div className="space-y-10">
      {/* Intro */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Custom Components</h1>
        <p className="text-muted-foreground leading-7">
          For syntax the package does not know about — callout boxes, mention chips, custom citation styles.
        </p>
        <div className="mt-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-4 text-sm">
          <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">Reach for this last</p>
          <p className="text-blue-700 dark:text-blue-400 text-xs leading-relaxed">
            For <code className="bg-blue-100 dark:bg-blue-900 rounded px-1">@mention</code>-style tokens use{" "}
            <code className="bg-blue-100 dark:bg-blue-900 rounded px-1">InlinePattern</code> — no subclassing, and it
            handles nesting rules correctly by default. For appearance use a{" "}
            <Link href="/docs/themes" className="underline">style object</Link>. A custom component is for genuinely new
            syntax.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          {[
            ["components", "Block components", "Match multi-line patterns; return a Widget"],
            ["inlineComponents", "Inline components", "Match within a line; return an InlineSpan"],
            ["inlinePatterns", "InlinePattern (v1.2.0)", "@mention, #channel, :emoji: — no subclassing"],
          ].map(([param, label, desc]) => (
            <div key={param} className="rounded-lg border p-4">
              <p className="font-mono text-xs text-muted-foreground mb-1">{param}</p>
              <p className="font-semibold text-sm mb-1">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two lists + not wiping built-ins */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Do not wipe the built-ins</h2>
        <p className="text-muted-foreground text-sm">
          Passing a list to <code className="bg-muted rounded px-1 text-xs">components</code> or{" "}
          <code className="bg-muted rounded px-1 text-xs">inlineComponents</code> replaces the defaults entirely.
          Always append the package defaults to keep bold, links, code, and all other built-in syntax working.
        </p>
        <CodeBlock language="dart" code={twoListsCode} filename="two_lists.dart" />
      </div>

      {/* InlinePattern — simple */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">InlinePattern — simple pattern</h2>
        <p className="text-muted-foreground text-sm">
          The recommended API for app-specific inline tokens in v1.2.0. Patterns are matched ahead of built-in
          components. No subclassing required.
        </p>
        <CodeBlock language="dart" code={inlinePatternSimpleCode} filename="inline_pattern.dart" />
      </div>

      <details className="rounded-xl border group">
        <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-lg [&::-webkit-details-marker]:hidden">
          Advanced component authoring <span className="float-right text-sm font-normal text-muted-foreground group-open:hidden">show advanced options</span><span className="float-right hidden text-sm font-normal text-muted-foreground group-open:inline">hide advanced options</span>
        </summary>
        <div className="border-t p-4 space-y-10">
      {/* InlinePattern.prefixed */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">InlinePattern.prefixed — @mention &amp; #channel</h2>
        <p className="text-muted-foreground text-sm">
          The <code className="bg-muted rounded px-1 text-xs">InlinePattern.prefixed</code> factory handles boundary
          rules automatically: <code className="bg-muted rounded px-1 text-xs">@user</code> in an email address is not
          claimed, and <code className="bg-muted rounded px-1 text-xs">#frag</code> in a URL fragment is not claimed.
          Longer names win over shorter ones (longest-first matching).
        </p>
        <CodeBlock language="dart" code={inlinePatternPrefixedCode} filename="inline_pattern_prefixed.dart" />
      </div>

      {/* Inline component — subclass */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Inline component (subclass)</h2>
        <p className="text-muted-foreground text-sm">
          Extend <code className="bg-muted rounded px-1 text-xs">InlineMd</code> when you need more control than{" "}
          <code className="bg-muted rounded px-1 text-xs">InlinePattern</code> provides. The{" "}
          <code className="bg-muted rounded px-1 text-xs">span</code> method returns an{" "}
          <code className="bg-muted rounded px-1 text-xs">InlineSpan</code>.
        </p>
        <CodeBlock language="dart" code={inlineComponentCode} filename="shout_md.dart" />
      </div>

      {/* Block component */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Block component (subclass)</h2>
        <p className="text-muted-foreground text-sm">
          Extend <code className="bg-muted rounded px-1 text-xs">BlockMd</code>, override{" "}
          <code className="bg-muted rounded px-1 text-xs">expString</code>, and return a Widget from{" "}
          <code className="bg-muted rounded px-1 text-xs">build</code>.{" "}
          <code className="bg-muted rounded px-1 text-xs">BlockMd.exp</code> is built automatically from{" "}
          <code className="bg-muted rounded px-1 text-xs">expString</code>.
        </p>
        <CodeBlock language="dart" code={blockComponentCode} filename="callout_md.dart" />
      </div>

      {/* MarkdownScope */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">MarkdownScope safety</h2>
        <p className="text-muted-foreground text-sm">
          A component declares which nesting contexts it renders in. Without this, a{" "}
          <code className="bg-muted rounded px-1 text-xs">WidgetSpan</code> inside a link label produces a nested
          placeholder that <strong>does not paint on iOS</strong> — invisible text, no error, nothing in the logs.
        </p>
        <CodeBlock language="dart" code={markdownScopeCode} filename="markdown_scope.dart" />
        <div className="rounded-lg border overflow-x-auto p-4 text-sm" role="region" aria-label="Markdown scope reference" tabIndex={0}>
          <p className="font-medium mb-2">MarkdownScope values</p>
          <table className="min-w-[500px] w-full text-xs text-muted-foreground">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1 pr-4 font-medium text-foreground">Scope</th>
                <th className="text-left py-1 font-medium text-foreground">Where</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr:last-child]:border-0">
              {[
                ["content", "Ordinary document and inline text. The default."],
                ["linkLabel", "Inside the label half of [label](url)."],
                ["tableCell", "Inside a table cell."],
                ["heading", "Inside a # heading."],
              ].map(([scope, where]) => (
                <tr key={scope}>
                  <td className="py-1.5 pr-4 font-mono text-foreground">{scope}</td>
                  <td className="py-1.5">{where}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-muted-foreground">
            <code className="bg-muted rounded px-1">MarkdownComponent.allScopes</code> — all four.{" "}
            <code className="bg-muted rounded px-1">MarkdownComponent.allScopesExceptLinkLabel</code> — content, tableCell, heading.{" "}
            <code className="bg-muted rounded px-1">InlinePattern</code> defaults to{" "}
            <code className="bg-muted rounded px-1">allScopesExceptLinkLabel</code>.
          </p>
        </div>
      </div>

      {/* Source tags */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Source tags / citations</h2>
        <p className="text-muted-foreground text-sm">
          The package has first-class support for AI citation chips ({`[1]`}, {`[2]`}, …) common in RAG answers.
          Use <code className="bg-muted rounded px-1 text-xs">sourceTagBuilder</code> to replace the chip widget, or
          just <code className="bg-muted rounded px-1 text-xs">onSourceTagTap</code> to handle taps without replacing it.
          Style the default chip with <code className="bg-muted rounded px-1 text-xs">styleSheet: GptMarkdownStyleSheet(sourceTag: SourceTagStyle(…))</code>.
        </p>
        <CodeBlock language="dart" code={sourceTagCode} filename="source_tags.dart" />
      </div>

      {/* TextSpan vs WidgetSpan */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">TextSpan vs WidgetSpan</h2>
        <p className="text-muted-foreground text-sm">
          Prefer a <code className="bg-muted rounded px-1 text-xs">TextSpan</code> wherever the design allows.
          A <code className="bg-muted rounded px-1 text-xs">WidgetSpan</code> introduces layout constraints that
          affect selection, line-wrapping, and iOS rendering.
        </p>
        <CodeBlock language="dart" code={textSpanVsWidgetSpanCode} filename="span_guidance.dart" />
      </div>

      {/* Ordering and matching caveats */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Ordering &amp; matching caveats</h2>
        <CodeBlock language="dart" code={orderingCode} filename="ordering.dart" />
        <div className="space-y-3">
          <div className="rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm">
            <p className="font-medium text-amber-800 dark:text-amber-300 mb-1">Patterns with a top-level | need grouping</p>
            <p className="text-amber-700 dark:text-amber-400 text-xs leading-relaxed">
              The combined regex anchors each component as{" "}
              <code className="bg-amber-100 dark:bg-amber-900 rounded px-1">^(?:pattern)$</code>. Without the non-capturing
              group, a top-level <code className="bg-amber-100 dark:bg-amber-900 rounded px-1">|</code> in a component
              pattern would have <code className="bg-amber-100 dark:bg-amber-900 rounded px-1">^</code> bind to the first
              alternative and <code className="bg-amber-100 dark:bg-amber-900 rounded px-1">$</code> to the last —
              claiming matches the component does not actually cover. The package wraps your pattern in{" "}
              <code className="bg-amber-100 dark:bg-amber-900 rounded px-1">(?:…)</code> so this is handled, but
              verify your component&apos;s own alternation behaves as expected.
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm">
            <p className="font-medium text-amber-800 dark:text-amber-300 mb-1">Case sensitivity is contagious</p>
            <p className="text-amber-700 dark:text-amber-400 text-xs leading-relaxed">
              The combined regex carries one set of flags. One component with{" "}
              <code className="bg-amber-100 dark:bg-amber-900 rounded px-1">caseSensitive: false</code> makes the whole
              alternation case-insensitive — required for that component to match, but it affects the others too.
            </p>
          </div>
        </div>
      </div>
        </div>
      </details>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Test a custom component, including a link label</h2>
        <p className="text-muted-foreground text-sm leading-6">
          Markdown output is a span tree, so assert on the rendered <code>RichText</code> content. Also include a
          fixture inside a link label: that is where an unsafe <code>WidgetSpan</code> silently fails on iOS.
          With <code>MarkdownComponent.allScopesExceptLinkLabel</code>, <code>[!!loud!!](https://x.com)</code> must
          remain literal inside the label rather than becoming a nested chip.
        </p>
        <CodeBlock language="dart" filename="custom_component_test.dart" code={`testWidgets('renders in caps', (tester) async {
  await tester.pumpWidget(
    MaterialApp(
      home: Scaffold(
        body: GptMarkdown(
          'a !!loud!! word',
          inlineComponents: [ShoutMd(), ...MarkdownComponent.inlineComponents],
        ),
      ),
    ),
  );
  await tester.pumpAndSettle();

  final buffer = StringBuffer();
  for (final richText in tester.widgetList<RichText>(
    find.byWidgetPredicate((widget) => widget is RichText),
  )) {
    buffer.write(richText.text.toPlainText(includePlaceholders: false));
  }
  expect(buffer.toString(), contains('LOUD'));

  // Also test '[!!loud!!](https://x.com)': with
  // allScopesExceptLinkLabel it stays literal rather than becoming a nested chip.
})`} />
      </div>

      {/* Navigation */}
      <div className="flex justify-start pt-2">
        <Link href="/docs/style-configuration" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          ← API Reference
        </Link>
      </div>
    </div>
  );
}
