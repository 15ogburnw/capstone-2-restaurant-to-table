import Dashboard from "@/layouts/Dashboard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

export default function MenuPage() {
  const router = useRouter();
  const { menuId } = router.query;
  const supabase = useSupabaseClient();
  const { mutate } = useSWRConfig();
  const [menuName, setMenuName] = useState();
  const [menuRecipes, setMenuRecipes] = useState();

  const { data: menu, isLoading, error } = useSWR(`/api/user/menus/${menuId}`);

  useEffect(() => {
    if (menu) {
      setMenuRecipes(menu[0].recipes);
      setMenuName(menu[0].name);
    }
  }, [menu]);

  if (isLoading) return <p>Loading...</p>;
  else if (error) return <p>{error.message}</p>;
  else if (!menu) return <p>Menu not found</p>;
  else {
    return (
      <>
        <section className=" px-4 flex flex-col justify-center items-center">
          <div className="flex items-center justify-between w-5/6 md:px-6 lg:px-8">
            {menuName ? (
              <h2 className="text-2xl font-bold capitalize text-primary-700">
                {menuName}
              </h2>
            ) : null}

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
                Monitored
              </button>

              <button className="px-5 py-2 font-medium text-white transition text-sm hover:bg-primary-600">
                Unmonitored
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
                className="block w-full py-1.5 pr-5 text-primary-700 bg-white border border-primary-600 rounded-lg md:w-80 placeholder-primary-600/80 placeholder:font-bold focus:placeholder-transparent pl-11 "
              />
            </div>
          </div>

          {/* TODO: make a dropdown for the options icon with a choice to favorite recipe or remove from menu */}

          <div className=" overflow-x-auto block w-5/6  justify-center">
            <div className="inline-block w-full py-4  align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden  shadow-lg shadow-primary-800/20 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-primary-700">
                    <tr>
                      <th className="py-3.5 px-6 text-md font-semibold text-left  text-white ">
                        <span>Recipe</span>
                      </th>
                      <th className="py-3.5 px-6 text-md font-semibold text-right  text-white ">
                        <span>Options</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y w-full divide-primary-700 ">
                    {menuRecipes?.map((recipe) => {
                      return (
                        <tr
                          key={recipe.id}
                          className="cursor-pointer hover:bg-primary-500 group"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(`/dashboard/recipes/${recipe.id}`);
                          }}>
                          <td className="py-3.5 px-6 text-md text-primary-500 group-hover:text-white font-semibold text-left">
                            <p className="text-lg font-semibold ">
                              {recipe.name}
                            </p>
                          </td>

                          <td className="py-3.5 px-6 text-md font-semibold text-primary-500 group-hover:text-white text-right">
                            <button className="px-1 py-1 hover:bg-white hover:text-primary-500  rounded-lg  ">
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

          {/* TODO: IMPLEMENT PAGINATION */}
          <div className="mt-2 mb-6  sm:flex sm:items-center sm:justify-end w-5/6 md:px-6 lg:px-8">
            <div className="text-md mr-4 font-bold text-primary-700">
              Page 1 of 10
            </div>

            <div className="flex justify-end items-center mt-4 gap-x-4 sm:mt-0">
              <button className="flex items-center justify-center w-1/2 px-5 py-2 text-md text-white font-semibold capitalize transition- bg-primary-700  rounded-md sm:w-auto gap-x-2 hover:bg-primary-600 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:-scale-x-100">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>

                <span>previous</span>
              </button>

              <button className="flex items-center justify-center w-1/2 px-5 py-2 text-md font-semibold text-white capitalize transition bg-primary-700  rounded-md sm:w-auto gap-x-2 hover:bg-primary-600">
                <span>Next</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:-scale-x-100">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }
}

MenuPage.layout = Dashboard;
