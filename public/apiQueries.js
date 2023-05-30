

export async function addRecipe(url, { arg }) {
	console.log('ADD RECIPE HELPER::URL::', url)

	return fetch(url, {
		method: "post",
		body: JSON.stringify(arg),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	}).then((res) => res.json())
};

export async function removeRecipe(url, { arg }) {
	console.log('REMOVE RECIPE HELPER::URL::', url)

	return await fetch(url, {
		method: "DELETE",
		body: JSON.stringify(arg),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}

	}).then((res) => console.log(res))
};






