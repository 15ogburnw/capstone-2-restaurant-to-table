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
            const error = new Error();
            // Attach extra info to the error object.
            const { message } = await res.json();
            error.message = message;
            error.status = res.status;
            throw error;
          }
          return await res.json();
        },

        onError: (error, key) => {
          if (error.status !== 403 && error.status !== 404) {
            console.log(error);
            console.log("oh no! there was an error");
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

          // Only retry up to 3 times.
          if (retryCount >= 3) return;

          // Retry after 3 seconds.
          setTimeout(() => revalidate({ retryCount }), 3000);
        },
        revalidateOnFocus: false,
      }}>
      <div className="h-screen w-screen">
        <Navbar />

          <main className="flex flex-row">
            <Sidebar />
            {children}
          </main>

        <Footer />
      </div>
    </SWRConfig>
  );
}
