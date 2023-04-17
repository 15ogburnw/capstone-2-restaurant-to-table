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
    let data, error;

    switch (req.method) {
      case "GET":
        ({ data, error } = await supabaseServerClient
          .from("favorite_recipes")
          .select("recipe_id"));
        if (error) res.send(error);
        else {
          const favorites = data?.map((val) => val.recipe_id) || [];
          console.log(favorites);
          res.status(200).json(favorites);
        }
        break;

      case "POST":
        ({ error } = await supabaseServerClient
          .from("favorite_recipes")
          .insert({ recipe_id, user_id: user.id }));
        if (error) res.send(error);
        else
          res
            .status(201)
            .json({ message: "Recipe successfully added to favorites" });
        break;

      case "DELETE":
        ({ error } = await supabaseServerClient
          .from("favorite_recipes")
          .delete()
          .eq("recipe_id", recipe_id));
        if (error) res.send(error);
        else {
          res.status(200).json({
            message: "Recipe successfully removed from favorite recipes",
          });
        }
        break;

      default:
        res.status(400).json("Bad Request");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
