import { Formik, Form, Field } from "formik";
import { useState } from "react";
import FilterForm from "./FilterForm";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ImSearch } from "react-icons/im";
export default function RecipeSearchForm({
  handleSearch,
  isLoading,
  activeSearch,
  resetResults,
}) {
  const INITIAL_VALUES = {
    q: "",
    mealType: [],
    dishType: [],
    cuisineType: [],
    diet: [],
    health: [],
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

  return (
    <div className="flex-auto border mx-20 mb-5 bg-base-accent border-gray-500 border-2 rounded-lg p-3  mt-3">
      <Formik
        onSubmit={handleSearch}
        className="relative flex items-center mt-4 md:mt-0 "
        initialValues={INITIAL_VALUES}>
        {({ resetForm, values }) => (
          <Form>
            <div className="mt-6 md:flex md:items-center md:justify-start mb-3">
              {/* Search field, contains only user search query */}

              <Field
                type="text"
                name="q"
                placeholder="Search for a recipe"
                className="block w-full bg-base py-1.5 pr-5 text-primary-800 font-bold border-2 border-gray-500 rounded-lg md:w-1/2 md:ml-3 placeholder-primary-800/70 pl-4 focus:placeholder-transparent  focus:border-primary-600 focus:border-2 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40 focus:bg-primary-700/20"
              />

              {/* Search button to submit */}
              <button
                className="w-1/2 bg-primary-800 text-md py-1.5 leading-none focus:enabled:outline-none px-5 border-4 border-primary-800 duration-200  focus-visible:outline-offset-2 group hover:enabled:bg-transparent hover:enabled:text-primary-800 text-white font-medium inline-flex items-center justify-center sm:w-auto mt-2 md:mt-0 md:ml-3 disabled:cursor-wait disabled:opacity-30 "
                type="submit"
                disabled={isLoading ? true : false}>
                <ImSearch className="h-[13px] w-auto mr-3" />
                Search
              </button>

              {/* If there's an active search, display a button to clear the search */}
              {activeSearch ? (
                <button
                  className="w-1/2 px-5 py-2 disabled:bg-gray-200 disabled:border-gray-300 disabled:cursor-wait text-md font-bold transition-colors duration-200 bg-white hover:bg-emerald-100 hover:border-emerald-400 border-gray-400 border rounded-lg sm:w-auto mt-2 md:mt-0 md:ml-2"
                  onClick={() => {
                    resetForm();
                    resetResults();
                  }}
                  disabled={isLoading ? true : false}>
                  Clear Search
                </button>
              ) : null}
            </div>

            {!filtersShowing ? (
              <button
                onClick={showFilters}
                className=" md:w-55 w-1/2 bg-primary-800 text-md py-1.5 leading-none focus:outline-none px-5 border-4 border-primary-800 duration-200  focus-visible:outline-offset-2 group hover:bg-transparent hover:text-primary-800 text-white font-medium inline-flex items-center justify-center sm:w-auto mt-2 md:mt-0 md:ml-3 disabled:cursor-wait"
                disabled={isLoading ? true : false}>
                Filter search results
              </button>
            ) : (
              <>
                <FilterForm />
                <div
                  className={`flex overflow-hidden ${
                    isLoading
                      ? "border-gray-300 divide-gray-300"
                      : "border-gray-400 divide-gray-400 hover:divide-emerald-400 hover:border-emerald-400"
                  }  col-auto w-full divide-x  bg-white border  rounded-lg rtl:flex-row-reverse`}>
                  <button
                    onClick={hideFilters}
                    disabled={isLoading ? true : false}
                    className="flex items-center disabled:bg-gray-200 disabled:cursor-wait justify-center px-4 py-2 text-sm font-medium  text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 w-1/2 bg-white hover:bg-emerald-100 hover:border-emerald-400">
                    <ChevronDoubleUpIcon className="mr-3 stroke-2 stroke-gray-600 text-sm h-5 w-5 flex-none" />

                    <span>Collapse Filter Pane</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      resetForm({
                        values: {
                          q: values.q,
                          mealType: [],
                          dishType: [],
                          cuisineType: [],
                          diet: [],
                          health: [],
                        },
                      });
                    }}
                    disabled={isLoading ? true : false}
                    className="flex justify-center disabled:bg-gray-200 disabled:cursor-wait  bg-white hover:bg-emerald-100 hover:border-emerald-400 items-center px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 w-1/2 ">
                    <XMarkIcon className=" stroke-gray-600 h5 w-5 mr-3 flex-none" />
                    <span>Clear Filters</span>
                  </button>
                  <button
                    disabled={isLoading ? true : false}
                    type="submit"
                    className="flex justify-center disabled:bg-gray-200 disabled:cursor-wait bg-white hover:bg-emerald-100 hover:border-emerald-400 items-center px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 w-1/2 ">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="stroke-gray-600 h5 w-5 mr-3 flex-none"
                    />
                    <span>Apply Filters</span>
                  </button>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
