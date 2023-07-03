import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req, res) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });

  const { menuId } = req.query;

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) return res.status(401).json({ message: "Unauthorized" });

  /**If a GET request is sent to this endpoint, get the recipes for the menu with requested menu ID.
   * Since we have Row-level-security enabled, the logged-in user will only see their own menus, so we can just query the menus table
   * directly and get its recipes through the join table.
   */
  if (req.method === "GET") {
    const { data: menu, error } = await supabaseServerClient
      .from("menus")
      .select(`id,name, recipes(id,name)`)
      .eq("id", menuId);

    if (error) {
      res.status(400).json({
        message: error.message,
      });
    } else if (menu) {
      res.status(200).json(menu);
    } else {
      res.status(500).json({ message: "something went wrong" });
    }
  } else {
    res.status(401).json({ message: "Method Not Authorized" });
  }
};

export default handler;
