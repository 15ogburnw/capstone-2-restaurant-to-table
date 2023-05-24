import Dashboard from "@/layouts/Dashboard";


// TODO: FIGURE OUT THE LAYOUT FOR THIS PAGE (THIS WILL COME LAST AFTER BASE FUNCTIONALITY)
// -- NEED TO ADD MENU CREATION, UPDATING, AND ADDING RECIPE FUNCTIONALITY
// -- IDEALLY THIS WOULD INCLUDE RECOMMENDATIONS FOR RECIPES BASED ON POPULAR RECIPES OR RECIPES THE USER HAS SAVED/FAVORITED/ADDED TO MENUS
export default function Home() {

  return (
    <div className="flex align-middle justify-center">
      <h1 className="text-xl7 text-center origin-center">YOU ARE HOME</h1>
    </div>
  );
}

Home.layout = Dashboard;
