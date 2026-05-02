import React from "react";
import { verdictColor } from "@/utils/styleHelpers";
import { Scale, Target, Zap, Lightbulb, Skull } from "lucide-react";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

export const JudgeCard = ({ data }) => {
  const rc = verdictColor(data.gauntlet_result);
  const vc = verdictColor(data.final_verdict);

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1.5px solid #D4B87A",
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: "0 4px 24px #C4912A0D",
      }}
    >
      {/* Gold header */}
      <div
        style={{
          background: "#FFFAF0",
          borderBottom: "1px solid #E8D8A8",
          padding: "18px 28px",
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
              background: "#FFFFFF",
              border: "1px solid #E0C880",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Scale style={{ width: 15, height: 15, color: "#C4912A" }} />
          </div>
          <div>
            <p
              style={{
                fontWeight: 700,
                color: "#0F1828",
                fontSize: 14,
                fontFamily: SERIF,
              }}
            >
              The Gauntlet
            </p>
            <p
              style={{
                fontSize: 9,
                color: "#9A8060",
                letterSpacing: "0.2em",
                fontFamily: MONO,
              }}
            >
              FINAL SYNTHESIS · JUDGE'S RULING
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              color: rc.text,
              background: rc.bg,
              border: `1px solid ${rc.border}`,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 4,
              fontSize: 10,
              fontWeight: 600,
              fontFamily: MONO,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: rc.dot,
                display: "inline-block",
              }}
            />
            {data.gauntlet_result}
          </span>
          <span
            style={{
              color: vc.text,
              background: vc.bg,
              border: `1px solid ${vc.border}`,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: MONO,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: vc.dot,
                display: "inline-block",
              }}
            />
            {data.final_verdict}
          </span>
        </div>
      </div>

      <div
        style={{
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Confidence bar */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.3em",
                color: "#A0907A",
                fontFamily: MONO,
              }}
            >
              CONFIDENCE
            </p>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#0F1828",
                fontFamily: MONO,
              }}
            >
              {data.confidence}%
            </p>
          </div>
          <div
            style={{
              height: 5,
              background: "#F0EAE0",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${data.confidence}%`,
                height: "100%",
                borderRadius: 3,
                background:
                  data.confidence >= 60
                    ? "#145236"
                    : data.confidence >= 35
                      ? "#7A4F00"
                      : "#8B1A2A",
                transition: "width 0.7s ease",
              }}
            />
          </div>
        </div>

        {/* Pattern */}
        <div
          style={{
            background: "#FAFAF8",
            border: "1px solid #EAE4DC",
            borderRadius: 4,
            padding: "16px 20px",
          }}
        >
          <p
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: "#A0907A",
              fontFamily: MONO,
              marginBottom: 10,
            }}
          >
            THE PATTERN
          </p>
          <p
            style={{
              fontSize: 14,
              color: "#2A2040",
              lineHeight: 1.8,
              fontStyle: "italic",
              fontFamily: SERIF,
            }}
          >
            &ldquo;{data.pattern}&rdquo;
          </p>
        </div>

        {/* Compound risks */}
        <div>
          <p
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: "#A0907A",
              fontFamily: MONO,
              marginBottom: 12,
            }}
          >
            TOP 3 COMPOUND RISKS
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.compound_risks.map((risk, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  background: "#FFF8EC",
                  borderLeft: "2px solid #D4B87A",
                  padding: "12px 16px",
                  borderRadius: "0 4px 4px 0",
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#A0907A",
                    marginTop: 3,
                    width: 14,
                    flexShrink: 0,
                    fontFamily: MONO,
                  }}
                >
                  {i + 1}
                </span>
                <p
                  style={{
                    fontSize: 13,
                    color: "#3A3040",
                    lineHeight: 1.7,
                    fontFamily: SERIF,
                  }}
                >
                  {risk}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Four boxes */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div
            style={{
              background: "#F0F5FF",
              border: "1px solid #C8D8F0",
              borderRadius: 4,
              padding: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 10,
              }}
            >
              <Target style={{ width: 12, height: 12, color: "#1C3A6B" }} />
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "#4A6A9A",
                  fontFamily: MONO,
                }}
              >
                FIX FIRST
              </p>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#1C3040",
                lineHeight: 1.7,
                fontFamily: SERIF,
              }}
            >
              {data.fix_first}
            </p>
          </div>

          <div
            style={{
              background: "#FFF8EC",
              border: "1px solid #F0DBA8",
              borderRadius: 4,
              padding: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 10,
              }}
            >
              <Zap style={{ width: 12, height: 12, color: "#7A4F00" }} />
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "#8A7020",
                  fontFamily: MONO,
                }}
              >
                BEST PIVOT
              </p>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#3A3010",
                lineHeight: 1.7,
                fontFamily: SERIF,
              }}
            >
              {data.best_pivot}
            </p>
          </div>

          <div
            style={{
              background: "#F0FAF5",
              border: "1px solid #B0DCC8",
              borderRadius: 4,
              padding: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 10,
              }}
            >
              <Lightbulb style={{ width: 12, height: 12, color: "#145236" }} />
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "#2A6A48",
                  fontFamily: MONO,
                }}
              >
                WHY THIS COULD WORK
              </p>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#1C3028",
                lineHeight: 1.7,
                fontFamily: SERIF,
              }}
            >
              {data.why_could_work}
            </p>
          </div>

          <div
            style={{
              background: "#FFF0F2",
              border: "1px solid #F0C8CE",
              borderRadius: 4,
              padding: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 10,
              }}
            >
              <Skull style={{ width: 12, height: 12, color: "#8B1A2A" }} />
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "#9A3040",
                  fontFamily: MONO,
                }}
              >
                KILL SHOT
              </p>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#5A1A28",
                lineHeight: 1.7,
                fontWeight: 600,
                fontFamily: SERIF,
              }}
            >
              {data.kill_shot}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
