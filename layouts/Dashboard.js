import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SWRConfig, preload } from "swr";
import { useUser } from "@supabase/auth-helpers-react";
import Script from "next/script";
import toast from "react-toastify";

export default function Dashboard({ children }) {
  const user = useUser();

  return (
    // TODO: CUSTOMIZE THESE DEFAULTS AS NECESSARY

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

          // retry up to 20 times.
          if (retryCount >= 30) return;

          // Retry after 3 seconds.
          setTimeout(() => revalidate({ retryCount }), 3000);
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
  );
}
