import Link from "next/link";

import {
  MagnifyingGlassCircleIcon,
  RectangleStackIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import { useRouter } from "next/router";
import SideBarMenuItem from "./SidebarMenuItem";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import Loading from "../Loading";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import NewMenuModal from "@/components/Modals/NewMenuModal";

export default function Sidebar() {
  const router = useRouter();
  //get current user's menus
  const { data, isLoading, isValidating } = useSWR("/api/user/menus");

  // initialize client for supabase
  const supabase = useSupabaseClient();

  // possible colors for list of user menus in sidebar
  const COLORS = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-emerald-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  // state for whether the modal for adding a new menu is showing
  const [showModal, setShowModal] = useState(false);

  const getColor = (idx) => {
    if (idx < COLORS.length) return COLORS[idx];
    else {
      idx = idx % COLORS.length;
      return COLORS[idx];
    }
  };

  // sign out of supabase, clear cache, and redirect to landing page
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
      console.error(error);
    }

    // clear the SWR cache
    await mutate(() => true, undefined, { revalidate: false });
    router.push("/landing");
  };

  // TODO:
  // --FIX SO THAT THE NAVBAR COLLAPSES ON SMALLER SIZES - REFERENCE NOTUS TEMPLATE NAVBAR
  // --FIX LOGO - TRADE FOR LOGO WITH FULL NAME AND CENTER ABOVE AVATAR (FIGURE OUT WHY THE CURRENT LOGO IS FAILING TO LOAD SOMETIMES)
  // --Style this error message with a toast or something

  return (
    <aside className=" bg-white border-r-2 w-1/5 md:w-1/4 hidden md:inline-block border-primary-700/80">
      <nav className="flex flex-col ">
        <Link
          href="/dashboard"
          className={` cursor:pointer flex items-center  px-8 py-3 mt-3 font-bold group
            ${
              router.pathname == "/dashboard"
                ? "text-white bg-primary-800 font-bold hover:bg-primary-400/80 hover:text-primary-800"
                : "text-primary-800 hover:bg-primary-800 hover:text-white"
            }
                    `}>
          <RectangleStackIcon
            className={`h-7 w-7 inline flex-none
                        ${
                          router.pathname.indexOf("/dashboard") !== -1 &&
                          router.pathname.indexOf("/dashboard/") === -1
                            ? "stroke-2 "
                            : "group-hover:stroke-2"
                        }`}
          />
          <span className="mx-4 font-semibold text-xl">My Kitchen</span>
        </Link>

        <Link
          href="/dashboard/recipe-search"
          className={`cursor:pointer flex items-center px-8 py-3 mt-3 font-bold group
                      ${
                        router.pathname.indexOf("/dashboard/recipe-search") !==
                        -1
                          ? "text-white bg-primary-800 font-bold hover:bg-primary-400/80 hover:text-primary-800"
                          : "text-primary-800 hover:bg-primary-800 hover:text-white"
                      }`}>
          <MagnifyingGlassCircleIcon
            className={`h-7 w-7 inline flex-none
                        ${
                          router.pathname.indexOf(
                            "/dashboard/recipe-search"
                          ) !== -1
                            ? " stroke-2"
                            : "group-hover:stroke-2"
                        }`}
          />
          <span className="mx-4 font-semibold text-xl">Search Recipes</span>
        </Link>

        <Link
          href="/dashboard/settings"
          className={`cursor:pointer flex items-center px-8 py-3 mt-3 font-bold group
                      ${
                        router.pathname.indexOf("/dashboard/settings") !== -1
                          ? "text-white bg-primary-800 font-bold hover:bg-primary-400/80 hover:text-primary-800"
                          : "text-primary-800 hover:bg-primary-800 hover:text-white"
                      }`}>
          <Cog6ToothIcon
            className={`h-7 w-7 inline flex-none
                        ${
                          router.pathname.indexOf("/dashboard/settings") !== -1
                            ? " stroke-2 "
                            : "group-hover:stroke-2"
                        }`}
          />
          <span className="mx-4 font-semibold text-xl">Settings</span>
        </Link>

        <Link
          href="#"
          onClick={handleSignOut}
          className={
            "cursor:pointer flex items-center px-8 py-3 mt-3 font-bold  text-primary-800 hover:text-white hover:bg-primary-800 group"
          }>
          <ArrowRightOnRectangleIcon className="h-7 w-7 inline flex-none group-hover:stroke-2" />
          <span className="mx-4 font-semibold text-xl">Sign Out</span>
        </Link>

        <div className="bg-green-500/50 mx-2 mt-7 mb-4 rounded-lg">
          <div className="mx-3 flex items-center border-b-2 border-primary-700 pb-2 align-middle justify-between pt-3">
            <span className="text-xl font-bold  text-primary-700 ml-2 ">
              My Menus
            </span>

            <button
              data-add-menu-modal="#add-menu-modal"
              className=" text-lg font-bold border-2 text-primary-700 border-primary-700 bg-transparent h-5 w-5 pb-1 mr-2  hover:text-white hover:bg-primary-700 flex align-middle rounded-lg items-center justify-center">
              <span>{"+"}</span>
            </button>
          </div>

          <div className=" mx-3 mt-2">
            {/* {console.log("My menus:", menus)} */}
            {isLoading || isValidating
              ? null
              : data?.menus?.length > 0
              ? data.menus.map((menu, idx) => (
                  <Link href={`/dashboard/menus/${menu.id}`} key={menu.id}>
                    <SideBarMenuItem
                      key={menu.name}
                      dotColor={getColor(idx)}
                      name={menu.name}
                    />
                  </Link>
                ))
              : null}

            <div className=" w-full px-3 py-2 text-sm font-medium text-gray-600  duration-300 transform rounded-lg ">
              {/* Fix these from showing up at the same time */}
              <div className="flex items-center justify-center gap-x-2 ">
                {!isLoading && !data?.menus?.length ? (
                  <span>
                    You don&apos;t have any menus yet! Create your first one to
                    get started
                  </span>
                ) : null}
                {isLoading || isValidating ? (
                  <div className="mb-4">
                    <Loading size="md" />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <NewMenuModal />
    </aside>
  );
}
