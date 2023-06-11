import Link from "next/link";

import RttCircleLogo from "@/public/img/rtt-logos/RttCircleLogo";

export default function Auth({ children }) {
  return (
    <main className="h-screen w-screen  absolute">
      <header className="mx-auto absolute top-0 left-0 w-full bg- h-full z-0">
        <div className="mx-auto relative w-full  flex  bg-primary-300/40 h-1/4 shadow-md items-start justify-center">
          <Link
            href="/dashboard"
            className=" hover:opacity-60 flex mt-12 relative items-center">
            {
              <>
                <RttCircleLogo className="h-9 w-9 mr-2 inline-block" />
                <div className="text-3xl  inline-block font-black  text-primary-800 tracking-tighter ">
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
