"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

const mainNav = [
  {
    title: "Documentation",
    href: "/docs",
  },
  {
    title: "Playground",
    href: "/playground",
  },
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <svg
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5">
                    <path d="M3 5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 19H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pr-0">
                <div className="flex flex-col gap-4 px-2">
                  <Link href="/" className="flex items-center">
                    <span className="font-bold inline-block">GPT Markdown</span>
                  </Link>
                  <div className="flex flex-col space-y-3">
                    {mainNav.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "text-muted-foreground hover:text-foreground",
                          pathname?.startsWith(item.href) && "text-foreground"
                        )}>
                        {item.title}
                      </Link>
                    ))}
                    <a
                      href="https://pub.dev/packages/gpt_markdown"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 font-semibold text-sm">
                      pub.dev
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
