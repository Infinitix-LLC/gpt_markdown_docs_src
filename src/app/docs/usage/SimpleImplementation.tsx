import { CodeBlock } from "@/components/ui/components/ui/code-block";

const minimalCode = `import 'package:gpt_markdown/gpt_markdown.dart';

// Minimal — just pass your string
GptMarkdown('**Hello!** Inline math: \\\\( E = mc^2 \\\\)')`;

const scrollableCode = `import 'package:flutter/material.dart';
import 'package:gpt_markdown/gpt_markdown.dart';

class MarkdownScreen extends StatelessWidget {
  final String content;
  const MarkdownScreen({super.key, required this.content});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Response')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: GptMarkdown(content),
      ),
    );
  }
}`;

const streamingCode = `import 'package:flutter/material.dart';
import 'package:gpt_markdown/gpt_markdown.dart';

class StreamingChat extends StatefulWidget {
  const StreamingChat({super.key});

  @override
  State<StreamingChat> createState() => _StreamingChatState();
}

class _StreamingChatState extends State<StreamingChat> {
  String _buffer = '';

  void _onChunk(String chunk) {
    setState(() => _buffer += chunk);
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: GptMarkdown(_buffer),
    );
  }
}`;

export function SimpleImplementation() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Basic Usage</h1>
        <p className="text-muted-foreground leading-7">
          <code className="bg-muted rounded px-1 text-sm">GptMarkdown</code> takes a single required positional argument — the markdown string.
          Everything else is optional.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Minimal example</h2>
        <CodeBlock language="dart" code={minimalCode} filename="main.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Inside a Scaffold</h2>
        <p className="text-muted-foreground text-sm">
          Wrap in <code className="bg-muted rounded px-1 text-xs">SingleChildScrollView</code> when content may overflow the screen.
        </p>
        <CodeBlock language="dart" code={scrollableCode} filename="markdown_screen.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Streaming AI output</h2>
        <p className="text-muted-foreground text-sm">
          Append chunks to a string buffer and pass it directly — the widget re-renders on each update.
        </p>
        <CodeBlock language="dart" code={streamingCode} filename="streaming_chat.dart" />
      </div>
    </div>
  );
}
