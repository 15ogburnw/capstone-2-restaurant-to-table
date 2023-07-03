import Dashboard from "@/layouts/Dashboard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import Loading from "@/components/Loading";
import RetryLoad from "@/components/RetryLoad";
import RecipeSearchCard from "@/components/Recipes/RecipeSearchCard";

export default function FavoritesPage() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [favorites, setFavorites] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState();
  const [pageRecipes, setPageRecipes] = useState();

  const { data, isLoading, error, mutate } = useSWR(
    `/api/user/favorite-recipes`
  );

  /**Whenever the user's favorites list changes, update the local state value accordingly */
  useEffect(() => {
    if (data) {
      setFavorites(data);
    }
  }, [data]);

  /**
   * When the favorite recipes changes, update the state for total pages
   */
  useEffect(() => {
    if (favorites && favorites.length > 0) {
      setNumPages(Math.ceil(favorites.length / 15));
      if (currentPage * 15 > favorites.length) {
        setPageRecipes(favorites.slice(currentPage * 15 - 15));
      } else {
        setPageRecipes(
          favorites.slice(currentPage * 15 - 15, currentPage * 15)
        );
      }
    } else {
      setNumPages(null);
    }
  }, [favorites, currentPage]);

  // TODO: Style the loading state
  if (isLoading) return <Loading size="xl" />;
  else if (error) return <RetryLoad dataName="favorites" textSize="3xl" />;
  else {
    return (
      <>
        {/* TODO: implement delete functionality, add button to redirect to search page */}
        <section className=" px-4 flex flex-col justify-center items-center">
          <div className="flex items-center mt-3 justify-center w-5/6 md:px-6 lg:px-8 border-b-4 border-primary-800 pb-6">
            {/* <div className="invisible">Invisible div to center title</div> */}
            <h2 className="text-3xl  font-bold capitalize text-primary-700">
              Favorites
            </h2>

            {/* TODO: nice to have: search function for favorites */}

            {/* <div className=" invisible flex items-center  mt-4 md:mt-0 ">
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
            </div> */}
          </div>

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
                      {favorites?.map((recipe) => {
                        return (
                          <tr
                            key={recipe.id}
                            className="cursor-pointer hover:bg-primary-600 group"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(e);
                              router.push(`/dashboard/recipes/${recipe.id}`);
                            }}>
                            <td className="py-3.5 px-6 text-md text-primary-700 group-hover:text-white font-semibold text-left">
                              <p className="text-lg font-semibold ">
                                {recipe.name}
                              </p>
                            </td>

                            <td className="py-3.5 px-6 text-md font-semibold text-primary-700  text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="px-1 py-1 hover:bg-white  group-hover:text-white hover:text-primary-700 rounded-lg  ">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}

          {/* Pagination */}

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

              {numPages <= 1 || currentPage === numPages ? null : (
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

          {numPages > 0 ? null : (
            <div className="text-2xl  font-semibold text-primary-700">
              <span>{"You have no favorites yet! "}</span>
              <Link
                className="text-primary-600 font-black hover:underline hover:text-primary-700"
                href="/dashboard/recipe-search">
                {"Discover some new recipes!"}
              </Link>
            </div>
          )}
        </section>
      </>
    );
  }
}

FavoritesPage.layout = Dashboard;
