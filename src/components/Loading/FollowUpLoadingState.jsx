import React from "react";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";
const TAGS = [
  "BLIND SPOTS",
  "FAILURE CASCADE",
  "REFRAME",
  "FINAL CALL",
  "80/20 LEVER",
  "PRESSURE TEST",
];

export const FollowUpLoadingState = () => (
  <div
    style={{
      background: "#FFFFFF",
      border: "1px solid #F0C8CE",
      borderRadius: 6,
      padding: "40px 32px",
      fontFamily: MONO,
      boxShadow: "0 4px 24px #8B1A2A08",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 36,
      }}
    >
      <span style={{ color: "#A0907A", fontSize: 9, letterSpacing: "0.3em" }}>
        PASS 2 · DEEPER ANALYSIS
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#8B1A2A",
            animation: "pulse 1.8s ease-in-out infinite",
          }}
        />
        <span
          style={{ color: "#8B1A2A", fontSize: 9, letterSpacing: "0.22em" }}
        >
          NO MERCY
        </span>
      </div>
    </div>

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
            borderTopColor: "#8B1A2A",
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
          Exposing what was missed
        </p>
        <p style={{ color: "#A0907A", fontSize: 9, letterSpacing: "0.22em" }}>
          PRESSURE TESTING EVERY ASSUMPTION
        </p>
      </div>
    </div>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: "center",
      }}
    >
      {TAGS.map((tag) => (
        <div
          key={tag}
          className="pulse-item"
          style={{
            background: "#FFF0F2",
            border: "1px solid #F0C8CE",
            borderRadius: 4,
            padding: "6px 12px",
          }}
        >
          <span
            style={{
              color: "#9A3040",
              fontSize: 9,
              letterSpacing: "0.2em",
              fontWeight: 700,
            }}
          >
            {tag}
          </span>
        </div>
      ))}
    </div>
  </div>
);
