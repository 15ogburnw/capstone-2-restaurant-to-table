import Dashboard from "@/layouts/Dashboard";
import { useState } from "react";
import { truncateRecipe, recipePagination } from "@/lib/edamam/helpers";
import SearchResults from "@/components/Search/SearchResults";
import RecipeSearchForm from "@/components/Forms/RecipeSearchForm";

// TODO:
// --make results cards look a bit better (decide what final info I want on them),
// --add option to each card for adding to a menu
// --add results to local storage so the user can navigate back
// --add tooltips to save, favorite, and add buttons

export default function RecipeSearchPage() {
  /**
   * STATE VALUES
   * searchVals:
   * values submitted by the search form, is used to determine whether there is an active search. If we don't have any
   * values in the searchVals state, the user has not submitted a search.
   *
   * searchLoading:
   * used to determine if there is currently an active search loading. We use this state to disable related buttons in the search
   * form to prevent mutliple requests during loading.
   * */
  const [searchVals, setSearchVals] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  return (
    <section className="  mx-auto w-2/3  mt-8 ">
      {/* Search form which includes a query field and filter options based on those from the Edamam API.
      We pass a handleSearch function to this form which sets the searchVals state on the page to the values submitted by the form, indicating that a search is active. We then pass a value "activeSearch" back down to the form which exposes the state of current search (mainly used to show/hide buttons). We also pass down the loading state and a function for resetting the search. */}
      <RecipeSearchForm
        handleSearch={async (values) => {
          console.log("recipe-search-page::formSubmittedVals", values);

          setSearchVals(values);
        }}
        activeSearch={searchVals ? true : false}
        isLoading={searchLoading}
        resetResults={() => {
          setSearchVals(null);
        }}
      />

      {/* This is an area where we will display the results of a search. We pass down the current searchVals as well as a function to set the loading state of the search. We will be querying the Edamam API from inside this component. */}
      <SearchResults
        searchVals={searchVals}
        setSearchLoading={setSearchLoading}
      />
    </section>
  );
}

RecipeSearchPage.layout = Dashboard;
