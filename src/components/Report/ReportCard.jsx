import React from "react";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

const VERDICT_CONFIG = {
  Proceed: {
    color: "#145236",
    bg: "#F0FAF5",
    border: "#B0DCC8",
    label: "PROCEED",
  },
  Pivot: { color: "#7A4F00", bg: "#FFF8EC", border: "#F0DBA8", label: "PIVOT" },
  Kill: { color: "#8B1A2A", bg: "#FFF0F2", border: "#F0C8CE", label: "KILL" },
};

const STATUS_CONFIG = {
  Survived: { color: "#145236", label: "IDEA SURVIVED" },
  "Survived With Damage": { color: "#7A4F00", label: "IDEA UNSTABLE" },
  Failed: { color: "#8B1A2A", label: "IDEA FAILED" },
};

const SectionLabel = ({ children }) => (
  <p
    style={{
      color: "#A0907A",
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: "0.3em",
      marginBottom: 10,
      fontFamily: MONO,
    }}
  >
    {children}
  </p>
);

const HRule = () => <div style={{ borderTop: "1px solid #F0EAE0" }} />;

export const ReportCard = ({ memo, gauntlet, followup, idea }) => {
  const verdict = gauntlet?.judge?.final_verdict || "Pivot";
  const result = gauntlet?.judge?.gauntlet_result || "Failed";
  const confidence = gauntlet?.judge?.confidence ?? 0;
  const risks = gauntlet?.judge?.compound_risks || [];

  const vc = VERDICT_CONFIG[verdict] || VERDICT_CONFIG.Pivot;
  const sc = STATUS_CONFIG[result] || STATUS_CONFIG.Failed;
  const ideaLine = idea?.length > 130 ? idea.substring(0, 127) + "…" : idea;

  return (
    <div
      className="report-card"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAE4DC",
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: "0 4px 32px #00000009",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#0F1828",
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span
          style={{
            color: "#5A7AAA",
            fontSize: 9,
            letterSpacing: "0.25em",
            fontFamily: MONO,
          }}
        >
          VERDICT · FINAL DIRECTIVE
        </span>
        <span
          style={{
            color: "#2A4060",
            fontSize: 9,
            letterSpacing: "0.2em",
            fontFamily: MONO,
          }}
        >
          ALL PASSES COMPILED
        </span>
      </div>

      <div
        style={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Idea */}
        <div>
          <SectionLabel>IDEA ENTERED</SectionLabel>
          <p
            style={{
              color: "#4A4060",
              fontSize: 14,
              lineHeight: 1.75,
              fontFamily: SERIF,
              fontStyle: "italic",
            }}
          >
            &ldquo;{ideaLine}&rdquo;
          </p>
        </div>

        <HRule />

        {/* Verdict */}
        <div>
          <SectionLabel>FINAL VERDICT</SectionLabel>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                color: vc.color,
                fontSize: 64,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                fontFamily: SERIF,
              }}
            >
              {vc.label}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 14,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 5,
                background: "#F0EAE0",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${confidence}%`,
                  height: "100%",
                  borderRadius: 3,
                  background: vc.color,
                  transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>
            <span
              style={{
                color: vc.color,
                fontSize: 10,
                letterSpacing: "0.15em",
                whiteSpace: "nowrap",
                fontFamily: MONO,
              }}
            >
              {confidence}% CONFIDENCE
            </span>
          </div>
        </div>

        <HRule />

        {/* Core truth */}
        <div>
          <SectionLabel>CORE TRUTH</SectionLabel>
          <p
            style={{
              color: "#2A2040",
              fontSize: 14,
              lineHeight: 1.8,
              fontWeight: 600,
              fontFamily: SERIF,
            }}
          >
            {memo.why_wins_or_loses}
          </p>
        </div>

        {/* Failure path */}
        {followup?.failure_acceleration && (
          <div>
            <SectionLabel>FAILURE PATH</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p
                style={{
                  color: "#8B1A2A",
                  fontSize: 13,
                  lineHeight: 1.65,
                  fontFamily: SERIF,
                }}
              >
                <span style={{ color: "#D0A0A8", marginRight: 10 }}>—</span>
                {followup.failure_acceleration.first_crack}
              </p>
              <p
                style={{
                  color: "#A03848",
                  fontSize: 13,
                  lineHeight: 1.65,
                  fontFamily: SERIF,
                }}
              >
                <span style={{ color: "#D8B8C0", marginRight: 10 }}>—</span>
                {followup.failure_acceleration.cascade_effect}
              </p>
            </div>
          </div>
        )}

        {/* Survival condition */}
        <div>
          <SectionLabel>SURVIVAL CONDITION</SectionLabel>
          <div
            style={{
              background: "#F0F5FF",
              border: "1px solid #C8D8F0",
              borderRadius: 4,
              padding: "16px 20px",
            }}
          >
            <p
              style={{
                color: "#1C3040",
                fontSize: 13,
                lineHeight: 1.7,
                fontFamily: SERIF,
              }}
            >
              {gauntlet?.judge?.fix_first}
            </p>
          </div>
        </div>

        <HRule />

        <div>
          <SectionLabel>THE BET</SectionLabel>
          <p
            style={{
              color: "#3A4060",
              fontSize: 13,
              lineHeight: 1.75,
              fontFamily: SERIF,
            }}
          >
            {memo.the_bet}
          </p>
        </div>

        <div>
          <SectionLabel>TIME WINDOW</SectionLabel>
          <p
            style={{
              color: "#3A4060",
              fontSize: 13,
              lineHeight: 1.65,
              fontFamily: SERIF,
            }}
          >
            {memo.time_horizon}
          </p>
        </div>

        <HRule />

        {/* Critical risks */}
        {risks.length > 0 && (
          <div>
            <SectionLabel>CRITICAL RISKS</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {risks.map((risk, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
                >
                  <span
                    style={{
                      color: "#A0907A",
                      fontSize: 9,
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: 4,
                      fontFamily: MONO,
                    }}
                  >
                    [{i + 1}]
                  </span>
                  <p
                    style={{
                      color: "#4A3050",
                      fontSize: 13,
                      lineHeight: 1.65,
                      fontFamily: SERIF,
                    }}
                  >
                    {risk}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <HRule />

        {/* Kill shot */}
        <div>
          <SectionLabel>KILL SHOT</SectionLabel>
          <div
            style={{
              background: "#FFF0F2",
              border: "1px solid #F0C8CE",
              borderRadius: 4,
              padding: "20px 22px",
            }}
          >
            <p
              style={{
                color: "#8B1A2A",
                fontSize: 14,
                fontWeight: 700,
                lineHeight: 1.65,
                fontStyle: "italic",
                fontFamily: SERIF,
              }}
            >
              &ldquo;{memo.final_word}&rdquo;
            </p>
          </div>
        </div>

        {/* Final directive */}
        <div>
          <SectionLabel>FINAL DIRECTIVE</SectionLabel>
          <div
            style={{
              background: vc.bg,
              border: `1px solid ${vc.border}`,
              borderRadius: 4,
              padding: "20px 22px",
            }}
          >
            <p
              style={{
                color: vc.color,
                fontSize: 14,
                fontWeight: 700,
                lineHeight: 1.8,
                fontFamily: SERIF,
              }}
            >
              {memo.next_move}
            </p>
          </div>
        </div>
      </div>

      {/* Status footer */}
      <div
        style={{
          background: vc.bg,
          borderTop: `2px solid ${vc.border}`,
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            color: "#A0907A",
            fontSize: 9,
            letterSpacing: "0.28em",
            fontFamily: MONO,
          }}
        >
          SYSTEM STATUS:
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: sc.color,
              display: "inline-block",
            }}
          />
          <span
            style={{
              color: sc.color,
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.2em",
              fontFamily: MONO,
            }}
          >
            [ {sc.label} ]
          </span>
        </div>
        <span
          style={{
            color: "#C8B898",
            fontSize: 9,
            letterSpacing: 1,
            fontFamily: MONO,
          }}
        >
          VERDICT LOCKED
        </span>
      </div>
    </div>
  );
};
