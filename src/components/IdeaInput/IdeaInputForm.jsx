import React, { useState, useRef } from "react";
import { Gavel } from "lucide-react";

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Inter','Helvetica Neue',sans-serif";
const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";

export const IdeaInputForm = ({ idea, setIdea, onSubmit, isSubmitting }) => {
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef(null);
  const ready = idea.trim() && !isSubmitting;

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (ready) onSubmit();
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
      {/* Main card */}
      <div
        style={{
          background: "#FFFFFF",
          border: `1.5px solid ${focused ? "#C4912A" : "#E2D8CC"}`,
          borderRadius: 6,
          boxShadow: focused
            ? "0 0 0 3px #C4912A14, 0 8px 40px #00000010"
            : "0 4px 24px #00000009",
          transition: "border-color 0.2s, box-shadow 0.2s",
          overflow: "hidden",
        }}
      >
        {/* Top label strip */}
        <div
          style={{
            background: "#F8F4EE",
            borderBottom: "1px solid #EDE5D8",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "#A08868",
              fontSize: 9,
              fontFamily: MONO,
              letterSpacing: "0.3em",
            }}
          >
            SUBMIT YOUR IDEA FOR EVALUATION
          </span>
          <span
            style={{
              color: "#C4912A",
              fontSize: 9,
              fontFamily: MONO,
              letterSpacing: "0.22em",
              fontWeight: 700,
            }}
          >
            PASS 1 OF 3
          </span>
        </div>

        {/* Textarea */}
        <div style={{ padding: "24px 24px 12px" }}>
          <textarea
            ref={textareaRef}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            rows={6}
            disabled={isSubmitting}
            placeholder={
              "What's the idea? Who's it for? How do you win?\n\nDon't soften it — if it can't survive this, it can't survive the market."
            }
            className="verdict-textarea"
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "none",
              color: "#1C2030",
              fontSize: 15,
              lineHeight: 1.85,
              fontFamily: SERIF,
              caretColor: "#C4912A",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#EDE5D8", margin: "0 24px" }} />

        {/* Bottom bar */}
        <div
          style={{
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              color: "#C4C0B8",
              fontSize: 10,
              fontFamily: MONO,
              letterSpacing: "0.18em",
            }}
          >
            ⌘ ENTER
          </span>

          <button
            onClick={onSubmit}
            disabled={!ready}
            className="verdict-submit-btn"
            style={{
              background: ready ? "#0F1828" : "#EDE8E0",
              border: `1px solid ${ready ? "#0F1828" : "#DDD5C8"}`,
              color: ready ? "#FFFFFF" : "#B8AA98",
              borderRadius: 4,
              padding: "12px 28px",
              fontSize: 10,
              letterSpacing: "0.26em",
              fontWeight: 700,
              fontFamily: MONO,
              cursor: ready ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "all 0.15s",
              boxShadow: ready ? "0 2px 12px #0F182825" : "none",
            }}
          >
            <Gavel size={12} />
            BRING MY IDEA TO TRIAL
          </button>
        </div>
      </div>

      {/* Subtext */}
      <p
        style={{
          textAlign: "center",
          color: "#B8A888",
          fontSize: 11,
          marginTop: 14,
          fontFamily: SANS,
          fontStyle: "italic",
          letterSpacing: "0.01em",
        }}
      >
        Most ideas don&apos;t survive. Find out if yours does.
      </p>
    </div>
  );
};
