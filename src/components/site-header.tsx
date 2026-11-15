import Link from "next/link";
import { nav, site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span
            aria-hidden="true"
            className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-xs text-accent"
          >
            QA→ML
          </span>
          <span>{site.name ?? "Portfolio"}</span>
        </Link>
        <nav
          aria-label="Main"
          className="order-3 -mx-1 flex w-full gap-1 overflow-x-auto text-sm sm:order-none sm:ml-auto sm:w-auto"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-2.5 py-1.5 text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto sm:ml-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
