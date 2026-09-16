import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — websites and web apps, Port Macquarie`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#000000",
          padding: "72px 80px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 500 }}>{site.name}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Websites and web apps for businesses.
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 28, color: "rgba(0,0,0,0.45)" }}>
            Andy · {site.location}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
