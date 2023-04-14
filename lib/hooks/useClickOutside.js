import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useClickOutside(ref, setShown) {
  useEffect(() => {
    /**
     * State that indicates if the user clicked outside of the ref
     */
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShown(false);
      } else {
        setShown(true);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      setShown(false);
    };
  }, [ref, setShown]);
}
