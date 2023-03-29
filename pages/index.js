import Head from 'next/head'
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export default function LandingPage({ props }) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user, router]);

  const handleAuthRedirect = (e) => {
    e.preventDefault();
    router.push("/api/auth/login");
  };

  if (isLoading) return <LoadingScreen />;
  return (
    <>
      <Head>
        <title>Restaurant To Table</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  BRAND NAME
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                  Animated Night Hill Illustrations
                </h1>
                <div className="flex mb-4">
                  <a className="flex-grow text-purple-500 border-b-2 border-purple-500 py-2 text-lg px-1">
                    Description
                  </a>
                  <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                    Reviews
                  </a>
                  <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                    Details
                  </a>
                </div>
                <p className="leading-relaxed mb-4">
                  Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                  sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo
                  juiceramps cornhole raw denim forage brooklyn. Everyday carry
                  +1 seitan poutine tumeric. Gastropub blue bottle austin
                  listicle pour-over, neutra jean.
                </p>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Color</span>
                  <span className="ml-auto text-gray-900">Blue</span>
                </div>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Size</span>
                  <span className="ml-auto text-gray-900">Medium</span>
                </div>
                <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                  <span className="text-gray-500">Quantity</span>
                  <span className="ml-auto text-gray-900">4</span>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    $58.00
                  </span>
                  <button className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded">
                    Button
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2 max-w-['400px'] lg:h-auto h-64 object-cover object-center rounded">
                <Image
                  alt="ecommerce"
                  width={400}
                  height={400}
                  src="https://dummyimage.com/400x400"
                />
              </div>
            </div>
            <div className=" flex flex-auto items-center justify-end mr-6 lg:w-1/2 space-x-6 justify-self-end">
              <button
                onClick={handleAuthRedirect}
                className="px-6 col-span-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80"
              >
                Login
              </button>
              <button
                onClick={handleAuthRedirect}
                className="px-6 col-span-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              >
                Signup
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
