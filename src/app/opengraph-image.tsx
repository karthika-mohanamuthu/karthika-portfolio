import { ImageResponse } from "next/og";

export const alt = "Karthika Mohanamuthu, .NET Developer & Azure Engineer";
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
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #faf8ff 0%, #efe9ff 60%, #e3d9ff 100%)",
          color: "#1a1033",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #6d43f0, #3f1db0)",
              color: "white",
              fontSize: 44,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            K
          </div>
          <div style={{ fontSize: 28, color: "#5f5878" }}>Portfolio</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>Karthika Mohanamuthu</div>
          <div style={{ fontSize: 44, color: "#5b2ee0", marginTop: 8 }}>.NET Developer &amp; Azure Engineer</div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 24 }}>
          {["Enterprise modernization", "Azure migration", "Application security"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 999,
                background: "rgba(91,46,224,0.1)",
                color: "#3f1db0",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
