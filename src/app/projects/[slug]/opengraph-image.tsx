import { ogImage, ogSize } from "@/lib/og";
import { getAllProjects, getProject } from "@/lib/projects";
import { site } from "@/lib/site";

export const alt = "Project summary";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

const statusLabel = {
  live: "Project",
  "in-progress": "Project in progress",
  planned: "Planned project",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  return ogImage({
    eyebrow: project ? statusLabel[project.status] : "Project",
    title: project?.title ?? "Project",
    subtitle: project?.summary ?? "",
    footer: site.name ? `${site.name} · ${site.headline}` : site.headline,
  });
}
