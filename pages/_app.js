import "../styles/globals.css";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  // TODO: IMPLEMENT TOAST MESSAGES FOR ALL USER FETCHING DATA/ERROR HANDLING

  /* TODO: CREATE CUSTOM ERROR HANDLING HERE FOR THE ERROR BOUNDARY */

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </SessionContextProvider>
  );
}
