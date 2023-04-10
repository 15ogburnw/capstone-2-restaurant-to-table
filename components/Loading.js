import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <>
      <FontAwesomeIcon className="text-6xl" icon={faCircleNotch} spin />
      <p className="text-center text-3xl font-medium mt-4">
        Loading... please wait a moment
      </p>
    </>
  );
}
