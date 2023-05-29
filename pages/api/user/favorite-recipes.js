import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const handler = async (req, res) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });
  const {
    data: { user },
    error: userError,
  } = await supabaseServerClient.auth.getUser();

  if (userError) return res.status(401).json({ message: 'Unauthorized' });

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

      return res
        .status(400)
        .json({ message: 'There was a problem retrieving your favorite recipes. Please try again later' });
    }
    else {
      const favorites = data?.map((val) => val.recipe_id) || [];
      console.log('The user has these favorite recipes:', favorites);
      return res.status(200).json(favorites);
    }
  }
  /** If a post request is sent to this endpoint, add the recipe to the join table representing the user's favorite recipes.
   * This will not work if the recipe is not present in the database, so we perform an upsert on the recipes table first. Throw an error if we run into difficulties.
   */
  else if (req.method === 'POST') {
    const recipe = req.body;
    console.log('*****REQUEST BODY*****', req.body)
    console.log('*****RECIPE*****', recipe)
    await supabaseServerClient.from('recipes').upsert({ id: recipe.id, name: recipe.name }, { ignoreDuplicates: true })
    const { error, data } = await supabaseServerClient.from('favorite_recipes').insert({ recipe_id: recipe.id, user_id: user.id }).select();
    if (error) {
      res.status(400).json({ message: error.message, details: error.details, misc: error.hint })
    } else {
      console.log("FAVORITE SUCCESSFULLY ADDED::", data[0].recipe_id)
      res.status(201).json({ recipe: data[0].recipe_id })
    }
  }

  else if (req.method === "DELETE") {
    const recipe = req.body;
    console.log('*****REQUEST BODY*****', req.body)
    console.log('*****RECIPE*****', recipe)
    const { error, data } = await supabaseServerClient.from('favorite_recipes').delete().eq('recipe_id', recipe.id).select();
    if (error) {
      res.status(400).json({ message: 'There was a problem removing this recipe from your favorites. Please try again later' })
    } else {
      console.log("FAVORITE RECIPE SUCCESSFULLY DELETED::", data[0].recipe_id)
      res.status(200).json({ recipe: data[0].recipe_id });
    }
  }
  else {
    res.status(400).json({ message: 'Method not allowed' })
  }
};


export default handler;
