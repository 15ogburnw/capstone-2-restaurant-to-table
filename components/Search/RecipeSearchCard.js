// TODO: DESIGN THIS RECIPE RESULT CARD

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

import { useEffect, useMemo, useState } from 'react';

// aesthetic components
import Tooltip from '../Tooltips/TopTooltip';

// Get data
import useSWR, { useSWRConfig, preload } from 'swr';
import useSWRMutation from 'swr/mutation';
import { toggleRecipeStatus } from '@/lib/supabase/apiQueries';

// TODO: IMPLEMENT FUNCTIONALITY FOR ADDING RECIPES TO MENUS (ONCE I HAVE COMPLETED THE MENU CREATION/UPDATING FUNCTIONALITY)

// preload user recipe data so we have it before we trigger changes
const fetcher = (url) => fetch(url).then((res) => res.json());
const { data: originalFavorites } = preload(
	'/api/user/favorite-recipes',
	fetcher
);
const { data: originalSaves } = preload('/api/user/saved-recipes', fetcher);
// const menus = preload('/api/user/menus', fetcher);

export default function RecipeSearchCard({ recipe }) {
	const [hoveredIcon, setHoveredIcon] = useState(null);
	const [url, setUrl] = useState(null);
	const [tooltipShowing, setTooltipShowing] = useState(false);
	const [method, setMethod] = useState(null);

	/** initialize an SWR mutate hook that returns a data object with favorites and saved recipes when
	 * triggered
	 */

	const { data, trigger, isMutating, reset } = useSWRMutation(
		url,
		toggleRecipeStatus,
		{
			onSuccess: ({ data, key, config }) => {
				toast(`We have successfully mutated your data at key ${key}`, {
					type: toast.TYPE.SUCCESS,
				});
				reset();
			},
			onError: (err, key, config) => {
				toast(`Oh no! there was an error mutating your data at key ${key}`, {
					type: toast.TYPE.ERROR,
				});
				reset();
			},
		}
	);

	// TODO: TRY OUT THE PACKAGE THAT I INSTALLED THAT HANDLES MODALS AND TOOLTIPS
	const showTooltip = (e) => {
		if (e.target.name === null) return setTooltipShowing(false);
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
		if (name === null) {
			setTooltipShowing(false);
			setUrl(null);
		} else {
			showTooltip();
			if (name === 'heart') setUrl('/api/user/favorite-recipes');
			else if (name === 'save') setUrl('/api/user/saved-recipes');
		}
	};

	/**
	 * handle clicking on an icon by calling one of our mutate functions from above. We will use a loading spinner rather
	 * than optimistic data loading for now
	 */
	const handleIconClick = async (e) => {
		e.preventDefault();
		console.log(`on click at ${e.target}`, url, toggleRecipeStatus);
		trigger({ url, recipe });
	};

	// TODO: NEED TO WRITE THIS FUNCTIONALITY
	const showAddOptions = (e) => {
		e.preventDefault();
	};
	console.log(data);
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
						{data && !isMutating ? (
							<div
								onClick={handleIconClick}
								onMouseEnter={() => handleHover('heart')}
								onMouseLeave={() => handleHover(null)}
								className='h-6 w-6 ml-3 cursor-pointer disabled:cursor-wait'>
								{method === 'DELETE' ? (
									<HeartIconSolid className='text-red-500 stroke-2' />
								) : (
									<HeartIcon className='text-red-500 stroke-2' />
								)}
								{hoveredIcon === 'heart' && tooltipShowing ? (
									<Tooltip
										message={
											// 	fav
											// 		? 'Remove recipe from your favs'
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

						{data && !isMutating ? (
							<div
								onClick={handleIconClick}
								onMouseEnter={() => handleHover('save')}
								onMouseLeave={() => handleHover(null)}
								className='h-6 w-6 ml-3 cursor-pointer'>
								{hoveredIcon === 'save' || savedRecipes?.values ? (
									<ArrowDownCircleIconSolid className='text-emerald-600 stroke-2' />
								) : (
									<ArrowDownCircleIcon className='text-emerald-600 stroke-2' />
								)}
								{hoveredIcon === 'save' && tooltipShowing ? (
									<Tooltip
										message={
											savedRecipes?.values?.includes(recipe.id)
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
