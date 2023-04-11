import { Formik, Form, Field } from "formik";
import { useState } from "react";
import FilterForm from "./FilterForm";
import filters from "@/lib/edamam/filters";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";

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
  const [newQuery, setNewQuery] = useState("");

  const showFilters = (e) => {
    e.preventDefault();
    setFiltersShowing(true);
  };

  const hideFilters = (e) => {
    e.preventDefault();
    setFiltersShowing(false);
  };

  return (
    <div className="flex-auto border bg-gray-50 border-gray-200 rounded-lg p-3  mt-3">
      <Formik
        onSubmit={handleSearch}
        className="relative flex items-center mt-4 md:mt-0 "
        initialValues={INITIAL_VALUES}
      >
        {({ handleReset, resetForm, values }) => (
          <Form>
            <div>
              <div className="mt-6 md:flex md:items-center md:justify-start mb-3">
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

              {!filtersShowing ? (
                <button
                  onClick={showFilters}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium border rounded-md border-gray-300 text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 w-1/4 bg-gray-200  hover:bg-gray-50"
                  disabled={isLoading ? true : false}
                >
                  Filter search results
                </button>
              ) : (
                <>
                  <FilterForm />
                  <div className="flex overflow-hidden col-auto w-full lg:w-2/3 xl:w-1/2 bg-white border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
                    <button
                      onClick={hideFilters}
                      className="flex items-center justify-center px-4 py-2 text-sm font-medium border border-gray-300 text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 w-1/2 bg-gray-200  hover:bg-gray-50"
                    >
                      <ChevronDoubleUpIcon className="mr-3 stroke-2 stroke-gray-600 text-sm h-5 w-5 flex-none" />

                      <span>Collapse Filter Pane</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        resetForm({
                          values: {
                            query: values.query,
                            mealTypes: [],
                            dishTypes: [],
                            cuisineTypes: [],
                            dietLabels: [],
                            healthLabels: [],
                          },
                        });
                      }}
                      className="flex justify-center border border-gray-300 bg-gray-200 items-center px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 w-1/2 hover:bg-gray-100"
                    >
                      <XMarkIcon className=" stroke-gray-600 h5 w-5 mr-3 flex-none" />
                      <span>Clear Filters</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
