import Dashboard from "@/layouts/Dashboard";
import { useState } from "react";
import { truncateRecipe, recipePagination } from "@/lib/edamam/helpers";
import Pagination from "@/components/Pagination";

// TODO: DISABLE SEARCH AND CLEAR SEARCH BUTTONS WHILE RESULTS ARE LOADING
export default function RecipeSearchPage() {
  const INITIAL_RESULTS = {
    items: [],
    totalResults: null,
    totalPages: null,
    currentPage: null,
    currentPageItems: null,
    nextPageURL: null,
    numPerPage: 20,
  };
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(INITIAL_RESULTS);
  const [activeSearch, setActiveSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const newVal = e.target.value;
    setQuery(newVal);
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    (async () => {
      setIsLoading(true);
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

  async function searchRecipes() {
    const data = await fetch("/api/recipes/", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    // I set the important values for state storage based on the response I get back and set
    // the page to 1. Pagination for edamam results will always be 20/page, and pagination is done
    // with a "next page URL" system
    if (!data) {
      setIsLoading(false);
      return;
    }

    const items = data.hits;
    if (items.length === 0) {
      setIsLoading(false);
      return;
    }

    const recipes = items.map((recipe) => {
      return truncateRecipe(recipe);
    });

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

  const handleSearch = (e) => {
    e.preventDefault(e);
    setActiveSearch(true);
    setIsLoading(true);
    if (query.length === 0) {
      setResults(INITIAL_RESULTS);
    }
    console.log(query);
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
        {activeSearch ? (
          <>
            <button
              className="w-1/2 px-5 py-2 text-sm transition-colors duration-200 bg-white hover:bg-gray-100 border-gray-300 border rounded-lg sm:w-auto mt-2 md:mt-0 md:ml-2"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="w-1/2 px-5 py-2 text-sm transition-colors duration-200 bg-white hover:bg-gray-100 border-gray-300 border rounded-lg sm:w-auto mt-2 md:mt-0 md:ml-2"
              onClick={() => {
                setQuery("");
                setResults(INITIAL_RESULTS);
                setActiveSearch(false);
              }}
            >
              Clear Search
            </button>
          </>
        ) : (
          <button
            className="w-1/2 px-5 py-2 text-sm transition-colors duration-200 bg-white hover:bg-gray-100 border-gray-300 border rounded-lg sm:w-auto mt-2 md:mt-0 md:ml-2"
            onClick={handleSearch}
          >
            Search
          </button>
        )}
      </div>
      <div className="flex items-center mt-6 text-center border border-gray-300 rounded-lg h-96 ">
        <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
          {results.items.length === 0 && activeSearch && !isLoading ? (
            <>
              <div className="p-3 mx-auto text-red-500 bg-red-100 rounded-full ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <h1 className="mt-3 text-lg text-gray-800 ">No recipes found</h1>
              <p className="mt-2 text-gray-500 ">
                Your search {query} did not match any recipes. Please try again
                with a different search term.
              </p>
            </>
          ) : null}
          {!activeSearch ? (
            <p className="text-gray-500 text-xl md:text-2xl ">
              Hungry? Search for a recipe!
            </p>
          ) : null}
        </div>
      </div>
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
