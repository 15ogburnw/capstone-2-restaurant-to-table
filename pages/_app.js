import "../styles/globals.css";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState, useMemo } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const Layout = Component.layout || (({ children }) => <>{children}</>);

  // TODO: IMPLEMENT TOAST MESSAGES FOR ALL USER FETCHING DATA/ERROR HANDLING

  /* TODO: CREATE CUSTOM ERROR HANDLING HERE FOR THE ERROR BOUNDARY */

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/api/user/menus"
          as="menus"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="preload"
          href="/api/user/saved-recipes"
          as="savedRecipes"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/api/user/favorite-recipes"
          as="menus"
          crossOrigin="anonymous"
        />
      </Head>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        {/* TODO: CREATE CUSTOM ERROR HANDLING HERE */}
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </SessionContextProvider>
    </>
  );
}
