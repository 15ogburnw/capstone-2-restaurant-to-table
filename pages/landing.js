import Link from "next/link";
import SVG from "react-inlinesvg";
import RttCircleLogo from "@/public/img/logos/RttCircleLogo";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";

export default function LandingPage() {
  const [logoColor, setLogoColor] = useState("primary-800");
  return (
    <>
      <section className="bg-base flex flex-col items-center h-screen w-screen overflow-hidden">
        <header className="mx-auto relative w-full max-w-7xl bg-">
          <div className="mx-auto relative w-full  flex  flex-row items-center justify-between px-12  py-6">
            <Link
              href="/dashboard"
              className="transition-all duration-150 hover:scale-105 flex align-middle items-center lg:justify-start"
              onMouseEnter={() => setLogoColor("primary-600")}
              onMouseLeave={() => setLogoColor("primary-800")}>
              {
                <>
                  <RttCircleLogo
                    className="h-8 w-8 mr-2 inline-block"
                    fillColor={logoColor}
                  />
                  <div className="text-3xl hover:text-primary-600 inline-block font-black  text-primary-800 tracking-tighter ">
                    Restaurant to Table.
                  </div>
                </>
              }
            </Link>

            <nav className="items-start flex-grow flex flex-row mb-2 justify-end pb-0 ">
              <div className="items-center inline-flex gap-2 lg:ml-auto md:mt-0 mt-3 list-none">
                <Link
                  href="/auth/login"
                  className="text-primary-700 text-2xl py-2 relative group transition-all duration-150 hover:scale-105 hover:text-primary-600 font-extrabold lg:mx-4 md:mx-3 mx-2">
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-primary-700 text-xl py-1.5 leading-none focus:outline-none px-2 border-4 border-primary-700 hover:border-primary-600  text-primary-700 focus:outline-2 outline-primary-700 focus:outline-offset-2 group hover:bg-transparent hover:text-primary-600 text-white font-bold inline-flex items-center justify-center shadow-md shadow-primary-700 hover:shadow-primary-600/40 transition-all duration-150 hover:scale-105">
                  Create an Account
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main className=" relative w-full  max-w-7xl md:px-12 z-30 mx-auto px-5 relative">
          <div className="text-center lg:text-left">
            <h1 className="lg:text-9xl text-primary-900 font-black mt-1 text-7xl tracking-tighter">
              <span className="block">Restaurant to Table.</span>
            </h1>
            <div className="invisible  z-10 lg:visible  text-lg rounded-md px-3  mt-7 bg-primary-500/80  inline-block">
              <p className="drop-shadow-xl   text-white my-1.5 text-xl font-extrabold ">
                The ultimate platform for recipe search and menu creation.
              </p>
            </div>
          </div>
          <div className=" items-center lg:items-start align-middle flex flex-col gap-4 lg:flex-row mt-7  lg:mr-20">
            <Link
              href="/auth/signup"
              className="items-center justify-center text-xl focus:outline-none border-4 border-primary-700 text-white inline-flex font-bold bg-primary-700  focus-visible:outline-primary-700 focus-visible:ring-primary-700 hover:text-primary-700 hover:bg-transparent transition-all duration-150 hover:scale-105 lg:w-auto py-4 px-6 text-center w-full shadow-md shadow-primary-700 h-full">
              Get Started for Free
            </Link>
            <Link
              className="items-center p-1 justify-center text-xl inline-flex group transition-all duration-150 hover:scale-105 bg-gradient-to-r from-primary-700 font-bold via-primary-500 to-primary-300 lg:w-auto  h-full text-center w-full shadow-md shadow-primary-700"
              href="/about-us">
              <span className="flex justify-center align-middle items-center group-hover:bg-base lg:px-6 xl:px-10 py-4 w-full h-full">
                <span className="relative text-white group-hover:text-primary-800">
                  Learn more
                </span>
                <span className="ml-1 text-white group-hover:text-primary-800 relative group-hover:translate-x-2 transition-transform flex items-center justify-center duration-200">
                  <BsArrowRight className="ml-2 text-white stroke-[1.25] group-hover:text-primary-800 relative group-hover:translate-x-2 transition-transform flex items-center justify-center duration-200" />
                </span>
              </span>
            </Link>
          </div>
        </main>
        <SVG
          src="img/fillers/avocados.svg"
          className=" invisible lg:visible flex aspect-auto flex-initial absolute lg:right-[8%] xl:right-[15%] bottom-[22%] z-0 rounded-full "
          height={275}
          alt="avocados"></SVG>
        <footer className="z-0 absolute  w-screen bottom-0 left-0">
          <div className="w-full relative h-10 md:h-15 bg-primary-700"></div>
          <div className="w-full relative h-10 md:h-15 bg-primary-600"></div>
          <div className="w-full relative h-10 md:h-15 bg-primary-400"></div>
        </footer>
      </section>
    </>
  );
}
