import useSWR from "swr";
import Loading from "../Loading";
import RecipeSearchCard from "../Recipes/RecipeSearchCard";
import NoResults from "./NoResults";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { makeURL, truncateRecipe } from "@/lib/edamam/helpers";
import useSWRInfinite from "swr/infinite";

// TODO: POTENTIALLY MOVE THIS INTO A SSR FUNCTION??
// const preloadRecipes = async () => {
// 	const BASE_URL = 'http://localhost:3000'
// 	const fetcher = (url) => fetch(url).then((res) => res.json())
// 	const originalFavs = await preload(`${BASE_URL}/api/user/favorite-recipes`, fetcher);
// 	// TODO: there is an error here that causes the cache to save /api/user/menus as the revalidation key instead of /api/user/favorite-recipes, and it is also skipping over saved recipes line - figure out what's going on.
// 	await preload(`${BASE_URL}/api/user/saved-recipes`, fetcher);
// }

export default function SearchResults({ setSearchLoading, searchVals }) {
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();

  const { data: favoriteRecipes } = useSWR("/api/user/favorite-recipes");
  const { data: savedRecipes } = useSWR("/api/user/saved-recipes");

  const getKey = (pageIndex, previousPageData) => {
    //API endpoint for searching Edamam recipes
    const baseURL = "/api/recipes?";

    // set the state to the current page number

    // reached the end
    if (previousPageData && !previousPageData.nextPageURL) return null;

    let key;
    // first page, we don't have `previousPageData`
    if (pageIndex === 0) {
      console.log("searchResults::firstPage-searchVals", searchVals);
      key = makeURL(baseURL, searchVals);
    } else {
      let nextPageURL = previousPageData.nextPageURL;
      console.log("searchResults::pageIndex", pageIndex);
      console.log("searchResults::nextPageURL", nextPageURL);
      key = makeURL(baseURL, { nextPageURL });
    }
    return key;
  };

  const { data, error, mutate, size, setSize, isLoading } = useSWRInfinite(
    getKey,
    {}
  );

  useEffect(() => {
    console.log("SearchResults::isLoading", isLoading);
    setSearchLoading(isLoading);
  }, [isLoading, setSearchLoading]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  });

  return (
    <>
      <div className=" mb-4  grid  bg-white overflow-hidden border-primary-800 border-2 rounded-xl w-full -p-6 overflow-y-scroll h-[65vh] overscroll-contain z-0">
        {data ? (
          <div className="relative">
            {/* If I get search results, show all results for the ***first*** page */}
            <div className=" justify-center w-full items-center grid-span-7">
              {data[0].data?.length === 0 ? (
                <NoResults q={searchVals.q} type="recipes" />
              ) : null}
            </div>
            <div className="items-start col-span-12 flex-col w-full h-auto overflow-auto z-20">
              {data[0]?.data?.map((recipe) => {
                return (
                  <RecipeSearchCard
                    key={recipe.id}
                    recipe={recipe}
                    savedRecipes={savedRecipes}
                    favoriteRecipes={favoriteRecipes}
                    className="w-full"
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className=" row-span-12  mx-auto flex flex-col items-center justify-center">
            {/* If the search is loading, display a loading message */}
            {isLoading ? (
              <Loading size="xl" container={true} className="my-auto" />
            ) : null}

            {/* If there is an empty data array, display a no results message */}

            {error && !isLoading ? (
              <NoResults message={error.message} className="my-auto" />
            ) : null}

            {/* If there's not an active search, display a message prompting the user to search for a recipe */}
            {!searchVals && !error ? (
              <div className=" text-primary-700  text-xl md:text-4xl font-bold mx-auto my-auto">
                Hungry? Search for a recipe!
              </div>
            ) : null}
          </div>
        )}
      </div>
      {searchVals && data ? <Pagination /> : null}
    </>
  );
}
