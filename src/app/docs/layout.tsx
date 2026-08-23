import { SidebarNav } from "@/components/layout/sidebar-nav";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

const sidebarNavItems = [
  { title: "Getting Started", href: "/docs",                       icon: "Rocket",             section: "Get started" },
  { title: "Installation",    href: "/docs/installation",          icon: "Package" },
  { title: "Render a response", href: "/docs/usage",               icon: "Code2" },
  { title: "Markdown & AI output", href: "/docs/markdown-features", icon: "FileText",           section: "Core guides" },
  { title: "LaTeX",           href: "/docs/latex-support",         icon: "Sigma" },
  { title: "Code blocks",     href: "/docs/syntax-highlighting",   icon: "Braces" },
  { title: "Streaming",       href: "/docs/streaming",             icon: "Waves" },
  { title: "Themes & styles", href: "/docs/themes",                icon: "Palette",            section: "Customize" },
  { title: "Custom inline UI", href: "/docs/custom-components",    icon: "Puzzle" },
  { title: "Widget API & builders", href: "/docs/style-configuration", icon: "SlidersHorizontal", section: "Reference" },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <BreadcrumbJsonLd />
      <SiteHeader />
      <div className="container flex-1">
        <div className="flex flex-col md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
          <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-4 md:sticky md:block lg:py-10">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <main className="relative py-6 lg:py-10">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {children}
            </div>
          </main>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
