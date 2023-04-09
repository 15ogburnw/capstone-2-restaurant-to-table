export default function SearchResults({ children }) {
  return (
    <div className=" flex w-full">
      <div className="bg-white w-full divide-gray-200 ">{children}</div>
    </div>
  );
}
