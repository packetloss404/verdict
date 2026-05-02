import React from "react";
import { BulletList } from "@/components/BulletList/BulletList";
import { SubSection } from "@/components/SubSection/SubSection";
import { Swords } from "lucide-react";

const ACCENT = "#8B1A2A";
const ACCENT_BG = "#FFF0F2";
const ACCENT_BORDER = "#F0C8CE";
const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

export const CompetitorCard = ({ data }) => (
  <div
    style={{
      background: "#FFFFFF",
      border: "1px solid #EAE4DC",
      borderRadius: 6,
      overflow: "hidden",
      boxShadow: "0 2px 16px #00000007",
    }}
  >
    <div
      style={{
        background: ACCENT_BG,
        borderBottom: `1px solid ${ACCENT_BORDER}`,
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
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
        <Swords style={{ color: ACCENT, width: 13, height: 13 }} />
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
          COMPETITOR
        </p>
        <p
          style={{
            color: "#B08090",
            fontSize: 9,
            letterSpacing: "0.18em",
            fontFamily: MONO,
          }}
        >
          MARKET ENEMY PERSPECTIVE
        </p>
      </div>
    </div>
    <div style={{ padding: "24px" }}>
      <div className="grid sm:grid-cols-2 gap-5">
        <SubSection title="How I'd Kill This">
          <BulletList items={data.kill_strategies} accent={ACCENT} />
        </SubSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <SubSection title="Weak Points">
            <BulletList items={data.weak_points} accent={ACCENT} />
          </SubSection>
          <SubSection title="Why You Lose">
            <p
              style={{
                color: "#5A3040",
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.75,
                fontFamily: SERIF,
              }}
            >
              {data.why_you_lose}
            </p>
          </SubSection>
        </div>
      </div>
    </div>
  </div>
);
