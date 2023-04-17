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
    const { name, id } = req.body;
    let menus;

    switch (req.method) {
      case "GET":
        menus = await supabaseServerClient.from("menus").select("id, name");
        if (menus.error) {
          res.status(menus.status).json({ error: menus.statusText });
        } else {
          res.status(200).json(menus.data);
        }
        break;

      case "POST":
        menus = await supabaseServerClient
          .from("menus")
          .insert({ name: name, user_id: user.id })
          .select("id, name");
        if (menus.error)
          res.status(menus.status).json({ error: menus.statusText });
        else {
          console.log("menu successfully added:", menus.data);
          res.status(201).json(menus.data);
        }
        break;

      case "DELETE":
        menus = await supabaseServerClient
          .from("menus")
          .delete()
          .eq("name", name)
          .select("id", "name");
        if (menus.error)
          res.status(menus.status).json({ error: menus.statusText });
        else {
          console.log("deleted menu", menus.data);
          res.status(200).json(menus.data);
        }
        break;

      case "PATCH":
        menus = await supabaseServerClient
          .from("menus")
          .update({ name: name })
          .eq("id", id)
          .select("id, name");
        if (menus.error)
          res.status(menus.status).json({ error: menus.statusText });
        else {
          console.log("menu after update", menus.data);
          res.status(200).json(menus.data);
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
