import React from "react";

const MONO = "'ui-monospace','SFMono-Regular','Menlo',monospace";

export const SubSection = ({ title, children }) => (
  <div>
    <p
      style={{
        color: "#A0907A",
        fontSize: 9,
        letterSpacing: "0.3em",
        fontWeight: 700,
        marginBottom: 8,
        fontFamily: MONO,
        textTransform: "uppercase",
      }}
    >
      {title}
    </p>
    {children}
  </div>
);
