import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import RttCircleLogo from "@/public/img/rtt-logos/RttCircleLogo";

export default function LearnMorePage() {
  return (
    <div className="min-w-screen bg-gray-100 min-h-screen">
      <header className="container px4 mx-auto relative w-full bg-gray-100">
        <div className="mx-auto relative w-full  flex  flex-row items-center justify-between px-12  py-6">
          <Link
            href="/dashboard"
            className=" hover:opacity-60 flex align-middle items-center lg:justify-start">
            {
              <>
                <RttCircleLogo className="h-7 w-7 mr-2 inline-block" />
                <div className="text-2xl  inline-block font-black  text-primary-800 tracking-tighter ">
                  Restaurant to Table.
                </div>
              </>
            }
          </Link>

          <nav className="items-start flex-grow flex flex-row mt-0 justify-end pb-0 ">
            <div className="items-center inline-flex gap-2 lg:ml-auto md:mt-0 mt-3 list-none">
              <Link
                href="/auth/login"
                className="text-primary-700 text-2xl py-2 relative group  hover:text-primary-800/60 font-extrabold lg:mx-4 md:mx-3 mx-2">
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="bg-primary-700 text-xl py-1.5 leading-none focus:outline-none px-2 border-4 border-primary-700 hover:border-primary-700/60 duration-200 active:text-primary-700 focus-visible:outline-2 focus-visible:outline-primary-700 focus-visible:outline-offset-2 group hover:bg-transparent hover:text-primary-700/60 text-white font-bold inline-flex items-center justify-center shadow-md shadow-primary-700 hover:shadow-primary-700/40">
                Create an Account
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-gray-100">
          <div className="container mx-auto py-16 px-4">
            <div className="flex items-center justify-between">
              <div className="w-2/5">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary-900 mb-6">
                  Who Are We?
                </h1>
                <p className="lg:text-xl text-primary-700 mb-6 font-bold">
                  Restaurant to Table is the ultimate platform for discovering
                  new recipes, saving your favorites, and creating custom recipe
                  collections. Whether you&apos;re a seasoned chef or just
                  starting out in the kitchen, we have a wide range of recipes
                  to suit your taste buds and dietary preferences. Our intuitive
                  search feature allows you to find recipes based on
                  ingredients, cuisines, and more.
                </p>
                <Link href="/auth/signup">
                  <span className="bg-primary-700 text-white font-bold py-3 px-6 rounded-md inline-block hover:bg-opacity-80 transition duration-200 mr-4">
                    Sign Me Up!
                  </span>
                </Link>
                <Link href="/landing">
                  <span className="bg-primary-700 text-white font-bold py-3 px-6 rounded-md inline-block hover:bg-opacity-80 transition duration-200">
                    Landing Page
                  </span>
                </Link>
              </div>
              <div className="w-3/5">
                <div className="bg-gray-300 rounded-lg w-850 h-850 mx-auto"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-900 mb-4">
                Key Features
              </h2>
              <p className="text-xl text-primary-700 mb-12">
                Discover what makes Restaurant to Table the perfect platform for
                your culinary adventures.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <span className="inline-flex items-center justify-center rounded-full text-lg font-semibold bg-primary-700 text-white w-10 h-10 mr-2">
                    01
                  </span>
                </div>
                <div className="text-lg font-medium text-primary-900 mb-2">
                  Discover New Recipes
                </div>
                <p className="text-base text-primary-700 mb-4">
                  Explore a vast collection of recipes from around the world.
                  Find inspiration for every meal with our diverse range of
                  cuisines, dietary options, and cooking styles.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <span className="inline-flex items-center justify-center rounded-full text-lg font-semibold bg-primary-700 text-white w-10 h-10 mr-2">
                    02
                  </span>
                </div>
                <div className="text-lg font-medium text-primary-900 mb-2">
                  Save Your Favorites
                </div>
                <p className="text-base text-primary-700 mb-4">
                  Keep track of your favorite recipes and easily access them
                  whenever you want. Organize your saved recipes into
                  personalized collections for quick and convenient meal
                  planning.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <span className="inline-flex items-center justify-center rounded-full text-lg font-semibold bg-primary-700 text-white w-10 h-10 mr-2">
                    03
                  </span>
                </div>
                <div className="text-lg font-medium text-primary-900 mb-2">
                  Create Custom Collections
                </div>
                <p className="text-base text-primary-700 mb-4">
                  Take control of your culinary journey by creating custom
                  recipe collections. Whether it&apos;s a themed menu, a special
                  occasion, or a personal cookbook, you can curate and share
                  your unique collection with ease.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary-900 py-12">
          <div className="container mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              Get in touch!
            </h2>
            <p className="text-xl text-primary-300 mb-8">
              Connect with me on social media or visit my portfolio website.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <a
                href="https://github.com/your-username"
                className="text-white hover:text-primary-300 transition duration-200">
                <BsGithub className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/your-username"
                className="text-white hover:text-primary-300 transition duration-200">
                <BsLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://your-portfolio-website.com"
                className="text-white hover:text-primary-300 transition duration-200">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 6.63 5.37 12 12 12 6.63 0 12-5.37 12-12C24 5.37 18.63 0 12 0zm0 22.45c-6.08 0-11.05-4.97-11.05-11.05C.95 5.32 5.92.35 12 .35s11.05 4.97 11.05 11.05c0 6.07-4.97 11.1-11.05 11.1zm.3-4.47c-2.28 0-4.37-1.2-5.53-3.17l1.9-1.31c.94 1.35 2.4 2.13 3.63 2.13 1.29 0 2.53-.84 2.53-2.45V9.09h1.67v3.39c0 2.59-1.47 4.02-3.77 4.02zm.01-11.18c-1.3 0-2.36-1.05-2.36-2.35s1.05-2.36 2.36-2.36c1.3 0 2.35 1.06 2.35 2.36 0 1.3-1.05 2.35-2.35 2.35zm-5.75 3.02H8.05v1.37H7.3v-1.37H6.05v-.81h1.25V7.39h.75v1.42h1.25v.81z"></path>
                </svg>
              </a>
            </div>
            <p className="mt-8 text-sm text-primary-300">
              © 2023 Your Name. All rights reserved.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
