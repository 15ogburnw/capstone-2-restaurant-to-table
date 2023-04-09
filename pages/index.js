import Head from "next/head";
import { useRouter } from "next/router";
import getRestaurantSearchResults from "@/lib/restaurantQueries/googleInfo";

export default function LandingPage({ restaurants }) {
  const router = useRouter();

  const handleAuthRedirect = (e) => {
    e.preventDefault();
    router.push("/auth/login");
  };

  return (
    <>
      <Head>
        <title>Restaurant To Table</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>This is the landing page</h1>
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
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  // // TODO: ADAPT THIS TO RETURN MULTIPLE RESULTS: WILL HAVE TO UPDATE THE LOGIC FOR FILTERING THE SUGGESTIC RESULTS IN
  // // THE MENUINFO.JS FILE
  // const restaurants = await getRestaurantSearchResults(
  //   "Commerce Kitchen",
  //   34.738228,
  //   -86.601791,
  //   10
  // );
  const restaurants = [];
  return { props: { restaurants } };
}
