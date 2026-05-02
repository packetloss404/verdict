import React from "react";
import { verdictColor } from "@/utils/styleHelpers";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";

export const StatusPill = ({ label, size }) => {
  const c = verdictColor(label);
  const isLg = size === "lg";
  return (
    <span
      style={{
        color: c.text,
        background: c.bg,
        border: `1px solid ${c.border}`,
        fontFamily: MONO,
        display: "inline-flex",
        alignItems: "center",
        gap: isLg ? 7 : 5,
        padding: isLg ? "6px 14px" : "4px 10px",
        borderRadius: 4,
        fontSize: isLg ? 11 : 10,
        fontWeight: isLg ? 700 : 600,
        letterSpacing: "0.06em",
      }}
    >
      <span
        style={{
          width: isLg ? 7 : 5,
          height: isLg ? 7 : 5,
          borderRadius: "50%",
          background: c.dot,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  );
};
