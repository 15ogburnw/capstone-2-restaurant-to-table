import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SWRConfig } from "swr";

import ToastContext from "@/lib/contexts/ToastContext";
import toast from "react-toastify";
import SuccessToast from "@/components/Toasts/SuccessToast";
import ErrorToast from "@/components/Toasts/ErrorToast";
import { useCallback, useEffect, useState } from "react";

export default function Dashboard({ children }) {
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
    // TODO: CUSTOMIZE THESE DEFAULTS AS NECESSARY
    <ToastContext.Provider value={showToast}>
      <SWRConfig
        value={{
          fetcher: async (args) => {
            const res = await fetch(args);

            if (!res.ok) {
              const error = new Error(
                "An error occurred while fetching the data"
              );
              // Attach extra info to the error object.
              error.info = await res.json();
              error.status = res.status;
              throw error;
            }
            return await res.json();
          },
          loadingTimeout: 10000,

          onError: (error, key) => {
            if (error.status !== 403 && error.status !== 404) {
              console.log("oh no! there was an error");
              console.log(error.info);
              const errorToast = () => {
                toast("Oh no! something went wrong", {
                  type: "error",
                });
              };
            }
          },
          onErrorRetry: (
            error,
            key,
            config,
            revalidate,
            { retryCount, user }
          ) => {
            // Never retry on 404.
            if (error.status === 404) return;

            if (!user) return;

            // retry up to 15 times.
            if (retryCount >= 15) return;

            // Retry after 3 seconds.
            setTimeout(() => revalidate({ retryCount }), 10000);
          },
          revalidateOnFocus: false,
        }}>
        <div className="h-screen w-screen flex flex-col">
          <nav className="sticky z-30  top-0">
            <Navbar />
          </nav>

          <div className="flex flex-row">
            <Sidebar />
            <div className="h-full w-full">{children}</div>
          </div>

          <Footer />
        </div>
      </SWRConfig>
    </ToastContext.Provider>
  );
}
