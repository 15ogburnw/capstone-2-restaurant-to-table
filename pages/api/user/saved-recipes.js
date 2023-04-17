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
        if (error) res.send(error);
        else {
          const saved = data?.map((val) => val.recipe_id) || [];
          console.log(saved);
          res.status(200).json(saved);
        }
        break;

      case "POST":
        ({ data, error } = await supabaseServerClient
          .from("saved_recipes")
          .insert({ recipe_id, user_id: user.id })
          .select("recipe_id"));
        if (error) res.send(error);
        else
          res.status(201).json({
            data: { message: "Recipe successfully saved", saves: data },
          });
        break;

      case "DELETE":
        ({ error } = await supabaseServerClient
          .from("saved_recipes")
          .delete()
          .eq("recipe_id", recipe_id));
        if (error) res.send(error);
        else {
          res.status(200).json({
            message: "Recipe successfully removed from saved recipes",
          });
        }
        break;

      default:
        res.status(400).json({ error: "Bad Request" });
    }
  } catch (error) {
    res.send(error);
  }
};

export default handler;
