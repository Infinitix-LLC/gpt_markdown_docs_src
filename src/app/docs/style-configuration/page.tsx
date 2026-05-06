import { CodeBlock } from "@/components/ui/components/ui/code-block";
import Link from "next/link";

const fullSignatureCode = `GptMarkdown(
  'your markdown string',           // required, positional

  // Text
  style: TextStyle(...),            // base text style
  textDirection: TextDirection.ltr, // LTR (default) or RTL
  textAlign: TextAlign.start,       // text alignment
  textScaler: TextScaler.linear(1), // text scaling
  maxLines: null,                   // max lines (null = unlimited)
  overflow: TextOverflow.clip,      // overflow behaviour

  // Links
  onLinkTap: (url, title) { },      // handle link taps
  followLinkColor: false,           // inherit link color from style
  linkBuilder: (ctx, text, href, title) => Widget,

  // LaTeX
  useDollarSignsForLatex: false,    // enable $...$ and $$...$$ syntax
  latexWorkaround: (tex) => tex,    // normalize AI output quirks
  latexBuilder: (ctx, latex, style, inline) => Widget,

  // Code blocks
  codeBuilder: (ctx, lang, code, closed) => Widget,

  // Inline code / highlight
  highlightBuilder: (ctx, code, style) => Widget,

  // Images
  imageBuilder: (ctx, url, alt) => Widget,

  // Lists
  orderedListBuilder: (ctx, num, style) => Widget,
  unOrderedListBuilder: (ctx, depth, style) => Widget,

  // Tables
  tableBuilder: (ctx, headers, rows) => Widget,

  // Source tags (citations)
  sourceTagBuilder: (ctx, sources) => Widget,

  // Custom block-level components
  components: [...],

  // Custom inline components
  inlineComponents: [...],
)`;

const params = [
  { name: "data",                   type: "String",                    req: true,  desc: "The Markdown string to render. Positional argument." },
  { name: "style",                  type: "TextStyle?",                req: false, desc: "Base text style applied to all text." },
  { name: "textDirection",          type: "TextDirection",             req: false, desc: "LTR (default) or RTL — for Arabic, Hebrew, etc." },
  { name: "textAlign",              type: "TextAlign?",                req: false, desc: "Text alignment within the widget." },
  { name: "textScaler",             type: "TextScaler?",               req: false, desc: "Scales text size uniformly." },
  { name: "maxLines",               type: "int?",                      req: false, desc: "Limits number of rendered lines." },
  { name: "overflow",               type: "TextOverflow?",             req: false, desc: "Overflow behaviour when maxLines is set." },
  { name: "followLinkColor",        type: "bool",                      req: false, desc: "If true, links inherit the base text color." },
  { name: "onLinkTap",              type: "Function(url, title)?",     req: false, desc: "Callback when a Markdown link is tapped." },
  { name: "linkBuilder",            type: "LinkBuilder?",              req: false, desc: "Fully replace the link widget." },
  { name: "useDollarSignsForLatex", type: "bool",                      req: false, desc: "Enable $...$ and $$...$$ LaTeX delimiters." },
  { name: "latexWorkaround",        type: "Function(String)?",         req: false, desc: "Transform LaTeX strings before rendering (e.g. unescape)." },
  { name: "latexBuilder",           type: "LatexBuilder?",             req: false, desc: "Replace the LaTeX renderer with your own widget." },
  { name: "codeBuilder",            type: "CodeBlockBuilder?",         req: false, desc: "Replace the code block renderer." },
  { name: "highlightBuilder",       type: "HighlightBuilder?",         req: false, desc: "Replace inline code (backtick) renderer." },
  { name: "imageBuilder",           type: "ImageBuilder?",             req: false, desc: "Replace the image renderer." },
  { name: "orderedListBuilder",     type: "OrderedListBuilder?",       req: false, desc: "Replace the ordered list item renderer." },
  { name: "unOrderedListBuilder",   type: "UnOrderedListBuilder?",     req: false, desc: "Replace the unordered list item renderer." },
  { name: "tableBuilder",           type: "Function?",                 req: false, desc: "Replace the table renderer." },
  { name: "sourceTagBuilder",       type: "SourceTagBuilder?",         req: false, desc: "Render citation/source tags." },
  { name: "components",             type: "List?",                     req: false, desc: "Custom block-level Markdown components." },
  { name: "inlineComponents",       type: "List?",                     req: false, desc: "Custom inline Markdown components." },
];

export default function StyleConfigurationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-3">Style & Parameters</h1>
        <p className="text-muted-foreground leading-7">
          Complete reference for every parameter on the <code className="bg-muted rounded px-1 text-sm">GptMarkdown</code> widget.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Full signature</h2>
        <CodeBlock language="dart" code={fullSignatureCode} filename="reference.dart" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold border-b pb-2">Parameter reference</h2>
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/60">
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground w-[200px]">Parameter</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground w-[160px]">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground w-[60px]">Req.</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              {params.map(({ name, type, req, desc }, i) => (
                <tr key={name} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                  <td className="px-4 py-2.5 font-mono text-xs text-foreground">{name}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{type}</td>
                  <td className="px-4 py-2.5 text-center text-xs">{req ? "✅" : ""}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-start pt-2">
        <Link href="/docs/themes" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          ← Themes
        </Link>
      </div>
    </div>
  );
}
