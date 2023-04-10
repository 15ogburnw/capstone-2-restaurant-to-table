import Dashboard from "@/layouts/Dashboard";
import { useCallback, useEffect, useState } from "react";
import { truncateRecipe, recipePagination } from "@/lib/edamam/helpers";
import Pagination from "@/components/Pagination";
import SearchResults from "@/components/Search/SearchResults";
import RecipeSearchCard from "@/components/Recipes/RecipeSearchCard";
import NoResults from "@/components/Search/NoResults";
import Loading from "@/components/Loading";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react/dist";

// TODO:
// --add logic for filtering recipe results
// --make results cards look a bit better,
// --add dropdown to each card for saving, favoriting, and adding to a menu

export default function RecipeSearchPage() {
  const INITIAL_RESULTS = {
    items: [],
    totalResults: null,
    totalPages: null,
    currentPage: null,
    currentPageItems: null,
    nextPageURL: null,
  };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState(INITIAL_RESULTS);
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeQuery, setActiveQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const supabase = useSupabaseClient();

  const getSavedRecipes = useCallback(async () => {
    let { data, error } = await supabase
      .from("saved_recipes")
      .select("recipe_id");
    if (error) console.error(error);
    user.user_metadata.savedRecipes = data.map((item) => item.recipe_id);
  }, [supabase, user?.user_metadata]);

  const getFavoriteRecipes = useCallback(async () => {
    let { data, error } = await supabase
      .from("favorite_recipes")
      .select("recipe_id");
    if (error) console.error;
    user.user_metadata.favoriteRecipes = data.map((item) => item.recipe_id);
  }, [supabase, user?.user_metadata]);

  useEffect(() => {
    if (user) {
      getSavedRecipes();
      getFavoriteRecipes();
    }
  }, [getFavoriteRecipes, getSavedRecipes, user]);

  const handleChange = (e) => {
    const newVal = e.target.value;
    setQuery(newVal);
  };

  // HandleNextPage and HandlePrevPage are passed down to pagination component
  // They call a helper function for handling pagination with the Edamam model, then
  const handleNextPage = (e) => {
    e.preventDefault();
    (async () => {
      setIsLoading(true);
      setResults((old) => ({ ...old, currentPageItems: [] }));
      const newResults = await recipePagination("next", results);
      setResults((old) => ({ ...old, ...newResults }));
      setIsLoading(false);
    })();
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    (async () => {
      setIsLoading(true);
      const newResults = await recipePagination("prev", results);
      setResults((old) => ({ ...old, ...newResults }));
      setIsLoading(false);
    })();
  };

  // asynchronous function which handles the search and is called by the handleSearch function
  async function searchRecipes() {
    // call the backend endpoint which gets recipes from Edamam API
    const data = await fetch("/api/recipes/", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((e) => {
        setIsLoading(false);
      });

    const items = data?.hits;

    // If I don't get any data, set loading state to false
    if (!data || items.length === 0) {
      setIsLoading(false);
      return;
    }

    // use a helper function to truncate the recipe objects into a form with just info I'm going to use
    const recipes = items.map((recipe) => {
      return truncateRecipe(recipe);
    });

    // set state values for initial results. Results per page will always be 20 for Edamam,
    // and pagination is done with a "next page URL" model, so I'm storing results in state
    // as the user clicks on the next page.
    const totalResults = data.count;
    const currentPage = 1;
    const totalPages = Number.isInteger(totalResults / 20)
      ? totalResults / 20
      : Math.ceil(totalResults / 20);
    const nextPageURL = data._links?.next ? data._links.next.href : null;
    const newResults = {
      items: recipes,
      totalResults,
      currentPage,
      totalPages,
      nextPageURL,
      currentPageItems: recipes,
    };

    setResults((old) => ({ ...old, ...newResults }));
    setIsLoading(false);
    return;
  }

  // handle a search: set search state to active, set loading state, then call the search function. If there's no query just reset the results to initial.
  const handleSearch = (e) => {
    setResults(INITIAL_RESULTS);
    e.preventDefault(e);
    setActiveSearch(true);
    setActiveQuery(query);
    setIsLoading(true);
    searchRecipes();
  };

  return (
    <section className="container px-4 mx-auto">
      <div className="mt-6 md:flex md:items-center md:justify-start">
        <form
          onSubmit={handleSearch}
          className="relative flex items-center mt-4 md:mt-0"
        >
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.0"
              stroke="currentColor"
              className="w-5 h-5 mx-3 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>

          <input
            type="text"
            value={query}
            onChange={handleChange}
            name="query"
            placeholder="Search for a recipe"
            className="block w-full  py-1.5 pr-5 text-gray-700 bg-white border border-gray-300 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5  focus:border-emerald-400  focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </form>

        <button
          className="w-1/2 px-5 py-2 disabled:bg-gray-200 disabled:border-gray-200 text-sm transition-colors duration-200 bg-white hover:bg-gray-100 border-gray-300 border rounded-lg sm:w-auto mt-2 md:mt-0 md:ml-2"
          onClick={handleSearch}
          disabled={isLoading ? true : false}
        >
          Search
        </button>

        {/* If there's an active search, display a button to clear the search */}
        {activeSearch ? (
          <button
            className="w-1/2 px-5 py-2 disabled:bg-gray-200 disabled:border-gray-200 text-sm transition-colors duration-200 bg-white hover:bg-gray-100 border-gray-300 border rounded-lg sm:w-auto mt-2 md:mt-0 md:ml-2"
            onClick={() => {
              setQuery("");
              setResults(INITIAL_RESULTS);
              setActiveSearch(false);
              setActiveQuery("");
            }}
            disabled={isLoading ? true : false}
          >
            Clear Search
          </button>
        ) : null}
      </div>

      <SearchResults>
        {/* If there are search results, map over them and display a recipe row for each result on the page */}
        <div className=" flex w-full">
          <div className="bg-white w-full ">
            {results?.items.length > 0
              ? results.currentPageItems.map((recipe) => (
                  <RecipeSearchCard
                    getFavoriteRecipes={getFavoriteRecipes}
                    getSavedRecipes={getSavedRecipes}
                    key={recipe.id}
                    recipe={recipe}
                  />
                ))
              : null}
          </div>
        </div>

        <div className="flex align-middle flex-col text-center justify-center w-full h-full items-center">
          {/* If the search is loading, display a loading message */}
          {isLoading ? <Loading /> : null}

          {/* If there are no recipes in the results state, there is an active search, and it's not loading, display a no results message */}

          {results?.items.length === 0 && activeSearch && !isLoading ? (
            <NoResults query={activeQuery} type="recipes" />
          ) : null}
          {/* If there's not an active search, display a message prompting the user to search for a recipe */}
          {!activeSearch ? (
            <div className="text-gray-500 text-xl md:text-2xl ">
              Hungry? Search for a recipe!
            </div>
          ) : null}
        </div>
      </SearchResults>
      {/* 
          If there are currently recipes in the results state, display the buttons for pagination, passing down custom functions
          for handling the pagination, the results state object, and the loading state. 
        */}
      {results.items.length > 0 ? (
        <Pagination
          results={results}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          isLoading={isLoading}
        />
      ) : null}
    </section>
  );
}

RecipeSearchPage.layout = Dashboard;
