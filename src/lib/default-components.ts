export type ComponentKind = "block" | "inline" | "both";
export type PreviewKind =
  | "heading"
  | "paragraph"
  | "quote"
  | "table"
  | "list"
  | "ordered-list"
  | "checkbox"
  | "radio"
  | "rule"
  | "indent"
  | "code"
  | "latex"
  | "link"
  | "image"
  | "emphasis"
  | "inline-code"
  | "source";

export type DefaultComponent = {
  slug: string;
  name: string;
  className: string;
  kind: ComponentKind;
  category: "Structure" | "Lists & controls" | "Inline text" | "Links & media" | "Code & math" | "Data & citations";
  preview: PreviewKind;
  summary: string;
  markdown: string;
  behavior: string;
  accessibility: string;
  style?: { key: string; type: string; fields: string[]; example: string };
  builder?: { name: string; signature: string };
  callback?: { name: string; signature: string; note: string };
  related: string[];
};

const commonTheme = `// Theme a subtree or your whole app. Widget-level values win per field.
GptMarkdownTheme(
  gptThemeData: GptMarkdownThemeData(
    brightness: Brightness.light,
    styleSheet: const GptMarkdownStyleSheet(/* component styles */),
  ),
  child: GptMarkdown(markdown),
)`;

export const defaultComponents: DefaultComponent[] = [
  {
    slug: "heading",
    name: "Heading",
    className: "HTag",
    kind: "block",
    category: "Structure",
    preview: "heading",
    summary: "Renders ATX headings from H1 through H6, including the optional H1 divider.",
    markdown: "# Release notes\n\n## The important part",
    behavior: "A hash count from one to six selects the level. The default H1 divider is part of the default heading widget.",
    accessibility: "Use heading levels in order so assistive technology can understand the document outline.",
    style: {
      key: "heading",
      type: "HeadingStyle",
      fields: ["textStyle", "padding", "showDivider", "dividerColor", "dividerThickness", "dividerPadding"],
      example: `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    heading: HeadingStyle(
      textStyle: TextStyle(letterSpacing: -0.4),
      showDivider: false,
      padding: EdgeInsets.only(top: 10, bottom: 6),
    ),
  ),
)`,
    },
    builder: { name: "headingBuilder", signature: "Widget Function(BuildContext context, int level, Widget content, HeadingStyle style)" },
    related: ["paragraph-break", "block-quote", "horizontal-rule"],
  },
  {
    slug: "paragraph-break",
    name: "Paragraph break",
    className: "NewLines",
    kind: "block",
    category: "Structure",
    preview: "paragraph",
    summary: "Normalizes a run of blank lines into the paragraph spacing used by the renderer.",
    markdown: "First paragraph.\n\n\n\nSecond paragraph.",
    behavior: "Two or more line breaks are reduced to exactly two before the rest of the Markdown is parsed.",
    accessibility: "Paragraph separation remains semantic text flow rather than an empty decorative widget.",
    related: ["heading", "indent", "block-quote"],
  },
  {
    slug: "indent",
    name: "Indented text",
    className: "IndentMd",
    kind: "block",
    category: "Structure",
    preview: "indent",
    summary: "Preserves leading-space indentation for indented prose and recursively renders the remaining Markdown.",
    markdown: "  A short indented note.",
    behavior: "Two or more leading spaces claim the line; the visual indentation is capped at four spaces.",
    accessibility: "The content stays selectable text. Use a list or block quote when the indentation conveys a stronger relationship.",
    related: ["paragraph-break", "unordered-list", "block-quote"],
  },
  {
    slug: "block-quote",
    name: "Block quote",
    className: "BlockQuote",
    kind: "block",
    category: "Structure",
    preview: "quote",
    summary: "Renders one or more quoted lines as a padded quote block with a leading bar.",
    markdown: "> A useful detail from the model.\n> It can span more than one line.",
    behavior: "Quote markers are stripped, then the inner content is rendered as Markdown again.",
    accessibility: "Quoted content retains text semantics and is visually separated without relying on color alone.",
    style: {
      key: "blockQuote",
      type: "BlockQuoteStyle",
      fields: ["barWidth", "barColor", "barRadius", "backgroundColor", "padding", "margin", "textStyle"],
      example: `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    blockQuote: BlockQuoteStyle(
      barWidth: 4,
      barColor: Color(0xFF6366F1),
      backgroundColor: Color(0x0A6366F1),
      padding: EdgeInsetsDirectional.only(start: 12, top: 8, bottom: 8),
    ),
  ),
)`,
    },
    builder: { name: "blockQuoteBuilder", signature: "Widget Function(BuildContext context, Widget content, BlockQuoteStyle style)" },
    related: ["heading", "indent", "horizontal-rule"],
  },
  {
    slug: "horizontal-rule",
    name: "Horizontal rule",
    className: "HrLine",
    kind: "block",
    category: "Structure",
    preview: "rule",
    summary: "Renders a Markdown divider as a themed horizontal rule.",
    markdown: "Before the break\n\n---\n\nAfter the break",
    behavior: "A run of three or more hyphens (or the horizontal bar character) is treated as a divider.",
    accessibility: "Use a divider only for a real thematic break; it should not replace a heading.",
    style: {
      key: "hr",
      type: "HrStyle",
      fields: ["thickness", "color", "padding"],
      example: `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    hr: HrStyle(
      thickness: 2,
      color: Color(0x1F000000),
      padding: EdgeInsets.symmetric(vertical: 16),
    ),
  ),
)`,
    },
    builder: { name: "hrBuilder", signature: "Widget Function(BuildContext context, HrStyle style)" },
    related: ["heading", "paragraph-break", "block-quote"],
  },
  {
    slug: "unordered-list",
    name: "Unordered list",
    className: "UnOrderedList",
    kind: "block",
    category: "Lists & controls",
    preview: "list",
    summary: "Renders dash or asterisk list items with the package bullet and spacing rules.",
    markdown: "- Focus on the answer\n- Keep the source link\n- Preserve context",
    behavior: "Each list item renders its own Markdown child, so inline syntax still works inside the item.",
    accessibility: "Use a list for peer items rather than inserting manual bullet characters into prose.",
    style: {
      key: "list",
      type: "ListStyle",
      fields: ["bulletSize", "bulletColor", "bulletShape", "markerTextStyle", "indent", "gapAfterMarker"],
      example: `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    list: ListStyle(
      bulletColor: Colors.indigo,
      bulletSize: 5,
      indent: 12,
      gapAfterMarker: 12,
    ),
  ),
)`,
    },
    builder: { name: "unOrderedListBuilder", signature: "Widget Function(BuildContext context, Widget child, GptMarkdownConfig config)" },
    related: ["ordered-list", "checkbox", "radio-option"],
  },
  {
    slug: "ordered-list",
    name: "Ordered list",
    className: "OrderedList",
    kind: "block",
    category: "Lists & controls",
    preview: "ordered-list",
    summary: "Renders numbered list items while keeping their marker separate from the Markdown child.",
    markdown: "1. Fetch the response\n2. Render the Markdown\n3. Handle link taps",
    behavior: "Any number followed by a period starts an item; the builder receives the marker number as a string.",
    accessibility: "Use ordered lists when the sequence matters.",
    style: {
      key: "list",
      type: "ListStyle",
      fields: ["bulletSize", "bulletColor", "bulletShape", "markerTextStyle", "indent", "gapAfterMarker"],
      example: `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    list: ListStyle(
      markerTextStyle: TextStyle(fontWeight: FontWeight.w700),
      indent: 14,
    ),
  ),
)`,
    },
    builder: { name: "orderedListBuilder", signature: "Widget Function(BuildContext context, String no, Widget child, GptMarkdownConfig config)" },
    related: ["unordered-list", "checkbox", "radio-option"],
  },
  {
    slug: "checkbox",
    name: "Task checkbox",
    className: "CheckBoxMd",
    kind: "block",
    category: "Lists & controls",
    preview: "checkbox",
    summary: "Renders checked and unchecked task-list items from Markdown source.",
    markdown: "- [x] Parse the response\n- [ ] Save the conversation",
    behavior: "The source drives checked state. Set interactive: true and update your source in onCheckboxChanged to keep user changes.",
    accessibility: "An interactive checkbox needs an application callback and source update; read-only task lists remain descriptive.",
    style: {
      key: "checkbox",
      type: "CheckboxStyle",
      fields: ["size", "checkedColor", "uncheckedColor", "checkColor", "borderRadius", "gapAfterBox", "interactive"],
      example: `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    checkbox: CheckboxStyle(
      interactive: true,
      checkedColor: Colors.indigo,
      borderRadius: Radius.circular(4),
    ),
  ),
  onCheckboxChanged: (checked) {
    setState(() => markdown = rewriteTask(markdown, checked));
  },
)`,
    },
    builder: { name: "checkboxBuilder", signature: "Widget Function(BuildContext context, bool checked, Widget content, CheckboxStyle style)" },
    callback: { name: "onCheckboxChanged", signature: "void Function(bool value)", note: "The callback fires only when CheckboxStyle(interactive: true) is enabled." },
    related: ["radio-option", "unordered-list", "ordered-list"],
  },
  {
    slug: "radio-option",
    name: "Radio option",
    className: "RadioButtonMd",
    kind: "block",
    category: "Lists & controls",
    preview: "radio",
    summary: "Renders selected and unselected radio-style options from compact Markdown syntax.",
    markdown: "- (x) Use the package default\n- ( ) Replace the component",
    behavior: "The x between parentheses controls selected state. It shares the checkbox style and change callback surface.",
    accessibility: "Keep the selected state synchronized with the source if the option is interactive.",
    style: {
      key: "checkbox",
      type: "CheckboxStyle",
      fields: ["size", "checkedColor", "uncheckedColor", "checkColor", "borderRadius", "gapAfterBox", "interactive"],
      example: `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    checkbox: CheckboxStyle(interactive: true, checkedColor: Colors.indigo),
  ),
  onCheckboxChanged: (selected) => saveSelection(selected),
)`,
    },
    builder: { name: "radioOptionBuilder", signature: "Widget Function(BuildContext context, bool selected, Widget content, CheckboxStyle style)" },
    callback: { name: "onCheckboxChanged", signature: "void Function(bool value)", note: "The same callback is used for task checkboxes and radio options." },
    related: ["checkbox", "unordered-list", "ordered-list"],
  },
  {
    slug: "code-block",
    name: "Fenced code block",
    className: "CodeBlockMd",
    kind: "block",
    category: "Code & math",
    preview: "code",
    summary: "Renders fenced code with optional language labeling, highlighting, and a copy affordance.",
    markdown: "```dart\nfinal answer = await model.generate();\n```",
    behavior: "The first fence token supplies the language. While streaming, the builder receives closed: false until the closing fence arrives.",
    accessibility: "The default code is selectable and the copy affordance should have localized labels if you replace it.",
    style: {
      key: "codeBlock",
      type: "CodeBlockStyle",
      fields: ["backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding", "headerPadding", "fontFamily", "fontFamilyPackage", "fontSize", "textColor", "showLanguageLabel", "languageStyle", "showCopyButton", "copyLabel", "copiedLabel"],
      example: `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    codeBlock: CodeBlockStyle(
      borderRadius: Radius.circular(12),
      showLanguageLabel: true,
      showCopyButton: true,
    ),
  ),
  onCodeCopy: (code) => analytics.log('code_copied'),
)`,
    },
    builder: { name: "codeBuilder", signature: "Widget Function(BuildContext context, String name, String code, bool closed)" },
    callback: { name: "onCodeCopy", signature: "void Function(String code)", note: "Runs after the built-in copy action." },
    related: ["inline-code", "inline-latex", "display-latex"],
  },
  {
    slug: "display-latex",
    name: "Display LaTeX",
    className: "LatexMathMultiLine",
    kind: "both",
    category: "Code & math",
    preview: "latex",
    summary: "Renders display math enclosed by \\[ and \\] as a standalone math widget.",
    markdown: "\\[\\int_0^1 x^2\\,dx = \\frac{1}{3}\\]",
    behavior: "Display math is treated as a block and can optionally scroll horizontally when the expression is too wide.",
    accessibility: "Prefer a short nearby textual explanation for essential equations.",
    style: {
      key: "latex",
      type: "LatexStyle",
      fields: ["textStyle", "padding", "backgroundColor", "borderRadius", "scrollBlockHorizontally"],
      example: `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    latex: LatexStyle(
      scrollBlockHorizontally: true,
      padding: EdgeInsets.symmetric(vertical: 8),
      borderRadius: Radius.circular(6),
    ),
  ),
)`,
    },
    builder: { name: "latexBuilder", signature: "Widget Function(BuildContext context, String tex, TextStyle textStyle, bool inline)" },
    related: ["inline-latex", "code-block", "table"],
  },
  {
    slug: "inline-latex",
    name: "Inline LaTeX",
    className: "LatexMath",
    kind: "inline",
    category: "Code & math",
    preview: "latex",
    summary: "Renders an inline TeX expression within surrounding prose.",
    markdown: "The area is \\(\\pi r^2\\).",
    behavior: "The component matches \\( ... \\). Dollar-sign syntax is enabled separately with useDollarSignsForLatex.",
    accessibility: "Inline math is a widget span; avoid packing long expressions into link labels.",
    style: {
      key: "latex",
      type: "LatexStyle",
      fields: ["textStyle", "padding", "backgroundColor", "borderRadius", "scrollBlockHorizontally"],
      example: `GptMarkdown(
  markdown,
  useDollarSignsForLatex: true,
  styleSheet: const GptMarkdownStyleSheet(
    latex: LatexStyle(backgroundColor: Color(0x08000000)),
  ),
)`,
    },
    builder: { name: "latexBuilder", signature: "Widget Function(BuildContext context, String tex, TextStyle textStyle, bool inline)" },
    related: ["display-latex", "inline-code", "code-block"],
  },
  {
    slug: "table",
    name: "Table",
    className: "TableMd",
    kind: "both",
    category: "Data & citations",
    preview: "table",
    summary: "Renders GFM-style pipe tables with parsed header alignment and horizontal overflow support.",
    markdown: "| Model | Status |\n| :--- | ---: |\n| GPT Markdown | Ready |",
    behavior: "The separator row declares alignment and is not rendered. The default table scrolls horizontally when needed.",
    accessibility: "Keep column headers meaningful and avoid tables for simple visual layout.",
    style: {
      key: "table",
      type: "TableStyle",
      fields: ["borderColor", "borderWidth", "borderRadius", "cellPadding", "headerBackground", "headerTextStyle", "rowStripeColor"],
      example: `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    table: TableStyle(
      cellPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      headerTextStyle: TextStyle(fontWeight: FontWeight.w700),
      borderRadius: Radius.circular(8),
    ),
  ),
)`,
    },
    builder: { name: "tableBuilder", signature: "Widget Function(BuildContext context, List<CustomTableRow> rows, TextStyle style, GptMarkdownConfig config)" },
    related: ["source-tag", "heading", "display-latex"],
  },
  {
    slug: "link",
    name: "Markdown link",
    className: "ATagMd",
    kind: "inline",
    category: "Links & media",
    preview: "link",
    summary: "Renders a labeled Markdown link and delegates destination handling to your app.",
    markdown: "Read the [package guide](https://pub.dev/packages/gpt_markdown).",
    behavior: "Balanced parentheses in a URL are supported. The package intentionally does not launch URLs itself.",
    accessibility: "Use a descriptive label; wire onLinkTap to an accessible navigation or confirmation flow.",
    style: {
      key: "link",
      type: "LinkStyle",
      fields: ["color", "hoverColor", "decoration", "decorationThickness", "fontWeight"],
      example: `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    link: LinkStyle(
      color: Color(0xFF0B57D0),
      decoration: TextDecoration.none,
      fontWeight: FontWeight.w600,
    ),
  ),
  onLinkTap: (url, title) => launchUrlString(url),
)`,
    },
    builder: { name: "linkBuilder", signature: "Widget Function(BuildContext context, InlineSpan label, String url, TextStyle style)" },
    callback: { name: "onLinkTap", signature: "void Function(String url, String title)", note: "The callback is intentionally app-owned; add url_launcher in your app if you need external navigation." },
    related: ["autolink", "image", "source-tag"],
  },
  {
    slug: "autolink",
    name: "Autolink",
    className: "AutolinkMd",
    kind: "inline",
    category: "Links & media",
    preview: "link",
    summary: "Turns bare URLs, www hosts, email addresses, and angle-bracket URLs into links.",
    markdown: "Visit https://gptmarkdown.com or mail hello@example.com.",
    behavior: "Bare http, https, mailto, and xmpp links work by default. Set autolink: false to leave bare values as text.",
    accessibility: "An autolink shares the same app-owned link handler as a Markdown link.",
    style: {
      key: "link",
      type: "LinkStyle",
      fields: ["color", "hoverColor", "decoration", "decorationThickness", "fontWeight"],
      example: `GptMarkdown(
  markdown,
  autolinkSchemes: {'tel'},
  styleSheet: const GptMarkdownStyleSheet(
    link: LinkStyle(decoration: TextDecoration.none),
  ),
  onLinkTap: (url, title) => launchUrlString(url),
)`,
    },
    builder: { name: "linkBuilder", signature: "Widget Function(BuildContext context, InlineSpan label, String url, TextStyle style)" },
    callback: { name: "onLinkTap", signature: "void Function(String url, String title)", note: "This is the same callback used by Markdown links." },
    related: ["link", "image", "source-tag"],
  },
  {
    slug: "image",
    name: "Image",
    className: "ImageMd",
    kind: "inline",
    category: "Links & media",
    preview: "image",
    summary: "Renders Markdown images, with optional dimensions parsed from the alt label.",
    markdown: "![240x120](https://example.com/chart.png)",
    behavior: "A WxH alt label supplies requested dimensions. The default renderer applies ImageStyle borderRadius and padding; use imageBuilder for fit or size constraints.",
    accessibility: "Use descriptive alt text when the image communicates information, and provide a useful error state if replacing the renderer.",
    style: {
      key: "image",
      type: "ImageStyle",
      fields: ["borderRadius", "padding"],
      example: `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    image: ImageStyle(
      borderRadius: Radius.circular(8),
      padding: EdgeInsets.symmetric(vertical: 8),
    ),
  ),
  imageBuilder: (context, url, width, height) => CachedNetworkImage(
    imageUrl: url, width: width, height: height,
  ),
)`,
    },
    builder: { name: "imageBuilder", signature: "Widget Function(BuildContext context, String url, double? width, double? height)" },
    callback: { name: "onImageTap", signature: "void Function(String url)", note: "Use it to open a lightbox or a source page." },
    related: ["link", "autolink", "table"],
  },
  {
    slug: "bold",
    name: "Bold text",
    className: "BoldMd",
    kind: "inline",
    category: "Inline text",
    preview: "emphasis",
    summary: "Renders double-asterisk emphasis as a bold inline span.",
    markdown: "Make the **important part** easy to scan.",
    behavior: "Nested inline Markdown inside the bold text is parsed again, so links and inline code still work.",
    accessibility: "Use strong emphasis for meaning, not as the only way to organize a long document.",
    related: ["italic", "strikethrough", "underline"],
  },
  {
    slug: "italic",
    name: "Italic text",
    className: "ItalicMd",
    kind: "inline",
    category: "Inline text",
    preview: "emphasis",
    summary: "Renders single-asterisk emphasis as an italic inline span.",
    markdown: "Use *a little emphasis* when it helps the sentence.",
    behavior: "The matcher guards against double-asterisk bold syntax and recursively parses nested inline content.",
    accessibility: "Use italics sparingly; italic text can be harder to scan in small sizes.",
    related: ["bold", "strikethrough", "underline"],
  },
  {
    slug: "strikethrough",
    name: "Strikethrough",
    className: "StrikeMd",
    kind: "inline",
    category: "Inline text",
    preview: "emphasis",
    summary: "Renders double-tilde text as a struck-through inline span.",
    markdown: "This option is ~~deprecated~~ replaced.",
    behavior: "The inner content is recursively parsed, preserving its inline syntax.",
    accessibility: "Do not use the strike alone to convey essential state; include a nearby replacement or status.",
    related: ["bold", "italic", "underline"],
  },
  {
    slug: "underline",
    name: "Underline",
    className: "UnderLineMd",
    kind: "inline",
    category: "Inline text",
    preview: "emphasis",
    summary: "Renders the supported HTML underline tag as an underlined inline span.",
    markdown: "Keep <u>this phrase</u> visible.",
    behavior: "The component accepts the u HTML tag and renders its contained text with an underline.",
    accessibility: "Avoid underlining plain text that is not a link; it can be mistaken for navigation.",
    related: ["bold", "italic", "link"],
  },
  {
    slug: "inline-code",
    name: "Inline code",
    className: "HighlightedText",
    kind: "inline",
    category: "Inline text",
    preview: "inline-code",
    summary: "Renders single-backtick code as a selectable, baseline-aligned code chip.",
    markdown: "Pass `inlineCodeStyle` to customize a single renderer.",
    behavior: "This is inline code, not a fenced code block. The modern builder returns InlineSpan to preserve wrapping and selection.",
    accessibility: "Prefer the inlineCodeStyle or inlineCodeBuilder; the older highlightBuilder creates a WidgetSpan and is deprecated.",
    style: {
      key: "inlineCodeStyle",
      type: "InlineCodeStyle",
      fields: ["fontFamily", "fontFamilyFallback", "fontSizeFactor", "fontWeight", "color", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding", "boxHeightStyle"],
      example: `GptMarkdown(
  markdown,
  inlineCodeStyle: const InlineCodeStyle(
    fontFamily: 'GeistMono',
    backgroundColor: Color(0x14656D76),
    borderRadius: Radius.circular(6),
    padding: EdgeInsets.symmetric(horizontal: 5, vertical: 2),
  ),
  inlineCodeBuilder: (context, code, style, codeStyle) => CodeTextSpan(
    text: code, style: style, codeStyle: codeStyle,
  ),
)`,
    },
    builder: { name: "inlineCodeBuilder", signature: "InlineSpan Function(BuildContext context, String code, TextStyle style, InlineCodeStyle codeStyle)" },
    related: ["code-block", "inline-latex", "bold"],
  },
  {
    slug: "source-tag",
    name: "Source tag",
    className: "SourceTag",
    kind: "inline",
    category: "Data & citations",
    preview: "source",
    summary: "Renders numeric citation tags as compact, tappable source chips.",
    markdown: "The model cites its source [1].",
    behavior: "The chip receives the content inside the brackets and is rendered as an inline widget span.",
    accessibility: "Use the callback to expose the source or an accessible explanation of what the citation opens.",
    style: {
      key: "sourceTag",
      type: "SourceTagStyle",
      fields: ["size", "backgroundColor", "shape", "textStyle", "padding"],
      example: `GptMarkdown(
  markdown,
  styleSheet: const GptMarkdownStyleSheet(
    sourceTag: SourceTagStyle(
      backgroundColor: Color(0xFFE8DEF8),
      textStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w700),
    ),
  ),
  onSourceTagTap: (content) => showSource(content),
)`,
    },
    builder: { name: "sourceTagBuilder", signature: "Widget Function(BuildContext context, String content, TextStyle textStyle)" },
    callback: { name: "onSourceTagTap", signature: "void Function(String content)", note: "The callback receives the text inside [brackets]." },
    related: ["table", "link", "autolink"],
  },
];

export const defaultComponentBySlug = Object.fromEntries(
  defaultComponents.map((component) => [component.slug, component]),
) as Record<string, DefaultComponent>;

export const defaultComponentCategories = [
  "Structure",
  "Lists & controls",
  "Inline text",
  "Links & media",
  "Code & math",
  "Data & citations",
] as const;

export const componentThemeSnippet = commonTheme;