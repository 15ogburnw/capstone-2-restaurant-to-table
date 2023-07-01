import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function SideBarMenuItem({ dotColor, name }) {
  return (
    <button className="flex justify-between w-full px-3 py-2 my-0 text-sm font-bold text-primary-700 transition rounded-lg hover:bg-primary-700 hover:text-white">
      <div className="flex items-center gap-x-2 ">
        <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
        <span>{name}</span>
      </div>
      <ChevronRightIcon className="w-4 h-4 inline" />
    </button>
  );
}
