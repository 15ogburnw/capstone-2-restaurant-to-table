

export async function addRecipe(url, { arg }) {
	console.log('ADD RECIPE HELPER::RECIPE::', arg);
	console.log('ADD RECIPE HELPER::URL::', url)
	return fetch(url, {
		method: "POST",
		body: JSON.stringify(arg),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	}).then((res) => res.json())
};

export async function removeRecipe(url, { arg }) {
	console.log('REMOVE RECIPE HELPER::RECIPE::', arg)
	return await fetch(url, {
		method: "DELETE",
		body: JSON.stringify(arg),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}

	}).then((res) => res.json())
};






