import type { Metadata } from "next";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Streaming — Animate AI Replies in Flutter with GptMarkdown",
  description:
    "Render AI replies as they stream with gpt_markdown v1.2.1. Covers accumulating text, GptMarkdownAnimation.fade, isStreaming lifecycle, charactersPerSecond pacing, reduced motion, selection after reveal, incomplete code fences, fast-forward, and chat-list scroll pitfalls.",
  alternates: { canonical: "https://gptmarkdown.com/docs/streaming" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Streaming — Animate AI Replies in Flutter with GptMarkdown",
    description:
      "Render AI replies as they stream with gpt_markdown v1.2.1. Covers accumulating text, GptMarkdownAnimation.fade, isStreaming lifecycle, charactersPerSecond pacing, reduced motion, selection after reveal, incomplete code fences, fast-forward, and chat-list scroll pitfalls.",
    url: "https://gptmarkdown.com/docs/streaming",
  },
  twitter: {
    card: "summary_large_image",
    title: "Streaming — Animate AI Replies in Flutter with GptMarkdown",
    description:
      "Render AI replies as they stream with gpt_markdown v1.2.1. Covers accumulating text, GptMarkdownAnimation.fade, isStreaming lifecycle, charactersPerSecond pacing, reduced motion, selection after reveal, incomplete code fences, fast-forward, and chat-list scroll pitfalls.",
    images: ["/twitter-image"],
  },
};

const accumulatingCode = `// Streaming is data, not a Dart Stream.
// Rebuild the widget with a longer string as tokens arrive.
class ReplyView extends StatefulWidget {
  const ReplyView({super.key, required this.stream});
  final Stream<String> stream;   // your transport layer

  @override
  State<ReplyView> createState() => _ReplyViewState();
}

class _ReplyViewState extends State<ReplyView> {
  final _buffer = StringBuffer();
  bool _generating = true;

  @override
  void initState() {
    super.initState();
    widget.stream.listen(
      (chunk) => setState(() => _buffer.write(chunk)),
      onDone:  () => setState(() => _generating = false),
      onError: (_) => setState(() => _generating = false), // always flip on error
    );
  }

  @override
  Widget build(BuildContext context) => SingleChildScrollView(
    padding: const EdgeInsets.all(16),
    child: GptMarkdown(
      _buffer.toString(),
      animation: GptMarkdownAnimation.fade,
      isStreaming: _generating,
    ),
  );
}`;

const animationModesCode = `// GptMarkdownAnimation.none  — the default.
// No ticker, no wrapper, no split: the tree is exactly what it was before
// the streaming feature existed. Use for history messages.
GptMarkdown(message.text)

// GptMarkdownAnimation.fade  — fade in newly revealed characters.
// The settled prefix is cached; only the live tail rebuilds.
GptMarkdown(
  message.text,
  animation: GptMarkdownAnimation.fade,
  isStreaming: message.isGenerating,
)`;

const isStreamingCode = `// isStreaming tells the widget two things:
//   true  → more text is coming; keep the reveal animation running
//   false → the reply is complete; fast-forward any remaining reveal
//
// Without it the widget cannot distinguish:
//   • text got longer   → new token, continue revealing
//   • text got replaced → regenerate/branch, restart reveal
//
// Static history messages render with zero animation cost:
GptMarkdown(
  message.text,
  animation: GptMarkdownAnimation.fade,
  isStreaming: message.isGenerating,   // false for everything already sent
)`;

const pacingCode = `// charactersPerSecond (default: 300) is the baseline reveal speed.
// Three behaviours layer on top of it automatically:
//
//  1. Lag adaptation — if the backlog would take > 0.4 s, the reveal
//     speeds up to clear it in that window. The animation never falls
//     further behind on a long reply.
//
//  2. Fast-forward — when isStreaming turns false, the remainder
//     lands within 0.15 s. A finished reply never trickles.
//
//  3. Restart — text that replaces rather than extends restarts the
//     reveal (regenerate or branch switch).
GptMarkdown(
  reply,
  animation: GptMarkdownAnimation.fade,
  isStreaming: generating,
  charactersPerSecond: 220,   // calmer default; adaptation still applies
)`;

const reducedMotionCode = `// The widget checks MediaQuery.disableAnimationsOf(context).
// When true, the reveal is skipped and the document renders immediately.
// No ticker runs — the fast path is taken regardless of 'animation'.
//
// Test this path explicitly, because it is what users with motion
// sensitivity get in production:
MediaQuery(
  data: const MediaQueryData(disableAnimations: true),
  child: GptMarkdown(
    reply,
    animation: GptMarkdownAnimation.fade,
    isStreaming: generating,
  ),
)`;

const incompleteFenceCode = `// While closed = false on a code block, the closing fence hasn't arrived.
// gpt_markdown never cuts the settled prefix inside a code fence —
// a split inside an unterminated fence would render as literal text
// and cause a visible flicker.
//
// Use the closed flag in codeBuilder to show a lighter UI mid-stream:
GptMarkdown(
  reply,
  animation: GptMarkdownAnimation.fade,
  isStreaming: generating,
  codeBuilder: (context, name, code, closed) {
    if (!closed) {
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(12),
        color: Colors.grey.shade900,
        child: Text(
          code,
          style: const TextStyle(fontFamily: 'monospace', color: Colors.white70),
        ),
      );
    }
    return MyHighlightedCodeBlock(language: name, code: code);
  },
)`;

const selectionCode = `// Selection is unavailable on the live tail while the reveal runs.
// The tail is rebuilt every frame, so it is not a stable selection target.
// Selection returns the moment isStreaming becomes false and the
// fast-forward completes.
//
// Static history messages are fully selectable — wrap the whole chat in
// a single SelectionArea:
SelectionArea(
  child: ListView.builder(
    itemBuilder: (ctx, i) => GptMarkdown(
      messages[i].text,
      animation: GptMarkdownAnimation.fade,
      isStreaming: messages[i].isGenerating,
    ),
  ),
)`;

const fastForwardCode = `// Set a very high charactersPerSecond to get the split-document caching
// without a visible reveal animation. The prefix stays cached while the
// reveal completes within a single frame.
//
// Useful when you want the performance benefit of the split but a
// 'no animation' appearance.
GptMarkdown(
  reply,
  animation: GptMarkdownAnimation.fade,
  isStreaming: generating,
  charactersPerSecond: 100000,   // finishes within one frame
)`;

const chatListCode = `// The split keeps *this widget* cheap. It cannot help if the parent
// ListView rebuilds every bubble on each token.
//
// Make only the generating message listenable:
class _ChatListState extends State<ChatList> {
  // Only _messages[_generatingIndex] changes during streaming —
  // use a ValueNotifier or Riverpod so the rest of the list stays stable.
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: _messages.length,
      itemBuilder: (ctx, i) {
        final msg = _messages[i];
        return GptMarkdown(
          msg.text,
          animation: GptMarkdownAnimation.fade,
          isStreaming: msg.isGenerating,
        );
      },
    );
  }
}

// Auto-scrolling pitfall:
// The reply grows continuously — jumping to the bottom on every token
// fights the reveal animation. Instead, animate to the extent, or
// only pin-scroll while the user is already at the bottom.`;

const perfTableRows = [
  { mode: "animation: none", cost: "14.6 ms / token", note: "Rebuilds whole document. Gets worse as reply grows." },
   { mode: "animation: fade", cost: "11.0 ms / token", note: "Settled prefix cached. Stayed flat in the measured reply." },
];

export default function StreamingPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Streaming</h1>
        <p className="text-muted-foreground leading-7">
          Rendering a reply while the model is still generating it.
          Streaming in <code className="bg-muted rounded px-1 text-sm">gpt_markdown</code> is{" "}
          <strong>data, not a <code className="text-sm">Stream</code></strong> — rebuild the widget
          with a longer string as tokens arrive, and say whether more is coming via{" "}
          <code className="bg-muted rounded px-1 text-sm">isStreaming</code>.
        </p>
      </div>

      {/* Accumulating text */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Accumulating text</h2>
        <p className="text-muted-foreground text-sm">
          Buffer incoming tokens in a <code className="bg-muted rounded px-1 text-xs">StringBuffer</code>,
          call <code className="bg-muted rounded px-1 text-xs">setState</code> on each chunk, and flip{" "}
          <code className="bg-muted rounded px-1 text-xs">isStreaming</code> to{" "}
          <code className="bg-muted rounded px-1 text-xs">false</code> on completion:
        </p>
        <CodeBlock language="dart" code={accumulatingCode} filename="streaming_reply.dart" />
      </div>

      {/* Animation modes */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Animation modes</h2>
        <p className="text-muted-foreground text-sm">
          <code className="bg-muted rounded px-1 text-xs">GptMarkdownAnimation.none</code> is the default and costs nothing extra —
          no ticker, no wrapper widget. Use{" "}
          <code className="bg-muted rounded px-1 text-xs">GptMarkdownAnimation.fade</code> for a smooth reveal:
        </p>
        <CodeBlock language="dart" code={animationModesCode} filename="animation_modes.dart" />
      </div>

      {/* isStreaming lifecycle */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">
          <code className="text-xl">isStreaming</code> lifecycle
        </h2>
        <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 p-3 text-sm text-blue-900 dark:text-blue-200">
          <strong>Important:</strong> Without <code className="bg-blue-100 dark:bg-blue-900/50 rounded px-1 text-xs">isStreaming</code> the widget
          cannot tell whether the text got longer (new token) or replaced (regenerate). It also cannot know when
          to fast-forward the remaining reveal.
        </div>
        <CodeBlock language="dart" code={isStreamingCode} filename="is_streaming.dart" />
      </div>

      <details className="rounded-xl border group">
        <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-lg [&::-webkit-details-marker]:hidden">
          Advanced streaming behavior <span className="float-right text-sm font-normal text-muted-foreground group-open:hidden">show performance and edge cases</span><span className="float-right hidden text-sm font-normal text-muted-foreground group-open:inline">hide advanced details</span>
        </summary>
        <div className="border-t p-4 space-y-10">
      {/* Performance */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Performance</h2>
        <p className="text-muted-foreground text-sm">
          The source text is split at the last safe blank line. The settled prefix is built once and cached
          behind a <code className="bg-muted rounded px-1 text-xs">RepaintBoundary</code>; only the live tail
          (at most one construct) rebuilds. Measured on a 7.7 kB reply, 120 appends:
        </p>
        <div className="rounded-xl border overflow-x-auto" role="region" aria-label="Streaming performance comparison" tabIndex={0}>
          <table className="min-w-[620px] w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/60">
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Mode</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Cost per token</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Notes</th>
              </tr>
            </thead>
            <tbody>
              {perfTableRows.map(({ mode, cost, note }, i) => (
                <tr key={mode} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                  <td className="px-4 py-2.5 font-mono text-xs">{mode}</td>
                  <td className="px-4 py-2.5 font-medium text-sm">{cost}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground text-xs">
          The <code className="bg-muted rounded px-1 text-xs">fade</code> path is faster <em>with</em> the animation
          because the split avoided rebuilding the whole document in this benchmark. Results depend on source shape and
          device; treat these numbers as a measured example rather than a universal guarantee.
        </p>
      </div>

      {/* Pacing */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">
          <code className="text-xl">charactersPerSecond</code> pacing
        </h2>
        <p className="text-muted-foreground text-sm">
          <code className="bg-muted rounded px-1 text-xs">charactersPerSecond</code> (default 300) is a baseline, not a cap.
          Pick the speed that reads well when the model is <em>slower</em> than the reveal —
          lag adaptation handles the opposite case automatically.
        </p>
        <CodeBlock language="dart" code={pacingCode} filename="pacing.dart" />
      </div>

      {/* Reduced motion */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Reduced motion</h2>
        <p className="text-muted-foreground text-sm">
          When <code className="bg-muted rounded px-1 text-xs">MediaQuery.disableAnimationsOf(context)</code> is true, the reveal is
          skipped and the finished document renders immediately. No ticker runs.
          Nothing to configure — but test it, because it is the path users with motion sensitivity get:
        </p>
        <CodeBlock language="dart" code={reducedMotionCode} filename="reduced_motion.dart" />
      </div>

      {/* Incomplete code fences */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Incomplete code fences</h2>
        <p className="text-muted-foreground text-sm">
          The split never cuts inside a fenced code block. An unterminated fence in the settled prefix
          would render as literal text until the closing fence arrived — a visible flicker.
          Use the <code className="bg-muted rounded px-1 text-xs">closed</code> flag in{" "}
          <code className="bg-muted rounded px-1 text-xs">codeBuilder</code> to show a lighter UI mid-stream:
        </p>
        <CodeBlock language="dart" code={incompleteFenceCode} filename="incomplete_fence.dart" />
      </div>

      {/* Fast-forward */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Fast-forward without visible animation</h2>
        <p className="text-muted-foreground text-sm">
          To get the split-document caching without a visible reveal, use a very high{" "}
          <code className="bg-muted rounded px-1 text-xs">charactersPerSecond</code>.
          The reveal finishes within a single frame while the prefix stays cached:
        </p>
        <CodeBlock language="dart" code={fastForwardCode} filename="fast_forward.dart" />
      </div>

      {/* Selection after reveal */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Selection after reveal</h2>
        <p className="text-muted-foreground text-sm">
          The live tail is rebuilt every frame while revealing, so it is not a stable selection target.
          Selection returns the moment <code className="bg-muted rounded px-1 text-xs">isStreaming</code> becomes{" "}
          <code className="bg-muted rounded px-1 text-xs">false</code> and the fast-forward completes.
          History messages with <code className="bg-muted rounded px-1 text-xs">isStreaming: false</code> are
          fully selectable.
        </p>
        <CodeBlock language="dart" code={selectionCode} filename="selection.dart" />
      </div>

      {/* Chat list and scroll pitfalls */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Chat list and scroll pitfalls</h2>
        <div className="space-y-2">
          <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30 p-3 text-sm text-red-900 dark:text-red-200">
            <strong>Rebuilding the whole chat list per token.</strong>{" "}
            The split keeps <em>this widget</em> cheap; it cannot help if the{" "}
            <code className="bg-red-100 dark:bg-red-900/50 rounded px-1 text-xs">ListView</code> above rebuilds every bubble.
            Make the generating message itself listenable so only that bubble rebuilds.
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30 p-3 text-sm text-red-900 dark:text-red-200">
            <strong>Jumping the scroll position on every token.</strong>{" "}
            The reply grows continuously — animating to the bottom on each token fights the reveal.
            Animate to the extent, or only pin-scroll while the user is already at the bottom.
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30 p-3 text-sm text-red-900 dark:text-red-200">
            <strong>Leaving <code className="bg-red-100 dark:bg-red-900/50 rounded px-1 text-xs">isStreaming: true</code> after the reply finishes.</strong>{" "}
            The ticker keeps running and the tail keeps rebuilding for nothing. Always flip it in{" "}
            <code className="bg-red-100 dark:bg-red-900/50 rounded px-1 text-xs">onDone</code> — including error paths.
          </div>
        </div>
        <CodeBlock language="dart" code={chatListCode} filename="chat_list.dart" />
      </div>
        </div>
      </details>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Run the streaming demo</h2>
        <p className="text-muted-foreground text-sm leading-6">
          The package example includes a simulated reply with independent model-speed and reveal-speed sliders. Set the
          model faster than the reveal to watch lag adaptation catch up, press Stop mid-reply to see fast-forward, and
          switch to <code>none</code> to compare the non-animation path.
        </p>
        <CodeBlock language="bash" filename="terminal" code={`cd example
flutter run -d macos -t lib/streaming_demo.dart`} />
      </div>

      {/* Bottom nav */}
      <div className="flex justify-between pt-2">
        <Link href="/docs/syntax-highlighting" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          ← Code Blocks
        </Link>
        <Link href="/docs/themes" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
          Themes <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
