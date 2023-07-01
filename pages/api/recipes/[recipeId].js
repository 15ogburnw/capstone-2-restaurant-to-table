import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req, res) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });

  const { recipeId } = req.query;

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) return res.status(401).json({ message: "Unauthorized" });

  /**
   * If a GET request is sent to this endpoint, get the recipe with requested recipe ID.
   */
  if (req.method === "GET") {
    const { data: recipe, error } = await supabaseServerClient
      .from("recipes")
      .select("*")
      .eq("id", recipeId);

    if (error) {
      res.status(400).json({
        message: error.message,
      });
    } else if (recipe) {
      console.log(recipe);
      res.status(200).json(recipe);
    } else {
      res.status(500).json({ message: "something went wrong" });
    }
  } else {
    res.status(401).json({ message: "Method Not Authorized" });
  }
};

export default handler;
