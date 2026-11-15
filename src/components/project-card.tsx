import Link from "next/link";
import type { Project } from "@/lib/projects";
import { StatusBadge } from "./status-badge";

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-ink"
    >
      <StatusBadge status={p.status} />
      <h3 className="mt-4 text-lg font-semibold leading-snug">{p.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
      {p.headlineResult && (
        <p className="mt-4 font-mono text-sm">
          <span className="text-muted">{p.headlineResult.name}: </span>
          <span className="font-medium text-accent">{p.headlineResult.value}</span>
        </p>
      )}
      {p.qaDuty && (
        <p className="mt-4 text-sm">
          <span className="text-muted">Proves: </span>
          {p.qaDuty}
        </p>
      )}
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {p.stack.map((tool) => (
          <li
            key={tool}
            className="rounded border border-line px-2 py-0.5 font-mono text-xs text-muted"
          >
            {tool}
          </li>
        ))}
      </ul>
    </Link>
  );
}
