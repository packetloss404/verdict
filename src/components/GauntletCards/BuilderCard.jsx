import React from "react";
import { BulletList } from "@/components/BulletList/BulletList";
import { SubSection } from "@/components/SubSection/SubSection";
import { Wrench } from "lucide-react";

const ACCENT = "#145236";
const ACCENT_BG = "#F0FAF5";
const ACCENT_BORDER = "#B0DCC8";
const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

export const BuilderCard = ({ data }) => (
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
        <Wrench style={{ color: ACCENT, width: 13, height: 13 }} />
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
          BUILDER
        </p>
        <p
          style={{
            color: "#6A9880",
            fontSize: 9,
            letterSpacing: "0.18em",
            fontFamily: MONO,
          }}
        >
          TECHNICAL EXECUTION PERSPECTIVE
        </p>
      </div>
    </div>
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <SubSection title="Looks Easy But Isn't">
          <BulletList items={data.traps} accent={ACCENT} />
        </SubSection>
        <SubSection title="Real Challenges">
          <BulletList
            items={[data.technical, data.operational]}
            accent={ACCENT}
          />
        </SubSection>
      </div>
      <div style={{ borderTop: "1px solid #F0EAE0", paddingTop: 20 }}>
        <div className="grid sm:grid-cols-2 gap-5">
          <SubSection title="Time to MVP">
            <p
              style={{
                color: "#2A4A38",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: SERIF,
              }}
            >
              {data.time_to_mvp}
            </p>
          </SubSection>
          <SubSection title="Hidden Costs">
            <p
              style={{
                color: "#3A4A40",
                fontSize: 13,
                lineHeight: 1.75,
                fontFamily: SERIF,
              }}
            >
              {data.hidden_costs}
            </p>
          </SubSection>
        </div>
      </div>
    </div>
  </div>
);
