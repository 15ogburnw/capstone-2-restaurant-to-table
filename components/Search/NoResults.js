export default function NoResults({ type, q, message }) {


  return (
    <>
      <div className="p-3 text-red-500 bg-red-100 rounded-full ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      {q && <h1 className="mt-3 text-lg text-gray-800 ">No {type} found</h1>}
      {q ? <p className="mt-2 inline-block max-w-md text-gray-500 ">
        Your search &quot;{q}&quot; did not match any {type}. Please try again with a
        different search term.
      </p> : <p className="mt-2 inline-block max-w-md text-gray-500 ">{message}</p>}
    </>
  );
}
