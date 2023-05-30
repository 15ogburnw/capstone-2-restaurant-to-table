

export async function addRecipe(url, { arg }) {
	recipe = arg.recipe
	console.log('ADD RECIPE HELPER::RECIPE::', recipe);
	console.log('ADD RECIPE HELPER::URL::', url)

	return fetch(url, {
		method: "post",
		body: JSON.stringify(recipe),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	}).then((res) => res.json())
};

export async function removeRecipe(url, { arg }) {
	console.log('REMOVE RECIPE HELPER::RECIPE::', arg)
	recipe = arg.recipe
	return await fetch(url, {
		method: "DELETE",
		body: JSON.stringify(recipe),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}

	}).then((res) => res.json())
};






