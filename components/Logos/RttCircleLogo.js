import { useState } from "react";
import SVG from "react-inlinesvg";

export default function RttCircleLogo({
  mainColor = "white",
  secondColor = "primary-300",
}) {
  const translatedColors = {
    "primary-50": "#EAF4C1",
    "primary-100": "#D2EDAA",
    "primary-200": "#B6E499",
    "primary-300": "#9EDD8B",
    "primary-400": "#7EBE82",
    "primary-500": "#6fa772",
    "primary-600": "#5f8f62",
    "primary-700": "#3f5f41",
    "primary-800": "#304831",
    "primary-900": "#203021",
    white: "#FFFFFF",
  };
  const [fillColor, setFillColor] = useState(mainColor);
  return (
    <div
      onMouseEnter={() => setFillColor(secondColor)}
      onMouseLeave={() => setFillColor(mainColor)}
      onBlur={() => setFillColor(mainColor)}>
      <div className="h-8 w-8 mr-2 inline-block">
        <SVG src="img/logos/rtt-logo.svg" fill={translatedColors[fillColor]} />
      </div>
    </div>
  );
}
