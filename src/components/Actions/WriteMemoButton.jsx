import React from "react";
import { FileText } from "lucide-react";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

export const WriteMemoButton = ({ onClick }) => (
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
        PASS 3 · FINAL CALL
      </span>
      <div style={{ flex: 1, height: 1, background: "#E8E0D0" }} />
    </div>

    <button
      onClick={onClick}
      style={{
        width: "100%",
        background: "#FFFFFF",
        border: "1.5px solid #E8D8A0",
        borderRadius: 6,
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        cursor: "pointer",
        transition: "all 0.15s",
        boxShadow: "0 2px 12px #C4912A07",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#FFFDF5";
        e.currentTarget.style.borderColor = "#D4B87A";
        e.currentTarget.style.boxShadow = "0 4px 20px #C4912A12";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#FFFFFF";
        e.currentTarget.style.borderColor = "#E8D8A0";
        e.currentTarget.style.boxShadow = "0 2px 12px #C4912A07";
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          flexShrink: 0,
          background: "#FFF8EC",
          border: "1px solid #E8D8A0",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FileText style={{ width: 15, height: 15, color: "#7A4F00" }} />
      </div>
      <div style={{ textAlign: "left", flex: 1 }}>
        <p
          style={{
            color: "#7A4F00",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            lineHeight: 1,
            marginBottom: 5,
            fontFamily: MONO,
          }}
        >
          WRITE THE FINAL MEMO
        </p>
        <p
          style={{
            color: "#B09060",
            fontSize: 12,
            fontFamily: SERIF,
            fontStyle: "italic",
          }}
        >
          Compress all passes into a binding decision
        </p>
      </div>
      <FileText
        style={{ width: 14, height: 14, color: "#D4B870", flexShrink: 0 }}
      />
    </button>
  </div>
);
