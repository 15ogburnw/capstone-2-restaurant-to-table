import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req, res) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) return res.status(401).json({ message: "Unauthorized" });

  /**If a GET request is sent to this endpoint, get all of the current user's favorite recipes.
   * Since we have Row-level-security enabled, the logged-in user will only see their own favorites, so we can just grab all values matching
   * an entry on the recipes table by querying the join table.
   *TODO: **Test this logic**
   */
  if (req.method === "GET") {
    const { data, error } = await supabaseServerClient
      .from("saved_recipes")
      .select("recipe_id(id,name)");

    if (error) {
      res.status(400).json({
        message:
          "There was a problem retrieving your saved recipes. Please try again later",
      });
    } else {
      const saved = data ? data.map((val) => val.recipe_id) : [];
      res.status(200).json(saved);
    }
  } else {
    res.status(401).json({ message: "Method Not Authorized" });
  }
};

export default handler;
