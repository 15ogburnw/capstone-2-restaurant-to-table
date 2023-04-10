export default function SearchResults({ children }) {
  return (
    <div className="flex  mt-6 border border-gray-400 rounded-lg min-h-[500px] max-h-[750px] overflow-auto">
      <div className="flex flex-col items-start w-full">{children}</div>
    </div>
  );
}
