import { useState } from "react";
import Link from "next/link";
import RttFullLogo from "@/components/Logos/RttFullLogo";
import SVG from "react-inlinesvg";
import { BsGithub, BsLinkedin, BsPersonWorkspace } from "react-icons/bs";
import { VscCompassDot } from "react-icons/vsc";
import { HiOutlineSaveAs } from "react-icons/hi";
import { BiFoodMenu } from "react-icons/bi";
import { IoIosLeaf } from "react-icons/io";

export default function LearnMorePage() {
  const [logoColor, setLogoColor] = useState("white");

  return (
    <div className="min-w-screen bg-primary-800 min-h-screen">
      <header className="container px4 mx-auto relative w-full bg-primary-800">
        <div className="mx-auto relative w-full  flex  flex-row items-center justify-between px-12  py-6">
          <div className="hidden sm:inline-block">
            <RttFullLogo />
          </div>

          <nav className="items-start flex-grow flex flex-row mt-0 justify-end pb-0">
            <div className="items-center inline-flex gap-2 lg:ml-auto md:mt-0 mt-3 list-none">
              <Link
                href="/auth/login"
                className="text-white text-2xl py-2 relative group  hover:text-primary-300 transition-all duration-150 hover:scale-105 hover:contrast-200 font-extrabold lg:mx-4 md:mx-3 mx-2">
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="bg-white text-xl py-1.5 leading-none focus:outline-none px-2 border-4 border-white hover:border-primary-300 hover:contrast-200 duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 group hover:bg-transparent hover:text-primary-300 text-primary-800 font-bold inline-flex items-center justify-center shadow-md shadow-primary-900 hover:shadow-primary-700/40 hover:scale-105">
                Create an Account
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="px-auto">
        <section className="bg-base">
          <div className="container mx-auto py-16 px-4">
            <div className="flex items-center justify-between">
              <div className="lg:w-2/5">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary-800 mb-6">
                  Who Are We?
                </h1>
                <p className="lg:text-xl text-primary-700 mb-6 font-semibold">
                  Restaurant to Table is the ultimate platform for discovering
                  new recipes, saving your favorites, and creating custom recipe
                  collections. Whether you&apos;re a seasoned chef or just
                  starting out in the kitchen, we have a wide range of recipes
                  to suit your taste buds and dietary preferences. Our intuitive
                  search feature allows you to find recipes based on
                  ingredients, cuisines, and more.
                </p>
                <Link
                  href="/auth/signup"
                  className="bg-primary-700 text-lg py-2 leading-none px-5 mr-6 border-4 border-primary-700   hover:bg-transparent hover:text-primary-700 text-white font-bold inline-flex items-center justify-center shadow-md shadow-primary-700 hover:shadow-primary-600/40 transition-all hover:scale-105">
                  Sign Me Up!
                </Link>
                <Link
                  href="/landing"
                  className="bg-primary-700 text-lg py-2 leading-none  px-5 border-4 border-primary-700  hover:bg-transparent hover:text-primary-700 text-white font-bold inline-flex items-center justify-center shadow-md shadow-primary-700 hover:shadow-primary-600/40 transition-all  hover:scale-105">
                  Landing Page
                </Link>
              </div>
              <div className="hidden lg:flex w-3/5 flex justify-center items-center">
                <SVG
                  src="img/fillers/family-eating.svg"
                  className="h-auto w-[500px] xl:w-[650px] flex-initial rounded-3xl m-15"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="pt-12 pb-16 bg-base-accent">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-800 mb-4">
                Key Features
              </h2>
              <p className="text-xl text-primary-700 font-semibold mb-12">
                Discover what makes Restaurant to Table the perfect platform for
                your culinary adventures.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <span className="inline-flex items-center justify-center rounded-full text-lg font-semibold bg-primary-700 text-white w-12 h-12 mr-2">
                    <VscCompassDot className="w-7 h-auto" />
                  </span>
                </div>
                <div className="text-xl font-bold text-primary-800 mb-2">
                  Discover New Recipes
                </div>
                <p className="font-medium text-primary-600 mb-4">
                  Explore a vast collection of recipes from around the world.
                  Find inspiration for every meal with our diverse range of
                  cuisines, dietary options, and cooking styles.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <span className="inline-flex items-center justify-center rounded-full text-lg font-semibold bg-primary-700 text-white w-12 h-12 mr-2">
                    <HiOutlineSaveAs className="w-7 h-auto" />
                  </span>
                </div>
                <div className="text-xl font-bold text-primary-800 mb-2">
                  Save Your Favorites
                </div>
                <p className=" font-medium text-primary-600 mb-4">
                  Keep track of your favorite recipes and easily access them
                  whenever you want. Organize your saved recipes into
                  personalized collections for quick and convenient meal
                  planning.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <span className="inline-flex items-center justify-center rounded-full text-lg font-semibold bg-primary-700 text-white w-12 h-12 mr-2">
                    <BiFoodMenu className="w-7 h-auto" />
                  </span>
                </div>
                <div className="text-xl font-bold text-primary-800 mb-2">
                  Create Custom Collections
                </div>
                <p className="font-medium text-primary-600 mb-4">
                  Take control of your culinary journey by creating custom
                  recipe collections. Whether it&apos;s a themed menu, a special
                  occasion, or a personal cookbook, you can curate and share
                  your unique collection with ease.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="text-primary-700 px-10 xl:px-20 lg:columns-2 pt-16 pb-8  bg-base ">
          <div className="  mx-auto break-after-column ">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-3 font-extrabold text-primary-800">
              Tailored For You
            </h1>
            <p className="leading-relaxed font-medium text-lg text-primary-700">
              At Restaurant to table, we care about your health and safety.
              That&apos;s why we&apos;ve included a convenient feature that
              allows users to save their dietary preferences, health
              restrictions and favorite cultural cusinies for later to their
              profile. This feature aims to accommodate users with specific
              dietary needs, ensuring that they can easily discover and access
              recipes that align with their preferences. Here are just a few of
              our many filtering options:
            </p>
          </div>
          <div className=" hidden lg:block xl:pl-20 pl-10 w-full lg:columns-3 ">
            <div className=" mx-auto break-after-column">
              <h2 className="tracking-tight font-bold text-primary-700 tracking-wider text-md mb-3">
                DIET STYLES
              </h2>
              <ul>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  High-Fiber
                </li>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  Low-Carb
                </li>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  Low-Fat
                </li>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  Low-Sodium
                </li>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  Balanced
                </li>
              </ul>
            </div>
            <div className="  mx-auto break-after-column">
              <h2 className="tracking-tight font-bold text-primary-700 tracking-wider text-md mb-3">
                HEALTH RESTRICTIONS
              </h2>
              <ul>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  Dairy-Free
                </li>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  Lupine-Free
                </li>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  Peanut-Free
                </li>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  Red-Meat-Free
                </li>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  Sulfite-Free
                </li>
              </ul>
            </div>
            <div className=" mx-auto break-after-column">
              <h2 className="tracking-tight font-bold text-primary-700 tracking-wider text-md mb-3">
                CULINARY PREFERENCES
              </h2>
              <ul>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  Greek
                </li>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  Italian
                </li>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  Kosher
                </li>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  Nordic
                </li>
                <li className=" text-md mb-2 flex font-medium items-center text-primary-700 ">
                  <IoIosLeaf className="h-5 w-auto mr-1 inline-block" />
                  South East Asian
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-center mt-4 invisible lg:visible text-primary-800 text-lg font-bold">
            And Many More...
          </h3>
          <div className="flex justify-center mt-3">
            <a
              href="https://developer.edamam.com/edamam-recipe-api"
              className="shadow-xl shadow-primary-800/40">
              <SVG
                src="/img/logos/edamam.svg"
                className=" transition duration-150 hover:scale-105 mt-4 h-auto z-30"
                width={200}
              />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-primary-800 overflow-visible pt-32 pb-10 relative">
        <svg
          className="absolute -top-2 left-0 w-full z-10"
          viewBox="0 -5 1430 110"
          preserveAspectRatio="none">
          <path
            className="fill-current text-base"
            d="M0 0h1440v55.6c-176.8 46.4-331.6 59.9-479 33.4C846.8 65.7 741 0 610.6 0 465.2 0 349.7 79.4 214.4 55.6 60.8 29.1 0 9.7 0 0z"
          />
        </svg>

        <div className="container mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Get in touch!
          </h2>
          <p className="text-xl text-primary-300 font-semibold mb-8">
            Connect with me on social media or visit my portfolio website.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://github.com/15ogburnw"
              className="text-white hover:contrast-200 hover:scale-105 hover:text-primary-300 transition duration-200">
              <BsGithub className="w-9 mx-2 h-9" />
            </a>
            <a
              href="https://www.linkedin.com/in/wade-ogburn-11b806172/"
              className="text-white hover:contrast-200 hover:scale-105 hover:text-primary-300 transition duration-200">
              <BsLinkedin className="w-9 mx-2 h-9" />
            </a>
            <a
              href="https://my-portfolio-c92iln275-15ogburnw.vercel.app/"
              className="text-white hover:text-primary-300 hover:contrast-200 hover:scale-105 transition duration-200">
              <BsPersonWorkspace className="w-9 mx-2 h-9" />
            </a>
          </div>
          <p className="mt-8 text-md font-semibold text-primary-300">
            © 2023 Wade Ogburn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
