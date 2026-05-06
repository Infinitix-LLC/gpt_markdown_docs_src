import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0A0A0A",
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 0,
          }}>
          <span
            style={{
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 800,
              fontFamily: "monospace",
              letterSpacing: "-1px",
              lineHeight: 1,
            }}>
            M
          </span>
          <span
            style={{
              color: "#888888",
              fontSize: 9,
              fontWeight: 700,
              fontFamily: "monospace",
              lineHeight: 1,
              marginTop: 2,
            }}>
            ↓
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
