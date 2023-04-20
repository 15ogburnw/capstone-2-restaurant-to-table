import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SWRConfig, preload } from "swr";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

// prefetch all existing data for the current user, since we know they will be logged in if they made it this far.

export default function Dashboard({ children }) {
  useEffect(() => {
    async function getInitialInfo() {
      const initialFavorites = await preload(
        "/api/user/favorite-recipes",
        fetcher
      );
      const initialSaves = preload("/api/user/saved-recipes", fetcher);
      const menus = preload("/api/user/menus", fetcher, { refreshInterval: 0 });
      console.log(initialFavorites);
      console.log(initialSaves);
      console.log(menus);
    }
    getInitialInfo();
  }, []);

  return (
    // TODO: CUSTOMIZE THESE DEFAULTS AS NECESSARY

    <SWRConfig
      value={{
        fetcher,

        onError: (error, key) => {
          if (error.status !== 403 && error.status !== 404) {
            // We can send the error to Sentry,
            // or show a notification UI.
          }
        },
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          // Never retry on 404.
          if (error.status === 404) return;

          // Only retry up to 3 times.
          if (retryCount >= 3) return;

          // Retry after 5 seconds.
          setTimeout(() => revalidate({ retryCount }), 5000);
        },
      }}
    >
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </SWRConfig>
  );
}
