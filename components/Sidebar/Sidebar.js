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
import { useState } from "react";
import useSWR, { mutate } from "swr";
import Loading from "../Loading";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Sidebar() {
  const router = useRouter();
  //get current user's menus
  const { data, isLoading } = useSWR("/api/user/menus");

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

  const handleOpenModal = (e) => {
    setShowModal(true);
  };

  // TODO:
  // --FIX SO THAT THE NAVBAR COLLAPSES ON SMALLER SIZES - REFERENCE NOTUS TEMPLATE NAVBAR
  // --FIX LOGO - TRADE FOR LOGO WITH FULL NAME AND CENTER ABOVE AVATAR (FIGURE OUT WHY THE CURRENT LOGO IS FAILING TO LOAD SOMETIMES)
  // --Style this error message with a toast or something
  // -- try the routing thing again, because this wos drecting to the courthouse.

  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-base-accent border-r-2 border-gray-500/80 z-0">
      <div className="flex flex-col flex-1 mt-6">
        <nav>
          <Link
            href="/dashboard"
            className={` cursor:pointer flex items-center px-4 py-3 mt-3 font-bold rounded-md 
            ${
              router.pathname == "/dashboard"
                ? "text-emerald-800 bg-emerald-300 hover:bg-emerald-200"
                : "text-slate-900 hover:text-emerald-800 hover:bg-emerald-200"
            }
                    `}>
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
            className={`cursor:pointer flex items-center px-4 py-3 mt-3 font-bold rounded-md 
                      ${
                        router.pathname.indexOf("/dashboard/recipe-search") !==
                        -1
                          ? "text-emerald-800 bg-emerald-300 hover:bg-emerald-200"
                          : "text-slate-900 hover:text-emerald-800 hover:bg-emerald-200"
                      }`}>
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
            className={`cursor:pointer flex items-center px-4 py-3 mt-3 font-bold rounded-md 
                      ${
                        router.pathname.indexOf("/dashboard/restaurants") !== -1
                          ? "text-emerald-800 bg-emerald-300 hover:bg-emerald-200"
                          : "text-slate-900 hover:text-emerald-800 hover:bg-emerald-200"
                      }`}>
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
            className={`cursor:pointer flex items-center px-4 py-3 mt-3 font-bold rounded-md 
                      ${
                        router.pathname.indexOf("/dashboard/profile") !== -1
                          ? "text-emerald-800 bg-emerald-300 hover:bg-emerald-200"
                          : "text-slate-900 hover:text-emerald-800 hover:bg-emerald-200"
                      }`}>
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
            className={`cursor:pointer flex items-center px-4 py-3 mt-3 font-bold rounded-md 
                      ${
                        router.pathname.indexOf("/dashboard/settings") !== -1
                          ? "text-emerald-800 bg-emerald-300 hover:bg-emerald-200"
                          : "text-slate-900 hover:text-emerald-800 hover:bg-emerald-200"
                      }`}>
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
            className={
              "cursor:pointer flex items-center px-4 py-3 mt-3 font-bold rounded-md text-slate-900 hover:text-emerald-800 hover:bg-emerald-200"
            }>
            <ArrowRightOnRectangleIcon className="h-5 w-5 inline flex-none" />
            <span className="mx-4 font-medium">Sign Out</span>
          </Link>
        </nav>
        <div className="pt-5">
          <div className="flex items-center align-middle justify-between">
            <h2 className="text-base font-semibold text-gray-800 ">My Menus</h2>
            <div
              onMouseEnter={() => {
                setHoverModalBtn(true);
              }}
              onMouseLeave={() => setHoverModalBtn(false)}
              onClick={() => setShowModal(true)}>
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
            {/* {console.log("My menus:", menus)} */}
            {data?.menus?.length > 0
              ? data.menus.map((menu, idx) => (
                  <Link
                    href={`user/menus/${menu.id}`}
                    key={menu.id}
                    className="w-full h-ful mx-2 my-2 px-4">
                    <SideBarMenuItem
                      key={menu.name}
                      dotColor={getColor(idx)}
                      name={menu.name}
                    />
                  </Link>
                ))
              : null}

            <div className="flex justify-between w-full px-3 py-2 text-sm font-medium text-gray-600  duration-300 transform rounded-lg ">
              {/* Fix these from showing up at the same time */}
              <div className="flex items-center gap-x-2 ">
                {!isLoading && !data?.menus?.length ? (
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

      {showModal && !isLoading ? (
        <AddMenuModal setShowModal={setShowModal} />
      ) : null}
    </aside>
  );
}
