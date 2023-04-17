import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SWRConfig } from "swr";

export default function Dashboard({ children }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 5000,

        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),

        onError: (error, key) => {
          if (error.status !== 403 && error.status !== 404) {
            // We can send the error to Sentry,
            // or show a notification UI.
          }
        },
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          // Never retry on 404.
          if (error.status === 404) return;

          // Only retry up to 5 times.
          if (retryCount >= 5) return;

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
  // else return null;
}
