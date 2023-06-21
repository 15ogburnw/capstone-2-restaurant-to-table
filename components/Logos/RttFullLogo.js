import Link from "next/link";
import SVG from "react-inlinesvg";
import { useState } from "react";
import RttCircleLogo from "./RttCircleLogo";

export default function RttFullLogo({
  mainColor = "white",
  secondColor = "primary-300",
  wordClasses = "h-9 w-9 mr-2 inline-block",
  logoClasses = "",
}) {
  const [logoColor, setLogoColor] = useState(mainColor);

  return (
    <Link
      href="/"
      className="  transition-all duration-150 hover:scale-105 flex group align-middle items-center"
      onMouseEnter={() => setLogoColor(secondColor)}
      onMouseLeave={() => setLogoColor(mainColor)}>
      {
        <>
          <RttCircleLogo
            className={`h-2 w-auto mr-2  group-hover:contrast-200 inline-block ${logoClasses}`}
            fillColor={logoColor}
          />
          <div
            className={`w-full h-auto inline-block font-black  text-${mainColor} group-hover:text-${() => {
              setLogoColor(() => (secondColor ? mainColor : secondColor));
              return mainColor;
            }} group-hover:contrast-200  tracking-tighter mr-2 ${wordClasses}`}>
            Restaurant to Table.
          </div>
        </>
      }
    </Link>
  );
}
