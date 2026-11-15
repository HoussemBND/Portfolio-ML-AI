import { site } from "@/lib/site";
import { Todo } from "./todo";

function FooterLink({ label, href }: { label: string; href: string | null }) {
  if (!href) {
    return (
      <span>
        {label} <Todo>link</Todo>
      </span>
    );
  }
  return (
    <a href={href} className="underline-offset-4 hover:text-ink hover:underline">
      {label}
    </a>
  );
}

export function SiteFooter() {
  const { github, linkedin, email } = site.links;
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          {site.name ?? "Portfolio"} · {site.location} · {site.remote}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <FooterLink label="GitHub" href={github} />
          <FooterLink label="LinkedIn" href={linkedin} />
          <FooterLink label="Email" href={email ? `mailto:${email}` : null} />
        </div>
      </div>
    </footer>
  );
}
