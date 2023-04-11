import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCallback, useEffect } from "react";

export default function Dashboard({ children }) {
  const user = useUser();
  const supabase = useSupabaseClient();

  const getFavoriteRecipes = useCallback(async () => {
    if (user) {
      let { data, error } = await supabase
        .from("favorite_recipes")
        .select("recipe_id");
      if (error) console.error;
      const favoriteRecipes = data.map((item) => item.recipe_id) || [];
      user.user_metadata.favoriteRecipes = favoriteRecipes;
    }
  }, [supabase, user]);

  const getSavedRecipes = useCallback(async () => {
    if (user) {
      let { data, error } = await supabase
        .from("saved_recipes")
        .select("recipe_id");
      if (error) console.error(error);

      const savedRecipes = data.map((item) => item.recipe_id) || [];
      user.user_metadata.savedRecipes = savedRecipes;
    }
  }, [supabase, user]);

  const getUserMenus = useCallback(async () => {
    if (user) {
      let { data, error } = await supabase.from("menus").select("name");
      if (error) console.error(error);

      const menus = data.map((item) => item.name) || [];
      user.user_metadata.menus = menus;
    }
  }, [supabase, user]);

  useEffect(() => {
    (async () => {
      await getUserMenus();
      await getFavoriteRecipes();
      await getSavedRecipes();
    })();
  }, [getFavoriteRecipes, getSavedRecipes, getUserMenus]);

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </>
  );
}
