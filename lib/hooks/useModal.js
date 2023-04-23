import { useEffect, useState } from "react";

/**
 * Hook that sets an open/closed state for the passed ref when clicked outside
 */
export default function useModal(ref) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    /**
     * Click handler for outside click
     */
    function handleClicks(e) {
      console.log(e.target);
      console.log(ref.current);
      if (ref.current && !ref.current.contains(e.target)) {
        setShowing(false);
      } else {
        setShowing(true);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClicks);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClicks);
    };
  }, [ref]);

  return [open, setOpen];
}
