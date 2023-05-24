import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// **NOT SURE IF I'LL BE USING THIS, THIS WAS AN INTIAL ATTEMPT AT A MODAL WINDOW THAT FAILED... PROBABLY GOING TO USE A LIBRARY 
// AND APPROACH THIS DIFFERENTLY**
export default function ClientOnlyPortal({ children, selector }) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
}
