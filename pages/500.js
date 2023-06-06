import { useRouter } from "next/router";

export default function ServerErrorPage() {
  const router = useRouter();
  return (
    <section className="bg-white ">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div>
          <p className="text-sm font-medium text-emerald-500">500 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
            Oh No! Something went wrong
          </h1>
          <p className="mt-4 text-gray-500 ">
            We may be having technical difficulties right now. Please try again
            later.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto  hover:bg-gray-100 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-emerald-500 rounded-lg shrink-0 sm:w-auto hover:bg-emerald-600">
              Take me home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
