import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';


const handler = async (req, res) => {

	const supabaseServerClient = createServerSupabaseClient({
		req,
		res,
	});
	const {
		data: { user },
		error
	} = await supabaseServerClient.auth.getUser();


	console.log('*****REQUEST BODY*****', req.body)

	if (error) return res.status(401).json({ message: 'Unauthorized' });




	/**If a GET request is sent to this endpoint, get all of the current user's favorite recipes.
		* Since we have Row-level-security enabled, the logged-in user will only see their own favorites, so we can just grab all values matching
		* an entry on the recipes table by querying the join table.
		*TODO: **Test this logic**
		*/
	if (req.method === 'GET') {
		const { data, error } = await supabaseServerClient
			.from('saved_recipes')
			.select('recipe_id(id,name)');
		if (error) {
			console.error(error)
			res
				.status(400)
				.json({ message: 'There was a problem retrieving your saved recipes. Please try again later' });
		}
		else {
			console.log(data)
			const saved = data?.map((val) => val.recipe_id) || [];
			console.log('The user has these recipes saved:', saved);
			res.status(200).json(saved);
		}
	}
	else if (req.method === 'POST') {
		const recipe = req.body;
		console.log('*****REQUEST BODY*****', req.body)
		console.log('*****RECIPE*****', recipe)
		await supabaseServerClient.from('recipes').upsert({ id: recipe.id, name: recipe.name }, { ignoreDuplicates: true })
		const { data, error } = await supabaseServerClient
			.from('saved_recipes')
			.insert({ recipe_id: recipe.id, user_id: user.id })
			.select('recipe_id(id,name)');
		if (error) {
			res.status(400).json({ message: 'There was a problem adding this recipe to your saved recipes. Please try again later' })
		}
		else {
			console.log('RECIPE SUCCESSFULLY SAVED::', data[0].recipe_id);
			res.status(201).json(data[0].recipe_id);
		}
	} else if (req.method === 'DELETE') {
		const recipe = req.body;
		console.log('*****REQUEST BODY*****', req.body)
		console.log('*****RECIPE*****', recipe)
		const { error, data } = await supabaseServerClient
			.from('saved_recipes')
			.delete()
			.eq('recipe_id', recipe.id)
			.select('recipe_id(id,name)');
		if (error) {
			res.status(400).json({ message: 'There was a problem removing this recipe from your saved recipes. Please try again later' })
		}
		else {
			console.log("SAVED RECIPE SUCCESSFULLY DELETED::", data[0].recipe_id);
			res.status(200).json(saved.data[0].recipe_id);
		}
	} else {
		res.status(400).json({ message: "Unauthorized" })
	}






};

export default handler;
