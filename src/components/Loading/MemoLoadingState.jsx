import React from "react";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";
const TAGS = [
  "DECISION",
  "THE BET",
  "THE RISK",
  "NON-OBVIOUS INSIGHT",
  "NEXT MOVE",
  "FINAL WORD",
];

export const MemoLoadingState = () => (
  <div
    style={{
      background: "#FFFFFF",
      border: "1px solid #E8D8A0",
      borderRadius: 6,
      padding: "40px 32px",
      fontFamily: MONO,
      boxShadow: "0 4px 24px #C4912A08",
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
        PASS 3 · FINAL MEMO
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
          FINAL CALL
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
          Writing the final memo
        </p>
        <p style={{ color: "#A0907A", fontSize: 9, letterSpacing: "0.22em" }}>
          COMPILING ALL ANALYSIS INTO A BINDING DECISION
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
            background: "#FFF8EC",
            border: "1px solid #E8D8A0",
            borderRadius: 4,
            padding: "6px 12px",
          }}
        >
          <span
            style={{
              color: "#7A4F00",
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
