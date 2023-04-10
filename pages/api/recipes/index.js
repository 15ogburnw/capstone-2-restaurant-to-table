import { replaceSpaces } from "@/lib/edamam/helpers";
import { EDAMAM_API_URL } from "@/lib/edamam/filters";
import { getPlaiceholder } from "plaiceholder";

async function edamamQuery(req, res) {
  // get values from form and set initial values as necessary

  if (req.method === "POST") {
    try {
      let {
        query,
        cuisineTypes,
        nextPageURL,
        dishTypes,
        mealTypes,
        dietLabels,
        healthLabels,
      } = req.body;
      console.log(req.body);
      console.log("next page url passed to backend", nextPageURL);
      let url;

      if (!query && !nextPageURL) res.status(400).send();
      else if (query && !nextPageURL) {
        query = replaceSpaces(query.trim());
        //set up the URL that we will use to query the Edamam API with the filter values as query parameters
        url = `${EDAMAM_API_URL}?type=public&q=${query}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}&`;

        for (let type of mealTypes) {
          type = replaceSpaces(type);
          url += `mealType=${type}&`;
        }
        for (let type of dishTypes) {
          type = replaceSpaces(type);
          url += `dishType=${type}&`;
        }
        for (let type of cuisineTypes) {
          type = replaceSpaces(type);
          url += `cuisineType=${type}&`;
        }
        for (let label of dietLabels) {
          label = replaceSpaces(label);
          url += `diet=${label}&`;
        }
        for (let label of healthLabels) {
          label = replaceSpaces(label);
          url += `health=${label}&`;
        }

        if (url.slice(-1) === "&") {
          url = url.slice(0, url.length - 1);
        }
      } else {
        url = nextPageURL;
      }

      console.log("url after logic in backend", url);
      const data = await fetch(url)
        .then((res) => {
          return res.json();
        })
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
