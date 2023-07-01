import { Formik, Form, Field } from "formik";
import { useState } from "react";
import FilterForm from "./FilterForm";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faX } from "@fortawesome/free-solid-svg-icons";
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
    <div className=" mb-4  bg-white border-primary-700 border-2 rounded-lg p-3 ">
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
                className="block w-full bg-base-accent py-1.5 pr-5 text-primary-800 font-bold border-2 border-gray-500 rounded-lg md:w-1/2 md:ml-3 placeholder-primary-800/70 pl-4 focus:placeholder-transparent  focus:border-primary-600 focus:border-2 focus:ring-primary-600 focus:outline-none focus:ring focus:ring-opacity-40 focus:bg-primary-700/20"
              />

              {/* Search button to submit */}
              <button
                className="w-1/2 bg-primary-700 text-md py-1.5 leading-none focus:enabled:outline-none px-5 border-4 border-primary-700 duration-200  focus-visible:outline-offset-2 group hover:enabled:bg-transparent inline-block hover:enabled:text-primary-700 text-white font-medium inline-flex items-center justify-center sm:w-auto mt-2 md:mt-0 md:ml-3 disabled:cursor-wait disabled:opacity-30 "
                type="submit"
                disabled={isLoading ? true : false}>
                <ImSearch className="h-[13px] w-auto mr-3" />
                Search
              </button>

              {/* If there's an active search, display a button to clear the search */}
              {activeSearch ? (
                <button
                  className="w-1/2 bg-primary-700 text-md py-1.5 leading-none focus:enabled:outline-none px-5 border-4 border-primary-700 duration-200  focus-visible:outline-offset-2 group hover:enabled:bg-transparent inline-block hover:enabled:text-primary-700 text-white font-medium inline-flex items-center justify-center sm:w-auto mt-2 md:mt-0 md:ml-3 disabled:cursor-wait disabled:opacity-30 "
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
                className=" md:w-55 w-1/2 bg-primary-700 text-md py-1.5 leading-none focus:outline-none px-5 border-4 border-primary-700 duration-200 focus-visible:outline-offset-2  hover:enabled:bg-transparent hover:enabled:text-primary-700 text-white font-medium inline-flex items-center justify-center disabled:cursor-wait disabled:opacity-30 sm:w-auto mt-2 md:mt-0 md:ml-3"
                disabled={isLoading ? true : false}>
                Filter search results
              </button>
            ) : (
              <>
                <FilterForm />
                <div
                  disabled={isLoading ? true : false}
                  className={`flex overflow-hidden disabled:border-none border-2 border-primary-700 divide-base-accent  col-auto  divide-x-2 m-3 mt-5 rtl:flex-row-reverse`}>
                  <button
                    onClick={hideFilters}
                    disabled={isLoading ? true : false}
                    className="flex justify-center disabled:opacity-40 disabled:cursor-wait  bg-primary-700 hover:enabled:bg-primary-400/60 items-center px-4 py-2 text-sm font-semibold text-white group hover:enabled:text-primary-700 transition sm:text-base sm:px-6 w-1/2">
                    <ChevronDoubleUpIcon className="mr-3 stroke-2 h-5 w-5 flex-none" />

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
                    className="flex justify-center disabled:opacity-40 disabled:cursor-wait  bg-primary-700 hover:enabled:bg-primary-400/60 items-center px-4 py-2 text-sm font-medium hover:enabled:text-primary-700 transition sm:text-base sm:px-6 w-1/2 ">
                    <FontAwesomeIcon
                      icon={faX}
                      className=" stroke-2 mr-3 flex-none"
                    />
                    <span>Clear Filters</span>
                  </button>
                  <button
                    disabled={isLoading ? true : false}
                    type="submit"
                    className="flex justify-center disabled:opacity-40 disabled:cursor-wait bg-primary-700 hover:enabled:bg-primary-400/60  items-center px-4 py-2 text-sm font-medium  transition  hover:enabled:text-primary-700 sm:text-base sm:px-6 w-1/2 ">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="stroke-2 mr-3 flex-none"
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
