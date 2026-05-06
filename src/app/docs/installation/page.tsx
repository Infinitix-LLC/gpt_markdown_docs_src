import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const pubspecCode = `dependencies:
  gpt_markdown: ^1.1.6`;

const importCode = `import 'package:gpt_markdown/gpt_markdown.dart';`;

const verifyCode = `GptMarkdown('# Hello from GPT Markdown!')`;

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Installation</h1>
        <p className="text-muted-foreground leading-7">
          Add <code className="bg-muted rounded px-1 text-sm">gpt_markdown</code> to your Flutter project.
          No extra dependencies required — LaTeX rendering is bundled automatically.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Option 1 — Flutter CLI</h2>
        <p className="text-muted-foreground text-sm">The fastest way:</p>
        <CodeBlock language="bash" code="flutter pub add gpt_markdown" filename="terminal" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Option 2 — pubspec.yaml</h2>
        <p className="text-muted-foreground text-sm">Add it manually, then run <code className="bg-muted rounded px-1 text-xs">flutter pub get</code>:</p>
        <CodeBlock language="yaml" code={pubspecCode} filename="pubspec.yaml" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Import</h2>
        <CodeBlock language="dart" code={importCode} filename="your_file.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Verify it works</h2>
        <p className="text-muted-foreground text-sm">Drop this anywhere in your widget tree:</p>
        <CodeBlock language="dart" code={verifyCode} filename="main.dart" />
      </div>

      <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-4 text-sm">
        <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">Requirements</p>
        <ul className="text-blue-700 dark:text-blue-400 space-y-1 text-xs">
          <li>Flutter SDK 3.0.0 or higher</li>
          <li>Dart SDK 2.17.0 or higher</li>
        </ul>
      </div>

      <div className="flex justify-end pt-2">
        <Link href="/docs/usage" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
          Basic Usage <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
