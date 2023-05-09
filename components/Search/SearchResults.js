import useSWR, { preload } from 'swr';
import Loading from '../Loading';

const fetcher = (url) => fetch(url).then((res) => res.json());
preload('/api/user/favorite-recipes', fetcher);
preload('/api/user/saved-recipes', fetcher);

export default function SearchResults({ children }) {
	const favoriteRecipes = useSWR('/api/user/favorite-recipes');
	const savedRecipes = useSWR('/api/user/saved-recipes');
	return (
		<div className='flex  mt-2 border border-gray-400 bg-white rounded-lg min-h-[500px] max-h-[750px]  overflow-hidden'>
			<div className='flex flex-col items-start w-full overflow-auto'>
				{favoriteRecipes.isLoading || savedRecipes.isLoading ? (
					<Loading sz='xl' />
				) : (
					children
				)}
			</div>
		</div>
	);
}
