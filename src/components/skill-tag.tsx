import type { SkillTag as Tag } from "@/lib/skills";

export const tagInfo: Record<Tag, { label: string; meaning: string; className: string; dot: string }> = {
  project: {
    label: "Project",
    meaning: "Used in a finished portfolio project",
    className: "bg-accent-soft text-accent",
    dot: "bg-accent",
  },
  work: {
    label: "Work",
    meaning: "Used in QA roles",
    className: "bg-accent-soft text-accent",
    dot: "bg-accent",
  },
  course: {
    label: "Course",
    meaning: "Studied in the degree",
    className: "bg-idle-soft text-ink",
    dot: "bg-ink/60",
  },
  learning: {
    label: "Learning",
    meaning: "In progress, not yet used in finished work",
    className: "border border-dashed border-idle text-idle",
    dot: "border border-idle",
  },
};

export function SkillTag({ tag }: { tag: Tag }) {
  const t = tagInfo[tag];
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-xs font-medium ${t.className}`}
    >
      {t.label}
    </span>
  );
}
