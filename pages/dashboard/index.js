import Dashboard from "@/layouts/Dashboard";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

// TODO: FIGURE OUT THE LAYOUT FOR THIS PAGE (THIS WILL COME LAST AFTER BASE FUNCTIONALITY)
// -- NEED TO ADD MENU CREATION, UPDATING, AND ADDING RECIPE FUNCTIONALITY
// -- IDEALLY THIS WOULD INCLUDE RECOMMENDATIONS FOR RECIPES BASED ON POPULAR RECIPES OR RECIPES THE USER HAS SAVED/FAVORITED/ADDED TO MENUS
export default function Home() {
  // const { session, isLoading, error, supabaseClient } = useSessionContext();

  // useEffect(() => {
  //   const showInfo = () => {
  //     console.log(session);
  //     console.log(error);
  //     console.log(supabaseClient);
  //   };

  //   if (isLoading) {
  //     showInfo();
  //   }
  // }, [isLoading, session, error, supabaseClient]);
  return (
    <div className="flex align-middle justify-center">
      <h1 className="text-xl7 text-center origin-center">YOU ARE HOME</h1>
    </div>
  );
}

Home.layout = Dashboard;
