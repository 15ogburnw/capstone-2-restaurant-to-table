import { mutate } from "swr";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

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
    <nav className=" z-30 w-screen bg-primary-800">
      <div className="  flex  flex-row items-center justify-between px-10 py-10">
        <RttFullLogo />
        <div className="mt-10" id="#toast-container"></div>
        <nav className="items-center flex flex-row mt-0 justify-end pb-0">
          <p className="hidden md:inline-block text-white font-bold text-xl mr-5">
            {user?.user_metadata.name}
          </p>

          <button
            onClick={handleSignOut}
            className="bg-white text-xl py-1.5 leading-none focus:outline-none px-8 border-4 border-white hover:border-primary-300 hover:contrast-200 duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 group hover:bg-transparent hover:text-primary-300 text-primary-800 font-bold inline-flex items-center justify-center shadow-md shadow-primary-900 hover:shadow-primary-700/40 hover:scale-105">
            Logout
          </button>
        </nav>
      </div>
    </nav>
  );
}
