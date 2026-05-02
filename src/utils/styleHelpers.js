export const verdictColor = (v) => {
  if (["Fund", "Proceed", "Survived", "Stronger Proceed"].includes(v))
    return {
      dot: "#1A5C3A",
      text: "#1A5C3A",
      bg: "#EEF7F2",
      border: "#B8DDCA",
    };
  if (
    [
      "Pivot",
      "Survived With Damage",
      "Cautious Proceed",
      "Pivot Hard",
    ].includes(v)
  )
    return {
      dot: "#7A5100",
      text: "#7A5100",
      bg: "#FBF6EC",
      border: "#EED8A8",
    };
  return {
    dot: "#7C1A2A",
    text: "#7C1A2A",
    bg: "#FBF0F2",
    border: "#EEC2CA",
  };
};

export const memoDecisionStyle = (d) => {
  if (d === "Invest")
    return {
      bg: "#EEF7F2",
      border: "#B8DDCA",
      label: "#1A5C3A",
      text: "#2A6A48",
    };
  if (d === "Pivot")
    return {
      bg: "#FBF6EC",
      border: "#EED8A8",
      label: "#7A5100",
      text: "#8A6010",
    };
  return {
    bg: "#FBF0F2",
    border: "#EEC2CA",
    label: "#7C1A2A",
    text: "#8A2A3A",
  };
};

export const convictionStyle = (c) => {
  if (c === "High") return { color: "#1A5C3A", bg: "#EEF7F2" };
  if (c === "Medium") return { color: "#7A5100", bg: "#FBF6EC" };
  return { color: "#7C1A2A", bg: "#FBF0F2" };
};
