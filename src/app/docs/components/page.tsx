import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes } from "lucide-react";
import sharedOpenGraph from "@/lib/og";
import { defaultComponents } from "@/lib/default-components";
import { ComponentCatalog } from "@/components/docs/component-catalog";

export const metadata: Metadata = {
  title: "Default Markdown Components — GptMarkdown",
  description: "A visual, component-by-component reference for every default GptMarkdown renderer, including Markdown syntax, styles, builders, callbacks, and safe overrides.",
  alternates: { canonical: "https://gptmarkdown.com/docs/components" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Default Markdown Components — GptMarkdown",
    description: "Browse every default GptMarkdown renderer, its Markdown syntax, visual result, styling, builders, and callbacks.",
    url: "https://gptmarkdown.com/docs/components",
  },
  twitter: {
    card: "summary_large_image",
    title: "Default Markdown Components — GptMarkdown",
    description: "Browse every default GptMarkdown renderer, its Markdown syntax, visual result, styling, builders, and callbacks.",
    images: ["/twitter-image"],
  },
};

export default function DefaultComponentsPage() {
  return (
    <div className="space-y-10">
      <div>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Customize / Default components</p>
        <div className="flex items-start gap-3">
          <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg border bg-muted/40 text-primary"><Boxes className="h-4 w-4" /></div>
          <div>
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Default components</h1>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              The {defaultComponents.length} renderers GptMarkdown uses before you replace anything. Open a component to see
              its Markdown input, a labeled visual preview, and the exact style, builder, and callback surface it exposes.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/40 px-4 py-3 text-sm leading-6">
        <strong>Style objects change appearance. Builders replace structure.</strong>{" "}
        Start with a style object to retain package behavior, then use a builder only when the rendered widget itself must change.{" "}
        <Link href="/docs/customization" className="font-medium text-primary hover:underline">Read the customization guide <ArrowRight className="inline h-3.5 w-3.5" /></Link>
        <p className="mt-2 text-xs text-muted-foreground">Card previews are illustrative HTML representations. Exact rendering follows your Flutter theme and target platform.</p>
      </div>

      <ComponentCatalog components={defaultComponents} />

      <div className="rounded-xl border p-5 text-sm">
        <h2 className="mt-0 text-lg font-semibold">Adding a new syntax?</h2>
        <p className="mt-2 leading-6 text-muted-foreground">
          This catalog describes the built-ins. For an app-specific block, inline span, mention, emoji, or token, prepend
          your component or InlinePattern and retain the default lists.
        </p>
        <Link href="/docs/custom-components" className="mt-3 inline-flex items-center gap-1 font-medium text-primary hover:underline">
          Build a custom component <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}