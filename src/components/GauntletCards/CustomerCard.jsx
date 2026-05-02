import React from "react";
import { BulletList } from "@/components/BulletList/BulletList";
import { SubSection } from "@/components/SubSection/SubSection";
import { ShoppingCart } from "lucide-react";

const ACCENT = "#7A4F00";
const ACCENT_BG = "#FFF8EC";
const ACCENT_BORDER = "#F0DBA8";
const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

export const CustomerCard = ({ data }) => (
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
        <ShoppingCart style={{ color: ACCENT, width: 13, height: 13 }} />
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
          CUSTOMER
        </p>
        <p
          style={{
            color: "#B09060",
            fontSize: 9,
            letterSpacing: "0.18em",
            fontFamily: MONO,
          }}
        >
          BUYER PERSPECTIVE
        </p>
      </div>
    </div>
    <div style={{ padding: "24px" }}>
      <div className="grid sm:grid-cols-3 gap-5">
        <SubSection title="Why I Wouldn't Buy">
          <BulletList items={data.why_not_buy} accent={ACCENT} />
        </SubSection>
        <SubSection title="What Feels Off">
          <p
            style={{
              color: "#5A4030",
              fontSize: 13,
              lineHeight: 1.75,
              fontFamily: SERIF,
            }}
          >
            {data.feels_off}
          </p>
        </SubSection>
        <SubSection title="Dealbreaker">
          <p
            style={{
              color: "#5A4030",
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.75,
              fontFamily: SERIF,
            }}
          >
            {data.dealbreaker}
          </p>
        </SubSection>
      </div>
    </div>
  </div>
);
