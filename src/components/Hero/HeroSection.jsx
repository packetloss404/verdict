import React from "react";
import { TrendingUp, Swords, ShoppingCart, Wrench, Scale } from "lucide-react";

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Inter','Helvetica Neue',sans-serif";
const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";

const PERSONAS = [
  {
    label: "Investor",
    Icon: TrendingUp,
    color: "#1C3A6B",
    bg: "#F0F5FF",
    border: "#C8D8F0",
  },
  {
    label: "Competitor",
    Icon: Swords,
    color: "#8B1A2A",
    bg: "#FFF0F2",
    border: "#F0C8CE",
  },
  {
    label: "Customer",
    Icon: ShoppingCart,
    color: "#7A4F00",
    bg: "#FFF8EC",
    border: "#F0DBA8",
  },
  {
    label: "Builder",
    Icon: Wrench,
    color: "#145236",
    bg: "#F0FAF5",
    border: "#B0DCC8",
  },
];

export const HeroSection = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        paddingBottom: 48,
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <div style={{ width: 28, height: 1, background: "#C4912A" }} />
        <span
          style={{
            color: "#C4912A",
            fontSize: 9,
            letterSpacing: "0.42em",
            fontFamily: MONO,
            fontWeight: 700,
          }}
        >
          AI EVALUATION ENGINE
        </span>
        <div style={{ width: 28, height: 1, background: "#C4912A" }} />
      </div>

      {/* VERDICT wordmark — keep the font the user loves */}
      <h1
        style={{
          fontFamily: SERIF,
          fontSize: "clamp(64px, 14vw, 108px)",
          fontWeight: 900,
          letterSpacing: "0.1em",
          color: "#0F1828",
          margin: "0 0 4px",
          lineHeight: 1,
        }}
      >
        VERDICT
      </h1>

      {/* Thin gold rule */}
      <div
        style={{
          width: 60,
          height: 2,
          background: "#C4912A",
          margin: "20px auto 20px",
        }}
      />

      {/* Tagline */}
      <p
        style={{
          fontFamily: SANS,
          color: "#6B6680",
          fontSize: 15,
          lineHeight: 1.7,
          maxWidth: 440,
          margin: "0 0 40px",
          fontWeight: 400,
        }}
      >
        Four adversarial AI counsel stress-test your idea from every angle. One
        judge delivers the final ruling.{" "}
        <span style={{ color: "#8B1A2A", fontStyle: "italic" }}>
          No fluff. No mercy.
        </span>
      </p>

      {/* Persona row */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 12,
        }}
      >
        {PERSONAS.map(({ label, Icon, color, bg, border }) => (
          <div
            key={label}
            style={{
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: 4,
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon style={{ color, width: 12, height: 12 }} />
            <span
              style={{
                color,
                fontSize: 11,
                fontFamily: SANS,
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              {label}
            </span>
          </div>
        ))}

        {/* Judge */}
        <div
          style={{
            background: "#FFFAF0",
            border: "1px solid #D4B87A",
            borderRadius: 4,
            padding: "8px 18px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Scale style={{ color: "#C4912A", width: 12, height: 12 }} />
          <span
            style={{
              color: "#7A5100",
              fontSize: 11,
              fontFamily: SANS,
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            The Judge
          </span>
        </div>
      </div>

      {/* Outcomes */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 8,
        }}
      >
        <span
          style={{
            color: "#A89880",
            fontSize: 10,
            fontFamily: MONO,
            letterSpacing: "0.2em",
          }}
        >
          POSSIBLE VERDICT:
        </span>
        {[
          {
            sym: "✕",
            label: "Failed",
            color: "#8B1A2A",
            bg: "#FFF0F2",
            border: "#F0C8CE",
          },
          {
            sym: "⚠",
            label: "Unstable",
            color: "#7A4F00",
            bg: "#FFF8EC",
            border: "#F0DBA8",
          },
          {
            sym: "✓",
            label: "Survived",
            color: "#145236",
            bg: "#F0FAF5",
            border: "#B0DCC8",
          },
        ].map(({ sym, label, color, bg, border }) => (
          <div
            key={label}
            style={{
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: 4,
              padding: "5px 12px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ color, fontSize: 10, fontWeight: 700 }}>{sym}</span>
            <span
              style={{ color, fontSize: 10, fontFamily: SANS, fontWeight: 600 }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
