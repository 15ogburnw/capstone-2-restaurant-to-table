import Dashboard from "@/layouts/Dashboard";

import { useUser } from "@supabase/auth-helpers-react";

// TODO: FIGURE OUT THE LAYOUT FOR THIS PAGE (THIS WILL COME LAST AFTER BASE FUNCTIONALITY)
// -- NEED TO ADD MENU CREATION, UPDATING, AND ADDING RECIPE FUNCTIONALITY
// -- IDEALLY THIS WOULD INCLUDE RECOMMENDATIONS FOR RECIPES BASED ON POPULAR RECIPES OR RECIPES THE USER HAS SAVED/FAVORITED/ADDED TO MENUS
export default function Home() {
  const user = useUser();
  return (
    <h1 className="text-3xl font-extrabold text-primary-800 tracking-widest">
      WELCOME BACK {user?.email.toUpperCase()}!
    </h1>
  );
}

Home.layout = Dashboard;
