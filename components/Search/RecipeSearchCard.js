// TODO: DESIGN THIS RECIPE RESULT CARD

import Image from 'next/image';
import Link from 'next/link';
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

import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import useSWR, { useSWRConfig, preload } from 'swr';

import Tooltip from '../Tooltips/TopTooltip';

// TODO: MOVE THESE TO A SEPARATE FILE AND START CONSTRUCTING A HELPER CLASS/SET OF FUNCTIONS FOR MY API

const updateRecipe = async (url, { recipe_id, method }) => {
	return await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ recipe_id }),
	}).then((res) => res.json());
};

// TODO: IMPLEMENT FUNCTIONALITY FOR ADDING RECIPES TO MENUS (ONCE I HAVE COMPLETED THE MENU CREATION/UPDATING FUNCTIONALITY)

const fetcher = (url) => fetch(url).then((res) => res.json());
preload('/api/user/favorite-recipes', fetcher);
preload('/api/user/saved-recipes', fetcher);
// const menus = preload('/api/user/menus', fetcher);

export default function RecipeSearchCard({ recipe }) {
	const [hoveredIcon, setHoveredIcon] = useState(null);
	const [tooltipShowing, setTooltipShowing] = useState(false);

	const {
		data: favRecipes,
		error: favError,
		mutate: mutateFavs,
	} = useSWR('/api/user/fav-recipes');
	const {
		data: savedRecipes,
		error: saveError,
		mutate: mutateSave,
	} = useSWR('/api/user/saved-recipes');

	/**  TODO: MAKE THIS BETTER. HANDLE DIFFERENT TYPES OF ERRORS. IF THE USER DOESN'T HAVE ANY
	 * IT'S NOT A PROBLEM BUT WE WANT TO DISPLAY A MESSAGE FOR OTHER EDGE CASES
	 */
	if (favError) {
		console.log(favError.code, favError.message);
	}
	if (saveError) {
		console.log(saveError.code, saveError.message);
	}

	// TODO: TRY OUT THE PACKAGE THAT I INSTALLED THAT HANDLES MODALS AND TOOLTIPS
	const showTooltip = (e) => {
		if (e.target.name === null) return setTooltipShowing(false);
		(async () => {
			await new Promise((resolve) => setTimeout(resolve, 600));
			setTooltipShowing(true);
		})();
		return;
	};

	const handleHover = (name) => {
		setHoveredIcon(name);
		if (name === null) {
			setTooltipShowing(false);
		} else {
			showTooltip();
		}
	};

	// TODO: GOING TO MAKE THESE INTO TWO TOGGLE FUNCTIONS. ON CLICK CALLBACKS WILL PASS THE REQUEST
	// METHOD BASED ON THE USESWR CACHE VALUES. THEN EACH TIME THE CACHE CHANGES I CAN USE A CALLBACK TO
	// SET SAVED AND FAVD STATE VALUES, WHICH WILL SIMPLIFY THE LOGIC BELOW.

	const handleFavorite = async (e) => {
		e.preventDefault();
		try {
			const resp = await toggleSave(`/api/user/${type}-recipes`, {
				recipe_id: recipe.id,
				method: 'POST',
			});
			console.log(resp);
		} catch (e) {
			console.error(e);
		}
	};

	// TODO: NEED TO WRITE THIS FUNCTIONALITY
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
						{favs ? (
							<div
								onClick={() => toggleFav()}
								onMouseEnter={() => handleHover('heart')}
								onMouseLeave={() => handleHover(null)}
								className='h-6 w-6 ml-3 cursor-pointer disabled:cursor-wait'>
								{hoveredIcon === 'heart' || favs?.includes(recipe.id) ? (
									<HeartIconSolid className='text-red-500 stroke-2' />
								) : (
									<HeartIcon className='text-red-500 stroke-2' />
								)}
								{hoveredIcon === 'heart' && tooltipShowing ? (
									<Tooltip
										message={
											fav
												? 'Remove recipe from your favs'
												: 'Add recipe to your favs'
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

						{saved ? (
							<div
								onClick={toggleSave}
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
