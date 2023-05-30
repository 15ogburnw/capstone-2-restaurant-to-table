import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function SideBarMenuItem({ dotColor, name }) {
  return (
    <button className="flex justify-between w-full px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300   hover:text-gray-700">
      <div className="flex items-center gap-x-2 ">
        <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
        <span>{name}</span>
      </div>
      <ChevronRightIcon className="w-4 h-4 inline" />
    </button>
  );
}
