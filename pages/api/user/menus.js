import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const handler = async (req, res) => {
  try {
    const supabaseServerClient = createServerSupabaseClient({
      req,
      res,
    });
    const {
      data: { user },
    } = await supabaseServerClient.auth.getUser();
    const { name, id } = req.body;
    let data, error;

    switch (req.method) {
      case "GET":
        ({ data, error } = await supabaseServerClient
          .from("menus")
          .select("name, id"));
        if (error) {
          res.status(error.code).send({ error: error.message });
        } else {
          res.status(200).json(data);
        }
        break;

      case "POST":
        ({ data, error } = await supabaseServerClient
          .from("menus")
          .insert({ name: name, user_id: user.id })
          .select("name, id"));
        if (error) res.status(error.code).json({ error: error.message });
        else {
          console.log("menus after post", data);
          res.status(201).json(data);
        }
        break;

      case "DELETE":
        ({ data, error } = await supabaseServerClient
          .from("menus")
          .delete()
          .eq("name", name)
          .select("id", "name"));
        if (error) res.status(error.code).send({ error: error.message });
        else {
          console.log("deleted menu", data);
          res
            .status(200)
            .json({ message: `successfully deleted menu "${name}"` });
        }
        break;

      case "PATCH":
        ({ data, error } = await supabaseServerClient
          .from("menus")
          .update({ name })
          .eq("id", id)
          .select("id", "name"));
        if (error) res.status(error.code).json({ error: error.message });
        else {
          console.log("menu after update", data.name);
        }
        break;

      default:
        res
          .status(500)
          .send({ error: "Something went wrong, please try again later" });
    }
  } catch (error) {
    res.status(error.code).send(error.message);
  }
};

export default handler;
