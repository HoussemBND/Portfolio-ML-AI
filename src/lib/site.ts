/**
 * Site-wide profile data. Wording comes from docs/PRD.md ("Positioning").
 * A `null` value is an open TODO from the PRD: the site shows a visible
 * TODO marker for it until you fill it in here.
 */
export const site = {
  /**
   * Public address of the site, without a trailing slash. Set
   * NEXT_PUBLIC_SITE_URL where the site is hosted (see README.md).
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  /**
   * Keep false until the public launch (PRD: the site stays on a preview
   * address until the Drift Detector is live). While false, search
   * engines are told not to index the site.
   */
  launched: false,
  name: "Houssem Boundaoui" as string | null,
  headline: "Senior Software QA & Machine Learning Evaluation Engineer",
  pitch:
    "I test AI systems the way I tested software: with automated suites, golden datasets and evidence, before problems reach production.",
  summary:
    "Senior Software Quality Engineer with a Master of Science in AI & Machine Learning. Combines 8+ years of software test automation and quality leadership with expertise in neural networks, computer vision, and model validation pipelines.",
  /** QA work since June 2018, confirmed from the resume. */
  years: "8+",
  yearsConfirmed: true,
  location: "Denver, CO",
  remote: "Open to remote",
  degree: "MS in AI & Machine Learning",
  university: "Colorado State University Global" as string | null,
  graduated: "2026" as string | null,
  /** Path under /public, for example "/cv.pdf". */
  cvUrl: null as string | null,
  links: {
    github: "https://github.com/HoussemBND" as string | null,
    linkedin: "https://www.linkedin.com/in/houssem-boundaoui" as string | null,
    email: "houssemboundaoui@gmail.com" as string | null,
  },
};

/**
 * Title and description for a page, repeated for link previews (Open
 * Graph) so a shared link shows that page's own title.
 */
export function pageMeta(title: string, description: string) {
  return {
    title,
    description,
    openGraph: {
      type: "website" as const,
      siteName: site.name ?? "AI Quality Portfolio",
      title,
      description,
    },
  };
}

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
