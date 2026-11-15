import type { Metadata } from "next";
import Link from "next/link";
import { SkillTag, tagInfo } from "@/components/skill-tag";
import { Todo } from "@/components/todo";
import { getAllProjects } from "@/lib/projects";
import { skillsByStage, type SkillTag as Tag } from "@/lib/skills";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Skills",
  "Skills across the model lifecycle, from building and training to monitoring and evaluation, each marked as used at work, studied or still learning.",
);

const legend: Tag[] = ["project", "work", "course", "learning"];

export default function SkillsPage() {
  const stages = skillsByStage(getAllProjects());

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Skills</h1>
      <p className="mt-3 max-w-prose text-lg text-muted">
        Grouped by the stage of a model&apos;s life they belong to. Each skill
        carries a tag that says how I know it, so nothing here claims more
        than I can back up.
      </p>

      <dl className="mt-8 grid gap-x-8 gap-y-3 rounded-xl border border-line bg-surface p-5 text-sm sm:grid-cols-2">
        {legend.map((tag) => (
          <div key={tag} className="flex items-baseline gap-3">
            <dt className="w-20 shrink-0">
              <SkillTag tag={tag} />
            </dt>
            <dd className="text-muted">{tagInfo[tag].meaning}</dd>
          </div>
        ))}
      </dl>

      {stages.map(({ stage, skills }, i) => (
        <section key={stage} aria-labelledby={`stage-${i}`} className="mt-12">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm text-muted">
              {stage === "Across stages" ? "··" : String(i + 1).padStart(2, "0")}
            </span>
            <h2 id={`stage-${i}`} className="text-xl font-semibold tracking-tight">
              {stage}
            </h2>
          </div>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {skills.map((skill) => (
              <li
                key={skill.name}
                className="grid gap-x-6 gap-y-2 py-4 sm:grid-cols-[1.3fr_auto_1.4fr] sm:items-baseline"
              >
                <p className="font-medium">{skill.name}</p>
                <p className="flex flex-wrap gap-1.5 sm:w-44">
                  {skill.tags.map((tag) => (
                    <SkillTag key={tag} tag={tag} />
                  ))}
                </p>
                <p className="text-sm text-muted">
                  {skill.evidence.length === 0 && !skill.todo && "No evidence yet"}
                  {skill.evidence.map((e, j) => (
                    <span key={e.text}>
                      {j > 0 && " · "}
                      {e.href ? (
                        <Link
                          href={e.href}
                          className="text-accent underline-offset-4 hover:underline"
                        >
                          {e.text}
                        </Link>
                      ) : (
                        e.text
                      )}
                    </span>
                  ))}
                  {skill.todo && (
                    <>
                      {" "}
                      <Todo>{skill.todo}</Todo>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
