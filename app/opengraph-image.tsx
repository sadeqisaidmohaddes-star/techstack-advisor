import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "TechStack Advisor — find the right tech stack for what you're building";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0d12",
          backgroundImage:
            "radial-gradient(900px 500px at 10% -10%, rgba(124,92,255,0.35), transparent 60%), radial-gradient(800px 500px at 100% 10%, rgba(56,214,200,0.22), transparent 55%)",
          color: "#e9ecf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #7c5cff, #38d6c8)",
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 600 }}>TechStack Advisor</div>
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
          Find the right tech stack for what you&apos;re building.
        </div>
        <div style={{ fontSize: 30, color: "#9aa3bd", marginTop: 28 }}>
          Web · Mobile · Data/ML · AI · Backend · Desktop · Games · CLI
        </div>
      </div>
    ),
    size,
  );
}
