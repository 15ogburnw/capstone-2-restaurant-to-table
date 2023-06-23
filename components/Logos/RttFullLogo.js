import Link from "next/link";
import { useState } from "react";
import SVG from "react-inlinesvg";

export default function RttFullLogo({
  mainColor = "white",
  secondColor = "primary-300",
}) {
  const [logoColor, setLogoColor] = useState(mainColor);

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

  return (
    <Link
      href="/"
      onMouseEnter={() => setLogoColor(secondColor)}
      onMouseLeave={() => setLogoColor(mainColor)}
      onBlur={() => setLogoColor(mainColor)}
      className="transition z-auto hover:scale-105 flex align-middle items-center">
      <div className="h-8 w-8 mr-2 hidden sm:inline-block flex-none">
        <SVG src="img/logos/rtt-logo.svg" fill={translatedColors[logoColor]} />
      </div>
      <div
        className={`text-3xl inline-block font-black  text-${logoColor}  group-hover:contrast-200  tracking-tighter mr-2`}>
        Restaurant to Table.
      </div>
    </Link>
  );
}
