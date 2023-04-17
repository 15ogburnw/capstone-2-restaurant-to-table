import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req, res) => {
  try {
    const supabaseServerClient = createServerSupabaseClient({
      req,
      res,
    });
    const {
      data: { user },
    } = await supabaseServerClient.auth.getUser();
    const { recipe_id } = req.body || null;

    let favorites;
    switch (req.method) {
      case "GET":
        favorites = await supabaseServerClient
          .from("favorite_recipes")
          .select("recipe_id");
        if (favorites.error)
          res.status(favorites.status).json({ error: favorites.statusText });
        else {
          favorites = favorites.data?.map((val) => val.recipe_id) || [];
          console.log("here are your favorite recipes:", favorites);
          res.status(200).json(favorites);
        }
        break;

      case "POST":
        favorites = await supabaseServerClient
          .from("favorite_recipes")
          .insert({ recipe_id, user_id: user.id })
          .select("recipe_id");
        if (favorites.error)
          res.status(favorites.status).json({ error: favorites.statusText });
        else {
          console.log(
            "recipe successfully added to favorites:",
            favorites.data
          );
          res.status(201).json(favorites.data);
        }
        break;

      case "DELETE":
        favorites = await supabaseServerClient
          .from("favorite_recipes")
          .delete()
          .eq("recipe_id", recipe_id)
          .select("recipe_id");
        if (favorites.error)
          res.status(favorites.status).json({ error: favorites.statusText });
        else {
          console.log(
            "recipe successfully removed from favorites",
            favorites.data
          );
          res.status(200).json(favorites.data);
        }
        break;

      default:
        res.status(400).json("Bad Request");
    }
  } catch (error) {
    res.send(error);
  }
};

export default handler;
