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
  // values submitted by the search form, is used to determine whether there is an active search
  const [searchVals, setSearchVals] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  return (
    <section className=" flex flex-col mx-auto self-center mt-8 ">
      {/* Search form which includes query input and filter options for Edamam API. Passing functions for submitting a search and for resetting an active search */}
      <RecipeSearchForm
        handleSearch={async (values) => {
          console.log("recipe-search-page::formSubmittedVals", values);

          setSearchVals(values);
        }}
        className="z-0"
        activeSearch={searchVals ? true : false}
        isLoading={searchLoading}
        resetResults={() => {
          setSearchVals(null);
        }}
      />

      <SearchResults
        searchVals={searchVals}
        setSearchLoading={setSearchLoading}
      />
    </section>
  );
}

RecipeSearchPage.layout = Dashboard;
