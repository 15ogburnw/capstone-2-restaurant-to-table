import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req, res) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });

  if (req.method === "GET") {
    try {
      let userInfo = { user: {} };

      //   Get the user's name and email from the regular auth
      const {
        data: { user },
      } = await supabaseServerClient.auth.getUser();
      (userInfo.user.name = user.name ?? null),
        (userInfo.user.email = user.email);

      let { data: favoriteRecipes, error: favoritesError } =
        await supabaseServerClient.from("favorite_recipes").select("recipe_id");
      if (favoritesError) console.error;
      favoriteRecipes = favoriteRecipes?.map((val) => val.recipe_id) || [];

      //   query the database and add arrays for the user's favorite recipes, saved recipes, and menus

      let { data: savedRecipes, error: savesError } = await supabaseServerClient
        .from("saved_recipes")
        .select("recipe_id");
      if (savesError) console.error;
      savedRecipes = savedRecipes?.map((val) => val.recipe_id) || [];

      let { data: menus, error: menusError } = await supabaseServerClient
        .from("menus")
        .select("name");
      if (menusError) console.error;
      menus = menus?.map((val) => val.name) || [];

      userInfo.user.menus = menus;
      userInfo.user.favoriteRecipes = favoriteRecipes;
      userInfo.user.savedRecipes = savedRecipes;
      console.log(userInfo);

      return res.status(200).json(JSON.stringify(userInfo));
    } catch (e) {
      res.status(400).json({ message: "Something went wrong!" });
    }
  }
};

export default handler;
