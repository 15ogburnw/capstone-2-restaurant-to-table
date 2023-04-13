import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req, res) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });
  try {
    if (req.method === "GET") {
      //   query the database and get the user's favorite recipes

      let { data, error } = await supabaseServerClient
        .from("favorite_recipes")
        .select("recipe_id");
      if (error) res.status(400).json({ message: error.message });
      const favoriteRecipes = data?.map((val) => val.recipe_id) || [];

      res.status(200).json({ favoriteRecipes });
    } else if (req.method === "DELETE") {
      const { recipe_id } = req.body || null;
      let { error } = await supabaseServerClient
        .from("favorite_recipes")
        .delete()
        .eq("recipe_id", recipe_id);
      if (error) res.status(400).json({ message: error.message });
      res
        .status(200)
        .json({ message: "Recipe successfully removed from favorites" });
    } else if (req.method === "POST") {
      const { recipe_id } = req.body || null;
      const user = await supabaseServerClient.auth.getUser();
      let { error } = await supabaseServerClient
        .from("favorite-recipes")
        .insert({ recipe_id, user_id: user.id });
      if (error) res.status(400).json({ message: error.message });
      res
        .status(201)
        .json({ message: "Recipe successfully added to your favorites" });
    } else {
      res.status(400).json({ message: "Method not allowed" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

export default handler;
