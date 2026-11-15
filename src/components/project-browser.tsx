"use client";

import { useMemo, useState } from "react";
import type { Project, Tier } from "@/lib/projects";
import { ProjectCard } from "./project-card";

type Section = { tier: Tier; heading: string; intro: string };

const statusLabels: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In progress",
  planned: "Planned",
};

function unique(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

const control =
  "h-10 rounded-md border border-line bg-surface px-3 text-sm outline-none transition-colors focus:border-accent";

export function ProjectBrowser({
  projects,
  sections,
}: {
  projects: Project[];
  sections: Section[];
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [area, setArea] = useState("");
  const [role, setRole] = useState("");
  const [tool, setTool] = useState("");

  const options = useMemo(
    () => ({
      status: unique(projects.map((p) => p.status)),
      area: unique(projects.flatMap((p) => p.areas)),
      role: unique(projects.flatMap((p) => p.roles)),
      tool: unique(projects.flatMap((p) => p.stack)),
    }),
    [projects],
  );

  const active = Boolean(query.trim() || status || area || role || tool);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (!q || `${p.title} ${p.summary}`.toLowerCase().includes(q)) &&
        (!status || p.status === status) &&
        (!area || p.areas.includes(area)) &&
        (!role || p.roles.includes(role)) &&
        (!tool || p.stack.includes(tool)),
    );
  }, [projects, query, status, area, role, tool]);

  function clear() {
    setQuery("");
    setStatus("");
    setArea("");
    setRole("");
    setTool("");
  }

  const selects: {
    label: string;
    value: string;
    set: (v: string) => void;
    items: string[];
    format?: (v: string) => string;
  }[] = [
    {
      label: "Status",
      value: status,
      set: setStatus,
      items: options.status,
      format: (v) => statusLabels[v as Project["status"]] ?? v,
    },
    { label: "Area", value: area, set: setArea, items: options.area },
    { label: "Role", value: role, set: setRole, items: options.role },
    { label: "Tool", value: tool, set: setTool, items: options.tool },
  ];

  return (
    <>
      <form
        role="search"
        aria-label="Filter projects"
        onSubmit={(e) => e.preventDefault()}
        className="mt-8 flex flex-wrap items-end gap-3"
      >
        <label className="flex min-w-48 flex-1 flex-col gap-1.5 text-xs font-medium text-muted">
          Search
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Title or summary"
            className={`${control} w-full text-ink placeholder:text-muted/70`}
          />
        </label>
        {selects.map((s) => (
          <label
            key={s.label}
            className="flex flex-col gap-1.5 text-xs font-medium text-muted"
          >
            {s.label}
            <select
              value={s.value}
              onChange={(e) => s.set(e.target.value)}
              className={`${control} max-w-44 text-ink`}
            >
              <option value="">All</option>
              {s.items.map((item) => (
                <option key={item} value={item}>
                  {s.format ? s.format(item) : item}
                </option>
              ))}
            </select>
          </label>
        ))}
        {active && (
          <button
            type="button"
            onClick={clear}
            className="h-10 rounded-md px-3 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Clear filters
          </button>
        )}
      </form>

      <p aria-live="polite" className="mt-4 text-sm text-muted">
        {active
          ? `${matches.length} of ${projects.length} projects match`
          : `${projects.length} projects`}
      </p>

      {active ? (
        matches.length > 0 ? (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 rounded-lg border border-dashed border-line px-4 py-6 text-muted">
            No projects match these filters.
          </p>
        )
      ) : (
        sections.map(({ tier, heading, intro }) => {
          const group = projects.filter((p) => p.tier === tier);
          if (group.length === 0) return null;
          return (
            <section key={tier} aria-labelledby={`${tier}-heading`} className="mt-10">
              <h2
                id={`${tier}-heading`}
                className="text-xl font-semibold tracking-tight"
              >
                {heading}
              </h2>
              <p className="mt-1 max-w-prose text-muted">{intro}</p>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((p) => (
                  <li key={p.slug}>
                    <ProjectCard project={p} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })
      )}
    </>
  );
}
