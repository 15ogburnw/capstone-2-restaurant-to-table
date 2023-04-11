export default function Pagination({
  results,
  handleNextPage,
  handlePrevPage,
  isLoading,
}) {
  return (
    <div className="mt-6 mb-7 sm:flex sm:items-center sm:justify-between ">
      <div className="text-sm text-gray-500 ">
        Page{" "}
        <span className="font-medium text-gray-700 ">{`${results.currentPage} of ${results.totalPages}`}</span>
      </div>

      <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
        <button
          onClick={handlePrevPage}
          className=" flex items-center disabled:bg-gray-200 disabled:border-gray-300 justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white hover:bg-emerald-100 hover:border-emerald-400 border border-gray-400 rounded-lg sm:w-auto gap-x-2"
          disabled={isLoading || results.currentPage === 1 ? true : false}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <span>Previous</span>
        </button>

        <button
          onClick={handleNextPage}
          className=" flex items-center disabled:bg-gray-200 disabled:border-gray-300 justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white hover:bg-emerald-100 hover:border-emerald-400 border border-gray-400 rounded-lg sm:w-auto gap-x-2"
          disabled={
            isLoading || results.currentPage === results.totalPages
              ? true
              : false
          }
        >
          <span>Next</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
