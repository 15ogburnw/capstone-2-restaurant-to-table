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

  return (
    <div className="flex mx-20 mt-2 border bg-base-accent border-gray-500 border-2  rounded-xl min-h-[500px] max-h-[750px]  overflow-hidden">
      <div className="flex flex-col items-start w-full overflow-auto">
        {/* If I get search results, show all results for the ***first*** page */}
        {data
          ? data[0].data?.map((recipe) => {
              return (
                <RecipeSearchCard
                  key={recipe.id}
                  recipe={recipe}
                  savedRecipes={savedRecipes}
                  favoriteRecipes={favoriteRecipes}
                />
              );
            })
          : null}

        <div className="flex align-middle flex-col text-center justify-center w-full h-full items-center">
          {/* If the search is loading, display a loading message */}
          {isLoading ? <Loading size="xl" container={true} /> : null}

          {/* If there is an empty data array, display a no results message */}

          {error ? <NoResults message={error.message} /> : null}

          {data && data[0].data.length === 0 ? (
            <NoResults q={searchVals.q} type="recipes" />
          ) : null}

          {/* If there's not an active search, display a message prompting the user to search for a recipe */}
          {!searchVals ? (
            <div className="text-primary-800/60 text-xl md:text-4xl font-bold">
              Hungry? Search for a recipe!
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
