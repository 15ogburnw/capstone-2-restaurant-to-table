import { replaceSpaces } from "@/lib/edamam/helpers";
import { EDAMAM_API_URL } from "@/lib/edamam/filters";
import { getPlaiceholder } from "plaiceholder";

async function edamamQuery(req, res) {
  // get values from form and set initial values as necessary

  if (req.method === "POST") {
    try {
      let {
        query,
        nextPageURL,
        cuisineTypes,
        dishTypes,
        mealTypes,
        dietLabels,
        healthLabels,
      } = req.body;
      let url;

      if (!cuisineTypes) cuisineTypes = [];
      if (!dishTypes) dishTypes = [];
      if (!mealTypes) mealTypes = [];
      if (!dietLabels) dietLabels = [];
      if (!healthLabels) healthLabels = [];

      if (!query && !nextPageURL) res.status(400).send();

      if (query) {
        query = replaceSpaces(query.trim());
        //set up the URL that we will use to query the Edamam API with the filter values as query parameters
        url = `${EDAMAM_API_URL}?type=public&q=${query}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}&`;

        for (let type of mealTypes) {
          url += `mealType=${type}&`;
        }
        for (let type of dishTypes) {
          url += `dishType=${type}&`;
        }
        for (let type of cuisineTypes) {
          url += `cuisineType=${type}&`;
        }
        for (let label of dietLabels) {
          url += `diet=${label}&`;
        }
        for (let label of healthLabels) {
          url += `health=${label}&`;
        }

        if (url.slice(-1) === "&") {
          url = url.slice(0, url.length - 1);
        }
      } else {
        url = nextPageURL;
      }

      const data = await fetch(url)
        .then((res) => res.json())
        .catch((e) => console.error(e));

      for (let result of data.hits) {
        let res = await getPlaiceholder(result.recipe.image);
        result.recipe.placeholder = res.base64;
      }

      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  } else {
    res.status(400).json({ error: "method not allowed" });
  }
}

export default edamamQuery;
