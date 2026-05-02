import React from "react";
import { FileCheck, ChevronRight } from "lucide-react";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

export const ViewReportButton = ({ onClick }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
      paddingTop: 8,
    }}
  >
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
        PASS 4 · FINAL DIRECTIVE
      </span>
      <div style={{ flex: 1, height: 1, background: "#E8E0D0" }} />
    </div>

    <button
      onClick={onClick}
      style={{
        width: "100%",
        background: "#FFFFFF",
        border: "1.5px solid #C8D8F0",
        borderRadius: 6,
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        cursor: "pointer",
        transition: "all 0.15s",
        boxShadow: "0 2px 12px #1C3A6B07",
        fontFamily: MONO,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#F5F8FF";
        e.currentTarget.style.borderColor = "#9AB8E0";
        e.currentTarget.style.boxShadow = "0 4px 20px #1C3A6B10";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#FFFFFF";
        e.currentTarget.style.borderColor = "#C8D8F0";
        e.currentTarget.style.boxShadow = "0 2px 12px #1C3A6B07";
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          flexShrink: 0,
          background: "#F0F5FF",
          border: "1px solid #C8D8F0",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FileCheck style={{ width: 15, height: 15, color: "#1C3A6B" }} />
      </div>
      <div style={{ textAlign: "left", flex: 1 }}>
        <p
          style={{
            color: "#1C3A6B",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            lineHeight: 1,
            marginBottom: 5,
          }}
        >
          GENERATE FINAL DIRECTIVE
        </p>
        <p
          style={{
            color: "#6A8AB8",
            fontSize: 12,
            fontFamily: SERIF,
            fontStyle: "italic",
          }}
        >
          All passes compiled · Verdict locked
        </p>
      </div>
      <ChevronRight
        style={{ width: 14, height: 14, color: "#8AAAD0", flexShrink: 0 }}
      />
    </button>
  </div>
);
