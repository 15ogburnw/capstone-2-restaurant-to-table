import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SWRConfig, preload } from "swr";
import { useUser } from "@supabase/auth-helpers-react";
import Script from "next/script";

// prefetch all existing data for the current user, since we know they will be logged in if they made it this far.

export default function Dashboard({ children }) {
  const user = useUser();

  return (
    // TODO: CUSTOMIZE THESE DEFAULTS AS NECESSARY

    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),

        onError: (error, key) => {
          if (error.status !== 403 && error.status !== 404) {
            // We can send the error to Sentry,

            return {
              error: {
                message:
                  "Uh Oh, there was an error getting the information we needed",
                key,
              },
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
      }}
    >
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        {children}
      </div>
      <Footer />
      <Script
        src="https://developer.edamam.com/attribution/badge.js"
        strategy="afterInteractive"
      />
    </SWRConfig>
  );
}
