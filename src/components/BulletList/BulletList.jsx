import React from "react";

const SERIF = "Georgia, 'Times New Roman', serif";

export const BulletList = ({ items, accent }) => (
  <ul
    style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}
  >
    {items.map((item, i) => (
      <li
        key={i}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          fontSize: 13,
          color: "#3A3840",
          lineHeight: 1.75,
          fontFamily: SERIF,
        }}
      >
        <span
          style={{
            color: accent,
            marginTop: 3,
            flexShrink: 0,
            fontWeight: 700,
          }}
        >
          —
        </span>
        {item}
      </li>
    ))}
  </ul>
);
