import { makeURL, truncateRecipe } from "@/lib/edamam/helpers";
import { EDAMAM_API_URL } from "@/lib/edamam/filters";
import { getPlaiceholder } from "plaiceholder";

async function edamamQuery(req, res) {
	// get values from form and set initial values as necessary

	if (req.method === "GET") {

		let {
			query,
			nextPageURL
		} = req.query;


		let url;

		if (nextPageURL) {
			console.log('in if loop')
			url = nextPageURL;
		}
		else if (query) {
			console.log('in else if')

			//set up the URL that we will use to query the Edamam API with the filter values as query parameters
			const baseURL = `${EDAMAM_API_URL}?type=public&q=${query}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}&`;
			url = makeURL(baseURL, req.query)

		} else if (!query && !nextPageURL) {

			res.status(400).send({ message: "You must provide a search term or select select search filters (or both). Please try again!" });
		}

		console.log('outside of loop')
		const resp = await fetch(url)
			.then((res) => res.json()).catch((e) => res.status(e.code).json({ message: e.message }))
		console.log(resp)


		const pageData = { data: resp.hits?.map((el) => truncateRecipe(el.recipe)) || null, nextPageURL: resp._links?.next?.href || null }
		console.log(pageData)
		if (!pageData.data) res.status(200).json({ message: "search complete" })
		for (let result of pageData.data) {
			let placeholder = await getPlaiceholder(result.image);
			result.placeholder = placeholder.base64;
		}

		res.status(200).json(pageData);

	} else {
		res.status(400).json({ message: "method not allowed" });
	}
}

export default edamamQuery;
