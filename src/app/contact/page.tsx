import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Todo } from "@/components/todo";
import { pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Contact",
  "Get in touch about AI QA, model evaluation and related roles in Denver or remote.",
);

function Row({ label, href, text }: { label: string; href: string | null; text?: string }) {
  return (
    <div>
      <dt className="font-mono text-xs text-muted">{label}</dt>
      <dd className="mt-1">
        {href ? (
          <a
            href={href}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            {text ?? href.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        ) : (
          <Todo>{label.toLowerCase()}</Todo>
        )}
      </dd>
    </div>
  );
}

export default function ContactPage() {
  const { email, linkedin, github } = site.links;
  // Read at build time: shows you a reminder until the form is connected.
  const configured = Boolean(
    process.env.RESEND_API_KEY && (process.env.CONTACT_TO_EMAIL || email),
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Contact</h1>
      <p className="mt-3 max-w-prose text-lg text-muted">
        I am looking for AI QA and model evaluation roles in Denver or
        remote. If you are hiring for one, or want to talk about testing AI
        systems, send me a message.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="max-w-xl">
          {!configured && (
            <p className="mb-6 rounded-lg border border-dashed border-line px-4 py-3 text-sm text-muted">
              <Todo>connect the form to email</Todo> Messages are not
              delivered yet. See <code className="font-mono">.env.example</code>.
            </p>
          )}
          <ContactForm />
        </div>

        <aside className="self-start rounded-xl border border-line bg-surface p-5 text-sm">
          <dl className="space-y-4">
            <Row label="Email" href={email ? `mailto:${email}` : null} text={email ?? undefined} />
            <Row label="LinkedIn" href={linkedin} />
            <Row label="GitHub" href={github} />
            <div>
              <dt className="font-mono text-xs text-muted">Location</dt>
              <dd className="mt-1">
                {site.location} · {site.remote}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
