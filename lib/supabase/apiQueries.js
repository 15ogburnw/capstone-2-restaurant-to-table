
export async function toggleRecipeStatus(url, { arg }) {
	const { method, recipe } = arg;

	return fetch(url, {
		// export const updateFavoriteRecipes = async ({ recipe, method }) => {
		// 	return fetch(url, {
		// 		method,
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify({ recipe }),
		// 	});
		// };

		// export const updateSavedRecipes = async ({ recipe, method }) => {
		// 	return fetch(url, {
		// 		method,
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify({ recipe }),
		// 	});
		// };

		export async function toggleRecipeStatus(url, { arg }) {
		const { method, recipe } = arg;

		return fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ recipe }),
		}).then((res) => {
			console.log(res);
			res.json();
			body: JSON.stringify({ recipe }),
	}).then((res) => {
				console.log(res);
				res.json();
			});
	}
}
