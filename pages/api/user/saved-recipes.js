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
	const { recipe_id } = req.body;
	if (error) return res.status(401).json({ message: 'Unauthorized' });
	let saved;

	switch (req.method) {

		/**If a GET request is sent to this endpoint, get all of the current user's favorite recipes.
			* Since we have Row-level-security enabled, the logged-in user will only see their own favorites, so we can just grab all values matching
			* an entry on the recipes table by querying the join table.
			*TODO: **Test this logic**
			*/
		case 'GET':
			saved = await supabaseServerClient
				.from('saved_recipes')
				.select('recipe_id(id,name)');
			if (saved.error) {
				console.log(saved.error)
				return res
					.status(saved.error.code)
					.json({ message: saved.error.message });
			}
			else {
				console.log(saved.data)
				saved = saved.data?.map((val) => val.recipe_id) || [];
				console.log('The user has these recipes saved:', saved);
				return res.status(200).send(saved);
			}

		case 'POST':
			saved = await supabaseServerClient
				.from('saved_recipes')
				.insert({ recipe_id, user_id: user.id })
				.select('recipe_id(id,name)');
			if (saved.error) throw saved.error;
			else {
				console.log('recipe successfully saved', saved.data);
				return res.status(201).json(saved.data);
			}

		case 'DELETE':
			saved = await supabaseServerClient
				.from('saved_recipes')
				.delete()
				.eq('recipe_id', recipe_id)
				.select('recipe_id');
			if (saved.error) throw saved.error;
			else {
				console.log('recipe successfully deleted', saved.data);
				return res.status(200).json(saved.data);
			}

		default:
			return res.status(400).json({ error: 'Bad Request' });
	}

};

export default handler;
