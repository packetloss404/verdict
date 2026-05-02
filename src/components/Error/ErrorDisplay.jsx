import React from "react";
import { AlertTriangle } from "lucide-react";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";

export const ErrorDisplay = ({ title, message, onRetry }) => {
  return (
    <div
      style={{
        background: "#FBF0F2",
        border: "1px solid #EEC2CA",
        padding: "20px 22px",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        fontFamily: MONO,
      }}
    >
      <AlertTriangle
        style={{
          width: 15,
          height: 15,
          color: "#7C1A2A",
          flexShrink: 0,
          marginTop: 2,
        }}
      />
      <div>
        <p
          style={{
            color: "#7C1A2A",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
          }}
        >
          {title}
        </p>
        <p
          style={{
            color: "#9A4050",
            fontSize: 11,
            marginTop: 4,
            letterSpacing: "0.08em",
            fontFamily: "Georgia, serif",
          }}
        >
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              color: "#7C1A2A",
              fontSize: 9,
              letterSpacing: "0.2em",
              textDecoration: "underline",
              marginTop: 8,
              opacity: 0.7,
            }}
          >
            RETRY
          </button>
        )}
      </div>
    </div>
  );
};
