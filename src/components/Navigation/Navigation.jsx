import React from "react";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

export const Navigation = ({ activeTab, setActiveTab }) => {
  return (
    <nav
      className="sticky top-0 z-40"
      style={{
        background: "rgba(255,255,255,0.97)",
        borderBottom: "1px solid #E8E2D8",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <span
          style={{
            fontFamily: SERIF,
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "0.12em",
            color: "#0F1828",
            userSelect: "none",
          }}
        >
          VERDICT
        </span>

        {/* Divider dot */}
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#C4912A",
            margin: "0 auto",
          }}
        />

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4 }}>
          {[
            { id: "new", label: "EVALUATE" },
            { id: "history", label: "HISTORY" },
          ].map(({ id, label }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  background: active ? "#0F1828" : "transparent",
                  border: `1px solid ${active ? "#0F1828" : "#DDD5C8"}`,
                  color: active ? "#FFFFFF" : "#9A8A78",
                  borderRadius: 4,
                  padding: "6px 18px",
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
      </div>
    </nav>
  );
};
