"use client";

import Link from "next/link";
import { Github, BookOpen, Gamepad2, Menu, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

const mainNav = [
  { title: "Documentation", href: "/docs", icon: BookOpen },
  { title: "Playground", href: "/playground", icon: Gamepad2 },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
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
                className={cn(
                  "transition-colors hover:text-foreground/80 relative",
                  pathname?.startsWith(item.href)
                    ? "text-foreground font-semibold"
                    : "text-foreground/60"
                )}>
                {item.title}
                {pathname?.startsWith(item.href) && (
                  <motion.div
                    layoutId="main-nav-indicator"
                    className="absolute -bottom-[19px] left-0 right-0 h-[2px] bg-foreground"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-0 flex flex-col">
                {/* Header */}
                <div className="px-6 py-5 border-b">
                  <Link href="/" className="flex items-center gap-2">
                    <span className="font-bold text-lg">GPT Markdown</span>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">Markdown & LaTeX for Flutter</p>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col px-3 py-4 gap-1">
                  {mainNav.map((item) => {
                    const Icon = item.icon;
                    const active = pathname?.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                          active
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        )}>
                        <Icon className="h-4 w-4 shrink-0" />
                        {item.title}
                        {active && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-foreground" />
                        )}
                      </Link>
                    );
                  })}
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
                  <span className="text-xs text-muted-foreground">v1.1.7</span>
                  <ThemeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
