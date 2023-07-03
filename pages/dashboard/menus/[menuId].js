import Dashboard from "@/layouts/Dashboard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import MenuTooltip from "@/components/Tooltips/MenuTooltip";
import RecipeListItem from "@/components/Recipes/RecipeListItem";

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
    if (menuRecipes) {
      setNumPages(Math.ceil(menuRecipes.length / 15));
      if (currentPage * 15 > menuRecipes.length) {
        setPageRecipes(menuRecipes.slice(currentPage * 15 - 15));
      } else {
        setPageRecipes(
          menuRecipes.slice(currentPage * 15 - 15, currentPage * 15)
        );
      }
    }
  }, [currentPage, menuRecipes]);

  /**
   * When the recipes in the menu change, update the state for total pages
   */
  useEffect(() => {
    if (menuRecipes) {
      setNumPages(Math.ceil(menuRecipes.length / 15));
    }
  }, [currentPage, menuRecipes]);

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

  if (isLoading) return <p>Loading...</p>;
  else if (menuError) router.replace("/500");
  else if (menu?.length === 0) router.replace("/404");
  else {
    return (
      <>
        {/* TODO: implement delete functionality for the menu and for individual recipes, add option to change name of menu */}
        <section className=" px-4 flex flex-col justify-center items-center">
          <div className="flex items-center mt-3 justify-between w-5/6 md:px-6 lg:px-8">
            <h2 className="text-3xl  font-bold capitalize text-primary-700">
              {menuName}
            </h2>

            {/* TODO: implement this button */}
            <div className="flex items-center mt-4  gap-x-3">
              <button className="flex items-center justify-center w-1/2 px-5 py-2 text-md tracking-wide text-white transition  bg-primary-700 rounded-lg  sm:w-auto gap-x-2 hover:bg-primary-600 ">
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
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span>Add a recipe</span>
              </button>
            </div>
          </div>

          {/* TODO: change these buttons to be applicable to me */}
          <div className="mt-6 flex flex-row items-center justify-between w-5/6  md:px-6 lg:px-8">
            <div className="inline-flex overflow-hidden bg-primary-700 divide-x divide-base-accent rounded-lg">
              <button className="px-5 py-2 text-xs font-medium text-white transition hover:bg-primary-600 sm:text-sm ">
                View all
              </button>

              <button className="px-5 py-2  font-medium text-white transition text-sm hover:bg-primary-600">
                Favorites
              </button>
            </div>

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

          {/* TODO: make a dropdown for the options icon with a choice to favorite recipe or remove from menu */}

          {/* Main section containing recipe list and headings */}
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
                        <>
                          <RecipeListItem
                            favoriteRecipes={favoriteRecipes}
                            menuId={menuId}
                            recipe={recipe}
                          />
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {numPages ? (
            <div className="mt-2 mb-6  sm:flex sm:items-center sm:justify-end w-5/6 md:px-6 lg:px-8">
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
        </section>
      </>
    );
  }
}

MenuPage.layout = Dashboard;
