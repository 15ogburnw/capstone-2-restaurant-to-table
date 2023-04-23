import { useEffect, useState } from "react";

/**
 * Hook that sets an open/closed state for the passed ref when clicked outside
 */
export default function useCloseWithOutsideClick(ref) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    /**
     * Click handler for outside click
     */
    function handleOutsideClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);

  return [open, setOpen];
}
