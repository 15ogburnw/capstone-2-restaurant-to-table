
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

// React components
import { useState, useEffect } from 'react';

// UI components
import Tooltip from '../Tooltips/TopTooltip';

// Get global SWR config
import useSWRMutation from 'swr/mutation'
import {
	addRecipe, removeRecipe
} from '@/lib/supabase/apiQueries';

// Supabase
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';



// TODO: IMPLEMENT FUNCTIONALITY FOR ADDING RECIPES TO MENUS (ONCE I HAVE COMPLETED THE MENU CREATION/UPDATING FUNCTIONALITY)

// TODO: GET FAVORITES AND SAVES WORKING AGAIN

// TODO: FINISH STYLING THIS

/**
 * TODO TIMELINE: 
 * FIRST ==> GET THIS PAGE WORKING AGAIN!!! NEED TO BE ABLE TO ADD AND REMOVE SAVES AND FAVORITES, PAGINATE WITH SWR, AND NO EXTRANEOUS ERRORS. 
 * NEXT ==> WORK ON USER - COMPLETE THE REST OF THE USER CREATION PATHWAY AND BUILD OUT THE USER PROFILE PAGE. 
 * NEXT ==> BUILD OUT GUI FOR RECIPE PAGES AND MENU PAGES. ALONG THE WAY ==> IRON OUT ERROR HANDLING STRATEGIES AND OTHER ORGANIZATIONAL KINKS. 
 * NEXT ==> FIGURE OUT PLAN FOR RESTAURANT SEARCHING FUNCTIONALITY, THEN INTEGRATE RECOMMENDATIONS.
 */


export default function RecipeSearchCard({ recipe, favoriteRecipes, savedRecipes }) {

	const [hoveredIcon, setHoveredIcon] = useState(null);
	const [tooltipShowing, setTooltipShowing] = useState(false);
	const [isFavorite, setIsFavorite] = useState()
	const [isSaved, setIsSaved] = useState()
	const user = useUser()
	const supabase = useSupabaseClient();

	useEffect(() => {
		if (favoriteRecipes && favoriteRecipes.length > 0) {
			console.log('recipeSearchCard::favoriteRecipes', console.log(favoriteRecipes))
			if (favoriteRecipes.map((val) => val.id).includes(recipe.id)) {
				setIsFavorite(true)
			} else {
				setIsFavorite(false)
			}
		}
	}, [favoriteRecipes, recipe.id])

	useEffect(() => {
		if (savedRecipes && savedRecipes.length > 0) {
			console.log('recipeSearchCard::savedRecipes', console.log(savedRecipes))
			if (savedRecipes.map((val) => val.id).includes(recipe.id)) {
				setIsSaved(true)
			} else {
				setIsSaved(false)
			}
		}
	}, [savedRecipes, recipe.id])


	const { trigger: addSave, isMutating: addingSave } = useSWRMutation('/api/user/saved-recipes', addRecipe)

	const { trigger: removeSave, isMutating: removingSave } = useSWRMutation('/api/user/saved-recipes', removeRecipe)

	const { trigger: addFavorite, isMutating: addingFavorite } = useSWRMutation('/api/user/favorite-recipes', addRecipe)

	const { trigger: removeFavorite, isMutating: removingFavorite } = useSWRMutation('/api/user/favorite-recipes', removeRecipe)


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
						{!addingFavorite && !removingFavorite ? (
							<div
								// TODO: ADD A TOAST TO THIS FOR SUCCESS AND FAIL
								onClick={async (e) => {
									e.preventDefault()
									try {
										if (isFavorite) {
											const result = await removeFavorite(recipe)
											console.log('AFTER FAVORITE REMOVED::', result)
										} else {
											const result = await addFavorite(recipe)
											console.log('AFTER FAVORITE ADDED::', result)
										}
									} catch (e) {
										console.error(e);
										console.log(e.message)
									}
								}}
								onMouseEnter={() => handleHover('heart')}
								onMouseLeave={() => handleHover(null)}
								className='h-6 w-6 ml-3 cursor-pointer disabled:cursor-wait'>
								{hoveredIcon === 'heart' || isFavorite ? (
									<HeartIconSolid className='text-red-500 stroke-2' />
								) : (
									<HeartIcon className='text-red-500 stroke-2' />
								)}
								{hoveredIcon === 'heart' && tooltipShowing ? (
									<Tooltip
										message={
											isFavorite
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

						{!addingSave && !removingSave ? (
							<div
								onClick={async (e) => {
									e.preventDefault()
									try {

										if (isSaved) {
											const result = await removeSave(recipe)
											console.log('AFTER SAVE REMOVED::', result)
										} else {
											const result = await addSave(recipe)
											console.log('AFTER SAVE ADDED::', result)
										}
									} catch (e) {
										console.error(e);
										console.log(e.message)
									}
								}}
								onMouseEnter={() => handleHover('save')}
								onMouseLeave={() => handleHover(null)}
								className='h-6 w-6 ml-3 cursor-pointer'>
								{hoveredIcon === 'save' || isSaved ? (
									<ArrowDownCircleIconSolid className='text-emerald-600 stroke-2' />
								) : (
									<ArrowDownCircleIcon className='text-emerald-600 stroke-2' />
								)}
								{hoveredIcon === 'save' && tooltipShowing ? (
									<Tooltip
										message={
											isSaved
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
