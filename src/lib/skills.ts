import type { Project } from "@/lib/projects";

/**
 * Skills grouped by model lifecycle stage (docs/PRD.md, "Skills by model
 * lifecycle"). Tags are worked out from the facts below so nothing is
 * overclaimed:
 *   - "project" appears only once a linked project is live
 *   - "work" and "course" come from `base`
 *   - "learning" is used when none of the above applies
 */
export const STAGES = [
  "Build & Train",
  "Track",
  "Package",
  "Orchestrate & Retrain",
  "Deploy",
  "Monitor & Evaluate",
  "Across stages",
] as const;

export type Stage = (typeof STAGES)[number];
export type SkillTag = "project" | "work" | "course" | "learning";

type Skill = {
  name: string;
  stage: Stage;
  base?: ("work" | "course")[];
  courses?: string[];
  /** Project slugs in content/projects/ that use this skill. */
  projects?: string[];
  /** Open question from the PRD, shown as a TODO marker. */
  todo?: string;
};

const skills: Skill[] = [
  {
    name: "Python",
    stage: "Build & Train",
    base: ["work", "course"],
    courses: ["CSC500 onward"],
    projects: ["drift-detector", "llm-evals", "cv-edge-case-testing"],
    todo: "confirm use at work",
  },
  { name: "R, ggplot2", stage: "Build & Train", base: ["course"], courses: ["MIS446"] },
  {
    name: "Scikit-Learn",
    stage: "Build & Train",
    base: ["course"],
    courses: ["CSC525"],
    projects: ["drift-detector"],
  },
  {
    name: "PyTorch, TensorFlow, Keras",
    stage: "Build & Train",
    base: ["course"],
    courses: ["CSC580"],
    todo: "which frameworks you used",
  },
  {
    name: "OpenCV",
    stage: "Build & Train",
    base: ["course"],
    courses: ["CSC515"],
    projects: ["cv-edge-case-testing"],
  },
  { name: "Hugging Face Transformers", stage: "Build & Train" },
  { name: "MLflow or Weights & Biases", stage: "Track" },
  { name: "Docker", stage: "Package", projects: ["cloud-deployment"] },
  {
    name: "CI/CD pipelines",
    stage: "Orchestrate & Retrain",
    base: ["work"],
    projects: ["llm-evals"],
    todo: "confirm use at work",
  },
  { name: "Airflow or Kubeflow Pipelines", stage: "Orchestrate & Retrain" },
  {
    name: "AWS SageMaker or Azure ML, FastAPI",
    stage: "Deploy",
    projects: ["cloud-deployment"],
  },
  { name: "Kubernetes", stage: "Deploy" },
  {
    name: "Drift detection (PSI)",
    stage: "Monitor & Evaluate",
    projects: ["drift-detector"],
  },
  {
    name: "LLM evaluation, golden datasets",
    stage: "Monitor & Evaluate",
    projects: ["llm-evals"],
  },
  {
    name: "Edge-case and perturbation testing",
    stage: "Monitor & Evaluate",
    projects: ["cv-edge-case-testing"],
  },
  { name: "Red-teaming, prompt injection testing", stage: "Monitor & Evaluate" },
  {
    name: "Explainability (SHAP, LIME), fairness (Fairlearn)",
    stage: "Monitor & Evaluate",
    projects: ["fairness-audit"],
  },
  {
    name: "Test automation, Git, Agile/Scrum leadership",
    stage: "Across stages",
    base: ["work"],
    todo: "confirm",
  },
];

export type Evidence = { text: string; href?: string };

export type ResolvedSkill = {
  name: string;
  stage: Stage;
  tags: SkillTag[];
  evidence: Evidence[];
  todo?: string;
};

const projectPrefix: Record<Project["status"], string> = {
  live: "Project",
  "in-progress": "In progress",
  planned: "Planned",
};

export function resolveSkills(projects: Project[]): ResolvedSkill[] {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));

  return skills.map((skill) => {
    const linked = (skill.projects ?? [])
      .map((slug) => bySlug.get(slug))
      .filter((p): p is Project => Boolean(p));

    const tags: SkillTag[] = [];
    if (linked.some((p) => p.status === "live")) tags.push("project");
    for (const tag of skill.base ?? []) tags.push(tag);
    if (tags.length === 0) tags.push("learning");

    const evidence: Evidence[] = [
      ...(skill.courses ?? []).map((c) => ({ text: c })),
      ...linked.map((p) => ({
        text: `${projectPrefix[p.status]}: ${p.shortTitle ?? p.title}`,
        href: `/projects/${p.slug}`,
      })),
    ];

    return { name: skill.name, stage: skill.stage, tags, evidence, todo: skill.todo };
  });
}

export function skillsByStage(projects: Project[]) {
  const resolved = resolveSkills(projects);
  return STAGES.map((stage) => ({
    stage,
    skills: resolved.filter((s) => s.stage === stage),
  }));
}
