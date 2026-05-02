import React from "react";
import { ChevronsDown } from "lucide-react";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

export const GoDeeperButton = ({ onClick }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
      paddingTop: 8,
    }}
  >
    {/* Section divider */}
    <div
      style={{ display: "flex", alignItems: "center", gap: 14, width: "100%" }}
    >
      <div style={{ flex: 1, height: 1, background: "#E8E0D0" }} />
      <span
        style={{
          color: "#A0907A",
          fontSize: 9,
          letterSpacing: "0.3em",
          fontFamily: MONO,
          whiteSpace: "nowrap",
        }}
      >
        PASS 2 · NO MERCY
      </span>
      <div style={{ flex: 1, height: 1, background: "#E8E0D0" }} />
    </div>

    <button
      onClick={onClick}
      style={{
        width: "100%",
        background: "#FFFFFF",
        border: "1.5px solid #F0C8CE",
        borderRadius: 6,
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        cursor: "pointer",
        transition: "all 0.15s",
        boxShadow: "0 2px 12px #8B1A2A07",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#FFF5F7";
        e.currentTarget.style.borderColor = "#E8A0A8";
        e.currentTarget.style.boxShadow = "0 4px 20px #8B1A2A10";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#FFFFFF";
        e.currentTarget.style.borderColor = "#F0C8CE";
        e.currentTarget.style.boxShadow = "0 2px 12px #8B1A2A07";
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          flexShrink: 0,
          background: "#FFF0F2",
          border: "1px solid #F0C8CE",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ChevronsDown style={{ width: 15, height: 15, color: "#8B1A2A" }} />
      </div>
      <div style={{ textAlign: "left", flex: 1 }}>
        <p
          style={{
            color: "#8B1A2A",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            lineHeight: 1,
            marginBottom: 5,
            fontFamily: MONO,
          }}
        >
          GO DEEPER · NO MERCY
        </p>
        <p
          style={{
            color: "#B08090",
            fontSize: 12,
            fontFamily: SERIF,
            fontStyle: "italic",
          }}
        >
          Expose what the first pass missed
        </p>
      </div>
      <ChevronsDown
        style={{ width: 14, height: 14, color: "#D0A0A8", flexShrink: 0 }}
      />
    </button>
  </div>
);
