import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const handler = async (req, res) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });
  const {
    data: { user },
    error,
  } = await supabaseServerClient.auth.getUser();
  const { recipe_id } = req.body;

  if (error) return res.status(error.status).json({ error: error.message });
  let favorites;
  let recipes;
  switch (req.method) {
    case "GET":
      /**If a GET request is sent to this endpoint, get all of the current user's favorite recipes.
       * Since we have Row-level-security enabled, the logged-in user will only see their own favorites, so we can just grab all values matching
       * an entry on the recipes table by querying the join table.
       *  TODO: **Test this logic**
       */
      favorites = await supabaseServerClient
        .from("favorite_recipes")
        .select("recipe_id(id,name)");
      if (favorites.error)
        return res
          .status(favorites.error.code)
          .json({ message: favorites.error });
      else {

        console.log("here are your favorite recipes:", favorites);
        return res.status(200).json({ favorites });
      }

    case "POST":

      /** If a post request is sent to this endpoint, add the recipe to the join table representing the user's favorite recipes.
       * This will not work if the recipe is not present in the database, so we perform an upsert on the recipes table first. Throw an error
       * if we run into difficulties.
       * 
       * TODO: **add upsert logic for this and test the endpoint**
       */

      favorites = await supabaseServerClient
        .from("favorite_recipes")
        .insert({ recipe_id, user_id: user.id })
        .select("recipe_id(id,name)");
      if (favorites.error)
        return res
          .status(favorites.error.code)
          .json({ message: favorites.error.message });
      else {
        console.log("recipe successfully added to favorites:", favorites.data);
        return res.status(201).json(favorites.data);
      }

    case "DELETE":
      favorites = await supabaseServerClient
        .from("favorite_recipes")
        .delete()
        .eq("recipe_id", recipe_id)
        .select("recipe_id");
      if (favorites.error)
        return res
          .status(favorites.error.code)
          .json({ error: favorites.error });
      else {
        console.log(
          "recipe successfully removed from favorites",
          favorites.data
        );
        return res.status(200).json(favorites.data);
      }

    default:
      return res.status(400).json("Bad Request");
  }
};

export default handler;
