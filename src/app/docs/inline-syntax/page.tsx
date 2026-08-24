import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";

export const metadata: Metadata = {
  title: "Inline Syntax — Autolinks, Mentions & Emoji in GptMarkdown",
  description:
    "Handle GFM autolinks and add product-specific @mentions, #channels, emoji shortcodes, and safe inline UI with InlinePattern and MarkdownScope.",
  alternates: { canonical: "https://gptmarkdown.com/docs/inline-syntax" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Inline Syntax — Autolinks, Mentions & Emoji in GptMarkdown",
    description:
      "Handle GFM autolinks and add product-specific @mentions, #channels, emoji shortcodes, and safe inline UI with InlinePattern and MarkdownScope.",
    url: "https://gptmarkdown.com/docs/inline-syntax",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inline Syntax — Autolinks, Mentions & Emoji in GptMarkdown",
    description:
      "Handle GFM autolinks and add product-specific @mentions, #channels, emoji shortcodes, and safe inline UI with InlinePattern and MarkdownScope.",
    images: ["/twitter-image"],
  },
};

const autolinkCode = `GptMarkdown(
  'Ship it: https://pub.dev or mail ada@example.com',
  onLinkTap: (url, title) => launchUrlString(url),
)`;

const schemesCode = `// Bare http, https, mailto, and xmpp links work automatically.
// Add app-specific URL schemes only when your product expects them:
GptMarkdown(
  text,
  autolinkSchemes: const {'myapp', 'slack'},
)

// Or leave bare URLs as plain text. Explicit [label](url) links still work.
GptMarkdown(text, autolink: false)`;

const issuePatternCode = `import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:gpt_markdown/gpt_markdown.dart';

GptMarkdown(
  text,
  inlinePatterns: [
    InlinePattern(
      pattern: RegExp(r'(?<![\\w-])GH-(\\d+)\\b'),
      builder: (context, match, style) => TextSpan(
        text: match.group(0),
        style: style.copyWith(
          color: Theme.of(context).colorScheme.primary,
          fontWeight: FontWeight.w600,
        ),
        recognizer: TapGestureRecognizer()
          ..onTap = () => openIssue(match.group(1)!),
      ),
      // TextSpan is safe to opt into every Markdown scope.
      scopes: MarkdownComponent.allScopes,
    ),
  ],
)`;

const prefixedPatternCode = `// Recommended: only known names match.
InlinePattern.prefixed(
  prefix: '#',
  knownNames: myChannelNames, // ['general', 'design-review', ...]
  builder: (context, match, style) => WidgetSpan(
    alignment: PlaceholderAlignment.baseline,
    baseline: TextBaseline.alphabetic,
    child: ChannelChip(name: match.group(0)!.substring(1)),
  ),
)

// This avoids treating #2959, a URL fragment, or a hex colour as a channel.
//
// Opt in only when every token is meaningful in your product:
InlinePattern.prefixed(
  prefix: '#',
  knownNames: myChannelNames,
  genericTokenPattern: r'[A-Za-z0-9_][A-Za-z0-9_-]*',
  builder: (context, match, style) => TextSpan(
    text: match.group(0),
    style: style,
  ),
)`;

const emojiPatternCode = `const emoji = {'tada': '🎉', 'rocket': '🚀', 'fire': '🔥'};

InlinePattern.delimited(
  open: ':',
  knownNames: emoji.keys,
  builder: (context, match, style) {
    final name = match.namedGroup('name');
    final glyph = name == null ? null : emoji[name];
    return TextSpan(text: glyph ?? match.group(0), style: style);
  },
)

// Delimited patterns can also be asymmetric or multi-character:
InlinePattern.delimited(
  open: '{{',
  close: '}}',
  knownNames: templateNames,
  builder: buildTemplateSpan,
)`;

const buildPrefixedCode = `// Same boundary rules as InlinePattern.prefixed, your own pattern object —
// here to opt a TextSpan-only mention into every scope, including link labels:
InlinePattern(
  pattern: InlinePattern.buildPrefixedPattern(
    prefix: '@',
    knownNames: userDirectory.handles,
  ),
  builder: (context, match, style) => TextSpan(
    text: match.group(0),
    style: style.copyWith(color: Colors.indigo, fontWeight: FontWeight.w600),
    recognizer: TapGestureRecognizer()
      ..onTap = () => openProfile(match.group(0)!.substring(1)),
  ),
  scopes: MarkdownComponent.allScopes, // safe: builder returns a TextSpan
)`;

const buildDelimitedCode = `// The delimited regex inside a custom MarkdownComponent — Discord-style
// ||spoiler|| text, with the token available as the named group 'name':
class SpoilerMd extends InlineMd {
  @override
  RegExp get exp => InlinePattern.buildDelimitedPattern(
        open: '||',
        genericTokenPattern: r'[^|\\n]+', // tight, non-capturing
      );

  // Returns a WidgetSpan — keep it out of link labels (iOS paint safety).
  @override
  Set<MarkdownScope> get scopes => MarkdownComponent.allScopesExceptLinkLabel;

  @override
  InlineSpan span(BuildContext context, String text, GptMarkdownConfig config) {
    final hidden = exp.firstMatch(text)?.namedGroup('name') ?? text;
    return WidgetSpan(
      alignment: PlaceholderAlignment.baseline,
      baseline: TextBaseline.alphabetic,
      child: SpoilerChip(text: hidden, style: config.style),
    );
  }
}`;

const neverMatchCode = `// Empty inputs produce a regex that can never match, so an app with no
// channels yet renders its text untouched — no guard needed at the call site:
InlinePattern.prefixed(
  prefix: '#',
  knownNames: channelsFromServer, // may be empty
  builder: buildChannelSpan,
)`;

const safeWidgetCode = `// A TextSpan wraps, remains selectable, and stays on the text baseline.
builder: (context, match, style) => TextSpan(
  text: match.group(0),
  style: style,
)

// Use WidgetSpan only for actual UI. The package compensates for text scaling
// when InlinePattern returns one:
builder: (context, match, style) => WidgetSpan(
  alignment: PlaceholderAlignment.middle,
  child: Icon(Icons.tag, size: (style.fontSize ?? 14) * 1.15),
)`;

export default function InlineSyntaxPage() {
  return (
    <div className="space-y-9">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Inline syntax</h1>
        <p className="text-muted-foreground leading-7">
          Render standard Markdown links correctly, then layer your product&apos;s own tokens—mentions, channels,
          emoji, issue references, or template tags—into the same flowing text.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Autolinks</h2>
        <p className="text-muted-foreground text-sm leading-6">
          Bare URLs, <code>www.</code> hosts, email addresses, and angle-bracket autolinks become links without
          pre-processing. The parser follows GFM-style boundary rules, so surrounding punctuation and balanced
          parentheses stay out of the destination.
        </p>
        <CodeBlock language="dart" code={autolinkCode} filename="reply.dart" />
        <div className="overflow-x-auto rounded-xl border" role="region" aria-label="Autolink examples" tabIndex={0}>
          <table className="w-full min-w-[560px] text-sm">
            <thead className="border-b bg-muted/40 text-left text-muted-foreground">
              <tr><th className="px-4 py-3 font-medium">Input</th><th className="px-4 py-3 font-medium">Result</th></tr>
            </thead>
            <tbody className="divide-y">
              <tr><td className="px-4 py-3 font-mono text-xs">see https://x.com.</td><td className="px-4 py-3">The period stays outside the link.</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">(https://x.com)</td><td className="px-4 py-3">The unbalanced closing parenthesis stays outside.</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">https://en.wikipedia.org/wiki/Foo_(bar)</td><td className="px-4 py-3">Balanced parentheses stay inside.</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">www.example.com</td><td className="px-4 py-3">Links as <code>http://www.example.com</code>.</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">ada@example.com</td><td className="px-4 py-3">Links as <code>mailto:ada@example.com</code>.</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">**https://x.com**</td><td className="px-4 py-3">Renders as a bold link; the bold markers never enter the destination.</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">`https://x.com`</td><td className="px-4 py-3">Remains code, not a link.</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          Angle autolinks such as <code>&lt;https://x.com&gt;</code>, <code>&lt;mailto:a@b.com&gt;</code>, and
          <code> &lt;a@b.com&gt;</code> follow CommonMark&apos;s deliberate-author syntax and accept any scheme. Bare
          links remain limited to the allowlist shown above.
        </p>
        <CodeBlock language="dart" code={schemesCode} filename="links.dart" />
        <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-4 text-sm dark:border-amber-900 dark:bg-amber-950/20">
          <strong className="text-amber-900 dark:text-amber-200">Avoid a URL pre-processor.</strong>
          <p className="mt-1 text-amber-800 dark:text-amber-300">
            Rewriting bare URLs into Markdown links before rendering can capture punctuation or formatting markers.
            Let the inline parser see the surrounding syntax first, or turn <code>autolink</code> off if a legacy
            pre-processor must remain.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">App-specific tokens with InlinePattern</h2>
        <p className="text-muted-foreground text-sm leading-6">
          <code>InlinePattern</code> is the recommended extension point for inline product syntax. Patterns are
          matched before built-in inline components, so a matching pattern deliberately takes precedence.
        </p>
        <CodeBlock language="dart" code={issuePatternCode} filename="issue_pattern.dart" />
        <p className="text-sm text-muted-foreground">
          Use lookarounds and word boundaries to describe a token&apos;s actual boundaries. Patterns are matched against
          the whole document, so <code>^</code> and <code>$</code> are rarely the right anchors.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Mentions and channels</h2>
        <p className="text-muted-foreground text-sm leading-6">
          Use <code>InlinePattern.prefixed</code> for <code>@name</code> and <code>#channel</code>. It knows not to
          claim an <code>@</code> inside an email address or a <code>#</code> inside a URL fragment, and longer known
          names win over shorter ones.
        </p>
        <CodeBlock language="dart" code={prefixedPatternCode} filename="channels.dart" />
        <div className="rounded-lg border p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Use known names by default.</strong> A generic <code>#</code> fallback
          can turn issue numbers, mid-sentence headings, and colors into chips. Matching is case-insensitive.
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Emoji and delimited syntax</h2>
        <p className="text-muted-foreground text-sm leading-6">
          <code>InlinePattern.delimited</code> handles closing delimiters that a prefixed token cannot express.
          It keeps ordinary times such as <code>10:30:45</code> and URLs with ports from becoming shortcodes.
        </p>
        <CodeBlock language="dart" code={emojiPatternCode} filename="emoji.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          The token is available as the named <code>name</code> group (and group 1), even when a generic token pattern
          includes its own groups. Boundaries prevent <code>:tada:xyz</code> from matching while adjacent
          <code> :fire::fire:</code> tokens still match twice. Return the raw match for an unknown name so author text
          never becomes an empty gap.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Helper methods: reuse the boundary rules</h2>
        <p className="text-muted-foreground text-sm leading-6">
          The regexes behind the two factories are exposed as static helpers —{" "}
          <code>InlinePattern.buildPrefixedPattern</code> and <code>InlinePattern.buildDelimitedPattern</code> — for
          consumers that build their own <code>InlinePattern</code> or <code>MarkdownComponent</code>. You keep the
          fiddly parts (the email/URL-fragment boundaries, longest-name-first matching, case-insensitivity) while
          supplying your own builder, scopes, or component.
        </p>
        <CodeBlock language="dart" code={buildPrefixedCode} filename="build_prefixed_pattern.dart" />
        <CodeBlock language="dart" code={buildDelimitedCode} filename="build_delimited_pattern.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          In a delimited pattern the token name is captured as the named group <code>name</code> (and as group 1)
          before any group inside your <code>genericTokenPattern</code>, whatever that pattern contains. Write the
          generic pattern as tightly as the syntax allows and use non-capturing groups in it — a loose pattern such as{" "}
          <code>.+</code> runs past the closing delimiter and swallows the rest of the line.
        </p>
        <CodeBlock language="dart" code={neverMatchCode} filename="never_match.dart" />
        <p className="text-sm leading-6 text-muted-foreground">
          Both helpers return a regex that can never match when <code>knownNames</code> is empty and{" "}
          <code>genericTokenPattern</code> is null, and the renderer skips such a pattern entirely — so lists that
          load from a server can be passed straight through.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">TextSpan, WidgetSpan, and scopes</h2>
        <p className="text-muted-foreground text-sm leading-6">
          Prefer a <code>TextSpan</code> whenever your token can be text. It wraps, participates in selection, and
          aligns to the surrounding baseline. A <code>WidgetSpan</code> is for a real chip, icon, or image.
        </p>
        <CodeBlock language="dart" code={safeWidgetCode} filename="inline_ui.dart" />
        <div className="rounded-lg border border-red-200 bg-red-50/60 p-4 text-sm dark:border-red-900 dark:bg-red-950/20">
          <strong className="text-red-900 dark:text-red-200">Scope safety matters.</strong>
          <p className="mt-1 text-red-800 dark:text-red-300">
            A widget inside a Markdown link label becomes a nested placeholder and can disappear on iOS. Patterns
            default to <code>MarkdownComponent.allScopesExceptLinkLabel</code>; keep that default for widget-based UI.
            Without it, <code>[#design](https://example.com)</code> can become blank on iOS with no visible error.
            Opt into <code>MarkdownComponent.allScopes</code> only when returning a safe <code>TextSpan</code>.
          </p>
        </div>
      </section>

      <section className="rounded-xl border bg-muted/20 p-5">
        <h2 className="text-xl font-semibold">Common mistakes</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li><strong className="text-foreground">Returning an empty span for an unknown token.</strong> Return the original match so the author&apos;s text never vanishes.</li>
          <li><strong className="text-foreground">Building the pattern list on every frame.</strong> Cache it in a field or make it <code>const</code>; list identity participates in rendering work.</li>
          <li><strong className="text-foreground">Using a custom component for a simple token.</strong> Start with <code>InlinePattern</code>; use a component only for genuinely new Markdown syntax.</li>
        </ul>
      </section>

      <div className="flex flex-wrap justify-between gap-3 pt-2">
        <Link href="/docs/markdown-features" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Markdown &amp; AI output <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/docs/custom-components" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Custom components <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}