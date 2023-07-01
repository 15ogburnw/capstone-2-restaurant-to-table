import Dashboard from "@/layouts/Dashboard";

import { useUser } from "@supabase/auth-helpers-react";
import SVG from "react-inlinesvg";
import { MdFavorite } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import { IoIosSave } from "react-icons/io";
import Link from "next/link";

export default function Home() {
  const user = useUser();
  return (
    <main>
      <div>
        <div className=" mx-auto py-12 px-4 text-gray-700">
          <div className="flex flex-row justify-evenly">
            <h1 className="text-center text-3xl text-primary-700 font-black ">
              {`Welcome Back ${user?.email}!`}
            </h1>
          </div>

          <div className=" flex mt-5 flex-row lg:align-top flex-wrap lg:mt-5  justify-evenly ">
            <SVG
              className="float-none static rounded-md max-w-[80%] xl:max-w-[75%] mx-5 lg:mx-2 "
              src="img/fillers/ingredients.svg"
            />
            <div className="flex  flex-col mt-6 gap-y-10  w-auto">
              <div className="ml-3">
                <Link
                  href="/dashboard/recipes/favorites"
                  className="flex flex-row group items-center gap-x-4">
                  <p className="w-10 h-10 rounded-full flex items-center pt-1 justify-center font-extrabold text-2xl group-hover:cursor-pointer group-hover:bg-primary-600 bg-primary-700 text-white">
                    <MdFavorite />
                  </p>

                  <h1 className="font-extrabold text-2xl text-primary-700 group-hover:text-primary-600 group-hover:cursor-pointer ">
                    My Favorites
                  </h1>
                </Link>
                <p className="mt-4 min-w-min max-w-2xl text-lg font-semibold text-primary-700">
                  Rediscover the culinary treasures you&apos;ve saved on your
                  favorite recipe webpage. Whether it&apos;s that mouthwatering
                  pasta dish you&apos;ve been craving or the comforting soup
                  that warms your soul, it&apos;s time to revisit your trusted
                  collection. The recipes you&apos;ve carefully curated are
                  patiently waiting for you, ready to transform your kitchen
                  into a haven of delicious flavors.
                </p>
              </div>
              <div className="ml-3">
                <Link
                  href="/dashboard/recipes/saved"
                  className="flex flex-row items-center group gap-x-4">
                  <p className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-2xl group-hover:cursor-pointer group-hover:bg-primary-600 bg-primary-700 text-white">
                    <IoIosSave />
                  </p>

                  <h1 className="font-extrabold text-2xl text-primary-700 group-hover:text-primary-600 group-hover:cursor-pointer">
                    Saved Recipes
                  </h1>
                </Link>
                <p className="mt-4 min-w-min max-w-2xl text-lg font-semibold text-primary-700">
                  Are you ready to unlock a world of culinary inspiration? Your
                  saved recipe collection is patiently awaiting your return,
                  filled with delightful possibilities for your future culinary
                  endeavors. Rediscover the joy of cooking as you explore the
                  recipes you&apos;ve diligently bookmarked for future
                  reference.
                </p>
              </div>
              <div className="ml-3">
                <Link
                  href="/dashboard/recipe-search"
                  className="flex items-center group flex-row gap-x-4">
                  <p className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-2xl group-hover:bg-primary-600 group-hover:cursor-pointer bg-primary-700 text-white">
                    <ImSearch className="w-5 h-5" />
                  </p>

                  <h1 className="font-extrabold text-2xl group-hover:text-primary-600 group-hover:cursor-pointer text-primary-700 ">
                    Search For Something New
                  </h1>
                </Link>
                <p className="mt-4 min-w-min max-w-2xl text-lg font-semibold text-primary-700">
                  Craving a taste of something new and exciting? It&apos;s time
                  to ignite your culinary curiosity and embark on a journey of
                  delicious discovery. From global cuisines to trending culinary
                  trends, the possibilities are endless. With each search,
                  you&apos;re one step closer to discovering your next culinary
                  masterpiece.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

Home.layout = Dashboard;
