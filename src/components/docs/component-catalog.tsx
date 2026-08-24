"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import type { DefaultComponent } from "@/lib/default-components";
import { defaultComponentCategories } from "@/lib/default-components";
import { ComponentVisualPreview } from "@/components/docs/component-visual-preview";

export function ComponentCatalog({ components }: { components: DefaultComponent[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return components.filter((component) => {
      const matchesCategory = category === "All" || component.category === category;
      const haystack = [component.name, component.className, component.summary, component.markdown, component.style?.type, component.builder?.name, component.callback?.name].filter(Boolean).join(" ").toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [category, components, query]);

  return (
    <div className="space-y-5">
      <div className="sticky top-16 z-20 -mx-1 space-y-3 border-y bg-background/95 px-1 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="relative">
          <label className="sr-only" htmlFor="component-search">Search default components</label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input id="component-search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") setQuery(""); }} placeholder="Search a component, syntax, style, builder, or callback" className="h-11 w-full rounded-lg border bg-background pl-9 pr-10 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary" />
          {query && <button type="button" onClick={() => setQuery("")} className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Clear search"><X className="h-4 w-4" /></button>}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {["All", ...defaultComponentCategories].map((item) => {
            const count = item === "All" ? components.length : components.filter((component) => component.category === item).length;
            const active = category === item;
            return <button key={item} type="button" onClick={() => setCategory(item)} className={`min-h-9 shrink-0 rounded-full border px-3 text-xs font-medium transition ${active ? "border-primary bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`}>{item} <span className="ml-1 opacity-70">{count}</span></button>;
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite">{results.length} {results.length === 1 ? "component" : "components"} shown</p>
        <p className="text-xs">Previews are illustrative HTML; Flutter output follows your theme and platform.</p>
      </div>
      {results.length === 0 ? <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">No default component matches that search.</div> : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
          {results.map((component) => (
            <Link key={component.slug} href={`/docs/components/${component.slug}`} className="group rounded-xl border bg-background p-4 no-underline transition hover:border-primary/40 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <div className="flex items-start justify-between gap-3">
                <div><p className="font-mono text-[11px] uppercase tracking-wider text-primary">{component.category}</p><h2 className="mt-1 text-base font-semibold tracking-tight">{component.name}</h2></div>
                <span className="shrink-0 rounded-full bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground">{component.kind}</span>
              </div>
              <ComponentVisualPreview kind={component.preview} compact className="mt-4 transition-transform duration-200 motion-safe:group-hover:scale-[1.015]" />
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{component.summary}</p>
              <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs">
                <code className="max-w-[80%] truncate text-muted-foreground">{component.className}</code>
                <span className="inline-flex items-center gap-1 font-medium text-primary">Open <ArrowRight className="h-3.5 w-3.5" /></span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}