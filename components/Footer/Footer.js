import Link from "next/link";
import { BsLinkedin, BsGithub, BsPersonWorkspace } from "react-icons/bs";
import RttCircleLogo from "@/public/img/logos/RttCircleLogo";
import SVG from "react-inlinesvg";
import { useState } from "react";

// TODO: **THE STRUCTURE AND LINK CONTENTS OF THIS FOOTER WILL CHANGE WHEN THE APPLICATION IS READY FOR FINAL UI DESIGN**

export default function Footer() {
  const [logoColor, setLogoColor] = useState("white");

  return (
    <footer className="z-10 bg-primary-800 border-t-2 border-primary-800/60 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.075)]">
      <div className="container px-6 pb-8 py-4 mx-auto">
        <div className="flex flex-col items-center text-center">
          <Link
            href="/dashboard"
            className="  transition-all duration-150 hover:scale-105 flex align-middle items-center lg:justify-start mb-8"
            onMouseEnter={() => setLogoColor("primary-300")}
            onMouseLeave={() => setLogoColor("white")}>
            {
              <>
                <RttCircleLogo
                  className="h-8 w-8 mr-2  hover:contrast-200 inline-block"
                  fillColor={logoColor}
                />
                <div className="text-3xl hover:text-primary-300 hover:contrast-200 inline-block font-black  text-white tracking-tighter ">
                  Restaurant to Table.
                </div>
              </>
            }
          </Link>
        </div>

        <div className="columns-3">
          <p className="text-sm mx-auto text-gray-500 dark:text-gray-300 my-auto">
            © Copyright Wade Ogburn 2023. All Rights Reserved.
          </p>

          <SVG
            src="img/logos/edamam.svg"
            className="h-auto w-48 mb-6 mx-auto"
          />

          {/* TODO: MAKE THESE INTO MY LINKEDIN, GITHUB, AND PORTFOLIO LINKS */}
          <div className="flex justify-end my-auto">
            <a href="https://github.com/15ogburnw">
              <BsGithub className="mr-8 w-7 h-7 text-white hover:opacity-75 transition duration-150 hover:scale-105" />
            </a>
            <a href="https://www.linkedin.com/in/wade-ogburn-11b806172/">
              <BsLinkedin className="mr-8 w-7 h-7 text-white hover:opacity-75 transition duration-150 hover:scale-105" />
            </a>
            <a href="https://my-portfolio-c92iln275-15ogburnw.vercel.app/">
              <BsPersonWorkspace className=" w-7 h-7 text-white hover:opacity-75 transition duration-150 hover:scale-105" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
