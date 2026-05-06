"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Rocket,
  Package,
  Code2,
  FileText,
  Sigma,
  Braces,
  Palette,
  SlidersHorizontal,
  Puzzle,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Package,
  Code2,
  FileText,
  Sigma,
  Braces,
  Palette,
  SlidersHorizontal,
  Puzzle,
};

interface NavItem {
  title: string;
  href: string;
  icon?: string;
  section?: string;
}

interface SidebarNavProps {
  items: NavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  const grouped: { section?: string; items: NavItem[] }[] = [];
  for (const item of items) {
    if (item.section) {
      grouped.push({ section: item.section, items: [item] });
    } else {
      const last = grouped[grouped.length - 1];
      if (last) last.items.push(item);
      else grouped.push({ items: [item] });
    }
  }

  return (
    <nav className="w-full space-y-6">
      {grouped.map((group, gi) => (
        <div key={gi}>
          {group.section && (
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              {group.section}
            </p>
          )}
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon ? iconMap[item.icon] : null;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                      active
                        ? "bg-primary/8 text-primary font-semibold border-l-2 border-primary ml-[-1px]"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60 font-medium border-l-2 border-transparent ml-[-1px]"
                    )}>
                    {Icon && (
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 transition-colors",
                          active
                            ? "text-primary"
                            : "text-muted-foreground/60 group-hover:text-muted-foreground"
                        )}
                      />
                    )}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
