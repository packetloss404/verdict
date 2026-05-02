import React from "react";
import { StatusPill } from "@/components/StatusPill/StatusPill";
import { ChevronRight } from "lucide-react";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

export const HistoryItem = ({ item }) => {
  const g = item.gauntlet_result
    ? typeof item.gauntlet_result === "string"
      ? JSON.parse(item.gauntlet_result)
      : item.gauntlet_result
    : null;
  const finalVerdict = g?.judge?.final_verdict || item.verdict;
  const gauntletResult = g?.judge?.gauntlet_result || null;

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAE4DC",
        borderRadius: 6,
        padding: "18px 22px",
        fontFamily: MONO,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.15s",
        cursor: "default",
        boxShadow: "0 1px 8px #00000005",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#D4B87A";
        e.currentTarget.style.boxShadow = "0 4px 20px #C4912A0C";
        e.currentTarget.style.background = "#FFFDF8";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#EAE4DC";
        e.currentTarget.style.boxShadow = "0 1px 8px #00000005";
        e.currentTarget.style.background = "#FFFFFF";
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <p
          style={{
            color: "#2A2040",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: SERIF,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: 420,
          }}
        >
          {item.idea_text.substring(0, 90)}
          {item.idea_text.length > 90 ? "..." : ""}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {gauntletResult && <StatusPill label={gauntletResult} />}
          <StatusPill label={finalVerdict} />
          <span
            style={{
              color: "#B8A888",
              fontSize: 9,
              letterSpacing: "0.18em",
              fontFamily: MONO,
            }}
          >
            {new Date(item.created_at)
              .toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              .toUpperCase()}
          </span>
        </div>
      </div>
      <ChevronRight
        style={{
          width: 15,
          height: 15,
          color: "#D0C8B8",
          flexShrink: 0,
          marginLeft: 16,
        }}
      />
    </div>
  );
};
