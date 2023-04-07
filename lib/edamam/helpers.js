import {
  EDAMAM_API_URL,
  MEAL_TYPES,
  DIET_LABELS,
  HEALTH_LABELS,
  CUISINE_TYPES,
  DISH_TYPES,
} from "./filters";

function replaceSpaces(query) {
  const replacement = "%20";
  for (let i = 0; i < query.length; i++) {
    if (query[i] === " ") query = query.replace(query[i], replacement);
  }
  return query;
}

// TODO: THIS NEEDS TO BE TESTED WITH AN ACTUAL QUERY

export async function edamamSearch(formVals, apiKey, appId) {
  // get values from form and set initial values as necessary
  let { query, cuisineTypes, dishTypes, mealTypes, dietLabels, healthLabels } =
    formVals;
  if (!cuisineTypes) cuisineTypes = [];
  if (!dishTypes) dishTypes = [];
  if (!mealTypes) mealTypes = [];
  if (!dietLabels) dietLabels = [];
  if (!healthLabels) healthLabels = [];

  if (!query) return;

  query = replaceSpaces(query.trim());

  //set up the URL that we will use to query the Edamam API with the filter values as query parameters
  let url = `${EDAMAM_API_URL}?type=public&q=${query}&app_id=${appId}&app_key=${apiKey}&`;

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

  try {
    const data = await fetch(url)
      .then((res) => res.json())
      .then((res) => res.data);

    // I set the important values for state storage based on the response I get back and set
    // the page to 1
    let totalResults, currentPage, totalPages, nextPageURL;

    totalResults = data.count;
    if (!totalResults) return;
    currentPage = 1;
    totalPages = Number.isInteger(totalResults / 20)
      ? totalResults / 20
      : Math.ceil(totalResults / 20);
    nextPageURL = data._links?.next ? data._links.next.href : null;

    const items = [...data.hits];
    const currentPageRecipes = [...data.hits];

    const newResults = {
      totalResults,
      currentPage,
      totalPages,
      nextPageURL,
      items,
      currentPageRecipes,
    };
    return newResults;
  } catch (e) {
    console.error(e);
  }
}

// TODO: MAKE SURE THIS OBJECT IS WHAT I NEED

export function truncateRecipe(recipe) {
  const { uri, calories, cautions, totalTime } = recipe;
  const id = uri.slice(uri.lastIndexOf("recipe") + 7);
  const name = recipe.label;
  const image = recipe.image;
  const ingredients = recipe.ingredientLines;
  const websiteURL = recipe.url;
  const servings = recipe.yield;
  let mealType, dishType, cuisineType;
  const dietLabels = [];
  const healthLabels = [];

  for (let type of MEAL_TYPES) {
    if (type.value === recipe.mealType.join()) {
      mealType = type;
    }
  }
  for (let type of CUISINE_TYPES) {
    if (type.value === recipe.cuisineType.join()) {
      cuisineType = type;
    }
  }
  for (let type of DISH_TYPES) {
    if (type.value === recipe.dishType.join()) {
      dishType = type;
    }
  }
  for (let item of DIET_LABELS) {
    if (recipe.dietLabels.includes(item.label)) {
      dietLabels.push(item);
    }
  }
  for (let item of HEALTH_LABELS) {
    if (recipe.healthLabels.includes(item.label)) {
      healthLabels.push(item);
    }
  }

  return {
    id,
    name,
    image,
    ingredients,
    websiteURL,
    servings,
    calories,
    cautions,
    totalTime,
    mealType,
    dishType,
    cuisineType,
    dietLabels,
    healthLabels,
  };
}

// TODO: FIGURE OUT HOW THIS IS GOING TO WORK WITH THE NEW VERSION OF THE APP

//This function is used to handle both initial searches and pagination of existing searches.
//We pass a type (either 'next', 'prev', or 'search', along with an optional initial search object)
export const handleEdamamPagination = async (type, results) => {
  //Grabbing values from current state
  let { totalResults, totalPages, currentPage, nextPageURL } = results;
  let lastOnPage;
  let currentPageRecipes;

  //create a new array by spreading existing recipes array from state
  let recipes = [...results.items];

  //Logic for handling case in which a user clicks next on pagination feature.
  // first check the type passed in as an argument matches, then make sure the
  // current page is less than the total pages.
  if (type === "next" && currentPage < totalPages) {
    //increment page count and grab the last value from the next page. If the new current
    // page is equal to the total page count, the last value is the total found results,
    // otherwise we multiply the current page by 20 to get this number (20 results per page),
    // then increment the page #
    currentPage++;

    //If the current page is equal to the final page, we can assume the last value on
    // the page is also the final result, otherwise the last item on the page is
    // the current page multiplied by 20. Then if the length of my recipes array
    // is shorter than the last result, I query the API for the next 20 results
    //using a URL obbtained further below, and spread the old and new recipes into a new
    // array. I also set the grab the next page URL response to store in state later.

    lastOnPage = currentPage === totalPages ? totalResults : currentPage * 20;
    if (recipes.length < lastOnPage) {
      const nextPageResp = await axios.get(nextPageURL);
      nextPageURL = nextPageResp.data._links.next
        ? nextPageResp.data._links.next.href
        : null;
      const nextPageRecipes = nextPageResp.data.hits;
      recipes = [...recipes, ...nextPageRecipes];
    }

    // Logic if the user clics the Previous pagination button. All I'm doing here is
    // checking to make sure I'm not on page one, then decrementing the current page to
    // store in state later.
  } else if (type === "prev" && currentPage > 1) {
    currentPage--;
  } else {
    return;
  }

  // gettting the chunk of 20 recipes based on the current page the user is on
  currentPageRecipes = recipes.slice(currentPage * 20 - 20, currentPage * 20);

  // set the new results state
  return {
    items: recipes,
    totalResults,
    totalPages,
    currentPage,
    currentPageRecipes,
    nextPageURL,
  };
};
