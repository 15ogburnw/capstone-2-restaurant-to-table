// Need to work on getting the menu modal and recipe search working again. Give the error handling a bit more focus but don't linger. Then organize SWR hooks and make more verbose data
// management if there is time.

import Loading from "@/components/Loading";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import ServerErrorPage from "./500";
import useSWR from "swr";

export default function Index() {
  const supabase = useSupabaseClient();
  user = useUser();
  // const { timeout, error } = useTimeout(30000); AM I GOING TO USE THIS??
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const fetcher = (url) => fetch(url).then((res = res.json()));

  const { data: menus } = useSWR("/api/user/menus", fetcher);
  const { data: favorites } = useSWR("/api/user/favorite-recipes", fetcher);
  const { data: saved } = useSWR("/api/user/saved-recipes", fetcher);

  // const currentUser = {info:user, menus, favorites, saved};

  useEffect(() => {
    const handleLoad = async () => {
      if (session) {
        await router.push("/dashboard");
      }
      if (session === null && !error) await router.push("/landing");
      setLoading(false);
      if (error) throw error;
    };
    handleLoad();
  }, [router, supabase.auth]);

  return (
    <>
      <Head>
        <title>Restaurant To Table</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {loading ? <Loading screen /> : null}

        {/* TODO: MAKE THIS TIMEOUT PROMPT, BUT GET MENUS MODAL WORKING AGAIN FIRST BECAUSE IT IS BASICALLY THE SAME CONCEPT */}
        {timeout ? <ServerErrorPage /> : null}
        {/* TODO: ERROR HANDLING */}
        {error ? (
          <div>
            <h1>
              Error Loading Session! Let&apos;s figure out how to take care of
              this with Sentry!
            </h1>
            {console.error(error)}
          </div>
        ) : null}
      </main>
    </>
  );
}
