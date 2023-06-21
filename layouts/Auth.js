import Link from "next/link";
import { useState } from "react";
import RttCircleLogo from "@/components/Logos/RttCircleLogo";

export default function Auth({ children }) {
  const [logoColor, setLogoColor] = useState("white");
  return (
    <main className="h-screen w-screen  absolute">
      <header className="mx-auto absolute top-0 left-0 w-full bg- h-full z-0">
        <div className="mx-auto relative w-full  flex  bg-primary-800 h-1/4 shadow-md items-start justify-center">
          <Link
            href="/dashboard"
            className=" transition-all pointer-events-auto duration-150 hover:scale-105 flex mt-12 relative items-center z-30"
            onMouseEnter={() => setLogoColor("primary-300")}
            onMouseLeave={() => setLogoColor("white")}>
            {
              <>
                <RttCircleLogo
                  className="h-9 w-9 mr-2 inline-block"
                  fillColor={logoColor}
                />
                <div className="text-3xl  inline-block font-black  text-white hover:text-primary-300 tracking-tighter ">
                  Restaurant to Table.
                </div>
              </>
            }
          </Link>
        </div>
      </header>

      <div
        className="w-screen flex justify-center items-start h-screen absolute bg-"
        data-tails-google-fonts="Cedarville+Cursive">
        {children}
      </div>

      {/* TODO Add a footer here  */}
    </main>
  );
}
