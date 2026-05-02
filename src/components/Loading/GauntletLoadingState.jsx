import React from "react";
import { TrendingUp, Swords, ShoppingCart, Wrench } from "lucide-react";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

const PERSONAS = [
  {
    label: "INVESTOR",
    Icon: TrendingUp,
    color: "#1C3A6B",
    bg: "#F0F5FF",
    border: "#C8D8F0",
  },
  {
    label: "COMPETITOR",
    Icon: Swords,
    color: "#8B1A2A",
    bg: "#FFF0F2",
    border: "#F0C8CE",
  },
  {
    label: "CUSTOMER",
    Icon: ShoppingCart,
    color: "#7A4F00",
    bg: "#FFF8EC",
    border: "#F0DBA8",
  },
  {
    label: "BUILDER",
    Icon: Wrench,
    color: "#145236",
    bg: "#F0FAF5",
    border: "#B0DCC8",
  },
];

export const GauntletLoadingState = () => (
  <div
    style={{
      background: "#FFFFFF",
      border: "1px solid #EAE4DC",
      borderRadius: 6,
      padding: "40px 32px",
      fontFamily: MONO,
      boxShadow: "0 4px 24px #00000008",
    }}
  >
    {/* Top bar */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 36,
      }}
    >
      <span style={{ color: "#A0907A", fontSize: 9, letterSpacing: "0.3em" }}>
        EVALUATION IN PROGRESS
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#C4912A",
            animation: "pulse 1.8s ease-in-out infinite",
          }}
        />
        <span
          style={{ color: "#C4912A", fontSize: 9, letterSpacing: "0.22em" }}
        >
          DELIBERATING
        </span>
      </div>
    </div>

    {/* Spinner + label */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        paddingBottom: 36,
      }}
    >
      <div style={{ position: "relative", width: 48, height: 48 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid #F0EAE0",
          }}
        />
        <div
          className="gauntlet-spin"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid transparent",
            borderTopColor: "#C4912A",
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            color: "#0F1828",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: SERIF,
            marginBottom: 6,
          }}
        >
          Court is deliberating
        </p>
        <p style={{ color: "#A0907A", fontSize: 9, letterSpacing: "0.22em" }}>
          FOUR COUNSEL ATTACKING YOUR IDEA SIMULTANEOUSLY
        </p>
      </div>
    </div>

    {/* Persona tiles */}
    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}
      className="sm:grid-cols-4"
    >
      {PERSONAS.map(({ label, Icon, color, bg, border }) => (
        <div
          key={label}
          className="pulse-item"
          style={{
            background: bg,
            border: `1px solid ${border}`,
            borderRadius: 4,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon style={{ color, width: 11, height: 11 }} />
          <span
            style={{
              color,
              fontSize: 9,
              letterSpacing: "0.15em",
              fontWeight: 700,
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  </div>
);
