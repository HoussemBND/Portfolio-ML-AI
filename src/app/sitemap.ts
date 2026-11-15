import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/skills", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
  }));
  const projects = getAllProjects().map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: p.date,
  }));
  return [...pages, ...projects];
}
