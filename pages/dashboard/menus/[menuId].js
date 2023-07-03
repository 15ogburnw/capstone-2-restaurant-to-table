import Dashboard from "@/layouts/Dashboard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import RecipeListItem from "@/components/Recipes/RecipeListItem";
import Loading from "@/components/Loading";
import RetryLoad from "@/components/RetryLoad";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { useContext } from "react";
import ToastContext from "@/lib/contexts/ToastContext";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function MenuPage() {
  const router = useRouter();
  const { menuId } = router.query;
  const [menuName, setMenuName] = useState();
  const [menuRecipes, setMenuRecipes] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState();
  const [pageRecipes, setPageRecipes] = useState();
  const [favoriteRecipes, setFavoriteRecipes] = useState();
  const [view, setView] = useState("all");
  const supabase = useSupabaseClient();
  const { mutate } = useSWRConfig();
  const showToast = useContext(ToastContext);

  const {
    data: menu,
    isLoading,
    error: menuError,
  } = useSWR(`/api/user/menus/${menuId}`);
  const {
    data: favorites,
    error: favError,
    mutate: mutateFavs,
    isMutating: favsMutating,
  } = useSWR("/api/user/favorite-recipes");

  /** TODO: nice to have: incorporate ChatGPT to provide recipe recommendations */

  /**  If data is returned by SWR, update the state for the menu recipes.
   * This also triggers if the menu is mutated.
   */
  useEffect(() => {
    if (menu && menu.length > 0) {
      setMenuRecipes(menu[0].recipes);

      setMenuName(menu[0].name);
    }
  }, [menu]);

  /**
   * When the page changes or the recipes in the menu change, update the state for the recipes on the current page.
   */
  useEffect(() => {
    // If the user has selected to view all recipes or is on the default view, set state based on all menu recipes
    if (view === "all" && menuRecipes) {
      setNumPages(Math.ceil(menuRecipes.length / 15));
      if (currentPage * 15 > menuRecipes.length) {
        setPageRecipes(menuRecipes.slice(currentPage * 15 - 15));
      } else {
        setPageRecipes(
          menuRecipes.slice(currentPage * 15 - 15, currentPage * 15)
        );
      }
    }
    // If the user has clicked the button to filter by favorites, filter out the favorites and only display those
    else if (view === "favorites" && menuRecipes) {
      // if favorites is undefined or an empty array, set the state for the recipes visible when filtered to an empty array
      if (!favorites || favorites.length === 0) {
        setNumPages(0);
        setPageRecipes([]);
      }
      // If we do have favorites in the menu, set the state values for pagination and displayed recipes appropriately
      else {
        const favsInMenu = menuRecipes.filter((recipe) =>
          favoriteRecipes?.data?.map((recipe) => recipe.id)?.includes(recipe.id)
        );

        setNumPages(Math.ceil(favsInMenu.length / 15));
        if (currentPage * 15 > favsInMenu.length) {
          setPageRecipes(favsInMenu.slice(currentPage * 15 - 15));
        } else {
          setPageRecipes(
            favsInMenu.slice(currentPage * 15 - 15, currentPage * 15)
          );
        }
      }
    }
  }, [currentPage, menuRecipes, favoriteRecipes, favorites, view]);

  /**If any of the values associated with the SWR key for favorites change, update a state object
   * for favorite recipes. This gets passed down to each individual recipe list item.
   */
  useEffect(() => {
    if (favError) {
      console.error("There was a problem fetching the user's favorite recipes");
    } else {
      setFavoriteRecipes({
        data: favorites,
        mutate: mutateFavs,
        isMutating: favsMutating,
      });
    }
  }, [favorites, favError, mutateFavs, favsMutating]);

  if (isLoading) return <Loading size="xl" />;
  else if (menuError) return <RetryLoad dataName="menu" textSize="3xl" />;
  else if (menu?.length === 0) router.replace("/dashboard");
  else {
    return (
      <>
        <div className="flex justify-center">
          <div className="flex items-center border-b-4 pb-6 border-primary-700 mt-6 w-5/6 justify-between  md:px-8 lg:px-10">
            <div className="invisible">Invisible for spacing</div>
            <h2 className="text-3xl font-bold capitalize text-primary-700">
              {menuName}
            </h2>

            {/* TODO: implement this button */}
            <div className="flex items-center  gap-x-3">
              <button
                className="flex items-center justify-center w-1/2 px-5 py-2 text-md font-bold tracking-wide text-white transition  bg-red-600 rounded-lg  sm:w-auto gap-x-2 hover:bg-red-800 transition hover:scale-105 "
                onClick={async (e) => {
                  e.preventDefault();
                  const result = await ConfirmModal.fire({
                    title: `Are you sure you want to delete your menu "${menuName}"?`,
                    text: "You won't be able to revert this!",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "Cancel",
                  });
                  if (result.isConfirmed) {
                    const { error } = await supabase
                      .from("menus")
                      .delete()
                      .eq("id", menuId);
                    if (!error) {
                      await mutate("/api/user/menus");
                      showToast("success", {
                        text: `You have successfully deleted the menu "${menuName}"`,
                      });
                      router.push("/dashboard");
                    } else {
                      showToast("error", {
                        text: "There was a problem deleting the menu. Please try again",
                      });
                    }
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    showToast("success", {
                      text: "Successfully canceled! Your menu was not deleted",
                    });
                  }
                }}>
                <span>
                  <RiDeleteBin5Fill />
                </span>
                <span>Delete Menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* TODO: implement delete functionality for the menu, add option to change name of menu */}
        <div className=" px-4 flex flex-col h-full justify-start mt-10 gap-4 items-center">
          {!numPages && view === "all" ? null : (
            <div className="mt-0 flex flex-row items-center justify-between w-5/6  md:px-6 lg:px-8">
              <div className="inline-flex overflow-hidden bg-primary-700 divide-x divide-base-accent rounded-lg">
                <button
                  className={`px-5 py-2 text-xs font-bold  transition hover:enabled:bg-primary-600 sm:text-sm ${
                    view === "all"
                      ? "bg-primary-400 text-primary-800 cursor-not-allowed"
                      : "text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setView("all");
                  }}
                  disabled={view === "all" ? true : false}>
                  View all
                </button>

                <button
                  className={`px-5 py-2  font-bold transition text-sm hover:enabled:bg-primary-600 ${
                    view === "favorites"
                      ? "cursor-not-allowed text-primary-800 bg-primary-400"
                      : "text-white "
                  }`}
                  disabled={view === "favorites" ? true : false}
                  onClick={(e) => {
                    e.preventDefault();
                    setView("favorites");
                  }}>
                  Favorites
                </button>
              </div>

              {/* TODO: nice to have: implement search feature for the menu pages */}

              <div className=" flex items-center  mt-4 md:mt-0 ">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mx-3 text-primary-700 stroke-2 ">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  placeholder="Search"
                  className="block w-full py-1.5 pr-5 text-primary-700 bg-white border-2 border-primary-600 rounded-lg md:w-80 placeholder-primary-700/80 placeholder:font-bold focus:placeholder-transparent pl-11 "
                />
              </div>
            </div>
          )}

          {/* TODO: make a dropdown for the options icon with a choice to favorite recipe or remove from menu */}

          {/* Main section containing recipe list and headings */}
          {numPages ? (
            <div className=" overflow-x-auto block w-5/6  justify-center">
              <div className="inline-block w-full py-4  align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden  shadow-lg shadow-primary-800/20 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 ">
                    <thead className="bg-primary-700">
                      <tr>
                        <th className="py-3.5 px-6 text-xl font-semibold text-left  text-white ">
                          <span>Recipe</span>
                        </th>
                        <th className="py-3.5 px-6 text-xl font-semibold text-right  text-white ">
                          <span>Options</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y w-full  divide-primary-700 ">
                      {/* Loop over array of recipes and display each one */}
                      {pageRecipes?.map((recipe) => {
                        return (
                          <RecipeListItem
                            favoriteRecipes={favoriteRecipes}
                            menuId={menuId}
                            recipe={recipe}
                            key={recipe.id}>
                            <p className="text-lg font-semibold ">
                              {recipe.name}
                            </p>
                          </RecipeListItem>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}

          {/* Pagination */}
          {numPages ? (
            <div className="mt-2 mb-10  sm:flex sm:items-center sm:justify-end w-5/6 md:px-6 lg:px-8">
              {numPages ? (
                <div className="text-md mr-4 font-bold text-primary-700">
                  {`Page ${currentPage} of ${numPages}`}
                </div>
              ) : null}

              <div className="flex justify-end items-center mt-4 gap-x-4 sm:mt-0">
                {numPages === 1 || currentPage === 1 ? null : (
                  <button
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-md text-white font-semibold capitalize transition- bg-primary-700  rounded-md sm:w-auto gap-x-2 hover:bg-primary-600 "
                    onClick={() => {
                      setCurrentPage((old) => old - 1);
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                      />
                    </svg>

                    <span>Previous</span>
                  </button>
                )}

                {numPages === 1 || currentPage === numPages ? null : (
                  <button
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-md font-semibold text-white capitalize transition bg-primary-700  rounded-md sm:w-auto gap-x-2 hover:bg-primary-600"
                    onClick={() => {
                      setCurrentPage((old) => old + 1);
                    }}>
                    <span>Next</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ) : null}

          {numPages ? null : (
            <div className="text-2xl mt-20 font-semibold text-primary-700">
              <span>
                {view === "all"
                  ? "There are no recipes in this menu yet! "
                  : "You have no favorites in this menu yet! "}
              </span>
              <Link
                className="text-primary-600 font-black hover:underline hover:text-primary-700"
                href="/dashboard/recipe-search">
                {"Search for Some "}
              </Link>
              {view === "all" ? (
                <>
                  <span>{"or add from your "}</span>
                  <Link
                    className="text-primary-600 font-black hover:underline hover:text-primary-700"
                    href="/dashboard/recipes/favorites">
                    {"Favorites "}
                  </Link>
                  <span>{"or "}</span>
                  <Link
                    className="text-primary-600 font-black hover:underline hover:text-primary-700"
                    href="/dashboard/recipes/saved">
                    {"Saved Recipes"}
                  </Link>
                </>
              ) : (
                <>
                  <span>{"or "}</span>
                  <span
                    className="text-primary-600 font-black hover:underline hover:text-primary-700 hover:cursor-pointer"
                    onClick={() => setView("all")}>
                    {"Go Back to All"}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

MenuPage.layout = Dashboard;
