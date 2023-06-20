import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function Pagination({
  setSize,
  currentSize,
  totalPages,
  isLoading,
  currentPage,
}) {
  return (
    <>
      <div
        className="flex flex-row rounded-2xl p-10 group-default:group-hover:group-[]:]
      group-default:group-first-of-type:my-auto bg-base-accent items-center border-2 border-primary-800">
        <button className="rounded-2xl flex-initial items-center hover:bg-primary-700 group border-4 hover:border-primary-900 bg-white    my-auto text-2xl shadow-lg shadow-primary-800  border-primary-700 hover:border-6 px-10 py-2 text-primary-700 hover:text-white">
          <HiChevronLeft className=" h-10 w-auto" />
        </button>
        <div className="group group-default:aspect-square">
          <button className="rounded-full flex items-center hover:bg-primary-400 border-4 hover:border-primary-700 bg-primary-700 font-bold m-2 text-2xl shadow-lg border px-6 py-4">
            1
          </button>
          <button
            className="rounded-full flex items-center hover:bg-primary-400
        group border-4 hover:border-primary-700 bg-primary-700 font-bold m-2 text-2xl shadow-lg border px-6 py-4">
            2
          </button>
          <button className="rounded-2xl flex-initial items-center hover:bg-primary-700 group border-4 hover:border-primary-900 bg-white   ml-2 mr-5 my-4 text-3xl font-extrabold shadow-lg shadow-primary-800  border-primary-700 hover:border-6 px-10 py-2 text-primary-700 hover:text-white">
            3
          </button>
          <button className="rounded-full  flex flex-initial items-center hover:bg-primary-700 group border-4 hover:border-primary-900 bg-white  text-3xl font-extrabold shadow-lg shadow-primary-800  border-primary-700 hover:border-6  pb-5  text-primary-700 hover:text-white">
            <span className="flex items-center ">...</span>
          </button>
        </div>
        <button className="rounded-2xl flex-initial items-center hover:bg-primary-700 group border-4 hover:border-primary-900 bg-white   ml-2 mr-5 my-auto text-2xl shadow-lg shadow-primary-800  border-primary-700 hover:border-6 px-10 py-2 text-primary-700 hover:text-white">
          <HiChevronRight className=" h-10 w-auto" />
        </button>
      </div>
    </>
  );
}
