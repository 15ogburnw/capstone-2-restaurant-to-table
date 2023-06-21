import Link from "next/link";
import { BsLinkedin, BsGithub, BsPersonWorkspace } from "react-icons/bs";
import SVG from "react-inlinesvg";
import { useState } from "react";
import RttFullLogo from "../Logos/RttFullLogo";

export default function Footer() {
  const [logoColor, setLogoColor] = useState("white");

  return (
    <footer className=" z-30 relative h-[15vh]  w-screen   px-12 bg-primary-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.075)]  ">
      <div className="flex flex-row h-full  items-center">
        <p className="text-md font-medium justify-self-start text-white ">
          © Copyright Wade Ogburn 2023. All Rights Reserved.
        </p>

        <div className="flex flex-col items-center justify-self-center justify-center">
          <RttFullLogo
            mainColor="white"
            secondColor="primary-300"
            logoClasses="w-full"
          />

          <a href="https://developer.edamam.com/edamam-recipe-api">
            <SVG
              src="/img/logos/edamam.svg"
              className=" transition duration-150 hover:scale-105 mt-4 h-auto z-30"
              width={200}
            />
          </a>
        </div>
        <div className=" my-auto justify-self-end">
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
