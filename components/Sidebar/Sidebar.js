// RIGHT NOW IF YOU CLICK ANYWHERE ON THE SCREEN THE MODAL FOR MAKING A MENU DISAPPEARS,

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  GlobeAltIcon,
  UserCircleIcon,
  MagnifyingGlassCircleIcon,
  RectangleStackIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import SVG from "react-inlinesvg";
import { useRouter } from "next/router";
import SideBarMenuItem from "./SidebarMenuItem";
import AddMenuModal from "../Modals/AddMenuModal";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faSquarePlus as faSquarePlusSolid } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import useSWR, { mutate, preload } from "swr";
import Loading from "../Loading";
import ClientOnlyPortal from "../HOF/ClientOnlyPortal";
import useCloseWithOutsideClick from "@/lib/hooks/useCloseWithOutsideClick";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Sidebar() {
  const router = useRouter();
  //get current user's menus
  const { data: menus, isLoading } = useSWR("/api/user/menus");

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

  // hover state for button that opens modal
  const [hoverModalBtn, setHoverModalBtn] = useState(false);

  // reference modal and set it to close if the user clicks outside its bounds
  const modalRef = useRef(null);
  const [modalOpen, setModalOpen] = useCloseWithOutsideClick(modalRef);

  const getColor = (idx) => {
    if (idx < COLORS.length) return COLORS[idx];
    else {
      idx = idx % COLORS.length;
      return COLORS[idx];
    }
  };

  const handleSignOut = (e) => {
    e.preventDefault();

    // clears the swr cache
    const clearCache = async () =>
      await mutate(() => true, undefined, { revalidate: false });

    // sign out of supabase, clear cache, and redirect to landing page
    async function signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw Error;
      await clearCache();
      await router.push("/");
    }
    signOut();
  };

  // TODO:
  // --FIX SO THAT THE NAVBAR COLLAPSES ON SMALLER SIZES - REFERENCE NOTUS TEMPLATE NAVBAR
  // --FIX LOGO - TRADE FOR LOGO WITH FULL NAME AND CENTER ABOVE AVATAR (FIGURE OUT WHY THE CURRENT LOGO IS FAILING TO LOAD SOMETIMES)
  // --Style this error message with a toast or something
  // -- try the routing thing again, because this wos drecting to the courthouse.

  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto  border-r border-gray-300 ">
      <Link href="/dashboard">
        <SVG
          src="/img/rtt-logos/rtt-icon.svg"
          className="h-8 w-auto inline mr-3"
          alt="logo"
        />
      </Link>

      <div className="flex flex-col flex-1 mt-6">
        <nav>
          <Link
            href="/dashboard"
            className={` flex items-center px-4 py-3 mt-3 font-bold rounded-md 
                      ${
                        router.pathname.indexOf("/dashboard") !== -1 &&
                        router.pathname.indexOf("/dashboard/") === -1
                          ? "text-emerald-500 hover:text-emerald-600 bg-gray-100"
                          : "text-slate-700 hover:text-slate-500"
                      }`}
          >
            <RectangleStackIcon
              className={`h-5 w-5 inline flex-none
                        ${
                          router.pathname.indexOf("/dashboard") !== -1 &&
                          router.pathname.indexOf("/dashboard/") === -1
                            ? "opacity-75"
                            : ""
                        }`}
            />
            <span className="mx-4 font-medium">Dashboard</span>
          </Link>

          <Link
            href="/dashboard/recipe-search"
            className={` flex items-center px-4 py-3 mt-3 font-bold rounded-md 
                      ${
                        router.pathname.indexOf("/dashboard/recipe-search") !==
                        -1
                          ? "text-emerald-500 hover:text-emerald-600 bg-gray-100"
                          : "text-slate-700 hover:text-slate-500"
                      }`}
          >
            <MagnifyingGlassCircleIcon
              className={`h-5 w-5 inline flex-none
                        ${
                          router.pathname.indexOf(
                            "/dashboard/recipe-search"
                          ) !== -1
                            ? "opacity-75"
                            : ""
                        }`}
            />
            <span className="mx-4 font-medium">Search Recipes</span>
          </Link>

          <Link
            href="/dashboard/restaurants"
            className={` flex items-center px-4 py-3 mt-3 font-bold rounded-md 
                      ${
                        router.pathname.indexOf("/dashboard/restaurants") !== -1
                          ? "text-emerald-500 hover:text-emerald-600 bg-gray-100"
                          : "text-slate-700 hover:text-slate-500"
                      }`}
          >
            <GlobeAltIcon
              className={`h-5 w-5 inline flex-none
                        ${
                          router.pathname.indexOf("/dashboard/restaurants") !==
                          -1
                            ? "opacity-75"
                            : ""
                        }`}
            />
            <span className="mx-4 font-medium">Find a Restaurant</span>
          </Link>

          <Link
            href="/dashboard/profile"
            className={` flex items-center px-4 py-3 mt-3 font-bold rounded-md 
                      ${
                        router.pathname.indexOf("/dashboard/profile") !== -1
                          ? "text-emerald-500 hover:text-emerald-600 bg-gray-100"
                          : "text-slate-700 hover:text-slate-500"
                      }`}
          >
            <UserCircleIcon
              className={`h-5 w-5 inline flex-none
                        ${
                          router.pathname.indexOf("/dashboard/profile") !== -1
                            ? "opacity-75"
                            : ""
                        }`}
            />
            <span className="mx-4 font-medium">Profile</span>
          </Link>

          <Link
            href="/dashboard/settings"
            className={` flex items-center px-4 py-3 mt-3 font-bold rounded-md 
                      ${
                        router.pathname.indexOf("/dashboard/settings") !== -1
                          ? "text-emerald-500 hover:text-emerald-600 bg-gray-100"
                          : "text-slate-700 hover:text-slate-500"
                      }`}
          >
            <Cog6ToothIcon
              className={`h-5 w-5 inline flex-none
                        ${
                          router.pathname.indexOf("/dashboard/settings") !== -1
                            ? "opacity-75"
                            : ""
                        }`}
            />
            <span className="mx-4 font-medium">Settings</span>
          </Link>

          <Link
            href="#"
            onClick={handleSignOut}
            className=" flex items-center px-4 py-3 mt-3 font-bold rounded-md text-slate-700 hover:text-slate-500"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 inline flex-none" />
            <span className="mx-4 font-medium">Logout</span>
          </Link>
        </nav>
        <div className="pt-5">
          <div className="flex items-center align-middle justify-between">
            <h2 className="text-base font-semibold text-gray-800 ">My Menus</h2>
            <div
              onMouseEnter={() => {
                setHoverModalBtn(true);
                preload("/api/user/menus", (url) =>
                  fetch(url).then((res) => res.json())
                );
              }}
              onMouseLeave={() => setHoverModalBtn(false)}
            >
              {hoverModalBtn ? (
                <FontAwesomeIcon
                  icon={faSquarePlusSolid}
                  className="font-normal h-5 w-5 text-emerald-600 flex-none cursor-pointer"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  className="font-normal h-5 w-5 text-emerald-600 flex-none cursor-pointer"
                />
              )}
            </div>
          </div>

          <nav className="mt-4 mx-3 space-y-3 ">
            {console.log("My menus:", menus)}
            {menus?.length > 0 &&
              menus.map((menu, idx) => (
                <Link
                  href={`user/menus/${menu.id}`}
                  key={menu.id}
                  className="w-full h-ful mx-2 my-2 px-4"
                >
                  <SideBarMenuItem
                    key={menu.name}
                    dotColor={getColor(idx)}
                    name={menu.name}
                  />
                </Link>
              ))}

            <div className="flex justify-between w-full px-3 py-2 text-sm font-medium text-gray-600  duration-300 transform rounded-lg ">
              <div className="flex items-center gap-x-2 ">
                {!menus || menus.length === 0 ? (
                  <span>
                    You don&apos;t have any menus yet! Create your first one to
                    get started
                  </span>
                ) : null}
                {isLoading && <Loading size="md" />}
              </div>
            </div>
          </nav>
        </div>
      </div>
      <ClientOnlyPortal selector="#modals">
        {modalOpen && <AddMenuModal ref={modalRef} />}
      </ClientOnlyPortal>
    </aside>
  );
}
