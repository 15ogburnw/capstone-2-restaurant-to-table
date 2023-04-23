import "../styles/globals.css";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient(
      "https://kinsvjrnzmawfmoxmrnj.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpbnN2anJuem1hd2Ztb3htcm5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyMTY1NzIsImV4cCI6MTk5Nzc5MjU3Mn0.gaalgTpVV4wLhH7G2rOtOrazT11MaGSfFcwS_7RZK74"
    )
  );
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  // TODO: IMPLEMENT TOAST MESSAGES FOR ALL USER FETCHING DATA/ERROR HANDLING

  /* TODO: CREATE CUSTOM ERROR HANDLING HERE FOR THE ERROR BOUNDARY */

  return (
    <ErrorBoundary>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ToastContainer />

        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </SessionContextProvider>
    </ErrorBoundary>
  );
}
