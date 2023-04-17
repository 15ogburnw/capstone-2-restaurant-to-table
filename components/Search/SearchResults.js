import useSWR, { preload } from 'swr';
import Loading from '../Loading';
import RecipeSearchCard from './RecipeSearchCard';
import NoResults from './NoResults';
import { useEffect, useState } from 'react'
import Pagination from '../Pagination'
import { makeURL, truncateRecipe } from '@/lib/edamam/helpers';
import useSWRInfinite from 'swr/infinite'

// **THIS IS A WORK IN PROGRESS, I AM CURRENTLY TROUBLESHOOTING MY IMPLEMENTATION OF SWR INFINITE, IT CURRENTLY ONLY GRABS DATA FROM ONE PAGE AND THEN GETS STUCK**


// TODO: POTENTIALLY MOVE THIS INTO A SSR FUNCTION??
const preloadRecipes = async () => {
	const BASE_URL = 'http://localhost:3000'
	const fetcher = (url) => fetch(url)
	await preload(`${BASE_URL}/api/user/favorite-recipes`, fetcher);
	// TODO: there is an error here that causes the cache to save /api/user/menus as the revalidation key instead of /api/user/favorite-recipes, and it is also skipping over saved recipes line - figure out what's going on.
	await preload(`${BASE_URL}/api/user/saved-recipes`, fetcher);
}


export default function SearchResults({ setSearchLoading, searchVals }) {

	const currentPage = useState(1);

	useEffect(() => {
		preloadRecipes()
	}, [])

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
		isLoading,
		error
	} = useSWRInfinite(getKey,
		(url) => fetch(url).then((res) => res.json()), {}
	);

	useEffect(() => {
		if (data) {
			console.log('search data has updated', data);
			console.log('')
		}
	}, [data])

	useEffect(() => {
		setSearchLoading(isLoading)
	}, [isLoading, setSearchLoading])

	return (<>
		<div className='flex  mt-2 border border-gray-400 bg-white rounded-lg min-h-[500px] max-h-[750px]  overflow-hidden'>
			<div className='flex flex-col items-start w-full overflow-auto'>

				{/* If I get search results, show all results for the ***first*** page */}
				{data
					? data[0].data?.map((recipe) => {

						recipe = truncateRecipe(recipe);
						return (<RecipeSearchCard key={recipe.id} recipe={recipe} />)
					})
					: null}


				<div className='flex align-middle flex-col text-center justify-center w-full h-full items-center'>
					{/* If the search is loading, display a loading message */}
					{isLoading ? <Loading size='xl' container={true} /> : null}

					{/* If there is an empty data array, display a no results message */}

					{data && data.length === 0 ? (
						<NoResults query={query} type='recipes' />
					) : null}

					{error ? <h1>Error!</h1> : null}

					{/* If there's not an active search, display a message prompting the user to search for a recipe */}
					{!searchVals ? (
						<div className='text-gray-500 text-xl md:text-2xl '>
							Hungry? Search for a recipe!
						</div>
					) : null}
				</div>

				export default function SearchResults({children}) {
  const favorites = useSWR("/api/user/favorite-recipes");
				const saved = useSWR("/api/user/saved-recipes");
				const favorites = useSWR("/api/user/favorite-recipes");
				const saved = useSWR("/api/user/saved-recipes");
				return (
				<div className="flex  mt-2 border border-gray-400 bg-white rounded-lg min-h-[500px] max-h-[750px]  overflow-hidden">
					<div className="flex flex-col items-start w-full overflow-auto">
						{favorites.isLoading || saved.isLoading ? <Loading sz="xl" /> : null}
						{children}
					</div>
				</div>
				);
}
