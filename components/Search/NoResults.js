export default function NoResults({ type, q, message }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-3 text-red-500 text-center bg-red-100 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-16 aspect-square">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      {q && (
        <p className="mt-8 text-xl md:text-2xl lg:text-3xl text-center text-red-800 font-bold">
          No {type} found
        </p>
      )}
      {q ? (
        <p className="mt-8 text-xl md:text-2xl lg:text-3xl text-center text-red-800 font-bold">
          Your search &quot;{q}&quot; did not match any {type}. Please try again
          with a different search term.
        </p>
      ) : (
        <p className="mt-8 text-xl md:text-2xl lg:text-3xl text-center text-red-800 font-bold">
          {message}
        </p>
      )}
    </div>
  );
}
