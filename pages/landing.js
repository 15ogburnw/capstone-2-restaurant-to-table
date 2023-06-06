import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <section className="bg-[#eaeadf] flex flex-col items-center h-screen relative overflow-hidden">
        <header className="mx-auto relative w-full max-w-7xl bg-">
          <div className="mx-auto relative w-full  flex  flex-row items-center justify-between px-6  py-6">
            <div className="text-primary-800 text-sm items-center  flex flex-row justify-between lg:justify-start">
              <Link
                href="/dashboard"
                className="text-base font-bold hover:text-primary-800/60 hover:border-primary-800/60 px-1.5 py-1 leading-none border-4 border-primary-800 text-primary-800">
                Restaurant to Table
              </Link>
            </div>
            <nav className="items-start flex-grow flex flex-row mt-0 justify-end pb-0 ">
              <div className="items-center inline-flex gap-2 lg:ml-auto md:mt-0 mt-3 list-none">
                <Link
                  href="/auth/login"
                  className="text-primary-800 text-md py-2 relative group hover:text-primary-800/40 font-bold lg:mx-4 md:mx-3 mx-2">
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-primary-800 text-md py-1.5 leading-none focus:outline-none px-2 border-4 border-primary-800 hover:border-primary-800/60 duration-200 active:text-primary-800 focus-visible:outline-2 focus-visible:outline-primary-800 focus-visible:outline-offset-2 group hover:bg-transparent hover:text-primary-800/60 text-white font-medium inline-flex items-center justify-center">
                  Create an Account
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main className="items-center relative w-full py-20 max-w-7xl md:px-12 z-30 mx-auto px-5 relative">
          <div>
            <div className="text-center lg:text-left">
              <p className="lg:text-primary-800 text-lg rounded-md px-3 py-1 font-bold bg-primary-800/10 inline-block">
                The ultimate platform for recipe search and menu creation.
              </p>
              <h1 className="lg:text-9xl md:text-8xl font-black mt-4 text-5xl tracking-tighter">
                <span className="block">Restaurant to Table.</span>
              </h1>
            </div>
            <div className="justify-start gap-2 flex flex-col mt-10 sm:flex-row w-full">
              <Link
                href="/auth/signup"
                className="items-center justify-center text-xl focus:outline-none border-4 border-primary-800 text-white inline-flex bg-primary-800 duration-200 focus-visible:outline-primary-800 focus-visible:ring-primary-800 hover:text-primary-800 hover:bg-transparent lg:w-auto px-6 py-4 text-center w-full shadow-sm shadow-primary-800">
                Get Started for Free
              </Link>
              <Link
                className="items-center p-1 justify-center text-xl inline-flex group duration-200 bg-gradient-to-r from-primary-300 via-primary-500 to-primary-700 lg:w-auto  h-full text-center w-full shadow-sm shadow-primary-800"
                href="/about">
                <span className="flex justify-center items-center group-hover:bg-[#eaeadf] lg:px-10 py-4 w-full h-full">
                  <span className="relative text-white group-hover:text-primary-800">
                    Learn more
                  </span>
                  <span className="ml-1 text-white group-hover:text-primary-800 relative group-hover:translate-x-2 transition-transform flex items-center justify-center duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                    </svg>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </main>
      </section>
      <footer className="relative mt-10">
        <div className="z-20 w-full grid absolute left-0 bottom-0">
          <div className="w-full h-10 md:h-15 bg-primary-700"></div>
          <div className="w-full h-10 md:h-15 bg-primary-600"></div>
          <div className="w-full h-10 md:h-15 bg-primary-400"></div>
        </div>
      </footer>
    </>
  );
}
