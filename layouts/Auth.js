import Link from "next/link";

export default function Auth({ children }) {
  return (
    <>
      <header className="absolute">
        <div className="mx-auto relative w-full  flex  flex-row items-center justify-between px-6  py-6">
          <div className="text-black text-sm items-center  flex flex-row justify-between lg:justify-start">
            <Link
              href="/dashboard"
              className="text-base font-bold hover:text-primary-800/60 hover:border-primary-800/60 px-1.5 py-1 leading-none border-4 border-primary-800 text-primary-800">
              Restaurant to Table
            </Link>
          </div>
        </div>
      </header>
      <div
        className="min-w-screen flex flex-col min-h-screen bg-base"
        data-tails-google-fonts="Cedarville+Cursive">
        {children}
      </div>
      {/* TODO Add a footer here  */}
    </>
  );
}
