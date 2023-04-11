export default function SearchResults({ children }) {
  return (
    <div className="flex  mt-2 border border-gray-400 bg-white rounded-lg min-h-[500px] max-h-[750px]  overflow-hidden">
      <div className="flex flex-col items-start w-full overflow-auto">
        {children}
      </div>
    </div>
  );
}
