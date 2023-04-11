export default function SearchResults({ children }) {
  return (
    <div className="flex  mt-2 border border-gray-300 rounded-lg min-h-[500px] max-h-[750px] overflow-auto">
      <div className="flex flex-col items-start w-full">{children}</div>
    </div>
  );
}
