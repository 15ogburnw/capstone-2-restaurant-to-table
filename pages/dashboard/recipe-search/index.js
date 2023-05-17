import Dashboard from '@/layouts/Dashboard';
import { useState } from 'react';
import { truncateRecipe, recipePagination } from '@/lib/edamam/helpers';
import SearchResults from '@/components/Search/SearchResults';
import RecipeSearchForm from '@/components/Forms/RecipeSearchForm';

// TODO:
// --make results cards look a bit better (decide what final info I want on them),
// --add option to each card for adding to a menu
// --add results to local storage so the user can navigate back
// --add tooltips to save, favorite, and add buttons




export default function RecipeSearchPage() {
	// values submitted by the search form, is used to determine whether there is an active search
	const [searchVals, setSearchVals] = useState(null);
	const [searchLoading, setSearchLoading] = useState(false)


	return (
		<section className='container px-4 mx-auto'>

			{/* Search form which includes query input and filter options for Edamam API. Passing functions for submitting a search and for resetting an active search */}
			<RecipeSearchForm
				handleSearch={(values) => { setSearchVals(values) }}
				activeSearch={searchVals ? true : false}
				isLoading={searchLoading}
				resetResults={() => { setSearchVals(null) }}
			/>

			<SearchResults>
				{/* If there are search results, map over them and display a recipe row for each result on the page */}
				<div className=' flex w-full'>
					<div className='bg-white w-full '>
						{results?.items.length > 0
							? results.currentPageItems.map((recipe) => (
								<RecipeSearchCard key={recipe.id} recipe={recipe} />
							))
							: null}
					</div>
				</div>

				<div className='flex align-middle flex-col text-center justify-center w-full h-full items-center'>
					{/* If the search is loading, display a loading message */}
					{searchLoading ? <Loading size='xl' container={true} /> : null}
					{/* If there are no recipes in the results state, there is an active search, and it's not loading, display a no results message */}

				</section>
				);
}

				RecipeSearchPage.layout = Dashboard;
