import "@fortawesome/fontawesome-svg-core/styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function Loading({ size }) {
  let spinner;
  let message;
  const container =
    size === "screen" ? "min-w-screen min-h-screen" : "w-full h-full";
  switch (size) {
    case "xl":
      spinner = "text-5xl";
      message = "text-2xl mt-3";
      break;
    case "lg":
      spinner = "text-4xl";
      message = "text-xl mt-2";
      break;
    case "md":
      spinner = "text-2xl";
      message = "text-md mt-2";
      break;
    default:
    case "screen":
      spinner = "text-8xl";
      message = "text-4xl mt-6";
      break;
  }

  return (
    <div
      className={`flex align-middle flex-col text-center text-emerald-500 justify-center ${container} items-center`}
    >
      <FontAwesomeIcon
        className={`${spinner} flex-initial`}
        icon={faCircleNotch}
        spin
      />
      <p className={`text-center ${message} flex-initial font-medium`}>
        Loading... please wait a moment
      </p>
    </div>
    </div>
  );
}
