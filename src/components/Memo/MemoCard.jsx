import React from "react";
import { memoDecisionStyle, convictionStyle } from "@/utils/styleHelpers";
import {
  FileText,
  Target,
  Skull,
  Lightbulb,
  Zap,
  Clock,
  Sparkles,
} from "lucide-react";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

export const MemoCard = ({ data }) => {
  const ds = memoDecisionStyle(data.decision);
  const cs = convictionStyle(data.conviction);

  const rows = [
    {
      icon: Target,
      label: "THE BET",
      value: data.the_bet,
      accent: "#1C3A6B",
      bg: "#F0F5FF",
      border: "#C8D8F0",
    },
    {
      icon: Skull,
      label: "THE RISK",
      value: data.the_risk,
      accent: "#8B1A2A",
      bg: "#FFF0F2",
      border: "#F0C8CE",
    },
    {
      icon: Lightbulb,
      label: "NON-OBVIOUS INSIGHT",
      value: data.non_obvious_insight,
      accent: "#7A4F00",
      bg: "#FFF8EC",
      border: "#F0DBA8",
    },
    {
      icon: Zap,
      label: "NEXT MOVE (DO THIS NOW)",
      value: data.next_move,
      accent: "#145236",
      bg: "#F0FAF5",
      border: "#B0DCC8",
    },
    {
      icon: Clock,
      label: "TIME HORIZON",
      value: data.time_horizon,
      accent: "#5030A0",
      bg: "#F5F0FC",
      border: "#D8C8F0",
    },
  ];

  return (
    <div
      className="memo-card"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAE4DC",
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: "0 4px 32px #00000009",
      }}
    >
      {/* Navy header */}
      <div
        style={{
          background: "#0F1828",
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 34,
              height: 34,
              background: "#1C2B4A",
              border: "1px solid #2A3A5A",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FileText style={{ width: 14, height: 14, color: "#8AAAD0" }} />
          </div>
          <div>
            <p
              style={{
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: "0.08em",
                fontFamily: MONO,
              }}
            >
              INVESTMENT DECISION MEMO
            </p>
            <p
              style={{
                color: "#5A7AAA",
                fontSize: 9,
                letterSpacing: "0.2em",
                fontFamily: MONO,
              }}
            >
              COMPRESSED FROM ALL PRIOR ANALYSIS · FINAL CALL
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: `${cs.color}18`,
            border: `1px solid ${cs.color}40`,
            padding: "5px 12px",
            borderRadius: 4,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: cs.color,
              display: "inline-block",
            }}
          />
          <span
            style={{
              color: cs.color,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.18em",
              fontFamily: MONO,
            }}
          >
            {data.conviction} CONVICTION
          </span>
        </div>
      </div>

      {/* Decision hero */}
      <div
        style={{
          padding: "32px",
          background: ds.bg,
          borderBottom: `1px solid ${ds.border}`,
        }}
      >
        <p
          style={{
            color: ds.label,
            fontSize: 9,
            letterSpacing: "0.3em",
            fontWeight: 700,
            marginBottom: 14,
            fontFamily: MONO,
          }}
        >
          DECISION
        </p>
        <p
          style={{
            color: ds.label,
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            fontFamily: MONO,
          }}
        >
          {data.decision}
        </p>
        <p
          style={{
            color: ds.text,
            fontSize: 14,
            lineHeight: 1.85,
            marginTop: 18,
            maxWidth: 640,
            fontFamily: SERIF,
          }}
        >
          {data.why_wins_or_loses}
        </p>
      </div>

      {/* Detail rows */}
      <div>
        {rows.map(({ icon: Icon, label, value, accent, bg, border }, idx) => (
          <div
            key={label}
            style={{
              padding: "20px 28px",
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              borderBottom:
                idx < rows.length - 1 ? "1px solid #F0EAE0" : "none",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              <Icon style={{ color: accent, width: 12, height: 12 }} />
            </div>
            <div>
              <p
                style={{
                  color: "#A0907A",
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  fontWeight: 700,
                  marginBottom: 6,
                  fontFamily: MONO,
                }}
              >
                {label}
              </p>
              <p
                style={{
                  color: "#3A3040",
                  fontSize: 13,
                  lineHeight: 1.75,
                  fontFamily: SERIF,
                }}
              >
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Final word footer */}
      <div
        style={{
          padding: "24px 28px",
          background: "#FFFAF0",
          borderTop: "1px solid #E8D8A0",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <Sparkles
            style={{
              width: 14,
              height: 14,
              color: "#C4912A",
              flexShrink: 0,
              marginTop: 3,
            }}
          />
          <div>
            <p
              style={{
                color: "#A0907A",
                fontSize: 9,
                letterSpacing: "0.3em",
                fontWeight: 700,
                marginBottom: 10,
                fontFamily: MONO,
              }}
            >
              FINAL WORD
            </p>
            <p
              style={{
                color: "#0F1828",
                fontSize: 15,
                fontWeight: 700,
                lineHeight: 1.65,
                fontStyle: "italic",
                fontFamily: SERIF,
              }}
            >
              &ldquo;{data.final_word}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
