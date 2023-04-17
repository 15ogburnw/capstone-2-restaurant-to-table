import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const handler = async (req, res) => {
	try {
		const supabaseServerClient = createServerSupabaseClient({
			req,
			res,
		});
		const {
			data: { user },
		} = await supabaseServerClient.auth.getUser();
		const { recipe_id } = req.body || null;
		let saved;

		switch (req.method) {
			case "GET":
				saved = await supabaseServerClient
					.from("saved_recipes")
					.select("recipe_id"));
				if (error) res.send(error);
				else {
					const saved = data?.map((val) => val.recipe_id) || [];
					console.log(saved);
					res.status(200).json(saved);
				}

			case 'POST':
				saved = await supabaseServerClient
					.from('saved_recipes')
					.insert({ recipe_id, user_id: user.id })
					.select('recipe_id');
				if (saved.error) throw saved.error;
				else {
					console.log('recipe successfully saved', saved.data);
					return res.status(201).json(saved.data);
				}

			case "DELETE":
				saved = await supabaseServerClient
					.from("saved_recipes")
					.delete()
					.eq("recipe_id", recipe_id));
				if (error) res.send(error);
				else {
					console.log("recipe successfully deleted", saved.data);
					return res.status(200).json(saved.data);
				}

			default:
				return res.status(400).json({ error: 'Bad Request' });
		}
	} catch (error) {
		return res.send(error);
	}
};

export default handler;
