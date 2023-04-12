import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCallback, useEffect, useState } from "react";
import UserContext from "../lib/context/UserContext";

export default function Dashboard({ children }) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [userInfo, setUserInfo] = useState({});

  const getFavoriteRecipes = useCallback(async () => {
    let { data, error } = await supabase
      .from("favorite_recipes")
      .select("recipe_id");
    if (error) console.error;
    return data.map((item) => item.recipe_id) || [];
  }, [supabase]);

  const getSavedRecipes = useCallback(async () => {
    let { data, error } = await supabase
      .from("saved_recipes")
      .select("recipe_id");
    if (error) console.error(error);

    return data.map((item) => item.recipe_id) || [];
  }, [supabase]);

  const getUserMenus = useCallback(async () => {
    let { data, error } = await supabase.from("menus").select("name");
    if (error) console.error(error);

    return data.map((item) => item.name) || [];
  }, [supabase]);

  const setUserVals = useCallback(async () => {
    const favoriteRecipes = await getFavoriteRecipes();
    const savedRecipes = await getSavedRecipes();
    const menus = await getUserMenus();

    setUserInfo((old) => ({ ...old, favoriteRecipes, savedRecipes, menus }));
  }, [getFavoriteRecipes, getSavedRecipes, getUserMenus]);

  useEffect(() => {
    setUserVals();
  }, [setUserVals]);

  if (user)
    return (
      <UserContext.Provider value={[userInfo, setUserInfo]}>
        <Navbar />
        <div className="flex flex-row">
          <Sidebar />
          {children}
        </div>
        <Footer />
      </UserContext.Provider>
    );
  else return null;
}
