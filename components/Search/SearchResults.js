import useSWR, { preload } from 'swr';
import Loading from '../Loading';
import RecipeSearchCard from './RecipeSearchCard';
import NoResults from './NoResults';
import { useEffect } from 'react'
import Pagination from '../Pagination'
import { makeURL } from '@/lib/edamam/helpers';
import useSWRInfinite from 'swr/infinite'

const fetcher = (url) => fetch(url).then((res) => res.json());
preload('/api/user/favorite-recipes', fetcher);
preload('/api/user/saved-recipes', fetcher);

export default function SearchResults({ setSearchLoading, searchVals }) {
	const favoriteRecipes = useSWR('/api/user/favorite-recipes');
	const savedRecipes = useSWR('/api/user/saved-recipes');

	const getKey = (pageIndex, previousPageData) => {
		//API endpoint for searching Edamam recipes
		const baseURL = '/api/recipes?'

		// reached the end
		if (previousPageData && !previousPageData.data) return null

		let key;
		// first page, we don't have `previousPageData`
		if (pageIndex === 0) {
			key = makeURL(baseURL, searchVals);
		} else {
			let nextPageURL = previousPageData.nextPageURL;
			key = makeURL(baseURL, { nextPageURL })
		}
		return key;
	}

	const {
		data,
		mutate,
		size,
		setSize,
		isValidating,
		isLoading
	} = useSWRInfinite(getKey,
		fetcher
	);

	useEffect(() => {
		if (data) {
			console.log(data)
		}
	}, [data])


	// const isReachingEnd =
	// 	isEmpty || (data && data[data.length - 1]?.hits?.length < 20);
	// const isRefreshing = isValidating && data && data.length === size;

	useEffect(() => {
		setSearchLoading(isLoading)
	}, [isLoading, setSearchLoading])
	return (<>
		<div className='flex  mt-2 border border-gray-400 bg-white rounded-lg min-h-[500px] max-h-[750px]  overflow-hidden'>
			<div className='flex flex-col items-start w-full overflow-auto'>

				{/* If I get search results, show all results for the current page
				{results?.items?.length > 0
					? results.currentPageItems.map((recipe) => (
						<RecipeSearchCard key={recipe.id} recipe={recipe} />
					))
					: null} */}


				<div className='flex align-middle flex-col text-center justify-center w-full h-full items-center'>
					{/* If the search is loading, display a loading message */}
					{/* {searchLoading ? <Loading size='xl' container={true} /> : null} */}

					{/* If there are no recipes in the results state, there is an active search, and it's not loading, display a no results message */}

					{/* {results?.items.length === 0 && activeSearch && !searchLoading ? (
						<NoResults query={query} type='recipes' />
					) : null} */}
					{/* If there's not an active search, display a message prompting the user to search for a recipe */}
					{/* {!activeSearch && !searchLoading ? (
						<div className='text-gray-500 text-xl md:text-2xl '>
							Hungry? Search for a recipe!
						</div>
					) : null} */}
				</div>
				{/* {favoriteRecipes.isLoading || savedRecipes.isLoading ? (
					<Loading sz='xl' />
				) : (
					children
				)} */}
			</div>
		</div>
		{/* 
          If there are currently recipes in the results state, display the buttons for pagination, passing down custom functions
          for handling the pagination, the results state object, and the loading state. 
        	*/}
		{/* {results.items.length > 0 ? (
			<Pagination
				results={results}
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
				searchLoading={searchLoading}
			/>
		) : null} */}
	</>

	);
}
