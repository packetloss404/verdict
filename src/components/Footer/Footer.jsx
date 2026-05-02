import React from "react";

const SERIF = "Georgia, 'Times New Roman', serif";
const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";

export const Footer = ({ activeTab, setActiveTab }) => {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(252,250,247,0.96)",
        borderTop: "1px solid #E2D8CC",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "0 32px",
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Wordmark */}
      <span
        style={{
          fontFamily: SERIF,
          fontSize: 17,
          fontWeight: 900,
          letterSpacing: "0.14em",
          color: "#0F1828",
          userSelect: "none",
        }}
      >
        VERDICT
      </span>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2 }}>
        {[
          { id: "new", label: "EVALUATE" },
          { id: "history", label: "HISTORY" },
        ].map(({ id, label }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab && setActiveTab(id)}
              style={{
                background: active ? "#0F1828" : "transparent",
                border: `1px solid ${active ? "#0F1828" : "#DDD5C8"}`,
                color: active ? "#FFFFFF" : "#9A8A78",
                borderRadius: 3,
                padding: "7px 18px",
                fontSize: 9,
                letterSpacing: "0.3em",
                fontWeight: 700,
                fontFamily: MONO,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Right — subtle tagline */}
      <span
        style={{
          color: "#C8BCA8",
          fontSize: 9,
          fontFamily: MONO,
          letterSpacing: "0.22em",
        }}
      >
        NO FLUFF. JUST THE DECISION.
      </span>
    </footer>
  );
};
