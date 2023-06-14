import Link from "next/link";
import { useRouter } from "next/router";
import SVG from "react-inlinesvg";
import { BsArrowLeft } from "react-icons/bs";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <>
      <section className="bg-base flex items-start xl:p-14 h-screen relative overflow-hidden">
        <div className=" relative flex-col lg:justify-center items-center lg:justify-start lg:items-start w-auto py-20  md:px-20 z-30  px-5 ">
          <div>
            <div className="text-center lg:text-left">
              <h1 className="lg:text-9xl text-primary-900 md:text-8xl font-black mt-4 text-7xl tracking-tighter">
                <span className="block">404</span>
              </h1>
              <h2 className="lg:text-6xl text-primary-900 md:text-6xl font-black mt-4 text-6xl tracking-tighter">
                <span className="block">Page Not Found.</span>
              </h2>
              <p className="text-white text-lg rounded-md px-3 py-1 mt-10 mb-1 font-extrabold bg-primary-500/80 inline-block">
                The page or resource you are looking for could not be found.
              </p>
            </div>
            <div className="justify-start gap-4 flex flex-col mt-10 sm:flex-row w-full">
              <Link
                className="items-center p-1 justify-center text-xl inline-flex group duration-200 bg-gradient-to-r from-primary-300 font-bold via-primary-500 to-primary-700 lg:w-auto  h-full text-center w-full shadow-md shadow-primary-700"
                href="#"
                onClick={() => {
                  router.back();
                }}>
                <span className="flex justify-center items-center group-hover:bg-[#eaeadf] lg:px-6 xl:px-10 py-4 w-full h-full">
                  <BsArrowLeft className="mr-2 text-white stroke-[1.25] group-hover:text-primary-800 relative group-hover:-translate-x-2 transition-transform flex items-center justify-center duration-200" />
                  <span className="relative text-white group-hover:text-primary-800">
                    Take Me Back
                  </span>
                </span>
              </Link>
              <Link
                href="/landing"
                className="items-center justify-center text-xl focus:outline-none border-4 border-primary-700 text-white inline-flex bg-primary-700 duration-200 focus-visible:outline-primary-700 focus-visible:ring-primary-700 hover:text-primary-700 hover:bg-transparent lg:w-auto px-8  text-center w-full shadow-md shadow-primary-700 font-bold">
                Go Home
              </Link>
            </div>
          </div>
        </div>
        <div className="invisible lg:visible absolute, py-32 right-0 px-15  lg:px-32">
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
