import useSWR, { preload } from "swr";
import Loading from "../Loading";
import RecipeSearchCard from "./RecipeSearchCard";
import NoResults from "./NoResults";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { makeURL, truncateRecipe } from "@/lib/edamam/helpers";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";

// TODO: POTENTIALLY MOVE THIS INTO A SSR FUNCTION??
// const preloadRecipes = async () => {
// 	const BASE_URL = 'http://localhost:3000'
// 	const fetcher = (url) => fetch(url).then((res) => res.json())
// 	const originalFavs = await preload(`${BASE_URL}/api/user/favorite-recipes`, fetcher);
// 	// TODO: there is an error here that causes the cache to save /api/user/menus as the revalidation key instead of /api/user/favorite-recipes, and it is also skipping over saved recipes line - figure out what's going on.
// 	await preload(`${BASE_URL}/api/user/saved-recipes`, fetcher);
// }

export default function SearchResults({ setSearchLoading, searchVals }) {
  const currentPage = useState(1);
  const totalPages = useState();

  const { data: favoriteRecipes } = useSWR("/api/user/favorite-recipes");
  const { data: savedRecipes } = useSWR("/api/user/saved-recipes");

  const getKey = (pageIndex, previousPageData) => {
    //API endpoint for searching Edamam recipes
    const baseURL = "/api/recipes?";

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
    <div className=" relative border justify-center mb-3 bg-base-accent border-gray-500 border-2 rounded-lg p-3 min-h-[65vh] ">
      {data ? (
        <div className="relative top-0 left-0 w-full h-max ">
          {/* If I get search results, show all results for the ***first*** page */}
          <div className=" align-middle justify-center w-full h-full items-center">
            {data[0].data?.length === 0 ? (
              <NoResults q={searchVals.q} type="recipes" />
            ) : null}
          </div>
          <div className="items-start flex-col w-full h-auto overflow-auto z-20">
            {data[0]?.data?.map((recipe) => {
              return (
                <RecipeSearchCard
                  key={recipe.id}
                  recipe={recipe}
                  savedRecipes={savedRecipes}
                  favoriteRecipes={favoriteRecipes}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className=" flex flex-col justify-center w-full h-full items-center   ">
          {/* If the search is loading, display a loading message */}
          {isLoading ? <Loading size="xl" container={true} /> : null}

          {/* If there is an empty data array, display a no results message */}

          {error ? <NoResults message={error.message} /> : null}

          {/* If there's not an active search, display a message prompting the user to search for a recipe */}
          {!searchVals && !error ? (
            <div className=" text-primary-800/60  text-xl md:text-4xl font-bold">
              Hungry? Search for a recipe!
            </div>
          ) : null}
          <div className="absolute -bottom-12 justify-center max-h-12">
            <Pagination
              paginationInfo={{
                isLoading,
                setSize,
                currentSize: size,
                totalPages,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
