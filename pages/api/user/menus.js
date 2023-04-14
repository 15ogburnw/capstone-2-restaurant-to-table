import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req, res) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });
  const user = await supabaseServerClient.auth.getUser();
  try {
    if (req.method === "GET") {
      let { data, error } = await supabaseServerClient
        .from("menus")
        .select("name");
      if (error) res.status(400).json({ message: error.message });

      const menus = data?.map((val) => val.name) || [];
      res.status(200).json({ menus });
    } else if (req.method === "POST") {
      const { menu } = req.body;
      let { error } = await supabaseServerClient
        .from("menus")
        .insert({ name: menu.name, user_id: user.id });
      if (error) return res.status(400).json({ message: error.message });
      else {
        return res.status(201).json({ message: "Menu successfully created" });
      }
    } else if (req.method === "DELETE") {
      // TODO: BUILD THIS
    } else if (req.method === "PATCH") {
      // TODO: BUILD THIS
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

// TODO: TRACK DOWN THE COMPONENT THAT DISABLES THE MODAL WHEN YOU CLICK OFF OF IT

export default handler;
