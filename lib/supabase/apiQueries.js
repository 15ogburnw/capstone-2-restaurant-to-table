const toggleUserRecipes = async ({ recipe_id, method, type }) => {
	const resp = await toggleSave(`/api/user/${type}-recipes`, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ recipe_id }),
	});
	console.log(resp);
};
