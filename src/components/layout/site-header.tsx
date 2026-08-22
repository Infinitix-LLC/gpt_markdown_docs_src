"use client";

import Link from "next/link";
import { Github, BookOpen, Gamepad2, Menu, ExternalLink, LoaderCircle } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

import { cn } from "@/lib/utils";
import { PACKAGE_VERSION } from "@/lib/package-version";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";

const mainNav = [
  { title: "Documentation", href: "/docs", icon: BookOpen },
  { title: "Playground", href: "/playground", icon: Gamepad2 },
];

const docsNav = [
  {
    title: "Get started",
    links: [
      { title: "Getting Started", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Render a response", href: "/docs/usage" },
    ],
  },
  {
    title: "Core guides",
    links: [
      { title: "Markdown & AI output", href: "/docs/markdown-features" },
      { title: "LaTeX", href: "/docs/latex-support" },
      { title: "Code blocks", href: "/docs/syntax-highlighting" },
      { title: "Streaming", href: "/docs/streaming" },
    ],
  },
  {
    title: "Customize",
    links: [
      { title: "Themes & styles", href: "/docs/themes" },
      { title: "Custom inline UI", href: "/docs/custom-components" },
    ],
  },
  {
    title: "Reference",
    links: [{ title: "Widget API & builders", href: "/docs/style-configuration" }],
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    mainNav.forEach(({ href }) => router.prefetch(href));
  }, [router]);

  useEffect(() => {
    if (pendingHref && pathname === pendingHref) {
      setPendingHref(null);
    }
  }, [pathname, pendingHref]);

  useEffect(() => {
    if (!pendingHref) return;
    const timeout = window.setTimeout(() => setPendingHref(null), 10000);
    return () => window.clearTimeout(timeout);
  }, [pendingHref]);

  const handleNavigation = (
    href: string,
    event: MouseEvent<HTMLAnchorElement>,
    closeMobile = false,
  ) => {
    const modified =
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey;

    if (!modified && pathname !== href) setPendingHref(href);
    if (closeMobile) setMobileMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      aria-busy={pendingHref !== null}
    >
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold inline-block text-xl">GPT Markdown</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-between">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                onClick={(event) => handleNavigation(item.href, event)}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-1.5 rounded px-1 py-0.5 transition-all hover:text-foreground/80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4",
                  pendingHref === item.href && "text-foreground",
                  pathname?.startsWith(item.href)
                    ? "text-foreground font-semibold"
                    : "text-foreground/60"
                )}>
                {item.title}
                {pendingHref === item.href && (
                  <LoaderCircle className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />
                )}
                {pathname?.startsWith(item.href) && (
                  <div
                    className="absolute -bottom-[19px] left-0 right-0 h-[2px] bg-foreground"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex text-xs font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400">
              <a href="https://pub.dev/packages/gpt_markdown" target="_blank" rel="noopener noreferrer">
                pub.dev
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/Infinitix-LLC/gpt_markdown" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <ThemeToggle />

            {/* Mobile menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-0 flex flex-col">
                {/* Header */}
                <SheetHeader className="px-6 py-5 border-b text-left">
                  <SheetTitle asChild>
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2">
                      <span className="font-bold text-lg">GPT Markdown</span>
                    </Link>
                  </SheetTitle>
                  <SheetDescription className="text-xs">
                    The Flutter renderer for AI output.
                  </SheetDescription>
                </SheetHeader>

                {/* Nav links */}
                <nav className="flex-1 overflow-y-auto px-3 py-4">
                  <div className="flex flex-col gap-1">
                    {mainNav.map((item) => {
                      const Icon = item.icon;
                      const active = pathname?.startsWith(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          prefetch
                          onClick={(event) => handleNavigation(item.href, event, true)}
                          aria-current={pathname === item.href ? "page" : undefined}
                          className={cn(
                            "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            active
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                          )}>
                          <Icon className="h-4 w-4 shrink-0" />
                          {item.title}
                          {pendingHref === item.href && (
                            <LoaderCircle className="ml-auto h-4 w-4 animate-spin motion-reduce:animate-none" />
                          )}
                          {active && (
                            <span className={cn(
                              "h-1.5 w-1.5 rounded-full bg-foreground",
                              pendingHref !== item.href && "ml-auto"
                            )} />
                          )}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mx-3 my-4 border-t" />

                  <div className="space-y-4">
                    {docsNav.map((section) => (
                      <section key={section.title} aria-label={section.title}>
                        <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {section.title}
                        </p>
                        <div className="flex flex-col gap-0.5">
                          {section.links.map((item) => {
                            const active = pathname === item.href;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                prefetch
                                onClick={(event) => handleNavigation(item.href, event, true)}
                                className={cn(
                                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                  active
                                    ? "bg-accent font-medium text-accent-foreground"
                                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                )}>
                                <BookOpen className="h-3.5 w-3.5 shrink-0" />
                                {item.title}
                              </Link>
                            );
                          })}
                        </div>
                      </section>
                    ))}
                  </div>
                </nav>

                {/* Divider */}
                <div className="mx-6 border-t" />

                {/* External links */}
                <div className="flex flex-col px-3 py-4 gap-1">
                  <a
                    href="https://pub.dev/packages/gpt_markdown"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-blue-500 hover:bg-accent/50 hover:text-blue-600 transition-colors">
                    <span className="text-xs font-bold border border-blue-500/50 rounded px-1.5 py-0.5 leading-none">pub</span>
                    pub.dev
                    <ExternalLink className="h-3.5 w-3.5 ml-auto text-muted-foreground" />
                  </a>
                  <a
                    href="https://github.com/Infinitix-LLC/gpt_markdown"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors">
                    <Github className="h-4 w-4 shrink-0" />
                    GitHub
                    <ExternalLink className="h-3.5 w-3.5 ml-auto" />
                  </a>
                </div>

                {/* Footer */}
                <div className="mt-auto px-6 py-4 border-t flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">v{PACKAGE_VERSION}</span>
                  <ThemeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {pendingHref && (
        <>
          <div
            className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-primary/10"
            role="progressbar"
            aria-label={`Opening ${mainNav.find((item) => item.href === pendingHref)?.title ?? "page"}`}
          >
            <div className="h-full w-2/3 animate-pulse bg-gradient-to-r from-transparent via-primary to-transparent motion-reduce:animate-none" />
          </div>
          <span className="sr-only" aria-live="polite">
            Opening {mainNav.find((item) => item.href === pendingHref)?.title}
          </span>
        </>
      )}
    </header>
  );
}
