import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/status-badge";
import { Todo } from "@/components/todo";
import { certifications, earlierEducation, jobs } from "@/lib/experience";
import { getAllProjects, getProjectsByTier } from "@/lib/projects";
import { adjacentRoles, coursework } from "@/lib/roles";
import { pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "About",
  "Senior Software QA with an MS in AI & Machine Learning: background, education, coursework and the roles I fit.",
);

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-semibold tracking-tight">
      {children}
    </h2>
  );
}

function ExternalLink({ label, href }: { label: string; href: string | null }) {
  if (!href) {
    return (
      <span className="text-muted">
        {label} <Todo>link</Todo>
      </span>
    );
  }
  return (
    <a href={href} className="font-medium text-accent underline-offset-4 hover:underline">
      {label}
    </a>
  );
}

export default function AboutPage() {
  const projects = getAllProjects();
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const flagship = getProjectsByTier("flagship");

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="max-w-prose space-y-4 text-lg leading-relaxed">
          <p>
            I have spent more than eight years in software quality: building
            test automation, leading quality work and deciding when a release
            was ready to ship.
          </p>
          <p>
            During my MS in AI & Machine Learning I saw that AI systems need
            the same discipline, with one difference: their output is not the
            same every time. They have to be tested with datasets, metrics
            and thresholds, not simple pass or fail checks.
          </p>
          <p>
            This portfolio is where I apply QA instincts to ML systems:
            detecting data drift, evaluating LLMs against golden datasets and
            stress-testing vision models.
          </p>
          <p className="text-base">
            <Todo>review this bio and put it in your own words</Todo>
          </p>
        </div>

        <aside className="self-start rounded-xl border border-line bg-surface p-5 text-sm">
          <dl className="space-y-4">
            <div>
              <dt className="font-mono text-xs text-muted">Location</dt>
              <dd className="mt-1">
                {site.location} · {site.remote}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-muted">Degree</dt>
              <dd className="mt-1">{site.degree}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-muted">Looking for</dt>
              <dd className="mt-1">AI QA and model evaluation roles</dd>
            </div>
          </dl>
          <ul className="mt-5 space-y-2 border-t border-line pt-4">
            <li>
              {site.cvUrl ? (
                <a
                  href={site.cvUrl}
                  className="font-medium text-accent underline-offset-4 hover:underline"
                >
                  Download CV (PDF)
                </a>
              ) : (
                <span className="text-muted">
                  Download CV <Todo>PDF</Todo>
                </span>
              )}
            </li>
            <li>
              <ExternalLink label="GitHub" href={site.links.github} />
            </li>
            <li>
              <ExternalLink label="LinkedIn" href={site.links.linkedin} />
            </li>
            <li>
              <Link
                href="/contact"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                Contact
              </Link>
            </li>
          </ul>
        </aside>
      </div>

      <section aria-labelledby="experience" className="mt-16">
        <SectionHeading id="experience">Experience</SectionHeading>
        <ol className="mt-6 divide-y divide-line border-y border-line">
          {jobs.map((job) => (
            <li key={job.company} className="grid gap-x-6 gap-y-3 py-6 sm:grid-cols-[1fr_1.6fr]">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="mt-0.5">{job.company}</p>
                <p className="mt-1 text-sm text-muted">{job.place}</p>
                <p className="mt-1 font-mono text-xs text-muted">{job.dates}</p>
                {job.note && <p className="mt-1 text-sm text-muted">{job.note}</p>}
              </div>
              <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="education" className="mt-16">
        <SectionHeading id="education">Education</SectionHeading>
        <p className="mt-4 text-lg">
          <span className="font-medium">{site.degree}</span>
          {", "}
          {site.university ?? <Todo>university</Todo>}
          {", "}
          {site.graduated ?? <Todo>month/year</Todo>}
        </p>
        {earlierEducation.map((e) => (
          <p key={e.degree} className="mt-2 text-lg">
            <span className="font-medium">{e.degree}</span>, {e.school}, {e.date}
          </p>
        ))}
        {certifications.map((c) => (
          <p key={c.name} className="mt-2 text-lg">
            <span className="font-medium">{c.name}</span>, {c.date}
          </p>
        ))}
        <p className="mt-6 max-w-prose text-muted">
          Coursework most relevant to AI quality work. These are supporting
          evidence; the projects are where the skills are applied.
        </p>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {coursework.map((c) => (
            <li key={c.code} className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[1fr_1.2fr]">
              <p>
                <span className="font-mono text-sm text-muted">{c.code}</span>{" "}
                <span className="font-medium">{c.title}</span>
              </p>
              <p className="text-sm leading-relaxed text-muted">{c.why}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="roles" className="mt-16">
        <SectionHeading id="roles">Roles I fit</SectionHeading>
        <p className="mt-4 max-w-prose text-muted">
          AI quality is where my experience is. The other roles are ones my
          degree prepares me for at an early-career level; each is stated
          plainly as coursework or project work, not as experience.
        </p>

        <div className="mt-6 rounded-xl border border-accent bg-accent-soft/40 p-5">
          <p className="font-mono text-xs text-accent">Primary</p>
          <h3 className="mt-1 text-lg font-semibold">
            AI QA / Model Evaluation Engineer
          </h3>
          <p className="mt-2 max-w-prose text-sm leading-relaxed">
            Backed by years of test automation and quality leadership, plus
            three projects that test AI systems.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {flagship.map((p) => (
              <li key={p.slug} className="flex items-center gap-2">
                <Link
                  href={`/projects/${p.slug}`}
                  className="font-medium underline-offset-4 hover:underline"
                >
                  {p.shortTitle ?? p.title}
                </Link>
                <StatusBadge status={p.status} />
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-6 divide-y divide-line border-y border-line">
          {adjacentRoles.map((r) => {
            const project = bySlug.get(r.backedBy);
            return (
              <li
                key={r.role}
                className="grid gap-x-6 gap-y-2 py-4 sm:grid-cols-[1fr_1.4fr_1fr]"
              >
                <div>
                  <p className="font-medium">{r.role}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted">Early-career</p>
                </div>
                <div className="text-sm leading-relaxed">
                  <p>
                    <span className="text-muted">MS coursework: </span>
                    {r.courses}
                  </p>
                  <p className="mt-1 text-muted">{r.today}</p>
                </div>
                {project && (
                  <div className="text-sm">
                    <p className="text-muted">Project</p>
                    <p className="mt-1 flex flex-wrap items-center gap-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="font-medium underline-offset-4 hover:underline"
                      >
                        {project.shortTitle ?? project.title}
                      </Link>
                      <StatusBadge status={project.status} />
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
