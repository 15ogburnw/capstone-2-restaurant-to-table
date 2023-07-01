import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function SideBarMenuItem({ dotColor, name }) {
  return (
    <button className="flex justify-between items-center w-full px-3 py-2 my-0 text-md font-bold text-primary-700 transition rounded-lg hover:bg-primary-700 hover:text-white capitalize ">
      <div className="flex items-center gap-x-2 ">
        <span className={`w-3 h-3 rounded-full ${dotColor}`}></span>
        <span className="ml-2">{name}</span>
      </div>
      <FontAwesomeIcon
        icon={faChevronRight}
        className="w-3 h-3 stroke-2 inline"
      />
    </button>
  );
}
