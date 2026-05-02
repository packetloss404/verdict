import React from "react";
import { History, Plus } from "lucide-react";
import { HistoryItem } from "@/components/History/HistoryItem";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

export const HistoryTab = ({ history, isLoading, onNewEvaluation }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 24,
      fontFamily: MONO,
    }}
  >
    {/* Header */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 20,
        borderBottom: "1px solid #EAE4DC",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <div>
        <p
          style={{
            color: "#A0907A",
            fontSize: 9,
            letterSpacing: "0.3em",
            marginBottom: 8,
          }}
        >
          VERDICT · EVALUATION LOG
        </p>
        <h1
          style={{
            color: "#0F1828",
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: "0.06em",
            fontFamily: SERIF,
            marginBottom: 4,
          }}
        >
          History
        </h1>
        <p style={{ color: "#B0A090", fontSize: 10, letterSpacing: "0.14em" }}>
          PAST IDEAS THAT FACED VERDICT
        </p>
      </div>
      <button
        onClick={onNewEvaluation}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#0F1828",
          color: "#FFFFFF",
          border: "1px solid #0F1828",
          borderRadius: 4,
          fontSize: 9,
          letterSpacing: "0.28em",
          fontFamily: MONO,
          padding: "10px 20px",
          cursor: "pointer",
          transition: "all 0.15s",
          boxShadow: "0 2px 12px #0F182820",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#1C2B4A";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#0F1828";
        }}
      >
        <Plus style={{ width: 11, height: 11 }} />
        NEW EVALUATION
      </button>
    </div>

    {/* List */}
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {isLoading ? (
        Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-16 shimmer"
              style={{ borderRadius: 6, border: "1px solid #EAE4DC" }}
            />
          ))
      ) : history.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            border: "1px dashed #D8D0C4",
            borderRadius: 6,
            background: "#FAFAF8",
          }}
        >
          <History
            style={{
              width: 28,
              height: 28,
              color: "#D0C8B8",
              margin: "0 auto 14px",
            }}
          />
          <p
            style={{ color: "#B0A090", fontSize: 10, letterSpacing: "0.22em" }}
          >
            NO IDEAS EVALUATED YET
          </p>
        </div>
      ) : (
        history.map((item) => <HistoryItem key={item.id} item={item} />)
      )}
    </div>
  </div>
);
