import { cn } from "@/lib/utils";
import type { PreviewKind } from "@/lib/default-components";

export function ComponentVisualPreview({
  kind,
  compact = false,
  className,
}: {
  kind: PreviewKind;
  compact?: boolean;
  className?: string;
}) {
  const frame = cn(
    "not-prose overflow-hidden rounded-lg border border-border/70 bg-muted/45 shadow-inner text-sm text-foreground",
    compact ? "min-h-28 p-3" : "min-h-52 p-6",
    className,
  );

  if (kind === "heading") return <div className={frame}><p className="text-xl font-bold tracking-tight">Release notes</p><div className="mt-2 h-px w-full bg-border" /><p className="mt-3 text-xs text-muted-foreground">The important part</p></div>;
  if (kind === "paragraph") return <div className={frame}><p>First paragraph carries the thought.</p><p className="mt-5">Second paragraph begins with breathing room.</p></div>;
  if (kind === "quote") return <div className={frame}><blockquote className="border-l-4 border-primary/70 bg-muted/30 py-2 pl-3 text-muted-foreground">A useful detail from the model.<br />It can span more than one line.</blockquote></div>;
  if (kind === "table") return <div className={frame}><table className="w-full border-collapse text-xs"><thead><tr className="bg-muted/60"><th className="border px-2 py-1.5 text-left">Model</th><th className="border px-2 py-1.5 text-right">Status</th></tr></thead><tbody><tr><td className="border px-2 py-1.5">GPT Markdown</td><td className="border px-2 py-1.5 text-right">Ready</td></tr><tr><td className="border px-2 py-1.5">Stream</td><td className="border px-2 py-1.5 text-right">Live</td></tr></tbody></table></div>;
  if (kind === "list") return <div className={frame}><ul className="space-y-2 pl-5 marker:text-primary"><li>Focus on the answer</li><li>Keep the source link</li><li>Preserve context</li></ul></div>;
  if (kind === "ordered-list") return <div className={frame}><ol className="space-y-2 pl-5 marker:font-semibold marker:text-primary"><li>Fetch the response</li><li>Render the Markdown</li><li>Handle link taps</li></ol></div>;
  if (kind === "checkbox") return <div className={frame}><div className="space-y-3"><p className="flex items-center gap-2"><span className="grid h-4 w-4 place-items-center rounded border border-primary bg-primary text-[10px] text-primary-foreground">✓</span> Parse the response</p><p className="flex items-center gap-2"><span className="h-4 w-4 rounded border border-muted-foreground/60" /> Save the conversation</p></div></div>;
  if (kind === "radio") return <div className={frame}><div className="space-y-3"><p className="flex items-center gap-2"><span className="grid h-4 w-4 place-items-center rounded-full border border-primary"><span className="h-2 w-2 rounded-full bg-primary" /></span> Use the package default</p><p className="flex items-center gap-2"><span className="h-4 w-4 rounded-full border border-muted-foreground/60" /> Replace the component</p></div></div>;
  if (kind === "rule") return <div className={cn(frame, "flex flex-col justify-center")}><p className="text-xs text-muted-foreground">Before the break</p><div className="my-5 h-px bg-border" /><p className="text-xs text-muted-foreground">After the break</p></div>;
  if (kind === "indent") return <div className={frame}><p className="border-l border-border pl-5 text-muted-foreground">A short indented note with room to breathe.</p></div>;
  if (kind === "code") return <div className={cn(frame, "bg-[#131212] font-mono text-xs text-zinc-200")}><div className="mb-4 flex items-center justify-between text-zinc-500"><span>dart</span><span>copy</span></div><p><span className="text-fuchsia-300">final</span> <span className="text-sky-300">answer</span> = <span className="text-fuchsia-300">await</span> model.generate();</p></div>;
  if (kind === "latex") return <div className={cn(frame, "flex items-center justify-center font-serif text-xl")}><span>∫</span><sub>0</sub><sup>1</sup><span className="ml-1">x² dx = </span><span className="ml-2 inline-flex flex-col items-center"><span>1</span><span className="h-px w-4 bg-current" /><span>3</span></span></div>;
  if (kind === "link") return <div className={frame}><p>Read the <span className="font-medium text-primary underline decoration-primary/40 underline-offset-2">package guide</span>.</p><p className="mt-4 text-xs text-muted-foreground">https://gptmarkdown.com</p></div>;
  if (kind === "image") return <div className={cn(frame, "p-3")}><div className="relative h-full min-h-32 overflow-hidden rounded-md bg-gradient-to-br from-sky-200 via-indigo-100 to-violet-200 dark:from-sky-950 dark:via-indigo-950 dark:to-violet-950"><div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-tr from-indigo-700/60 via-primary/30 to-transparent" /><div className="absolute bottom-5 left-7 h-10 w-16 -skew-x-12 rounded-t-full bg-foreground/15" /></div></div>;
  if (kind === "inline-code") return <div className={frame}><p>Pass <code className="rounded bg-muted px-1.5 py-1 font-mono text-xs">styleSheet</code> to customize a renderer.</p></div>;
  if (kind === "source") return <div className={frame}><p>The model cites its source <span className="inline-flex rounded bg-primary/15 px-1.5 py-0.5 text-xs font-semibold text-primary">1</span>.</p></div>;
  return <div className={frame}><p>Make the <strong>important part</strong> easier to scan.</p><p className="mt-4 italic text-muted-foreground">A little emphasis helps.</p><p className="mt-3 line-through text-muted-foreground">A replaced option.</p></div>;
}