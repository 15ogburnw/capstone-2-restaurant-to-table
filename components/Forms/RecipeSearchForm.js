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
    <div
      className={` mb-4  bg-base-accent border-gray-500 border-2 rounded-lg p-3 ${
        isLoading ? "cursor-wait" : null
      }`}>
      <Formik
        onSubmit={handleSearch}
        className="relative flex  items-center mt-4 md:mt-0 "
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
                className="w-1/2 bg-primary-800 text-md py-1.5 leading-none focus:enabled:outline-none px-5 border-4 border-primary-800 duration-200  focus-visible:outline-offset-2 group hover:enabled:bg-transparent  hover:enabled:text-primary-800 text-white font-medium inline-flex items-center justify-center sm:w-auto mt-2 md:mt-0 md:ml-3 disabled:bg-primary-400/80 disabled:border-primary-400/80 disabled:cursor-wait"
                type="submit"
                disabled={isLoading ? true : false}>
                <ImSearch className="h-[13px] w-auto mr-3" />
                Search
              </button>

              {/* If there's an active search, display a button to clear the search */}
              {activeSearch ? (
                <button
                  className="w-1/2 bg-primary-800 text-md py-1.5 leading-none focus:enabled:outline-none px-5 border-4 border-primary-800 duration-200  focus-visible:outline-offset-2 group hover:enabled:bg-transparent  hover:enabled:text-primary-800 text-white font-medium inline-flex items-center justify-center sm:w-auto mt-2 md:mt-0 md:ml-3 disabled:bg-primary-400/80 disabled:border-primary-400/80 disabled:cursor-wait"
                  onClick={() => {
                    resetForm();
                    resetResults();
                  }}
                  type="submit"
                  disabled={isLoading ? true : false}>
                  <ImSearch className="h-[13px] w-auto mr-3" />
                  Clear Search
                </button>
              ) : null}
            </div>

            {!filtersShowing ? (
              <button
                onClick={showFilters}
                className=" md:w-55 w-1/2 bg-primary-700 text-md py-1.5 leading-none focus:outline-none px-5 border-4 border-primary-700 duration-200 focus-visible:outline-offset-2 group hover:enabled:bg-transparent hover:enabled:text-primary-700 text-white font-medium inline-flex items-center justify-center sm:w-auto mt-2 md:mt-0 md:ml-3 disabled:bg-primary-400/80 disabled:border-primary-400/80 disabled:cursor-wait"
                disabled={isLoading ? true : false}>
                Filter search results
              </button>
            ) : (
              <>
                {/* TODO: FIX THIS */}
                <FilterForm />
                <div
                  disabled={isLoading ? true : false}
                  className={`flex overflow-hidden ${
                    isLoading
                      ? "border-primary-500 divide-primary-500"
                      : "border-primary-500 divide-primary-500"
                  }  col-auto w-full divide-x-2 border-2  rounded-lg rtl:flex-row-reverse disabled:bg-primary-400/80 disabled:divide-primary-500 disabled:border-primary-500 disabled:cursor-wait`}>
                  <button
                    onClick={hideFilters}
                    disabled={isLoading ? true : false}
                    className={`flex justify-center disabled:bg-primary-400/80 bg-primary-700 hover:enabled:bg-primary-400/80 hover:enabled:border-primary-400/80 items-center px-4 py-2 text-md font-bold  transition-colors duration-200 sm:text-base sm:px-6 w-1/2 enabled:group}`}>
                    <ChevronDoubleUpIcon className="mr-3 stroke-2 group-hover:enabled:stroke-primary-700 stroke-white text-md disabled-text-primary-700 h-5 w-5 flex-none" />

                    <span className="text-white group-hover:enabled:text-primary-700 disabled:text-primary-700 ">
                      Collapse Filter Pane
                    </span>
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
                    className="flex justify-center disabled:bg-primary-400/80 bg-primary-800 hover:enabled:bg-primary-400/80 hover:enabled:border-primary-400/80 items-center px-4 py-2 text-sm font-medium text-white hover:enabled:text-primary-800 group transition-colors duration-200 sm:text-base sm:px-6 w-1/2 ">
                    <XMarkIcon className=" group-hover:stroke-primary-800 stroke-2 stroke-white h5 w-5 mr-3 flex-none" />
                    <span>Clear Filters</span>
                  </button>
                  <button
                    disabled={isLoading ? true : false}
                    type="submit"
                    className="flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary-800 sm:text-base sm:px-6 w-1/2
                    transition-colors duration-200
                    disabled:bg-primary-400/80 
                  
                    hover:enabled:bg-primary-400/80 
                    hover:enabled:border-primary-400/80  
                     hover:enabled:text-primary-800  ">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className=" h5 w-5 mr-3  flex-none"
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
