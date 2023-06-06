import Link from "next/link";
import { useRouter } from "next/router";
import SVG from "react-inlinesvg";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <>
      <section className="bg-base flex items-start xl:p-14 h-screen relative overflow-hidden">
        <div className=" relative flex-col justify-start items-start w-auto py-20  md:px-20 z-30  px-5 ">
          <div>
            <div className="text-center lg:text-left">
              <h1 className="lg:text-9xl text-primary-900 md:text-8xl font-black mt-4 text-7xl tracking-tighter">
                <span className="block">404</span>
              </h1>
              <h2 className="lg:text-6xl text-primary-900 md:text-6xl font-black mt-4 text-6xl tracking-tighter">
                <span className="block">Page Not Found.</span>
              </h2>
              <p className="text-white text-lg rounded-md px-3 py-1 mt-10 mb-1 font-bold bg-primary-900/60 inline-block">
                The page or resource you are looking for could not be found.
              </p>
            </div>
            <div className="justify-start gap-2 flex flex-col mt-10 sm:flex-row w-full">
              <Link
                className="items-center p-2 justify-center text-xl inline-flex group duration-200 bg-gradient-to-r from-primary-300 via-primary-500 to-primary-700 lg:w-auto  h-full text-center font-bold w-full shadow-sm shadow-primary-800"
                href="#"
                onClick={() => {
                  router.back();
                }}>
                <span className="flex justify-center items-center group-hover:bg-[#eaeadf] lg:px-6 py-4 w-full h-full">
                  <span className="mr-2 text-white group-hover:text-primary-800 relative group-hover:-translate-x-2 transition-transform flex items-center justify-center duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.0"
                      stroke="currentColor"
                      class="w-10 h-8 transform rotate-180">
                      <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H0.5"></path>
                    </svg>
                  </span>
                  <span className="relative text-white group-hover:text-primary-800">
                    Take Me Back
                  </span>
                </span>
              </Link>
              <Link
                href="/landing"
                className="items-center justify-center text-xl focus:outline-none border-8 border-primary-800 text-white inline-flex bg-primary-800 duration-200 focus-visible:outline-primary-800 focus-visible:ring-primary-800 hover:text-primary-800 hover:bg-transparent lg:w-auto px-6 py-4 text-center w-full shadow-sm shadow-primary-800 font-bold">
                Go back Home
              </Link>
            </div>
          </div>
        </div>
        <div className="py-32 px-15 lg:px-32">
          <SVG
            src="img/fillers/puzzled-guy.svg"
            width={350}
            height="auto"
            className="rounded-xl"></SVG>
        </div>
      </section>
      {/* <section className="bg-base flex flex-col justify-start items-start xl:p-14 h-screen relative overflow-hidden z-0"></section> */}
      <footer className="z-0 relative absolute bottom-0 left-0">
        <div className=" w-full grid absolute left-0 bottom-0">
          <div className="w-full relative h-10 md:h-15 bg-primary-700"></div>
          <div className="w-full relative h-10 md:h-15 bg-primary-600"></div>
          <div className="w-full relative h-10 md:h-15 bg-primary-400"></div>
        </div>
      </footer>
    </>
  );
}
