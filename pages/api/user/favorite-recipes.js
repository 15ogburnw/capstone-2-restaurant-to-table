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

  if (req.method === "GET") {
    /**If a GET request is sent to this endpoint, get all of the current user's favorite recipes.
     * Since we have Row-level-security enabled, the logged-in user will only see their own favorites, so we can just grab all values matching
     * an entry on the recipes table by querying the join table.
     *  TODO: **Test this logic**
     */
    const { error, data } = await supabaseServerClient
      .from("favorite_recipes")
      .select("recipe_id(id,name)");

    if (error) {
      res.status(400).json({
        message:
          "There was a problem retrieving your favorite recipes. Please try again later",
      });
    } else {
      const favorites = data ? data.map((val) => val.recipe_id) : [];
      res.status(200).json(favorites);
    }
  } else {
    res.status(401).json({ message: "Method Not Authorized" });
  }
};

export default handler;
