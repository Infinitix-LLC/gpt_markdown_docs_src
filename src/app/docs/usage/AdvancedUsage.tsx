import { CodeBlock } from "@/components/ui/components/ui/code-block";

const linkTapCode = `GptMarkdown(
  content,
  onLinkTap: (url, title) {
    launchUrl(Uri.parse(url));
  },
)`;

const styleCode = `GptMarkdown(
  content,
  style: const TextStyle(
    fontSize: 16,
    height: 1.6,
    color: Colors.black87,
  ),
  textDirection: TextDirection.rtl,   // RTL language support
  textAlign: TextAlign.justify,
)`;

const codeBuilderCode = `GptMarkdown(
  content,
  codeBuilder: (context, name, code, closed) {
    return MyCustomCodeBlock(
      language: name,
      code: code,
      isClosed: closed,
    );
  },
)`;

const latexBuilderCode = `GptMarkdown(
  content,
  useDollarSignsForLatex: true,   // enables $...$ and $$...$$ syntax
  latexBuilder: (context, latex, textStyle, inline) {
    return MyLatexRenderer(
      equation: latex,
      inline: inline,
    );
  },
)`;

const linkBuilderCode = `GptMarkdown(
  content,
  linkBuilder: (context, text, href, title) {
    return InkWell(
      onTap: () => launchUrl(Uri.parse(href)),
      child: Text(
        text,
        style: const TextStyle(
          color: Colors.blue,
          decoration: TextDecoration.underline,
        ),
      ),
    );
  },
)`;

const imageBuilderCode = `GptMarkdown(
  content,
  imageBuilder: (context, url, alt) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(8),
      child: Image.network(url, semanticLabel: alt),
    );
  },
)`;

export function AdvancedUsage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Handling link taps</h2>
        <p className="text-muted-foreground text-sm">
          Use <code className="bg-muted rounded px-1 text-xs">onLinkTap</code> to intercept clicks on Markdown links.
        </p>
        <CodeBlock language="dart" code={linkTapCode} filename="example.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Text style & direction</h2>
        <p className="text-muted-foreground text-sm">
          Control the base text style, RTL support, and text alignment.
        </p>
        <CodeBlock language="dart" code={styleCode} filename="example.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Custom code block renderer</h2>
        <p className="text-muted-foreground text-sm">
          Replace the built-in code block with your own widget via <code className="bg-muted rounded px-1 text-xs">codeBuilder</code>.
        </p>
        <CodeBlock language="dart" code={codeBuilderCode} filename="example.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Custom LaTeX renderer</h2>
        <p className="text-muted-foreground text-sm">
          Override the LaTeX renderer and optionally enable <code className="bg-muted rounded px-1 text-xs">$...$</code> dollar-sign syntax.
        </p>
        <CodeBlock language="dart" code={latexBuilderCode} filename="example.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Custom link renderer</h2>
        <CodeBlock language="dart" code={linkBuilderCode} filename="example.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Custom image renderer</h2>
        <CodeBlock language="dart" code={imageBuilderCode} filename="example.dart" />
      </div>
    </div>
  );
}
