import React from "react";
import { StatusPill } from "@/components/StatusPill/StatusPill";
import { SubSection } from "@/components/SubSection/SubSection";
import { TrendingUp } from "lucide-react";

const ACCENT = "#1C3A6B";
const ACCENT_BG = "#F0F5FF";
const ACCENT_BORDER = "#C8D8F0";
const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Inter','Helvetica Neue',sans-serif";

export const InvestorCard = ({ data }) => (
  <div
    style={{
      background: "#FFFFFF",
      border: "1px solid #EAE4DC",
      borderRadius: 6,
      overflow: "hidden",
      boxShadow: "0 2px 16px #00000007",
    }}
  >
    {/* Card header stripe */}
    <div
      style={{
        background: ACCENT_BG,
        borderBottom: `1px solid ${ACCENT_BORDER}`,
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 30,
            height: 30,
            background: "#FFFFFF",
            border: `1px solid ${ACCENT_BORDER}`,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TrendingUp style={{ color: ACCENT, width: 13, height: 13 }} />
        </div>
        <div>
          <p
            style={{
              color: ACCENT,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              fontFamily: MONO,
            }}
          >
            INVESTOR
          </p>
          <p
            style={{
              color: "#8A9AB8",
              fontSize: 9,
              letterSpacing: "0.18em",
              fontFamily: MONO,
            }}
          >
            CAPITAL ALLOCATOR PERSPECTIVE
          </p>
        </div>
      </div>
      <StatusPill label={data.verdict} />
    </div>

    {/* Body */}
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div className="grid sm:grid-cols-3 gap-5">
        <SubSection title="Market">
          <p
            style={{
              color: "#3A4060",
              fontSize: 13,
              lineHeight: 1.75,
              fontFamily: SERIF,
            }}
          >
            {data.market}
          </p>
        </SubSection>
        <SubSection title="Model">
          <p
            style={{
              color: "#3A4060",
              fontSize: 13,
              lineHeight: 1.75,
              fontFamily: SERIF,
            }}
          >
            {data.model}
          </p>
        </SubSection>
        <SubSection title="Moat">
          <p
            style={{
              color: "#3A4060",
              fontSize: 13,
              lineHeight: 1.75,
              fontFamily: SERIF,
            }}
          >
            {data.moat}
          </p>
        </SubSection>
      </div>
      <div style={{ borderTop: "1px solid #F0EAE0", paddingTop: 20 }}>
        <SubSection title="Biggest Risk">
          <p
            style={{
              color: "#5A3A48",
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.75,
              fontFamily: SERIF,
            }}
          >
            {data.biggest_risk}
          </p>
        </SubSection>
      </div>
    </div>
  </div>
);
