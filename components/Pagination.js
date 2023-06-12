import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

export default function Pagination({
  setSize,
  currentSize,
  totalPages,
  isLoading,
  currentPage,
}) {
  return (
    <>
      <div className="flex flex-row m-2 rounded-2xl p-1 bg-gray-200">
        <a
          className="rounded-full hover:bg-green-400 font-medium m-2 hover:text-white shadow-lg border px-2 "
          href="#">
          <HiChevronLeft />
        </a>
        <a
          className="rounded-full hover:bg-green-400 font-medium m-2 hover:text-white shadow-lg border px-2 "
          href="#">
          1
        </a>
        <a
          className="rounded-full hover:bg-green-400 font-medium m-2 hover:text-white shadow-lg border px-2 "
          href="#">
          2
        </a>
        <a
          className="rounded-full hover:bg-green-400 font-medium m-2 hover:text-white shadow-lg border px-2 "
          href="#">
          3
        </a>
        <a
          className="rounded-full hover:bg-green-400 font-medium m-2 hover:text-white shadow-lg border px-2 "
          href="#">
          ...
        </a>
        <a
          className="rounded-full hover:bg-green-400 font-medium m-2 hover:text-white shadow-lg border px-2 "
          href="#">
          <HiChevronRight />
        </a>
      </div>
    </>
  );
}
