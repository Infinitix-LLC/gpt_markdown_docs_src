import { CodeBlock } from "@/components/ui/components/ui/code-block";

const installCode = `# pubspec.yaml
dependencies:
  gpt_markdown: ^1.2.1`;

const importCode = `import 'package:gpt_markdown/gpt_markdown.dart';`;

const minimalCode = `// Minimum: one positional argument — the markdown string.
GptMarkdown('# Hello\\n\\nSome **bold** text and \`inline code\`.')`;

const scrollableCode = `import 'package:flutter/material.dart';
import 'package:gpt_markdown/gpt_markdown.dart';

/// GptMarkdown sizes itself to its content and does not scroll.
/// Wrap it whenever the reply may exceed the screen height.
class ReplyView extends StatelessWidget {
  final String reply;
  const ReplyView({super.key, required this.reply});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Reply')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: GptMarkdown(reply),
      ),
    );
  }
}`;

const chatListCode = `// One GptMarkdown per bubble — no scroll wrapper needed
// because the ListView itself scrolls.
ListView.builder(
  itemCount: messages.length,
  itemBuilder: (context, i) => Padding(
    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
    child: GptMarkdown(messages[i].text),
  ),
)`;

const selectionCode = `// Wrap in SelectionArea to make all text inside selectable.
SelectionArea(
  child: SingleChildScrollView(
    padding: const EdgeInsets.all(16),
    child: GptMarkdown(reply),
  ),
)`;

const linkTapCode = `// Links do nothing unless you handle them.
// The package does not depend on a URL launcher — that choice is yours.
GptMarkdown(
  reply,
  onLinkTap: (url, title) {
    final uri = Uri.tryParse(url);
    if (uri == null) return;
    if (uri.scheme != 'https' && uri.scheme != 'mailto') return;
    launchUrl(uri);
  },
)`;

const rtlCode = `GptMarkdown(
  reply,
  textDirection: TextDirection.rtl,
)`;

const textScaleCode = `// Base text style — component sizes derive from this.
// Set it once here; do not set sizes in individual style classes.
GptMarkdown(
  reply,
  style: const TextStyle(fontSize: 16, height: 1.6),
)

// Or pull from the theme:
GptMarkdown(
  reply,
  style: Theme.of(context).textTheme.bodyMedium,
)`;

const interactionCode = `GptMarkdown(
  reply,
  onImageTap: (url) => openLightbox(url),
  onCodeCopy: (code) => analytics.log('code_copied'),
  onSourceTagTap: (content) => showSource(content),
  // Requires CheckboxStyle(interactive: true).
  onCheckboxChanged: (value) => persistCheckbox(value),
)`;

const supportedRows = [
  ["Headings", "# through ######"],
  ["Emphasis", "**bold**, *italic*, ~~strike~~, <u>underline</u>"],
  ["Code", "`inline` and fenced code blocks"],
  ["Lists", "Bulleted, ordered, nested, task lists, and radio options"],
  ["Tables", "GFM-style tables, including :---: alignment"],
  ["Blocks", "Quotes, rules, images, links, citations, and bare autolinks"],
  ["Math", "\\( inline \\) and \\[ block \\]; dollar signs are opt-in"],
];

export function SimpleImplementation() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Basic Usage</h1>
        <p className="text-muted-foreground leading-7">
          Everything from install to a production-ready render, with{" "}
          <code className="bg-muted rounded px-1 text-sm">GptMarkdown</code> v1.2.1.
        </p>
      </div>

      {/* Install */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Install</h2>
        <CodeBlock language="yaml" code={installCode} filename="pubspec.yaml" />
        <CodeBlock language="dart" code={importCode} filename="import" />
        <p className="text-muted-foreground text-sm">
          One import brings in the widget, every style class, all builder typedefs, and{" "}
          <code className="bg-muted rounded px-1 text-xs">GptMarkdownConfig</code>.
        </p>
      </div>

      {/* Minimal render */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Minimal render</h2>
        <p className="text-muted-foreground text-sm">
          One positional argument — the markdown string. Everything else is optional.
        </p>
        <CodeBlock language="dart" code={minimalCode} filename="main.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">What it supports</h2>
        <div className="overflow-x-auto rounded-xl border" role="region" aria-label="Supported gpt markdown syntax" tabIndex={0}>
          <table className="w-full min-w-[560px] text-sm">
            <thead className="border-b bg-muted/40 text-left text-muted-foreground">
              <tr><th className="px-4 py-3 font-medium">Feature</th><th className="px-4 py-3 font-medium">Syntax or behavior</th></tr>
            </thead>
            <tbody className="divide-y">
              {supportedRows.map(([feature, syntax]) => (
                <tr key={feature}><td className="px-4 py-3 font-medium">{feature}</td><td className="px-4 py-3 font-mono text-xs text-muted-foreground">{syntax}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          The package has no platform-specific plugins and is suitable for Flutter Web, including WebAssembly-targeted
          builds. Your app&apos;s other dependencies must still support the WebAssembly target.
        </p>
      </div>

      {/* Scroll */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Scrollable replies</h2>
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 p-3 text-sm text-amber-900 dark:text-amber-200">
          <strong>Important:</strong>{" "}
          <code className="bg-amber-100 dark:bg-amber-900/50 rounded px-1 text-xs">GptMarkdown</code>{" "}
          sizes itself to its content. Put it inside something scrollable for anything longer than a sentence —
          otherwise a long reply overflows the screen.
        </div>
        <CodeBlock language="dart" code={scrollableCode} filename="reply_view.dart" />
        <p className="text-muted-foreground text-sm">
          In a chat list where the <code className="bg-muted rounded px-1 text-xs">ListView</code> already scrolls:
        </p>
        <CodeBlock language="dart" code={chatListCode} filename="chat_list.dart" />
      </div>

      {/* SelectionArea */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Text selection</h2>
        <p className="text-muted-foreground text-sm">
          Wrap in <code className="bg-muted rounded px-1 text-xs">SelectionArea</code> the same way you would any Flutter text.
          Inline code stays on the text baseline and is selectable. Copying across a list or table currently yields
          cells run together with no separators — prose, headings, links, and inline code copy correctly.
        </p>
        <CodeBlock language="dart" code={selectionCode} filename="selectable.dart" />
      </div>

      {/* Link tap */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Handling link taps</h2>
        <p className="text-muted-foreground text-sm">
          Links render as tappable but do nothing on their own — opening a URL is your decision.
          LLM output can contain any URL, so validate before launching.
        </p>
        <CodeBlock language="dart" code={linkTapCode} filename="link_tap.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Image, code, citation, and checkbox callbacks</h2>
        <p className="text-muted-foreground text-sm leading-6">
          The remaining interactions are opt-in too. Markdown checkboxes are read-only by default; when enabling
          <code className="bg-muted rounded px-1 text-xs">CheckboxStyle(interactive: true)</code>, persist a rewritten
          source string or the visible state will revert during the next rebuild.
        </p>
        <CodeBlock language="dart" code={interactionCode} filename="interactions.dart" />
      </div>

      {/* RTL */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Right-to-left</h2>
        <p className="text-muted-foreground text-sm">
          Inline widgets — LaTeX, images, links — are placed in the correct visual order in mixed-direction
          paragraphs, working around{" "}
          <a href="https://github.com/flutter/flutter/issues/54400" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">flutter#54400</a>{" "}
          which the framework does not handle on its own.
        </p>
        <CodeBlock language="dart" code={rtlCode} filename="rtl.dart" />
      </div>

      {/* Text scaling */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Text scaling</h2>
        <p className="text-muted-foreground text-sm">
          Set the base font size once via <code className="bg-muted rounded px-1 text-xs">style</code>.
          Heading sizes, inline code, and list bullets all derive from it proportionally.
          Components rendered as inline widgets scale correctly at any system font setting.
        </p>
        <CodeBlock language="dart" code={textScaleCode} filename="text_style.dart" />
      </div>
    </div>
  );
}
