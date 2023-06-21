// TODO: STYLE THIS NAVBAR WITH LINKS THAT ARE APPLICABLE TO MY APP'S FUNCTIONALITY
import Link from "next/link";
import OutlineBtn from "../Buttons/OutlineBtn";
import SVG from "react-inlinesvg";

import { mutate } from "swr";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import RttFullLogo from "../Logos/RttFullLogo";

export default function Navbar() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();

  // sign out of supabase, clear cache, and redirect to landing page
  // TODO: different error handling
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
      console.error(error);
    }

    // clear the SWR cache
    await mutate(() => true, undefined, { revalidate: false });
    router.push("/landing");
  };
  return (
    <nav className=" z-30 w-screen h-[10vh] bg-primary-800">
      <div className="mx-auto relative w-full  flex  flex-row items-center justify-between px-10 pb-8 pt-4">
        <RttFullLogo
          mainColor="white"
          secondColor="primary-300"
          logoClasses="text-2xl"
        />

        <nav
          className="items-center align-middle
        flex-grow flex flex-row mt-0 justify-end pb-0">
          <p className="text-white font-bold text-xl mr-5">{user?.email}</p>
          <OutlineBtn
            baseColor="white"
            accentColor="primary-300"
            className="py-1.5 px-6"
            onClick={handleSignOut}>
            Logout
          </OutlineBtn>
          {/* <button
            onClick={handleSignOut}
            className="bg-white text-xl py-1.5 leading-none focus:outline-none px-8 border-4 border-white hover:border-primary-300 hover:contrast-200 duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 group hover:bg-transparent hover:text-primary-300 text-primary-800 font-bold inline-flex items-center justify-center shadow-md shadow-primary-900 hover:shadow-primary-700/40 hover:scale-105">
            Logout
          </button> */}
        </nav>
      </div>
    </nav>
  );
}
