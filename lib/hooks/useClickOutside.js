import { useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useClickOutside(ref) {
  const [click, setClick] = useState("undefined");
  useEffect(() => {
    /**
     * State that indicates if the user clicked outside of the ref
     */
    function handleClickOutside(e) {
      setClick("outside");
      if (ref.current && !ref.current.contains(e.target)) {
        console.log(ref.current);
      } else {
        setClick("inside");
        console.log(ref.current);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return [click, setClick];
}
