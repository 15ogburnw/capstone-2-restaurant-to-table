import { Formik, Form, Field } from "formik";
import { useState } from "react";
import FilterForm from "./FilterForm";

export default function RecipeSearchForm({
  handleSearch,
  isLoading,
  activeSearch,
  resetResults,
}) {
  const INITIAL_VALUES = {
    query: "",
    mealTypes: [],
    dishTypes: [],
    cuisineTypes: [],
    dietLabels: [],
    healthLabels: [],
  };

  const [filtersShowing, setFiltersShowing] = useState(false);

  const showFilters = (e) => {
    e.preventDefault();
    setFiltersShowing(true);
  };

  const hideFilters = (e) => {
    e.preventDefault();
    setFiltersShowing(false);
  };

  const clearFilters = (e) => {
    e.preventDefault();
  };

  return (
    <Formik
      onSubmit={handleSearch}
      className="relative flex items-center mt-4 md:mt-0"
      initialValues={INITIAL_VALUES}
    >
      {({ handleReset }) => (
        <Form>
          <div>
            <div className="mt-6 md:flex md:items-center md:justify-start">
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

              {/* Search field, contains only user search query */}
              <Field
                type="text"
                name="query"
                placeholder="Search for a recipe"
                className="block w-full  py-1.5 pr-5 text-gray-700 bg-white border border-gray-300 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5  focus:border-emerald-400  focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />

              {/* Search button to submit */}
              <button
                className="w-1/2 px-5 py-2 disabled:bg-gray-200 disabled:border-gray-200 text-sm transition-colors duration-200 bg-white hover:bg-gray-100 border-gray-300 border rounded-lg sm:w-auto mt-2 md:mt-0 md:ml-2"
                type="submit"
                disabled={isLoading ? true : false}
              >
                Search
              </button>

              {/* If there's an active search, display a button to clear the search */}
              {activeSearch ? (
                <button
                  className="w-1/2 px-5 py-2 disabled:bg-gray-200 disabled:border-gray-200 text-sm transition-colors duration-200 bg-white hover:bg-gray-100 border-gray-300 border rounded-lg sm:w-auto mt-2 md:mt-0 md:ml-2"
                  onClick={() => {
                    handleReset();
                    resetResults();
                  }}
                  disabled={isLoading ? true : false}
                >
                  Clear Search
                </button>
              ) : null}
            </div>

            {filtersShowing ? (
              <>
                <FilterForm />
                <a
                  href="#"
                  onClick={hideFilters}
                  disabled={isLoading ? true : false}
                >
                  Close Filter Pane
                </a>
                <a
                  href="#"
                  onClick={clearFilters}
                  disabled={isLoading ? true : false}
                >
                  Clear Filters
                </a>
              </>
            ) : (
              <a
                href="#"
                onClick={showFilters}
                className="text-md flex text-left mt-3"
                disabled={isLoading ? true : false}
              >
                Filter search results
              </a>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
