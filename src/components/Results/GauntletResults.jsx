import React from "react";
import { Scale, RotateCcw } from "lucide-react";
import { InvestorCard } from "@/components/GauntletCards/InvestorCard";
import { CompetitorCard } from "@/components/GauntletCards/CompetitorCard";
import { CustomerCard } from "@/components/GauntletCards/CustomerCard";
import { BuilderCard } from "@/components/GauntletCards/BuilderCard";
import { JudgeCard } from "@/components/GauntletCards/JudgeCard";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

export const GauntletResults = ({ gauntlet, ideaText, onReset }) => (
  <div className="space-y-4 gauntlet-results">
    {/* Session header */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 18,
        borderBottom: "1px solid #EAE4DC",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#C4912A",
            }}
          />
          <span
            style={{
              color: "#C4912A",
              fontSize: 9,
              letterSpacing: "0.28em",
              fontFamily: MONO,
            }}
          >
            VERDICT DELIVERED
          </span>
        </div>
        <p
          style={{
            color: "#6A5C4A",
            fontSize: 12,
            fontFamily: SERIF,
            fontStyle: "italic",
            maxWidth: 380,
          }}
        >
          &ldquo;{ideaText?.substring(0, 70)}
          {ideaText?.length > 70 ? "…" : ""}&rdquo;
        </p>
      </div>
      <button
        onClick={onReset}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: "#9A8A78",
          fontSize: 9,
          letterSpacing: "0.22em",
          fontFamily: MONO,
          background: "none",
          border: "1px solid #E0D8CC",
          borderRadius: 4,
          padding: "7px 14px",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#C4912A";
          e.currentTarget.style.color = "#7A5100";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#E0D8CC";
          e.currentTarget.style.color = "#9A8A78";
        }}
      >
        <RotateCcw style={{ width: 10, height: 10 }} />
        NEW EVALUATION
      </button>
    </div>

    {/* Counsel cards */}
    <InvestorCard data={gauntlet.investor} />
    <CompetitorCard data={gauntlet.competitor} />
    <CustomerCard data={gauntlet.customer} />
    <BuilderCard data={gauntlet.builder} />

    {/* Judge divider */}
    <div
      style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 8 }}
    >
      <div style={{ flex: 1, height: 1, background: "#E8E0D0" }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#FFFAF0",
          border: "1px solid #D4B87A",
          borderRadius: 4,
          padding: "8px 16px",
        }}
      >
        <Scale style={{ width: 12, height: 12, color: "#C4912A" }} />
        <span
          style={{
            color: "#7A4F00",
            fontSize: 9,
            fontWeight: 900,
            letterSpacing: "0.22em",
            fontFamily: MONO,
            whiteSpace: "nowrap",
          }}
        >
          THE JUDGE
        </span>
      </div>
      <div style={{ flex: 1, height: 1, background: "#E8E0D0" }} />
    </div>

    <JudgeCard data={gauntlet.judge} />
  </div>
);
