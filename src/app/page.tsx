import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import { Todo } from "@/components/todo";
import { tagInfo } from "@/components/skill-tag";
import {
  getAllProjects,
  getProjectsByTier,
  type Status,
} from "@/lib/projects";
import { openToRoles } from "@/lib/roles";
import { site } from "@/lib/site";
import { skillsByStage, type SkillTag } from "@/lib/skills";

const runMark: Record<Status, { mark: string; className: string; label: string }> = {
  live: { mark: "✓", className: "text-accent", label: "live" },
  "in-progress": { mark: "●", className: "text-warn", label: "in progress" },
  planned: { mark: "○", className: "text-idle", label: "planned" },
};

const skillLegend: SkillTag[] = ["work", "course", "learning"];

function Hero() {
  const openTo = openToRoles(getAllProjects());
  const flagship = getProjectsByTier("flagship");
  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-14 lg:pt-20">
      <div>
        <p className="font-mono text-sm text-muted">
          {site.location} · {site.remote}
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          {site.name ?? <Todo>your name</Todo>}
        </h1>
        <p className="mt-3 text-xl font-medium text-accent sm:text-2xl">
          {site.headline}
        </p>
        <p className="mt-6 max-w-prose text-lg leading-relaxed">{site.pitch}</p>
        <p className="mt-4 max-w-prose leading-relaxed text-muted">
          {site.summary}{" "}
          {!site.yearsConfirmed && <Todo>confirm years</Todo>}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            View projects
          </Link>
          {site.cvUrl ? (
            <a
              href={site.cvUrl}
              className="rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink"
            >
              Download CV
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-md border border-dashed border-line px-4 py-2.5 text-sm font-medium text-muted">
              Download CV <Todo>PDF</Todo>
            </span>
          )}
          <Link
            href="/contact"
            className="rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink"
          >
            Contact
          </Link>
        </div>

        {openTo.length > 0 && (
          <p className="mt-6 text-sm text-muted">
            <span className="font-medium text-ink">Also open to:</span>{" "}
            early-career {openTo.join(", ")} roles.
          </p>
        )}
      </div>

      <aside
        aria-label="Portfolio status"
        className="self-start rounded-xl border border-line bg-surface font-mono text-sm shadow-sm"
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 text-xs text-muted">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
          portfolio.status
        </div>
        <dl className="space-y-3 px-4 py-4">
          <div>
            <dt className="text-xs text-muted">background</dt>
            <dd className="mt-0.5">
              {site.years} yrs test automation and quality leadership
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">degree</dt>
            <dd className="mt-0.5">
              {site.degree}
              {site.university ? `, ${site.university}` : null}{" "}
              {!site.graduated && <Todo>month/year</Todo>}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">flagship projects</dt>
            <dd className="mt-1.5">
              <ul className="space-y-1.5">
                {flagship.map((p) => {
                  const m = runMark[p.status];
                  return (
                    <li key={p.slug} className="flex items-baseline gap-2">
                      <span aria-hidden="true" className={m.className}>
                        {m.mark}
                      </span>
                      <span className="flex-1">{p.shortTitle ?? p.title}</span>
                      <span className={`text-xs ${m.className}`}>{m.label}</span>
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        </dl>
      </aside>
    </section>
  );
}

function Flagship() {
  const flagship = getProjectsByTier("flagship");
  return (
    <section
      aria-labelledby="flagship-heading"
      className="border-t border-line bg-surface/50"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="flagship-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              Flagship projects
            </h2>
            <p className="mt-2 max-w-prose text-muted">
              Three projects that test AI systems, each built around one duty
              of an AI quality role.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            All projects
          </Link>
        </div>

        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {flagship.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Skills() {
  const stages = skillsByStage(getAllProjects());
  return (
    <section aria-labelledby="skills-heading" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="skills-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              Skills across the model lifecycle
            </h2>
            <p className="mt-2 max-w-prose text-muted">
              Grouped by where they sit in a model&apos;s life, and marked
              honestly: what I have used, what I studied, and what I am still
              learning.
            </p>
          </div>
          <Link
            href="/skills"
            className="text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Full skills page
          </Link>
        </div>

        <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {stages.map(({ stage, skills }, i) => {
            const across = stage === "Across stages";
            return (
              <li
                key={stage}
                className={`bg-surface p-5 ${across ? "sm:col-span-2 lg:col-span-3" : ""}`}
              >
                <p className="font-mono text-xs text-muted">
                  {across ? "··" : String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-semibold">{stage}</h3>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {skills.map((s) => (
                    <li key={s.name} className="flex items-baseline gap-2">
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 shrink-0 translate-y-[-1px] rounded-full ${tagInfo[s.tags[0]].dot}`}
                      />
                      <span>{s.name}</span>
                      <span className="sr-only">
                        ({tagInfo[s.tags[0]].label})
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
          {skillLegend.map((tag) => (
            <li key={tag} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full ${tagInfo[tag].dot}`}
              />
              {tagInfo[tag].meaning}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      {site.name && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.name,
            jobTitle: site.headline,
            description: site.summary,
            url: site.url,
            address: { "@type": "PostalAddress", addressLocality: "Denver", addressRegion: "CO" },
            sameAs: [site.links.github, site.links.linkedin].filter(Boolean),
          }}
        />
      )}
      <Hero />
      <Flagship />
      <Skills />
    </>
  );
}
