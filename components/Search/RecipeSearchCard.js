

// Next components
import Image from 'next/image';
import Link from 'next/link';

// Icons
import {
	ArrowDownCircleIcon,
	HeartIcon,
	ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import {
	ArrowDownCircleIcon as ArrowDownCircleIconSolid,
	HeartIcon as HeartIconSolid,
	ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
} from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

// aesthetic components
import Tooltip from '../Tooltips/TopTooltip';

// Get global SWR config
import useSWRMutation from 'swr/mutation'
import {
	addRecipe, removeRecipe
} from '@/public/apiQueries';

// TODO: IMPLEMENT FUNCTIONALITY FOR ADDING RECIPES TO MENUS (ONCE I HAVE COMPLETED THE MENU CREATION/UPDATING FUNCTIONALITY)


export default function RecipeSearchCard({ recipe }) {
	const [hoveredIcon, setHoveredIcon] = useState(null);
	// const [url, setUrl] = useState(null);
	const [tooltipShowing, setTooltipShowing] = useState(false);
	// const [method, setMethod] = useState(null);
	const [favorites, setFavorites] = useState(null);
	const [saved, setSaved] = useState(null);

	const { data: favoriteRecipes } = useSWR('/api/user/favorite-recipes', (url) => fetch(url));
	const { data: savedRecipes } = useSWR('/api/user/saved-recipes', (url) => fetch(url));

	// when favorite recipes array changes, map its ID's to a separate array
	useEffect(() => {
		if (favoriteRecipes) {
			setFavorites(favoriteRecipes.map((val) => val.id))
		}

	}, [favoriteRecipes])

	// when saved recipes array changes, map its ID's to a separate array
	useEffect(() => {
		if (savedRecipes) {
			setSaved(savedRecipes.map((val) => val.id))
		}

	}, [savedRecipes])


	/** initialize an SWR mutate hook that returns a data object with favorites and saved recipes when
	 * triggered
	 * TODO: Need to split this up into two separate hooks, one for favorites and one for saves. We explicitly define the url on each of these, and we don't re-reference the url when calling each trigger function. remove the url state, and just add the url logic explicitly. Don't think we need the method state either, but how do we determine if a recipe is currently in favorites or saves?
	 */

	// const { data, trigger, isMutating, reset } = useSWRMutation(
	// 	url,
	// 	toggleRecipeStatus,
	// 	{
	// 		onSuccess: ({ data, key, config }) => {
	// 			toast(`We have successfully mutated your data at key ${key}`, {
	// 				type: toast.TYPE.SUCCESS,
	// 			});
	// 			reset();
	// 		},
	// 		onError: (err, key, config) => {
	// 			toast(`Oh no! there was an error mutating your data at key ${key}`, {
	// 				type: toast.TYPE.ERROR,
	// 			});
	// 			reset();
	// 		},
	// 	}
	// );

	// TODO: TRY OUT THE PACKAGE THAT I INSTALLED THAT HANDLES MODALS AND TOOLTIPS
	const showTooltip = (name) => {
		if (name === null) return setTooltipShowing(false);
		(async () => {
			await new Promise((resolve) => setTimeout(resolve, 600));
			setTooltipShowing(true);
		})();
		return;
	};

	/**
	 * sets the state for when a user is hovering over an icon on the card, and
	 * shows a tooltip for it. Also sets a "url" state which we will use to
	 * determine the appropriate endpoint to call for our backend
	 */
	const handleHover = (name) => {
		setHoveredIcon(name);
		showTooltip(name);
	};

	/**
	 * handle clicking on an icon by calling one of our mutate functions from above. We will use a loading spinner rather
	 * than optimistic data loading for now
	 *
	 *
	 * TODO TIMELINE: 
	 * FIRST ==> GET THIS PAGE WORKING AGAIN!!! NEED TO BE ABLE TO ADD AND REMOVE SAVES AND FAVORITES, PAGINATE WITH SWR, AND NO EXTRANEOUS ERRORS. 
	 * NEXT ==> WORK ON USER - COMPLETE THE REST OF THE USER CREATION PATHWAY AND BUILD OUT THE USER PROFILE PAGE. 
	 * NEXT ==> BUILD OUT GUI FOR RECIPE PAGES AND MENU PAGES. ALONG THE WAY ==> IRON OUT ERROR HANDLING STRATEGIES AND OTHER ORGANIZATIONAL KINKS. 
	 * NEXT ==> FIGURE OUT PLAN FOR RESTAURANT SEARCHING FUNCTIONALITY, THEN INTEGRATE RECOMMENDATIONS.
	 */

	// TODO: CHANGE THIS LOGIC... REFERENCE THE HOVER STATE TO GET THE APPROPRIATE TRIGGER FUNCTION AND CALL IT
	const handleIconClick = async (e) => {
		console.log(e);
		e.preventDefault();
		// console.log(`on click at ${e.target}`, url, toggleRecipeStatus);
		// trigger({ url, recipe });
	};

	// TODO: NEED TO WRITE THIS FUNCTIONALITY... selection dropdown for adding recipe to a menu
	const showAddOptions = (e) => {
		e.preventDefault();
	};

	return (
		<Link href={`/dashboard/recipes/${recipe.id}`}>
			<div className='flex flex-row items-center w-full border-b bg-white border-gray-400 hover:bg-gray-200'>
				<div className='my-2 ml-2 overflow-hidden relative h-44 w-44 flex-none'>
					<Image
						width={180}
						height={180}
						className=' object-cover rounded-xl'
						alt='recipe-image'
						blurDataURL={recipe.placeholder}
						placeholder='blur'
						src={recipe.image}
					/>
				</div>
				<div className='flex flex-col items-start justify-start align-top'>
					<div className=' px-4 py-1 text-md font-bold whitespace-nowrap'>
						{recipe.name}
					</div>
					<div className=' px-4 py-1 text-sm font-semibold whitespace-nowrap'>
						Serves: {recipe.servings}
					</div>
					<div className=' px-4 py-1 text-sm font-semibold whitespace-nowrap'>
						Total calories: {Math.floor(recipe.calories)}
					</div>

					<div className=' px-4 py-1 text-sm font-semibold whitespace-nowrap'>
						Total cook time:{' '}
						{recipe.totalTime ? `${recipe.totalTime} minutes` : 'Not provided'}
					</div>

					<div
						onMouseLeave={() => handleHover(null)}
						className=' px-4 py-1 text-sm font-semibold whitespace-nowrap flex flex-row'>
						{/* If the favorite recipes state is not currently loading or validating, show heart icon,
							otherwise show a small loading spinner */}
						{favoriteRecipes ? (
							<div
								onClick={handleIconClick}
								onMouseEnter={() => handleHover('heart')}
								onMouseLeave={() => handleHover(null)}
								className='h-6 w-6 ml-3 cursor-pointer disabled:cursor-wait'>
								{hoveredIcon === 'heart' || favorites?.includes(recipe.id) ? (
									<HeartIconSolid className='text-red-500 stroke-2' />
								) : (
									<HeartIcon className='text-red-500 stroke-2' />
								)}
								{hoveredIcon === 'heart' && tooltipShowing ? (
									<Tooltip
										message={
											favorites?.includes(recipe.id)
												? 'Remove recipe from your favs' :
												'Add recipe to your favs'
										}
										adjustments='ml-3 bottom-14'
									/>
								) : null}
							</div>
						) : (
							<FontAwesomeIcon
								className='h-5 w-5 ml-3'
								icon={faCircleNotch}
								spin
							/>
						)}

						{savedRecipes ? (
							<div
								onClick={handleIconClick}
								onMouseEnter={() => handleHover('save')}
								onMouseLeave={() => handleHover(null)}
								className='h-6 w-6 ml-3 cursor-pointer'>
								{hoveredIcon === 'save' || saved?.includes(recipe.id) ? (
									<ArrowDownCircleIconSolid className='text-emerald-600 stroke-2' />
								) : (
									<ArrowDownCircleIcon className='text-emerald-600 stroke-2' />
								)}
								{hoveredIcon === 'save' && tooltipShowing ? (
									<Tooltip
										message={
											saved?.includes(recipe.id)
												? 'Remove this recipe from your saved recipes'
												: 'Save this recipe for later'
										}
										adjustments='ml-3 bottom-14'
									/>
								) : null}
							</div>
						) : (
							<FontAwesomeIcon
								className='h-5 w-5 ml-3'
								icon={faCircleNotch}
								spin
							/>
						)}

						<div
							onClick={showAddOptions}
							onMouseEnter={() => handleHover('menu')}
							onMouseLeave={() => handleHover(null)}
							className='h-6 w-6 ml-3 cursor-pointer'>
							{hoveredIcon === 'menu' ? (
								<ClipboardDocumentListIconSolid className='text-blue-600 stroke-2' />
							) : (
								<ClipboardDocumentListIcon className='text-blue-600 stroke-2' />
							)}
							{hoveredIcon === 'menu' && tooltipShowing ? (
								<Tooltip
									message='Add this recipe to a menu'
									adjustments='ml-3 bottom-14'
								/>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
