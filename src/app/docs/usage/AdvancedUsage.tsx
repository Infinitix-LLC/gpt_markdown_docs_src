import { CodeBlock } from "@/components/ui/components/ui/code-block";

const latexCode = `// LaTeX renders with the package default. Use latexBuilder only to replace it.
// flutter_math_fork is the most common choice.
import 'package:flutter_math_fork/flutter_math.dart';

GptMarkdown(
  reply,
  latexBuilder: (context, tex, textStyle, inline) => Math.tex(
    tex,
    textStyle: textStyle,
    onErrorFallback: (err) => Text(tex, style: textStyle),
  ),
)`;

const codeBuilderCode = `// Replace the default code block widget with your own.
GptMarkdown(
  reply,
  codeBuilder: (context, name, code, closed) {
    // name   = language identifier ("dart", "python", …) — may be empty
    // code   = raw code string
    // closed = false while the closing fence hasn't arrived yet (streaming)
    return MyCodeBlock(language: name, code: code, isClosed: closed);
  },
)`;

const streamingCode = `// Streaming is data, not a Stream — rebuild with a longer string each token.
class ReplyView extends StatefulWidget {
  const ReplyView({super.key, required this.stream});
  final Stream<String> stream;

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
    );
  }

  @override
  Widget build(BuildContext context) => SingleChildScrollView(
    padding: const EdgeInsets.all(16),
    child: GptMarkdown(
      _buffer.toString(),
      animation: GptMarkdownAnimation.fade,
      isStreaming: _generating,   // flip to false when the stream ends
    ),
  );
}`;

const imageBuilderCode = `GptMarkdown(
  reply,
  imageBuilder: (context, url, width, height) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(8),
      child: Image.network(
        url,
        width: width,
        height: height,
        fit: BoxFit.cover,
      ),
    );
  },
)`;

const linkBuilderCode = `GptMarkdown(
  reply,
  linkBuilder: (context, text, url, style) {
    return InkWell(
      onTap: () => launchUrlString(url),
      child: Text.rich(TextSpan(children: [text]),
          style: style.copyWith(decoration: TextDecoration.underline)),
    );
  },
)`;

export function AdvancedUsage() {
  return (
    <div className="space-y-10">
      {/* Streaming quick-look */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Streaming AI output</h2>
        <p className="text-muted-foreground text-sm">
          Accumulate tokens in a <code className="bg-muted rounded px-1 text-xs">StringBuffer</code>, pass the string to{" "}
          <code className="bg-muted rounded px-1 text-xs">GptMarkdown</code>, and set{" "}
          <code className="bg-muted rounded px-1 text-xs">isStreaming: true</code> while the stream is open.
          The settled prefix is cached so cost per token stays flat regardless of reply length.
          See the <a href="/docs/streaming" className="text-primary hover:underline">Streaming guide</a> for
          pacing, performance details, and pitfalls.
        </p>
        <CodeBlock language="dart" code={streamingCode} filename="streaming_reply.dart" />
      </div>

      {/* LaTeX */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">LaTeX rendering</h2>
        <p className="text-muted-foreground text-sm">
          The package renders LaTeX by default. Use <code className="bg-muted rounded px-1 text-xs">latexBuilder</code>{" "}
          only when your app needs a different math widget or error treatment.
          See <a href="/docs/latex-support" className="text-primary hover:underline">LaTeX Support</a> for delimiters and display-math scroll.
        </p>
        <CodeBlock language="dart" code={latexCode} filename="latex.dart" />
      </div>

      {/* codeBuilder */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Custom code block</h2>
        <p className="text-muted-foreground text-sm">
          Use <code className="bg-muted rounded px-1 text-xs">codeBuilder</code> to replace the default code block widget.
          The <code className="bg-muted rounded px-1 text-xs">closed</code> flag is{" "}
          <code className="bg-muted rounded px-1 text-xs">false</code> while the closing fence has not yet arrived during streaming.
        </p>
        <CodeBlock language="dart" code={codeBuilderCode} filename="code_block.dart" />
      </div>

      {/* imageBuilder */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Custom image renderer</h2>
        <p className="text-muted-foreground text-sm">
          The <code className="bg-muted rounded px-1 text-xs">imageBuilder</code> callback receives the URL plus optional
          width and height from the alt text (parsed as <code className="bg-muted rounded px-1 text-xs">WxH</code>).
        </p>
        <CodeBlock language="dart" code={imageBuilderCode} filename="image_builder.dart" />
      </div>

      {/* linkBuilder */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Custom link renderer</h2>
        <p className="text-muted-foreground text-sm">
          Use <code className="bg-muted rounded px-1 text-xs">linkBuilder</code> for complete control over how links are drawn.
          For tap-only needs, prefer the simpler <code className="bg-muted rounded px-1 text-xs">onLinkTap</code>.
        </p>
        <CodeBlock language="dart" code={linkBuilderCode} filename="link_builder.dart" />
      </div>
    </div>
  );
}
