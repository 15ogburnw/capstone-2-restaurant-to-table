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
          .from("saved_recipes")
          .select("recipe_id"));
        if (error) res.error(error);
        else {
          const saved = data?.map((val) => val.recipe_id) || [];
          res.status(200).json(saved);
        }
        break;

      case "POST":
        ({ error } = await supabaseServerClient
          .from("saved_recipes")
          .insert({ recipe_id, user_id: user.id }));
        if (error) res.error(error);
        else res.status(201).json({ message: "Recipe successfully saved" });
        break;

      case "DELETE":
        ({ error } = await supabaseServerClient
          .from("saved_recipes")
          .delete()
          .eq("recipe_id", recipe_id));
        if (error) res.error(error);
        else {
          res.status(200).json({
            message: "Recipe successfully removed from saved recipes",
          });
        }
        break;

      default:
        error = new Error("Something went wrong, please try again later");
        error.code = 500;
        res.error(error);
    }
  } catch (error) {
    res.error(error);
  }
};

export default handler;
