import { ogImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = "AI Quality & Model Evaluation Engineer portfolio";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: `${site.location} · ${site.remote}`,
    title: site.name ?? "AI Quality & Model Evaluation",
    subtitle: site.headline,
    footer: "Drift detection · LLM evaluation · Edge-case testing",
  });
}
