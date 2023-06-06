// TODO: STYLE THIS NAVBAR WITH LINKS THAT ARE APPLICABLE TO MY APP'S FUNCTIONALITY
import Link from "next/link";
import SVG from "react-inlinesvg";
import RttCircleLogo from "@/public/img/rtt-logos/RttCircleLogo";
import { mutate } from "swr";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Navbar() {
  const supabase = useSupabaseClient();
  const router = useRouter();

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
    <header className="mx-auto relative w-full bg-base shadow-md z-10">
      <div className="mx-auto relative w-full  flex  flex-row items-center justify-between px-6  py-6 ">
        <Link href="/dashboard">
          <div className="text-black text-sm items-center  flex flex-row justify-between lg:justify-start hover:opacity-75">
            <RttCircleLogo fillColor="primary-800" className="h-8 w-8 mr-4 " />

            <div className=" inline text-base font-extrabold px-1.5 py-1 leading-none border-4 hover:border-primary-900/60 border-primary-900 text-primary-900 hover:text-primary-900/60">
              Restaurant to Table
            </div>
          </div>
        </Link>
        <nav className="items-start flex-grow flex flex-row mt-0 justify-end pb-0 ">
          <div className="items-center inline-flex gap-2 lg:ml-auto md:mt-0 mt-3 list-none hover:opacity-75">
            <Link
              href="#"
              onClick={handleSignOut}
              className="bg-primary-800 text-md py-1.5 leading-none focus:outline-none px-2 border-4 border-primary-800 duration-200 active:text-primary-800 focus-visible:outline-2 focus-visible:outline-primary-800 focus-visible:outline-offset-2 group hover:bg-transparent hover:text-primary-800 text-white font-medium inline-flex items-center justify-center">
              Logout
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
