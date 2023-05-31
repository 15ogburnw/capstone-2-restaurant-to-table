import { makeURL, truncateRecipe } from "@/lib/edamam/helpers";
import { EDAMAM_API_URL } from "@/lib/edamam/filters";
import { getPlaiceholder } from "plaiceholder";

async function edamamQuery(req, res) {


	if (req.method === "GET") {

		let {
			q,
			nextPageURL
		} = req.query;

		console.log('api-recipe-search::q', q)
		let url;

		if (nextPageURL) {
			url = nextPageURL;
		}
		else if (q !== "null") {

			//set up the URL that we will use to query the Edamam API with the filter values as query parameters
			const baseURL = `${EDAMAM_API_URL}?type=public&q=${q}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}&`;

			console.log('api-recipes::req.query', req.query)
			url = makeURL(baseURL, req.query)

			console.log('api::Querying url:', url)
			const resp = await fetch(url)
				.then((res) => res.json()).catch((e) => res.status(e.code).json({ message: e.message }))

			const pageData = { data: resp.hits?.map((el) => truncateRecipe(el.recipe)) || null, nextPageURL: resp._links?.next?.href || null }

			// TODO: CHECK IF THIS LINE IS NECESSARY
			if (!pageData.data) res.status(200).json({ message: "search complete" })

			for (let result of pageData.data) {
				let placeholder = await getPlaiceholder(result.image);
				result.placeholder = placeholder.base64;
			}

			res.status(200).json(pageData);
		}
		else {
			res.status(400).json({ message: "You must provide a search term. Please try again!" });
		}

	} else {
		res.status(400).json({ message: "method not allowed" });
	}
}

export default edamamQuery;
