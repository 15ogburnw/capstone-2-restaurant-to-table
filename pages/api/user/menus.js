import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req, res) => {
  try {
    const supabaseServerClient = createServerSupabaseClient({
      req,
      res,
    });
    const user = await supabaseServerClient.auth.getUser();
    if (req.method === "GET") {
      let { data, error } = await supabaseServerClient
        .from("menus")
        .select("name");
      if (error) res.status(400).json({ message: error.message });

      const menus = data?.map((val) => val.name) || [];
      res.status(200).json({ menus });
    } else if (req.method === "POST") {
      const { name } = req.body;
      let { error } = await supabaseServerClient
        .from("menus")
        .insert({ name, user_id: user.id });
      if (error) res.status(400).json({ message: error.message });
      else {
        res.status(201).json({ message: "Menu successfully created" });
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
