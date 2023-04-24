import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function LoadingButton({ originalButton }) {
  const classes = originalButton.classes;
  console.log(classes);

  return (
      <button
        type="button"
        className={`${classes} disabled disabled:bg-emerald-200 disabled:border-emerald-200 sm:w-55 sm-`}
      >
        <FontAwesomeIcon icon={faCircleNotch} spin />
        <span className="text-emerald-400 font-semibold">Loading...</span>
      </button>
 
  );
}
