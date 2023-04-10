import Dashboard from "@/layouts/Dashboard";
import { useCallback, useEffect, useState } from "react";
import { truncateRecipe, recipePagination } from "@/lib/edamam/helpers";
import Pagination from "@/components/Pagination";
import SearchResults from "@/components/Search/SearchResults";
import RecipeSearchCard from "@/components/Recipes/RecipeSearchCard";
import NoResults from "@/components/Search/NoResults";
import Loading from "@/components/Loading";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react/dist";
import RecipeSearchForm from "@/components/Forms/RecipeSearchForm";

// TODO:
// --add logic for filtering recipe results
// --make results cards look a bit better (decide what final info I want on them),
// --add option to each card for adding to a menu
// --implement filters to search
// --add results to local storage so the user can navigate back
// --add tooltips to save, favorite, and add buttons

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
  async function searchRecipes(values) {
    // call the backend endpoint which gets recipes from Edamam API
    setQuery(values.query);
    const data = await fetch("/api/recipes/", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
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
    console.log("original url set in search func", nextPageURL);
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

  // handle a search: set search state to active, set loading state, then call the search function.
  const handleSearch = (values) => {
    setResults(INITIAL_RESULTS);
    console.log(values);
    setActiveSearch(true);
    setIsLoading(true);
    searchRecipes(values);
  };

  return (
    <section className="container px-4 mx-auto">
      <RecipeSearchForm handleSearch={handleSearch} isLoading={isLoading} />

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
            <NoResults query={query} type="recipes" />
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
