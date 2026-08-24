import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import sharedOpenGraph from "@/lib/og";
import { CodeBlock } from "@/components/ui/components/ui/code-block";
import { FlutterComponentPreview } from "@/components/docs/flutter-component-preview";
import { defaultComponentBySlug, defaultComponents, type DefaultComponent } from "@/lib/default-components";

type Props = { params: Promise<{ slug: string }> };

function componentOverrideSnippet(component: DefaultComponent) {
  if (component.kind === "both") {
    return `// This component participates in BOTH parser registries.
// Passing either list replaces that registry, so preserve both default lists.
GptMarkdown(
  markdown,
  components: [
    My${component.className}Override(),
    ...MarkdownComponent.globalComponents,
  ],
  inlineComponents: [
    My${component.className}Override(),
    ...MarkdownComponent.inlineComponents,
  ],
)`;
  }
  const list = component.kind === "inline" ? "inlineComponents" : "components";
  const defaults = component.kind === "inline" ? "inlineComponents" : "globalComponents";
  return `// Passing ${list} replaces its defaults. Prepend to override matching syntax,
// then keep every built-in component after it.
GptMarkdown(
  markdown,
  ${list}: [
    My${component.className}Override(),
    ...MarkdownComponent.${defaults},
  ],
)`;
}

function themeSnippet(component: DefaultComponent) {
  if (component.style?.key === "inlineCodeStyle") {
    return `GptMarkdownThemeData(
  brightness: Brightness.light,
  inlineCode: const InlineCodeStyle(
    fontFamily: 'GeistMono',
  ),
)`;
  }
  if (component.style) {
    return `GptMarkdownThemeData(
  brightness: Brightness.light,
  styleSheet: const GptMarkdownStyleSheet(
    ${component.style.key}: ${component.style.type}(
      // Set only the values your app needs.
    ),
  ),
)`;
  }
  return `// This component has no dedicated style object.
// It inherits the text style of the surrounding GptMarkdown widget.
GptMarkdown(
  markdown,
  style: Theme.of(context).textTheme.bodyMedium,
)`;
}

export function generateStaticParams() {
  return defaultComponents.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const component = defaultComponentBySlug[slug];
  if (!component) return {};
  const title = `${component.name} Component — GptMarkdown`;
  const description = `${component.summary} Markdown syntax, visual preview, theming, styling, builders, callbacks, and override guidance.`;
  const url = `https://gptmarkdown.com/docs/components/${component.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { ...sharedOpenGraph, title, description, url },
    twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
  };
}

export default async function DefaultComponentDetailPage({ params }: Props) {
  const { slug } = await params;
  const component = defaultComponentBySlug[slug];
  if (!component) notFound();
  const index = defaultComponents.findIndex((item) => item.slug === component.slug);
  const previous = defaultComponents[index - 1];
  const next = defaultComponents[index + 1];

  return (
    <div className="space-y-10">
      <div>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link href="/docs/components" className="hover:text-primary hover:underline">Default components</Link> / {component.category}
        </p>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{component.name}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{component.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border bg-muted/40 px-2.5 py-1 font-mono text-muted-foreground">{component.className}</span>
          <span className="rounded-full border bg-muted/40 px-2.5 py-1 capitalize text-muted-foreground">{component.kind} component</span>
          {component.style && <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 font-mono text-primary">{component.style.type}</span>}
          {component.builder && <span className="rounded-full border bg-muted/40 px-2.5 py-1 font-mono text-muted-foreground">{component.builder.name}</span>}
          {component.callback && <span className="rounded-full border bg-muted/40 px-2.5 py-1 font-mono text-muted-foreground">{component.callback.name}</span>}
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="border-b pb-2 text-2xl font-semibold">What it renders</h2>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live Flutter preview</p>
            <FlutterComponentPreview componentName={component.name} markdown={component.markdown} />
            <p className="mt-2 text-xs text-muted-foreground">This is the real GptMarkdown Flutter widget, rendered with the exact Markdown input shown here.</p>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Markdown input</p>
            <CodeBlock language="markdown" code={component.markdown} filename="input.md" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="border-b pb-2 text-2xl font-semibold">Default behavior</h2>
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg border p-4"><p className="font-medium">Runtime behavior</p><p className="mt-1 leading-6 text-muted-foreground">{component.behavior}</p></div>
          <div className="rounded-lg border p-4"><p className="font-medium">Accessibility note</p><p className="mt-1 leading-6 text-muted-foreground">{component.accessibility}</p></div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-2">
          <h2 className="text-2xl font-semibold">Theming &amp; styling</h2>
          <Link href="/docs/themes" className="text-sm font-medium text-primary hover:underline">Theme layering guide</Link>
        </div>
        {component.style ? (
          <>
            <p className="text-sm leading-6 text-muted-foreground">
              {component.style.type} is the component&apos;s appearance surface.{" "}
              {component.style.key === "inlineCodeStyle"
                ? "A widget-level inlineCodeStyle replaces the theme-level inline-code style, then unresolved fields use package defaults."
                : "Set only the values you need; style-sheet values merge field-by-field with the active theme and package defaults."}
            </p>
            <div className="overflow-x-auto rounded-xl border" role="region" aria-label={`${component.name} style fields`} tabIndex={0}>
              <table className="min-w-[620px] w-full text-sm">
                <thead className="border-b bg-muted/40"><tr><th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Style class</th><th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Available fields</th></tr></thead>
                <tbody><tr><td className="px-4 py-3 font-mono text-xs text-foreground">{component.style.type}</td><td className="px-4 py-3 font-mono text-xs leading-6 text-muted-foreground">{component.style.fields.join(" · ")}</td></tr></tbody>
              </table>
            </div>
            <CodeBlock language="dart" code={component.style.example} filename={`${component.slug}_style.dart`} />
          </>
        ) : (
          <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-4 text-sm dark:border-amber-900 dark:bg-amber-950/20">
            <p className="font-medium text-amber-900 dark:text-amber-200">No dedicated style object</p>
            <p className="mt-1 leading-6 text-amber-800/80 dark:text-amber-300/80">This built-in is an inline or structural text transformation. It inherits the surrounding text style; replace its syntax only when that behavior itself must change.</p>
          </div>
        )}
        <p className="text-sm font-medium">App-wide or scoped theme</p>
        <CodeBlock language="dart" code={themeSnippet(component)} filename="theme.dart" />
      </section>

      <section className="space-y-4">
        <h2 className="border-b pb-2 text-2xl font-semibold">Builders &amp; callbacks</h2>
        {component.builder || component.callback ? (
          <div className="space-y-3">
            {component.builder && <div className="rounded-lg border p-4"><p className="font-mono text-sm font-semibold text-primary">{component.builder.name}</p><p className="mt-2 break-words font-mono text-xs leading-6 text-muted-foreground">{component.builder.signature}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Use this only when the default widget structure is no longer the right shape. The resolved style or configuration is passed where applicable.</p></div>}
            {component.callback && <div className="rounded-lg border p-4"><p className="font-mono text-sm font-semibold text-primary">{component.callback.name}</p><p className="mt-2 break-words font-mono text-xs leading-6 text-muted-foreground">{component.callback.signature}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{component.callback.note}</p></div>}
          </div>
        ) : (
          <div className="rounded-lg border bg-muted/20 p-4 text-sm leading-6 text-muted-foreground">This component has no component-specific builder or callback. Its appearance follows the surrounding text and theme, keeping the default parser behavior intact.</div>
        )}
        <Link href="/docs/style-configuration" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">Full builder and callback signatures <ArrowRight className="h-4 w-4" /></Link>
      </section>

      <section className="space-y-4">
        <h2 className="border-b pb-2 text-2xl font-semibold">Safely override the default</h2>
        <p className="text-sm leading-6 text-muted-foreground">A custom component list replaces a default list entirely. Put your matching component first, then append the package defaults so every other Markdown feature continues to render.</p>
        <CodeBlock language="dart" code={componentOverrideSnippet(component)} filename="keep_defaults.dart" />
        <Link href="/docs/custom-components" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">Custom component guide <ArrowRight className="h-4 w-4" /></Link>
      </section>

      <section className="space-y-3">
        <h2 className="border-b pb-2 text-2xl font-semibold">Related components</h2>
        <div className="flex flex-wrap gap-2">
          {component.related.map((relatedSlug) => {
            const related = defaultComponentBySlug[relatedSlug];
            return related ? <Link key={related.slug} href={`/docs/components/${related.slug}`} className="rounded-lg border px-3 py-2 text-sm font-medium hover:border-primary/40 hover:text-primary">{related.name}</Link> : null;
          })}
        </div>
      </section>

      <nav className="flex items-center justify-between border-t pt-6 text-sm">
        {previous ? <Link href={`/docs/components/${previous.slug}`} className="inline-flex items-center gap-1 text-primary hover:underline"><ArrowLeft className="h-4 w-4" /> {previous.name}</Link> : <span />}
        {next ? <Link href={`/docs/components/${next.slug}`} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">{next.name} <ArrowRight className="h-4 w-4" /></Link> : <Link href="/docs/customization" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">Customization <ArrowRight className="h-4 w-4" /></Link>}
      </nav>
    </div>
  );
}