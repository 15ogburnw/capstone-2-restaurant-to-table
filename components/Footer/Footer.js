import Link from "next/link";
import { BsLinkedin, BsGithub, BsPersonWorkspace } from "react-icons/bs";
import RttCircleLogo from "@/public/img/logos/RttCircleLogo";
import SVG from "react-inlinesvg";
import { useState } from "react";

// TODO: **THE STRUCTURE AND LINK CONTENTS OF THIS FOOTER WILL CHANGE WHEN THE APPLICATION IS READY FOR FINAL UI DESIGN**

export default function Footer() {
  const [logoColor, setLogoColor] = useState("white");

  return (
    <footer className=" z-30 relative bottom-0 left-0 min-w-full h-1/6 py-3 px-12 bg-primary-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.075)]  ">
      <div className="flex flex-row justify-between">
        <p className="text-md font-medium  text-white my-auto">
          © Copyright Wade Ogburn 2023. All Rights Reserved.
        </p>

        <div className="flex flex-col items-center text-center">
          <Link
            href="/dashboard"
            className=" transition-all duration-150 hover:scale-105 flex align-middle items-center lg:justify-start  "
            onMouseEnter={() => setLogoColor("primary-300")}
            onMouseLeave={() => setLogoColor("white")}>
            {
              <div className="flex align-middle items-center justify-center">
                <RttCircleLogo
                  className="h-8 w-8 mr-3  hover:contrast-200 inline-block"
                  fillColor={logoColor}
                />
                <div className="text-3xl hover:text-primary-300 hover:contrast-200 inline-block font-black  text-white tracking-tighter ">
                  Restaurant to Table.
                </div>
              </div>
            }
          </Link>

          <a href="https://developer.edamam.com/edamam-recipe-api">
            <SVG
              src="/img/logos/edamam.svg"
              className=" transition duration-150 hover:scale-105 mt-4 h-auto z-30"
              width={200}
            />
          </a>
        </div>
        <div className=" my-auto">
          <div className="flex items-center gap-8 align-middle justify-end">
            <a href="https://github.com/15ogburnw">
              <BsGithub className="w-7 h-7 mr-5 text-white hover:text-primary-300 hover:scale-110 transition duration-150 hover:contrast-200" />
            </a>
            <a href="https://www.linkedin.com/in/wade-ogburn-11b806172/">
              <BsLinkedin className=" w-7 h-7 hover:scale-110 text-white mr-5 hover:text-primary-300 transition duration-150 hover:contrast-200 " />
            </a>
            <a href="https://my-portfolio-c92iln275-15ogburnw.vercel.app/">
              <BsPersonWorkspace className=" w-7 h-7 hover:scale-110 mr-5 text-white hover:text-primary-300 transition duration-150 hover:contrast-200 " />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
