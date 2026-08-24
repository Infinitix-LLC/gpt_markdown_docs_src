import type { Metadata } from "next";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Markdown Features — Supported Constructs in GptMarkdown",
  description:
    "Every Markdown construct supported by gpt_markdown v1.2.1: headings, emphasis, tables, code fences, task lists, radio options, citations, autolinks, images, and block quotes — with scope and limitations.",
  alternates: { canonical: "https://gptmarkdown.com/docs/markdown-features" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Markdown Features — Supported Constructs in GptMarkdown",
    description:
      "Every Markdown construct supported by gpt_markdown v1.2.1: headings, emphasis, tables, code fences, task lists, radio options, citations, autolinks, images, and block quotes — with scope and limitations.",
    url: "https://gptmarkdown.com/docs/markdown-features",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Features — Supported Constructs in GptMarkdown",
    description:
      "Every Markdown construct supported by gpt_markdown v1.2.1: headings, emphasis, tables, code fences, task lists, radio options, citations, autolinks, images, and block quotes — with scope and limitations.",
    images: ["/twitter-image"],
  },
};

const realisticMarkdown = `# Summary

The Pythagorean theorem states that for a right triangle:

\\\\[ a^2 + b^2 = c^2 \\\\]

Here is a quick implementation in Dart:

\`\`\`dart
double hypotenuse(double a, double b) => sqrt(a * a + b * b);
\`\`\`

## Comparison

| Approach       | Lines | Readable |
|:---------------|:-----:|:--------:|
| Direct formula | 1     | ✅        |
| Loop           | 5     | ❌        |

## Tasks

- [x] Write the function
- [ ] Add unit tests
- [ ] Benchmark

> The formula is exact for integers as well — Pythagorean triples like 3, 4, 5
> have been known since antiquity.

Source: [Wikipedia](https://en.wikipedia.org/wiki/Pythagorean_theorem) [1]`;

const autolinkCode = `// Autolinks are ON by default.
// Bare URLs, www. hosts, and email addresses become tappable links.
GptMarkdown(
  'Visit https://flutter.dev or email hello@example.com',
  onLinkTap: (url, title) => launchUrlString(url),
)

// Disable for untrusted input where accidental tap targets are unwelcome.
GptMarkdown(content, autolink: false)

// Add custom schemes that should link without angle brackets.
// http, https, mailto and xmpp are always linked.
GptMarkdown(
  'Open myapp://dashboard',
  autolinkSchemes: const {'myapp'},
  onLinkTap: (url, title) => handleDeepLink(url),
)`;

const citationCode = `// [1] citation chips are rendered inline and tappable.
GptMarkdown(
  'The Riemann hypothesis [1] remains unproven.',
  onSourceTagTap: (content) {
    // content = "1"
    showSource(content);
  },
)`;

const tableCode = `GptMarkdown(r'''
| Name    | Score | Grade |
|:--------|------:|:-----:|
| Alice   |    95 |   A   |
| Bob     |    82 |   B   |
| Charlie |    74 |   C   |
''')`;

const taskRadioCode = `// Task lists — checkboxes are read-only unless you opt in.
GptMarkdown(
  '''
- [x] Install gpt_markdown
- [ ] Customize the math widget (optional)
- [ ] Deploy
  ''',
  // Optional: make checkboxes interactive.
  styleSheet: const GptMarkdownStyleSheet(
    checkbox: CheckboxStyle(interactive: true),
  ),
  onCheckboxChanged: (value) => persistCheckbox(value),
)

// Radio options — same style class as checkboxes.
GptMarkdown('''
Which approach do you prefer?
- (x) Direct formula
- ( ) Loop
- ( ) Recursive
''')`;

const imageCode = `// Basic image
GptMarkdown('![Flutter logo](https://flutter.dev/images/logo.png)')

// With explicit dimensions (alt parsed as WxH)
GptMarkdown('![100x80](https://example.com/icon.png)')

// Custom renderer — receives url, width, height (null if not specified)
GptMarkdown(
  content,
  imageBuilder: (context, url, width, height) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(8),
      child: Image.network(url, width: width, height: height),
    );
  },
  onImageTap: (url) => openLightbox(url),
)`;

const features = [
  { syntax: "# H1 … ###### H6", notes: "Six heading levels. H1 draws a rule by default." },
  { syntax: "**bold** / *italic*", notes: "Standard emphasis. ***both*** also works." },
  { syntax: "~~strikethrough~~", notes: "GFM strikethrough." },
  { syntax: "<u>underline</u>", notes: "HTML underline tag." },
  { syntax: "`inline code`", notes: "Monospace chip, baseline-aligned, selectable." },
  { syntax: "```fenced```", notes: "Code block with language label. closed flag available." },
  { syntax: "- / 1.", notes: "Unordered and ordered lists, nested." },
  { syntax: "- [x] / - [ ]", notes: "Task-list checkboxes. Interactive via CheckboxStyle." },
  { syntax: "(x) / ( )", notes: "Radio options. Same style class as checkboxes." },
  { syntax: "| col | col |", notes: "Pipe tables with :--- alignment." },
  { syntax: "> quote", notes: "Block quotes. Bar, background, builder." },
  { syntax: "---", notes: "Horizontal rule. Thickness and colour via HrStyle." },
  { syntax: "[label](url)", notes: "Links. onLinkTap, linkBuilder, LinkStyle." },
  { syntax: "bare URL / www.", notes: "GFM autolinks. autolink: false disables." },
  { syntax: "<url>", notes: "CommonMark §6.5 autolinks. Any scheme." },
  { syntax: "![alt](url)", notes: "Images. imageBuilder, ImageStyle, onImageTap." },
  { syntax: "\\\\( \\\\) / \\\\[ \\\\]", notes: "LaTeX inline and block. Default renderer included; replace with latexBuilder if needed." },
  { syntax: "$…$ / $$…$$", notes: "Dollar-sign LaTeX. Opt in with useDollarSignsForLatex." },
  { syntax: "[1]", notes: "Citation chip. onSourceTagTap, SourceTagStyle." },
  { syntax: "==highlighted==", notes: "Background highlight spans." },
];

export default function MarkdownFeaturesPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Markdown Features</h1>
        <p className="text-muted-foreground leading-7">
          Every construct supported by{" "}
          <code className="bg-muted rounded px-1 text-sm">GptMarkdown</code> v1.2.1 — what the syntax looks like,
          what it renders, and what the limits are.
        </p>
      </div>

      {/* Supported constructs table */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Supported constructs</h2>
        <div className="rounded-xl border overflow-x-auto" role="region" aria-label="Supported Markdown constructs" tabIndex={0}>
          <table className="min-w-[560px] w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/60">
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Syntax</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Notes</th>
              </tr>
            </thead>
            <tbody>
              {features.map(({ syntax, notes }, i) => (
                <tr key={syntax} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                  <td className="px-4 py-2.5 font-mono text-xs text-foreground whitespace-nowrap">{syntax}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Realistic AI response example */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Realistic AI response</h2>
        <p className="text-muted-foreground text-sm">
          A typical LLM response mixes prose, LaTeX, a code fence, a table, task list, blockquote, and a citation:
        </p>
        <CodeBlock language="dart" code={realisticMarkdown} filename="ai_response_example.dart" />
      </div>

      {/* Autolinks */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Autolinks</h2>
        <p className="text-muted-foreground text-sm">
          Bare URLs, <code className="bg-muted rounded px-1 text-xs">www.</code> hosts, and email addresses are linked
          automatically following the GFM autolink extension.{" "}
          <code className="bg-muted rounded px-1 text-xs">&lt;…&gt;</code> autolinks follow CommonMark §6.5 and accept any scheme.
          Autolinks are on by default — disable with <code className="bg-muted rounded px-1 text-xs">autolink: false</code> for untrusted input.
        </p>
        <CodeBlock language="dart" code={autolinkCode} filename="autolinks.dart" />
      </div>

      {/* Citations */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Citations</h2>
        <p className="text-muted-foreground text-sm">
          Numeric citation references like <code className="bg-muted rounded px-1 text-xs">[1]</code> render as tappable
          chips. Style them with <code className="bg-muted rounded px-1 text-xs">SourceTagStyle</code> and handle taps
          with <code className="bg-muted rounded px-1 text-xs">onSourceTagTap</code>.
        </p>
        <CodeBlock language="dart" code={citationCode} filename="citations.dart" />
      </div>

      {/* Tables */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Tables</h2>
        <p className="text-muted-foreground text-sm">
          GFM-style pipe tables with column alignment (<code className="bg-muted rounded px-1 text-xs">:---</code>,{" "}
          <code className="bg-muted rounded px-1 text-xs">---:</code>, <code className="bg-muted rounded px-1 text-xs">:---:</code>).
          Tables scroll horizontally on narrow screens.
        </p>
        <CodeBlock language="dart" code={tableCode} filename="tables.dart" />
      </div>

      {/* Tasks and radio options */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Task lists and radio options</h2>
        <p className="text-muted-foreground text-sm">
          Task-list checkboxes render the source state and are read-only by default. Enable interactivity
          with <code className="bg-muted rounded px-1 text-xs">CheckboxStyle(interactive: true)</code> and handle
          changes via <code className="bg-muted rounded px-1 text-xs">onCheckboxChanged</code>.
          Radio options use the same style class.
        </p>
        <CodeBlock language="dart" code={taskRadioCode} filename="tasks_radio.dart" />
      </div>

      {/* Images */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Images</h2>
        <p className="text-muted-foreground text-sm">
          Standard <code className="bg-muted rounded px-1 text-xs">![alt](url)</code> syntax. Dimensions can be encoded in the
          alt text as <code className="bg-muted rounded px-1 text-xs">WxH</code>. Override with{" "}
          <code className="bg-muted rounded px-1 text-xs">imageBuilder</code> for custom caching, borders, or lightboxes.
        </p>
        <CodeBlock language="dart" code={imageCode} filename="images.dart" />
      </div>

      {/* Scope and limitations */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Scope and limitations</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Designed for AI output.</strong>{" "}
            The parser is tuned for what LLMs emit, not for full CommonMark conformance.
            Edge cases in deeply nested or pathological Markdown may not round-trip correctly.
          </p>
          <p>
            <strong className="text-foreground">Selection across blocks.</strong>{" "}
            Copying across a list or table yields the cells run together with no separators —
            block content is rendered as inline widgets. Prose, headings, links, and inline code copy correctly.
          </p>
          <p>
            <strong className="text-foreground">LaTeX needs a renderer.</strong>{" "}
            The package parses{" "}
            <code className="bg-muted rounded px-1 text-xs">{"\\( \\)"}</code> and{" "}
            <code className="bg-muted rounded px-1 text-xs">{"\\[ \\]"}</code> delimiters and renders them with the included
            default renderer. Pass a <code className="bg-muted rounded px-1 text-xs">latexBuilder</code> only to replace it — see{" "}
            <Link href="/docs/latex-support" className="text-primary hover:underline">LaTeX Support</Link>.
          </p>
          <p>
            <strong className="text-foreground">No raw HTML pass-through.</strong>{" "}
            Only the <code className="bg-muted rounded px-1 text-xs">&lt;u&gt;</code> tag is handled.
            Arbitrary HTML is rendered as text.
          </p>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex justify-between pt-2">
        <Link href="/docs/usage" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          ← Basic Usage
        </Link>
        <Link href="/docs/latex-support" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
          LaTeX Support <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
