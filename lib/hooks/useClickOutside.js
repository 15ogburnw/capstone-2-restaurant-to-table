import { useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useClickOutside(ref) {
  const [showing, setShowing] = useState(false);
  useEffect(() => {
    /**
     * State that indicates if the user clicked outside of the ref
     */
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowing(false);
      } else {
        setShowing(true);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return [showing, setShowing];
}
