import useSWR, { preload } from "swr";
import Loading from "../Loading";

// const fetcher = (url) => fetch(url).then((res) => res.json());
// preload("http://localhost:3000/api/user/favorite-recipes", fetcher);
// preload("http://localhost:3000/api/user/saved-recipes", fetcher);

export default function SearchResults({ children }) {
  const favorites = useSWR("/api/user/favorite-recipes");
  const saved = useSWR("/api/user/saved-recipes");
  return (
    <div className="flex  mt-2 border border-gray-400 bg-white rounded-lg min-h-[500px] max-h-[750px]  overflow-hidden">
      <div className="flex flex-col items-start w-full overflow-auto">
        {favorites.isLoading || saved.isLoading ? (
          <Loading sz="xl" />
        ) : (
          {children}
        )}
      </div>
    </div>
  );
}
