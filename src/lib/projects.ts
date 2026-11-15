import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

/**
 * Project content: one MDX file per project in content/projects/.
 * The front matter is validated here at build time (docs/PRD.md,
 * "Content model"), so a bad or incomplete file fails the build
 * instead of producing a broken page.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export const STATUSES = ["live", "in-progress", "planned"] as const;
export const TIERS = ["flagship", "gap", "coursework"] as const;
export const LIFECYCLE_STAGES = [
  "Build & Train",
  "Track",
  "Package",
  "Orchestrate & Retrain",
  "Deploy",
  "Monitor & Evaluate",
] as const;

/** Sections every live project must contain (PRD FR-3, sections 5 and 7). */
export const REQUIRED_SECTIONS = [
  "How I tested it",
  "What broke and what I learned",
];

const url = z.string().url();

const frontMatter = z.object({
  title: z.string().min(1),
  shortTitle: z.string().min(1).optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/, "use lowercase letters, digits and dashes"),
  summary: z.string().min(1).max(160),
  status: z.enum(STATUSES),
  tier: z.enum(TIERS),
  order: z.number().optional(),
  date: z.coerce.date().optional(),
  areas: z.array(z.string()).min(1),
  stack: z.array(z.string()).min(1),
  lifecycleStage: z.array(z.enum(LIFECYCLE_STAGES)).min(1),
  roles: z.array(z.string()).min(1),
  qaDuty: z.string().optional(),
  spec: z.object({
    data: z.string().min(1),
    tools: z.string().min(1),
    deliverable: z.string().min(1),
    definitionOfDone: z.string().min(1),
  }),
  headlineResult: z
    .object({ name: z.string(), value: z.string(), note: z.string().optional() })
    .optional(),
  course: z.string().optional(),
  links: z
    .object({
      github: url.optional(),
      notebook: url.optional(),
      report: url.optional(),
      sample: url.optional(),
      demo: url.optional(),
    })
    .optional(),
  cover: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

export type Status = (typeof STATUSES)[number];
export type Tier = (typeof TIERS)[number];
export type Project = z.infer<typeof frontMatter> & { body: string };

function fail(file: string, problems: string[]): never {
  throw new Error(
    `Invalid project file content/projects/${file}:\n` +
      problems.map((p) => `  - ${p}`).join("\n"),
  );
}

function loadProject(file: string): Project {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const parsed = frontMatter.safeParse(data);
  if (!parsed.success) {
    fail(
      file,
      parsed.error.issues.map(
        (i) => `${i.path.join(".") || "front matter"}: ${i.message}`,
      ),
    );
  }

  const project: Project = { ...parsed.data, body: content.trim() };
  const problems: string[] = [];

  if (project.slug !== file.replace(/\.mdx$/, "")) {
    problems.push(`slug "${project.slug}" must match the file name`);
  }
  if (project.tier === "flagship" && !project.qaDuty) {
    problems.push("flagship projects need qaDuty");
  }
  if (project.tier === "coursework" && !project.course) {
    problems.push("coursework projects need course");
  }

  if (project.status === "live") {
    if (!project.headlineResult) problems.push("live projects need headlineResult");
    if (!project.date) problems.push("live projects need date");
    const links = Object.values(project.links ?? {}).filter(Boolean);
    if (links.length === 0) problems.push("live projects need at least one link");
    for (const section of REQUIRED_SECTIONS) {
      const heading = new RegExp(`^##\\s+${section}\\s*$`, "im");
      if (!heading.test(project.body)) {
        problems.push(`live projects need a "## ${section}" section`);
      }
    }
  }

  if (problems.length > 0) fail(file, problems);
  return project;
}

const tierOrder: Record<Tier, number> = { flagship: 0, gap: 1, coursework: 2 };

let cache: Project[] | null = null;

/** All projects, flagship first. Drafts are hidden in production builds. */
export function getAllProjects(): Project[] {
  if (cache && process.env.NODE_ENV === "production") return cache;

  const projects = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(loadProject)
    .filter((p) => !(p.draft && process.env.NODE_ENV === "production"))
    .sort(
      (a, b) =>
        tierOrder[a.tier] - tierOrder[b.tier] ||
        (a.order ?? 99) - (b.order ?? 99) ||
        a.title.localeCompare(b.title),
    );

  cache = projects;
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getProjectsByTier(tier: Tier): Project[] {
  return getAllProjects().filter((p) => p.tier === tier);
}
