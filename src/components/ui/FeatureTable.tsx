import React from "react";

const features = [
  { name: "Headings (H1–H6)",              desc: "All six heading levels with auto-divider under H1.",   supported: true },
  { name: "Bold & italic",                 desc: "**bold**, *italic*, and ***both***.",                  supported: true },
  { name: "Strikethrough",                 desc: "~~strikethrough~~ text.",                              supported: true },
  { name: "Underline",                     desc: "<u>underline</u> via HTML tag.",                      supported: true },
  { name: "Inline code",                   desc: "`backtick` inline code spans.",                       supported: true },
  { name: "Code blocks",                   desc: "Fenced code blocks with syntax highlighting.",        supported: true },
  { name: "Unordered lists",               desc: "Bullet point lists, with nesting.",                   supported: true },
  { name: "Ordered lists",                 desc: "Numbered lists.",                                     supported: true },
  { name: "Task lists (checkboxes)",        desc: "- [x] done  /  - [ ] pending",                       supported: true },
  { name: "Radio buttons",                 desc: "- (x) selected  /  - ( ) unselected",                 supported: true },
  { name: "Tables",                        desc: "Full GFM-style pipe tables.",                         supported: true },
  { name: "Blockquotes",                   desc: "> quoted text",                                       supported: true },
  { name: "Horizontal rule",               desc: "--- horizontal divider line.",                        supported: true },
  { name: "Links",                         desc: "[text](url) with onLinkTap callback.",                supported: true },
  { name: "Images",                        desc: "![alt](url) with optional size.",                     supported: true },
  { name: "Inline LaTeX",                  desc: "\\\\( ... \\\\) and $...$ math expressions.",         supported: true },
  { name: "Block LaTeX",                   desc: "\\\\[ ... \\\\] and $$...$$ display equations.",      supported: true },
  { name: "Highlighted text",              desc: "==highlighted== background spans.",                   supported: true },
  { name: "Indent",                        desc: "Indented text blocks.",                               supported: true },
  { name: "Selectable text",              desc: "Text is selectable by default.",                       supported: true },
  { name: "RTL support",                   desc: "textDirection: TextDirection.rtl",                    supported: true },
  { name: "Custom builders",               desc: "codeBuilder, latexBuilder, linkBuilder, imageBuilder, and more.", supported: true },
];

export default function FeatureTable() {
  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/60">
            <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Feature</th>
            <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Notes</th>
            <th className="text-center px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground w-24">Status</th>
          </tr>
        </thead>
        <tbody>
          {features.map(({ name, desc, supported }, i) => (
            <tr key={name} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
              <td className="px-4 py-2.5 font-medium text-sm">{name}</td>
              <td className="px-4 py-2.5 text-xs text-muted-foreground">{desc}</td>
              <td className="px-4 py-2.5 text-center text-base">{supported ? "✅" : "🔜"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
