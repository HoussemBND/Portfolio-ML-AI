import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Share image (the preview shown when a page link is posted or sent). */
export function ogImage({
  eyebrow,
  title,
  subtitle,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0e100f",
          color: "#ecebe5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              borderRadius: 8,
              background: "#12301f",
              color: "#4fd197",
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            QA to ML
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#a2a49c" }}>
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 40 ? 64 : 76,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.35,
              color: "#a2a49c",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: "2px solid #272b29",
            paddingTop: 28,
            fontSize: 26,
            color: "#4fd197",
          }}
        >
          {footer}
        </div>
      </div>
    ),
    ogSize,
  );
}
