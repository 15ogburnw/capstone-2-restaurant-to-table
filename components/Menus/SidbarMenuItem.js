import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function SideBarMenuItem({ dotColor, name }) {
  return (
    <button class="flex justify-between w-full px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
      <div class="flex items-center gap-x-2 ">
        <span class={`w-2 h-2 rounded-full ${dotColor}`}></span>
        <span>{name}</span>
      </div>
      <ChevronRightIcon className="w-4 h-4 inline" />
    </button>
  );
}
