import type { Project } from "@/lib/projects";

/**
 * Adjacent roles (docs/PRD.md, "Adjacent roles"): roles the degree
 * supports but where hands-on experience is thin. They are always shown
 * as early-career and never worded as experience.
 * `backedBy` is a project slug in content/projects/.
 */
export const adjacentRoles = [
  {
    role: "MLOps Engineer",
    courses: "CSC505 (CI/CD, testing), CSC580 (pipelines, deployment)",
    today: "QA experience with CI/CD carries over. No ML deployment or cloud work yet.",
    backedBy: "cloud-deployment",
  },
  {
    role: "Responsible AI Analyst",
    courses: "CSC502 (algorithmic bias, fairness, privacy compliance)",
    today: "Coursework only.",
    backedBy: "fairness-audit",
  },
  {
    role: "Machine Learning Engineer",
    courses: "CSC525, CSC580",
    today: "Coursework only. No portfolio project trains a model yet.",
    backedBy: "model-from-scratch",
  },
  {
    role: "Computer Vision Engineer",
    courses: "CSC515 (OpenCV, CNNs, object detection)",
    today: "Coursework. The portfolio project tests a pre-trained model.",
    backedBy: "cv-edge-case-testing",
  },
  {
    role: "Data Scientist / Data Analyst",
    courses: "MIS446 (statistics in R), CSC525",
    today: "Coursework only.",
    backedBy: "drift-detector",
  },
  {
    role: "AI / LLM Engineer",
    courses: "CSC580 (Transformers)",
    today: "The weakest fit: the degree has no dedicated LLM course.",
    backedBy: "llm-evals",
  },
];

/** Roles listed under "Also open to": only those whose project has started. */
export function openToRoles(projects: Project[]): string[] {
  const started = new Set(
    projects.filter((p) => p.status !== "planned").map((p) => p.slug),
  );
  return adjacentRoles.filter((r) => started.has(r.backedBy)).map((r) => r.role);
}

/** Coursework shown on the About page as supporting evidence. */
export const coursework = [
  {
    code: "CSC580",
    title: "Applying Machine Learning and Neural Networks",
    why: "Deep learning frameworks, transfer learning, evaluation with confusion matrices, ROC/AUC and F1",
  },
  {
    code: "CSC525",
    title: "Principles of Machine Learning",
    why: "Model evaluation and tuning, cross-validation, overfitting",
  },
  {
    code: "CSC515",
    title: "Foundations of Computer Vision",
    why: "OpenCV, CNNs, object detection (YOLO, Faster R-CNN)",
  },
  {
    code: "CSC510",
    title: "Foundations of Artificial Intelligence",
    why: "Search, probabilistic reasoning, adversarial search",
  },
  {
    code: "CSC505",
    title: "Principles of Software Development",
    why: "Testing, test-driven development, CI/CD, Git",
  },
  {
    code: "CSC502",
    title: "Ethical Leadership in Software Development",
    why: "Algorithmic bias, fairness, privacy compliance",
  },
  {
    code: "MIS446",
    title: "Statistics for Data Analytics Using R",
    why: "Hypothesis testing, confidence intervals, regression",
  },
];
