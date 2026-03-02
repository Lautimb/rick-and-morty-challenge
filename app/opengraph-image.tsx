import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rick & Morty Explorer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a1a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          padding: "0 100px",
          fontFamily: "sans-serif",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="200"
          height="200"
        >
          <circle cx="50" cy="50" r="48" fill="#0a1a0a" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="#00ff41" strokeWidth="3" opacity="0.4" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#00ff41" strokeWidth="2.5" opacity="0.55" />
          <circle cx="50" cy="50" r="34" fill="none" stroke="#00e838" strokeWidth="3" opacity="0.7" />
          <circle cx="50" cy="50" r="27" fill="none" stroke="#00d130" strokeWidth="3.5" opacity="0.85" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#00c428" strokeWidth="4" opacity="0.95" />
          <g stroke="#00ff41" strokeLinecap="round" fill="none">
            <path d="M50,50 Q58,36 66,30" strokeWidth="2.5" opacity="0.8" />
            <path d="M50,50 Q64,54 70,62" strokeWidth="2.5" opacity="0.8" />
            <path d="M50,50 Q42,64 34,70" strokeWidth="2.5" opacity="0.8" />
            <path d="M50,50 Q36,46 30,38" strokeWidth="2.5" opacity="0.8" />
          </g>
          <circle cx="50" cy="50" r="12" fill="#00ff41" opacity="0.15" />
          <circle cx="50" cy="50" r="7" fill="#00ff41" opacity="0.5" />
          <circle cx="50" cy="50" r="3.5" fill="#afffaf" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#f1f5f9",
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            Rick &amp; Morty
          </span>
          <span
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#a855f7",
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            Explorer
          </span>
          <span
            style={{
              fontSize: 26,
              color: "#6b7280",
              marginTop: 16,
              maxWidth: 520,
            }}
          >
            Seleccioná dos personajes y descubrí qué episodios comparten entre sí.
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
