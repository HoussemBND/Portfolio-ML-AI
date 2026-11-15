import type { Metadata } from "next";
import { ProjectBrowser } from "@/components/project-browser";
import { getAllProjects, type Tier } from "@/lib/projects";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Projects",
  "AI quality and model evaluation projects: drift detection, LLM evaluation and computer vision edge-case testing.",
);

const sections: { tier: Tier; heading: string; intro: string }[] = [
  {
    tier: "flagship",
    heading: "Flagship projects",
    intro:
      "Each one tests an AI system and is built around one duty of an AI quality role.",
  },
  {
    tier: "gap",
    heading: "Planned next",
    intro:
      "Projects that extend the flagship work into deployment, fairness and model building. None of these has started yet.",
  },
  {
    tier: "coursework",
    heading: "Coursework",
    intro: "Selected projects from the MS in AI & Machine Learning.",
  },
];

export default function ProjectsPage() {
  // The write-up body is not needed for cards, so it is left out of the
  // data sent to the browser.
  const projects = getAllProjects().map((p) => ({ ...p, body: "" }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Projects
      </h1>
      <p className="mt-3 max-w-prose text-lg text-muted">
        Every project carries a status, so it is clear what is finished, what
        is under way and what is planned.
      </p>
      <ProjectBrowser projects={projects} sections={sections} />
    </div>
  );
}
