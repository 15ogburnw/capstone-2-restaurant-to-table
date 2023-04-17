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
    let saved;

    switch (req.method) {
      case "GET":
        saved = await supabaseServerClient
          .from("saved_recipes")
          .select("recipe_id");
        if (saved.error)
          res.status(saved.status).json({ error: saved.statusText });
        else {
          saved = saved?.map((val) => val.recipe_id) || [];
          console.log("The user has these recipes saved:", saved);
          res.status(200).json(saved);
        }
        break;

      case "POST":
        saved = await supabaseServerClient
          .from("saved_recipes")
          .insert({ recipe_id, user_id: user.id })
          .select("recipe_id");
        if (saved.error)
          res.status(saved.status).json({ error: res.statusText });
        else {
          console.log("recipe successfully saved", saved.data);
          res.status(201).json(saved.data);
        }
        break;

      case "DELETE":
        saved = await supabaseServerClient
          .from("saved_recipes")
          .delete()
          .eq("recipe_id", recipe_id)
          .select("recipe_id");
        if (saved.error)
          res.status(saved.status).json({ error: saved.statusText });
        else {
          console.log("recipe successfully deleted", saved.data);
          res.status(200).json(saved.data);
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
