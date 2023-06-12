// TODO: STYLE THIS NAVBAR WITH LINKS THAT ARE APPLICABLE TO MY APP'S FUNCTIONALITY
import Link from "next/link";
import SVG from "react-inlinesvg";
import RttCircleLogo from "@/public/img/rtt-logos/RttCircleLogo";
import { mutate } from "swr";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [logoColor, setLogoColor] = useState("white");

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
    <header className="  relative w-screen bg-primary-800">
      <div className="mx-auto relative w-full  flex  flex-row items-center justify-between px-10  py-6">
        <Link
          href="/dashboard"
          className="  transition-all duration-150 hover:scale-105 flex align-middle items-center lg:justify-start"
          onMouseEnter={() => setLogoColor("primary-300")}
          onMouseLeave={() => setLogoColor("white")}>
          {
            <>
              <RttCircleLogo
                className="h-8 w-8 mr-2  hover:contrast-200 inline-block"
                fillColor={logoColor}
              />
              <div className="text-3xl hover:text-primary-300 hover:contrast-200 inline-block font-black  text-white tracking-tighter ">
                Restaurant to Table.
              </div>
            </>
          }
        </Link>

        <nav className="items-start flex-grow flex flex-row mt-0 justify-end pb-0">
          <button
            onClick={handleSignOut}
            className="bg-white text-xl py-1.5 leading-none focus:outline-none px-8 border-4 border-white hover:border-primary-300 hover:contrast-200 duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 group hover:bg-transparent hover:text-primary-300 text-primary-800 font-bold inline-flex items-center justify-center shadow-md shadow-primary-900 hover:shadow-primary-700/40 hover:scale-105">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
