import Dashboard from "@/layouts/Dashboard";
import { useState } from "react";
import { truncateRecipe, recipePagination } from "@/lib/edamam/helpers";
import Pagination from "@/components/Pagination";

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

  const handleChange = (e) => {
    const newVal = e.target.value;
    setQuery(newVal);
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    (async () => {
      const newResults = await recipePagination("next", results);
      setResults((old) => ({ ...old, ...newResults }));
    })();
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    (async () => {
      const newResults = await recipePagination("prev", results);
      setResults((old) => ({ ...old, ...newResults }));
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
    if (!data) return;
    const items = data.hits;
    if (items.length === 0) return;

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
    console.log(results);
    return;
  }

  const handleSearch = (e) => {
    e.preventDefault(e);

    if (query.length === 0) {
      setResults(INITIAL_RESULTS);
    }
    console.log(query);
    searchRecipes();
    setQuery("");
  };
  return (
    <section className="container px-4 mx-auto">
      <div className="mt-6 md:flex md:items-center md:justify-between">
        <form
          onSubmit={handleSearch}
          className="relative flex items-center mt-4 md:mt-0"
        >
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 mx-3 text-gray-400 "
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
            className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5  focus:border-emerald-400  focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </form>
      </div>

      <div className="flex items-center mt-6 text-center border rounded-lg h-96 ">
        <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
          <div className="p-3 mx-auto text-emerald-500 bg-emerald-100 rounded-full ">
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
          <h1 className="mt-3 text-lg text-gray-800 ">No vendors found</h1>
          <p className="mt-2 text-gray-500 ">
            Your search “Stripe” did not match any vendors. Please try again or
            create add a new vendor.
          </p>
          <div className="flex items-center mt-4 sm:mx-auto gap-x-3">
            <button className="w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg sm:w-auto   hover:bg-gray-100 ">
              Clear Search
            </button>

            <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-emerald-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-emerald-600 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span>Add vendor</span>
            </button>
          </div>
        </div>
      </div>
      {results.items.length > 0 ? (
        <Pagination
          results={results}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      ) : null}
    </section>
  );
}

RecipeSearchPage.layout = Dashboard;
