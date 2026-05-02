import React from "react";
import { verdictColor } from "@/utils/styleHelpers";
import { BulletList } from "@/components/BulletList/BulletList";
import { SubSection } from "@/components/SubSection/SubSection";
import {
  Eye,
  Flame,
  Scale,
  Brain,
  RefreshCw,
  Flag,
  Check,
  X,
  AlertTriangle,
  Skull,
} from "lucide-react";
import { StatusPill } from "@/components/StatusPill/StatusPill";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

const Card = ({ children, accentColor = "#EAE4DC", style = {} }) => (
  <div
    style={{
      background: "#FFFFFF",
      border: `1px solid ${accentColor}`,
      borderRadius: 6,
      padding: "24px",
      boxShadow: "0 2px 16px #00000006",
      ...style,
    }}
  >
    {children}
  </div>
);

const CardHeader = ({
  icon: Icon,
  iconColor,
  iconBg,
  iconBorder,
  title,
  subtitle,
  right,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
      flexWrap: "wrap",
      gap: 10,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 30,
          height: 30,
          background: iconBg,
          border: `1px solid ${iconBorder}`,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon style={{ width: 12, height: 12, color: iconColor }} />
      </div>
      <div>
        <p
          style={{
            color: "#0F1828",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.06em",
            fontFamily: MONO,
          }}
        >
          {title}
        </p>
        {subtitle && (
          <p
            style={{
              color: "#A0907A",
              fontSize: 9,
              letterSpacing: "0.18em",
              fontFamily: MONO,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
    {right}
  </div>
);

export const FollowUpSection = ({ data }) => {
  const proceedYes = data?.decision_pressure?.proceed === "Yes";

  return (
    <div className="space-y-4 followup-results">
      {/* 1 — What Was Missed */}
      <Card accentColor="#F0DBA8">
        <CardHeader
          icon={Eye}
          iconColor="#7A4F00"
          iconBg="#FFF8EC"
          iconBorder="#F0DBA8"
          title="WHAT WAS MISSED"
          subtitle="BLIND SPOTS FROM THE ORIGINAL ANALYSIS"
        />
        <div className="grid sm:grid-cols-2 gap-6">
          <SubSection title="Overlooked Risks">
            <BulletList items={data.missed.risks} accent="#7A4F00" />
          </SubSection>
          <SubSection title="Missing Insight">
            <p
              style={{
                color: "#3A3040",
                fontSize: 13,
                lineHeight: 1.75,
                marginTop: 4,
                fontFamily: SERIF,
              }}
            >
              {data.missed.missing_insight}
            </p>
          </SubSection>
        </div>
      </Card>

      {/* 2 — Failure Acceleration */}
      <Card accentColor="#F0C8CE">
        <CardHeader
          icon={Flame}
          iconColor="#8B1A2A"
          iconBg="#FFF0F2"
          iconBorder="#F0C8CE"
          title="FAILURE ACCELERATION"
          subtitle="ASSUME IT'S BREAKING. TRACE THE COLLAPSE."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { k: "FIRST CRACK", v: data.failure_acceleration.first_crack },
            {
              k: "CASCADE EFFECT",
              v: data.failure_acceleration.cascade_effect,
            },
            {
              k: "POINT OF NO RETURN",
              v: data.failure_acceleration.point_of_no_return,
              bold: true,
            },
          ].map(({ k, v, bold }, i) => (
            <div key={k}>
              {i > 0 && (
                <div
                  style={{ height: 1, background: "#F8E8EA", margin: "14px 0" }}
                />
              )}
              <p
                style={{
                  color: "#A04050",
                  fontSize: 9,
                  letterSpacing: "0.28em",
                  fontWeight: 700,
                  marginBottom: 6,
                  fontFamily: MONO,
                }}
              >
                {k}
              </p>
              <p
                style={{
                  color: bold ? "#5A1A28" : "#4A3038",
                  fontSize: 13,
                  lineHeight: 1.75,
                  fontWeight: bold ? 600 : 400,
                  fontFamily: SERIF,
                }}
              >
                {v}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* 3 — Decision Pressure */}
      <Card accentColor={proceedYes ? "#B0DCC8" : "#F0C8CE"}>
        <CardHeader
          icon={Scale}
          iconColor={proceedYes ? "#145236" : "#8B1A2A"}
          iconBg={proceedYes ? "#F0FAF5" : "#FFF0F2"}
          iconBorder={proceedYes ? "#B0DCC8" : "#F0C8CE"}
          title="DECISION PRESSURE"
          subtitle="REAL MONEY. REAL TIME. REAL REPUTATION."
          right={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: proceedYes ? "#F0FAF5" : "#FFF0F2",
                border: `1px solid ${proceedYes ? "#B0DCC8" : "#F0C8CE"}`,
                padding: "6px 14px",
                borderRadius: 4,
              }}
            >
              {proceedYes ? (
                <Check style={{ width: 11, height: 11, color: "#145236" }} />
              ) : (
                <X style={{ width: 11, height: 11, color: "#8B1A2A" }} />
              )}
              <span
                style={{
                  color: proceedYes ? "#145236" : "#8B1A2A",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  fontFamily: MONO,
                }}
              >
                {proceedYes ? "WOULD PROCEED" : "WOULD NOT PROCEED"}
              </span>
            </div>
          }
        />
        <SubSection title="Why">
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              marginTop: 4,
            }}
          >
            {data.decision_pressure.why.map((reason, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 13,
                  color: "#3A3040",
                  lineHeight: 1.75,
                  fontFamily: SERIF,
                }}
              >
                <span
                  style={{
                    color: proceedYes ? "#4A9A78" : "#B07080",
                    marginTop: 3,
                    flexShrink: 0,
                    fontWeight: 700,
                  }}
                >
                  —
                </span>
                {reason}
              </li>
            ))}
          </ul>
        </SubSection>
      </Card>

      {/* 4 — 80/20 Truth */}
      <Card accentColor="#D8C8F0">
        <CardHeader
          icon={Brain}
          iconColor="#5030A0"
          iconBg="#F5F0FC"
          iconBorder="#D8C8F0"
          title="THE 80/20 TRUTH"
          subtitle="THE SINGLE FACTOR THAT DETERMINES EVERYTHING"
        />
        <div
          style={{
            background: "#F5F0FC",
            border: "1px solid #D8C8F0",
            borderRadius: 4,
            padding: "18px 20px",
          }}
        >
          <p
            style={{
              color: "#8070A0",
              fontSize: 9,
              letterSpacing: "0.28em",
              fontWeight: 700,
              marginBottom: 10,
              fontFamily: MONO,
            }}
          >
            CORE LEVER
          </p>
          <p
            style={{
              color: "#2A1848",
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 1.65,
              fontFamily: SERIF,
            }}
          >
            {data.eighty_twenty.core_lever}
          </p>
        </div>
      </Card>

      {/* 5 — Reframe */}
      <Card accentColor="#C8D8F0">
        <CardHeader
          icon={RefreshCw}
          iconColor="#1C3A6B"
          iconBg="#F0F5FF"
          iconBorder="#C8D8F0"
          title="REFRAME"
          subtitle="A STRONGER VERSION OF THE SAME IDEA"
        />
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { t: "Better Framing", v: data.reframe.better_framing, bold: true },
            { t: "Who It's Really For", v: data.reframe.who_its_really_for },
            {
              t: "What It's Actually Solving",
              v: data.reframe.what_its_actually_solving,
            },
          ].map(({ t, v, bold }) => (
            <SubSection key={t} title={t}>
              <p
                style={{
                  color: bold ? "#1C2B4A" : "#3A4060",
                  fontSize: 13,
                  fontWeight: bold ? 600 : 400,
                  lineHeight: 1.75,
                  marginTop: 4,
                  fontFamily: SERIF,
                }}
              >
                {v}
              </p>
            </SubSection>
          ))}
        </div>
      </Card>

      {/* 6 — Final Call */}
      <div
        style={{
          background: "#FFFFFF",
          border: "2px solid #D4B87A",
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: "0 4px 24px #C4912A10",
        }}
      >
        {/* Gold header strip */}
        <div
          style={{
            background: "#FFFAF0",
            borderBottom: "1px solid #E8D8A0",
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                background: "#FFFFFF",
                border: "1px solid #E0C880",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Flag style={{ width: 12, height: 12, color: "#C4912A" }} />
            </div>
            <div>
              <p
                style={{
                  color: "#0F1828",
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: "0.06em",
                  fontFamily: MONO,
                }}
              >
                FINAL CALL
              </p>
              <p
                style={{
                  color: "#A0907A",
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  fontFamily: MONO,
                }}
              >
                UPDATED VERDICT · HARDER AND MORE DECISIVE
              </p>
            </div>
          </div>
          <StatusPill label={data.final_call.updated_verdict} size="lg" />
        </div>

        <div style={{ padding: "24px" }}>
          {/* What Changed */}
          <div style={{ marginBottom: 20 }}>
            <SubSection title="What Changed">
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  marginTop: 4,
                }}
              >
                {data.final_call.what_changed.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 13,
                      color: "#3A3040",
                      lineHeight: 1.75,
                      fontFamily: SERIF,
                    }}
                  >
                    <span
                      style={{
                        color: "#C4912A",
                        marginTop: 3,
                        fontWeight: 700,
                      }}
                    >
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </SubSection>
          </div>

          {/* Two boxes */}
          <div
            className="grid sm:grid-cols-2 gap-4"
            style={{ marginBottom: 0 }}
          >
            <div
              style={{
                background: "#FFF8EC",
                border: "1px solid #F0DBA8",
                borderRadius: 4,
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 8,
                }}
              >
                <AlertTriangle
                  style={{ width: 12, height: 12, color: "#7A4F00" }}
                />
                <p
                  style={{
                    color: "#8A7020",
                    fontSize: 9,
                    letterSpacing: "0.24em",
                    fontWeight: 700,
                    fontFamily: MONO,
                  }}
                >
                  UNCOMFORTABLE TRUTH
                </p>
              </div>
              <p
                style={{
                  color: "#3A3010",
                  fontSize: 13,
                  lineHeight: 1.75,
                  fontFamily: SERIF,
                }}
              >
                {data.final_call.uncomfortable_truth}
              </p>
            </div>
            <div
              style={{
                background: "#FFF0F2",
                border: "1px solid #F0C8CE",
                borderRadius: 4,
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 8,
                }}
              >
                <Skull style={{ width: 12, height: 12, color: "#8B1A2A" }} />
                <p
                  style={{
                    color: "#9A3040",
                    fontSize: 9,
                    letterSpacing: "0.24em",
                    fontWeight: 700,
                    fontFamily: MONO,
                  }}
                >
                  IF YOU IGNORE THIS
                </p>
              </div>
              <p
                style={{
                  color: "#4A1820",
                  fontSize: 13,
                  lineHeight: 1.75,
                  fontFamily: SERIF,
                }}
              >
                {data.final_call.if_you_ignore}
              </p>
            </div>
          </div>

          {/* One sentence */}
          <div
            style={{
              borderTop: "1px solid #E8D8A0",
              paddingTop: 20,
              marginTop: 20,
            }}
          >
            <p
              style={{
                color: "#A0907A",
                fontSize: 9,
                letterSpacing: "0.3em",
                fontWeight: 700,
                marginBottom: 12,
                fontFamily: MONO,
              }}
            >
              ONE SENTENCE YOU SHOULD REMEMBER
            </p>
            <p
              style={{
                color: "#0F1828",
                fontSize: 16,
                fontWeight: 700,
                lineHeight: 1.65,
                fontStyle: "italic",
                fontFamily: SERIF,
              }}
            >
              &ldquo;{data.final_call.one_sentence}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
