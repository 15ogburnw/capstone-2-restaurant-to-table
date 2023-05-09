import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const handler = async (req, res) => {
	const supabaseServerClient = createServerSupabaseClient({
		req,
		res,
	});
	const {
		data: { user },
		error,
	} = await supabaseServerClient.auth.getUser();
	const { recipe_id } = req.body;

	if (error) return res.status(error.status).json({ error: error.message });
	let favorites;
	switch (req.method) {
		case 'GET':
			favorites = await supabaseServerClient
				.from('favorite_recipes')
				.select('recipe_id', 'name');
			if (favorites.error)
				return res
					.status(favorites.error.code)
					.json({ error: favorites.error });
			else {
				favorites = favorites.data?.map((val) => val.recipe_id) || [];
				console.log('here are your favorite recipes:', favorites);
				return res.status(200).json(favorites);
			}

		case 'POST':
			favorites = await supabaseServerClient
				.from('favorite_recipes')
				.insert({ recipe_id, user_id: user.id })
				.select('recipe_id', 'name');
			if (favorites.error)
				return res
					.status(favorites.error.code)
					.json({ message: favorites.error });
			else {
				console.log('recipe successfully added to favorites:', favorites.data);
				return res.status(201).json(favorites.data);
			}

		case 'DELETE':
			favorites = await supabaseServerClient
				.from('favorite_recipes')
				.delete()
				.eq('recipe_id', recipe_id)
				.select('recipe_id', 'name');
			if (favorites.error)
				return res
					.status(favorites.error.code)
					.json({ message: favorites.error });
			else {
				console.log(
					'recipe successfully removed from favorites',
					favorites.data
				);
				return res.status(200).json(favorites.data);
			}

		default:
			return res.status(400).json('Bad Request');
	}
};

export default handler;
