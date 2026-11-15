import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { JsonLd } from "@/components/json-ld";
import { mdxComponents } from "@/components/mdx";
import { StatusBadge } from "@/components/status-badge";
import { getAllProjects, getProject, type Project } from "@/lib/projects";
import { pageMeta, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMeta(project.title, project.summary);
}

const statusNote: Record<Exclude<Project["status"], "live">, string> = {
  "in-progress":
    "This project is under way. The plan is below; results and the full write-up will be added when it is finished.",
  planned:
    "This project has not started yet. The plan is below; nothing here is a finished result.",
};

const linkLabels: Record<string, string> = {
  github: "Code on GitHub",
  notebook: "Notebook",
  report: "Report",
  sample: "Sample output",
  demo: "Live demo",
};

function Facts({ project: p }: { project: Project }) {
  const rows: { label: string; items: string[] }[] = [
    { label: "Tools", items: p.stack },
    { label: "Areas", items: p.areas },
    { label: "Lifecycle stage", items: p.lifecycleStage },
    { label: "Relevant roles", items: p.roles },
  ];
  if (p.course) rows.push({ label: "Course", items: [p.course] });

  const links = Object.entries(p.links ?? {}).filter(([, href]) => href);

  return (
    <aside className="self-start rounded-xl border border-line bg-surface p-5 text-sm">
      <dl className="space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="font-mono text-xs text-muted">{row.label}</dt>
            <dd className="mt-1.5 flex flex-wrap gap-1.5">
              {row.items.map((item) => (
                <span
                  key={item}
                  className="rounded border border-line px-2 py-0.5 text-xs"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
        {p.date && (
          <div>
            <dt className="font-mono text-xs text-muted">Completed</dt>
            <dd className="mt-1">
              {p.date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                timeZone: "UTC",
              })}
            </dd>
          </div>
        )}
      </dl>
      {links.length > 0 && (
        <ul className="mt-5 space-y-2 border-t border-line pt-4">
          {links.map(([key, href]) => (
            <li key={key}>
              <a
                href={href}
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                {linkLabels[key] ?? key}
              </a>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function Spec({ project: p }: { project: Project }) {
  const rows = [
    { label: "Data", text: p.spec.data },
    { label: "Tools", text: p.spec.tools },
    { label: "Deliverable", text: p.spec.deliverable },
    { label: "Definition of done", text: p.spec.definitionOfDone },
  ];
  return (
    <section aria-labelledby="spec-heading">
      <h2 id="spec-heading" className="text-2xl font-semibold tracking-tight">
        {p.status === "live" ? "The brief" : "The plan"}
      </h2>
      <dl className="mt-5 divide-y divide-line border-y border-line">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
            <dt className="font-mono text-sm text-muted">{row.label}</dt>
            <dd className="leading-relaxed">{row.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url: `${site.url}/projects/${project.slug}`,
          keywords: [...project.areas, ...project.stack].join(", "),
          creativeWorkStatus: project.status,
          ...(project.date && { datePublished: project.date.toISOString().slice(0, 10) }),
          ...(site.name && { author: { "@type": "Person", name: site.name } }),
        }}
      />
      <Link
        href="/projects"
        className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
      >
        ← All projects
      </Link>

      <header className="mt-6 max-w-3xl">
        <StatusBadge status={project.status} />
        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {project.summary}
        </p>
        {project.qaDuty && (
          <p className="mt-4">
            <span className="text-muted">AI QA duty it proves: </span>
            <span className="font-medium">{project.qaDuty}</span>
          </p>
        )}
        {project.headlineResult && (
          <p className="mt-6 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg bg-accent-soft px-4 py-3">
            <span className="font-mono text-sm text-accent">
              {project.headlineResult.name}
            </span>
            <span className="text-2xl font-semibold text-accent">
              {project.headlineResult.value}
            </span>
            {project.headlineResult.note && (
              <span className="text-sm text-muted">
                {project.headlineResult.note}
              </span>
            )}
          </p>
        )}
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">
          {project.status !== "live" && (
            <p className="mb-8 rounded-lg border border-dashed border-line px-4 py-3 text-sm text-muted">
              {statusNote[project.status]}
            </p>
          )}
          <Spec project={project} />
          {project.body && (
            <div className="max-w-prose">
              <MDXRemote
                source={project.body}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>
          )}
        </div>
        <Facts project={project} />
      </div>
    </article>
  );
}
