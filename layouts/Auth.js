import Link from "next/link";
import RttFullLogo from "@/components/Logos/RttFullLogo";
import ToastContext from "@/lib/contexts/ToastContext";
import { useCallback, useEffect, useState } from "react";
import SuccessToast from "@/components/Toasts/SuccessToast";
import ErrorToast from "@/components/Toasts/ErrorToast";

export default function Auth({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (type, options) => {
    setToast({ type, options });
  };

  const fireToast = useCallback(() => {
    if (toast && toast.type === "success") {
      SuccessToast.fire(toast.options);
    } else if (toast && toast.type === "error") {
      ErrorToast.fire(toast.options);
    }
  }, [toast]);

  useEffect(() => {
    fireToast();
  }, [fireToast]);

  return (
    <ToastContext.Provider value={showToast}>
      <main className="h-screen w-screen  absolute">
        <header className="mx-auto absolute top-0 left-0 w-full bg- h-full z-0">
          <div className="mx-auto relative w-full  flex  bg-primary-800 h-1/4 shadow-md items-start justify-center">
            <Link
              href="/dashboard"
              className=" transition-all pointer-events-auto duration-150 hover:scale-105 flex mt-12 relative items-center z-30"
              onMouseEnter={() => setLogoColor("primary-300")}
              onMouseLeave={() => setLogoColor("white")}>
              {
                <RttFullLogo
                  mainColor="white"
                  secondColor="white"
                  logoClasses="text-xl font-black"
                />
              }
            </Link>
          </div>
        </header>

        <div
          className="w-screen flex justify-center items-start h-screen absolute bg-"
          data-tails-google-fonts="Cedarville+Cursive">
          {children}
        </div>

        {/* TODO Add a footer here  */}
      </main>
    </ToastContext.Provider>
  );
}
