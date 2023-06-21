import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import RttCircleLogo from "./RttCircleLogo";

export default function RttFullLogo({
  mainColor = "white",
  secondColor = "primary-300",
  logoClasses = "",
}) {
  const recognizedColors = useMemo(
    () => ({
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
      "#FFFFFF": "#FFFFFF",
    }),
    []
  );
  const [logoColor, setLogoColor] = useState();
  useEffect(() => {
    if (recognizedColors) {
      if (
        !Object.keys(recognizedColors).includes(mainColor) ||
        !Object.keys(recognizedColors).includes(secondColor)
      ) {
        console.log(Object.keys(recognizedColors));
        throw new Error(`Unrecognized color: ${mainColor} or ${secondColor}`);
      }
    }
  }, [mainColor, secondColor, recognizedColors]);
  return (
    <div className={logoClasses}>
      <Link
        href="/"
        onMouseEnter={() => setLogoColor(mainColor)}
        onMouseLeave={() => setLogoColor(secondColor)}
        className={`  h-full w-full transition-all duration-150 hover:scale-105 flex group align-middle items-center`}>
        <RttCircleLogo
          logoColor={logoColor}
          classes={` inline-block  group-hover:contrast-200 `}
        />
        <div
          className={`w-full h-auto inline-block font-black  text-${logoColor}  group-hover:contrast-200  tracking-tighter mr-2 `}>
          Restaurant to Table.
        </div>
      </Link>
    </div>
  );
}
