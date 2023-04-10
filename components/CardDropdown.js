import { useState } from "react";
import Link from "next/link";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export default function CardDropdown({ options }) {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <div className="relative inline-block ">
        <button
          onFocus={() => setIsShowing(true)}
          onBlur={() => setIsShowing(false)}
          className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md  focus:border-emerald-500 focus:ring-opacity-40  focus:ring-emerald-300  focus:ring  focus:outline-none"
        >
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </button>

        {isShowing ? (
          <div className="transition ease-in-out duration-100 absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl">
            {options.map((option) => (
              <Link
                action={option.action}
                key={option.label}
                className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-gray-100"
              >
                {option.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
