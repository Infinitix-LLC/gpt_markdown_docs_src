import { ImageResponse } from "next/og";

export const alt = "GPT Markdown — Markdown & LaTeX for Flutter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const codeLine = (num: string, children: React.ReactNode) => (
  <div key={num} style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 2 }}>
    <span style={{ color: "#4A4A4A", fontSize: 15, minWidth: 28, fontFamily: "monospace" }}>{num}</span>
    {children}
  </div>
);

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 68px",
        }}>

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: "#181818",
              border: "1px solid #2C2C2C",
              borderRadius: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <span style={{ color: "#fff", fontSize: 16, fontWeight: 800, fontFamily: "monospace", letterSpacing: "-0.5px" }}>M↓</span>
          </div>
          <span style={{ color: "#444", fontSize: 14, fontFamily: "sans-serif", letterSpacing: "0.04em" }}>gptmarkdown.com</span>
        </div>

        {/* Middle: brand + code */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Left: brand */}
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 545 }}>

            {/* Badge */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 26 }}>
              <div style={{
                background: "#181818",
                border: "1px solid #2C2C2C",
                borderRadius: 5,
                padding: "3px 10px",
                display: "flex",
                alignItems: "center",
              }}>
                <span style={{ color: "#666", fontSize: 12, fontFamily: "sans-serif", letterSpacing: "0.06em" }}>Flutter Package · pub.dev</span>
              </div>
            </div>

            {/* Title */}
            <div style={{ display: "flex", marginBottom: 18 }}>
              <span style={{
                fontSize: 68,
                fontWeight: 900,
                color: "#fff",
                fontFamily: "sans-serif",
                letterSpacing: "-3px",
                lineHeight: 1,
              }}>GPT Markdown</span>
            </div>

            {/* Subtitle */}
            <div style={{ display: "flex", flexDirection: "column", marginBottom: 38 }}>
              <span style={{ fontSize: 20, color: "#555", fontFamily: "sans-serif", lineHeight: 1.5 }}>
                Markdown &amp; LaTeX renderer for Flutter.
              </span>
              <span style={{ fontSize: 20, color: "#555", fontFamily: "sans-serif", lineHeight: 1.5 }}>
                Optimized for AI-generated content.
              </span>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 10 }}>
              {[["160 / 160", "pub points"], ["75K+", "downloads/mo"], ["WASM", "ready"]].map(([val, label]) => (
                <div
                  key={label}
                  style={{
                    background: "#141414",
                    border: "1px solid #252525",
                    borderRadius: 8,
                    padding: "9px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}>
                  <span style={{ color: "#fff", fontSize: 17, fontWeight: 700, fontFamily: "sans-serif" }}>{val}</span>
                  <span style={{ color: "#444", fontSize: 11, fontFamily: "sans-serif" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: code card */}
          <div
            style={{
              background: "#101010",
              border: "1px solid #1E1E1E",
              borderRadius: 12,
              padding: "24px 28px",
              width: 450,
              display: "flex",
              flexDirection: "column",
            }}>

            {/* Chrome dots */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
              <div style={{ width: 11, height: 11, borderRadius: 6, background: "#2A2A2A", marginRight: 7 }} />
              <div style={{ width: 11, height: 11, borderRadius: 6, background: "#2A2A2A", marginRight: 7 }} />
              <div style={{ width: 11, height: 11, borderRadius: 6, background: "#2A2A2A", marginRight: 16 }} />
              <span style={{ color: "#383838", fontSize: 12, fontFamily: "monospace" }}>main.dart</span>
            </div>

            {/* Code */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {codeLine("1",
                <span style={{ display: "flex", gap: 0 }}>
                  <span style={{ color: "#7AA2F7", fontFamily: "monospace", fontSize: 15 }}>GptMarkdown</span>
                  <span style={{ color: "#C0CAF5", fontFamily: "monospace", fontSize: 15 }}>(</span>
                </span>
              )}
              {codeLine("2",
                <span style={{ color: "#9ECE6A", fontFamily: "monospace", fontSize: 15 }}>{"  r'# Hello AI"}</span>
              )}
              {codeLine("3",
                <span style={{ color: "#9ECE6A", fontFamily: "monospace", fontSize: 15 }}>{"  **Bold**, *italic*,"}</span>
              )}
              {codeLine("4",
                <span style={{ display: "flex", gap: 0 }}>
                  <span style={{ color: "#9ECE6A", fontFamily: "monospace", fontSize: 15 }}>{"  \\( E = mc² \\)'"}</span>
                  <span style={{ color: "#C0CAF5", fontFamily: "monospace", fontSize: 15 }}>,</span>
                </span>
              )}
              {codeLine("5",
                <span style={{ color: "#C0CAF5", fontFamily: "monospace", fontSize: 15 }}>)</span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 5, height: 5, borderRadius: 3, background: "#2C2C2C" }} />
          <span style={{ color: "#2C2C2C", fontSize: 12, fontFamily: "sans-serif", letterSpacing: "0.04em" }}>
            gpt_markdown · MIT License · Dart &amp; Flutter
          </span>
        </div>

      </div>
    ),
    { ...size }
  );
}
