import {
  MEAL_TYPES,
  DIET_LABELS,
  HEALTH_LABELS,
  CUISINE_TYPES,
  DISH_TYPES,
} from "./filters";

export function replaceSpaces(phrase) {
  const replacement = "%20";
  for (let i = 0; i < phrase.length; i++) {
    if (phrase[i] === " ") phrase = phrase.replace(phrase[i], replacement);
  }
  return phrase;
}

// TODO: NEED TO MAKE SURE THIS IS FUNCTIONING THE WAY I NEED IT TO
export function makeURL(baseURL, queryParams) {

  let {
    query,
    cuisineTypes = [],
    dishTypes = [],
    mealTypes = [],
    dietLabels = [],
    healthLabels = [],
    nextPageURL
  } = queryParams;

  query = query ? replaceSpaces(query.trim()) : null;
  console.log('Query: ', query)
  console.log('filters: ', cuisineTypes, dishTypes, mealTypes, dietLabels, healthLabels);
  let url = baseURL;
  url += `query=${query}&`;

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

  if (nextPageURL) {
    nextPageURL
  }
  console.log('complete url: ', url)
  return url;
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
  const placeholder = recipe.placeholder;
  let mealType, dishType, cuisineType;
  const dietLabels = [];
  const healthLabels = [];

  if (recipe.mealType) {
    if (recipe.mealType[0] === "lunch/dinner") {
      mealType = "Lunch/Dinner";
    }
    for (let value of MEAL_TYPES) {
      if (value.toLowerCase() === recipe.mealType.join()) {
        mealType = value;
      }
    }
  }
  if (recipe.cuisineType) {
    for (let value of CUISINE_TYPES) {
      if (value.toLowerCase() === recipe.cuisineType.join()) {
        cuisineType = value;
      }
    }
  }
  if (recipe.dishType) {
    for (let value of DISH_TYPES) {
      if (value.toLowerCase() === recipe.dishType.join()) {
        dishType = value;
      }
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
    placeholder,
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

//This function is used to handle pagination of existing searches.
//We pass a type (either 'next' or 'prev', along with initial search results object)
export const recipePagination = async (type, results) => {
  //Grabbing values from current state
  let { totalPages, currentPage, nextPageURL } = results;
  let recipes = results.items;
  let currentPageItems;

  //Logic for handling case in which a user clicks next on pagination feature.
  // If we already have the recipes, just increment the page count

  if (type === "next" && recipes.length > currentPage * 20) {
    currentPage++;
  }
  // If we don't have the recipes yet, get them from edamam
  else if (type === "next" && currentPage < totalPages) {
    //increment page count
    currentPage++;

    const data = await fetch("/api/recipes/", {
      method: "POST",
      body: JSON.stringify({ nextPageURL }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json();
    });

    nextPageURL = data._links?.next?.href || null;
    const nextPageRecipes = data.hits.map((recipe) => {
      return truncateRecipe(recipe);
    });
    recipes = [...recipes, ...nextPageRecipes];
  }
  // Logic if the user clicks the previous pagination button.
  // Check to make sure I'm not on page one, then decrement the current page
  else if (type === "prev" && currentPage > 1) {
    currentPage--;
  } else {
    return;
  }

  // getting the recipes for the current page
  if (currentPage === totalPages) {
    currentPageItems = recipes.slice(currentPage * 20 - 20);
  } else {
    currentPageItems = recipes.slice(currentPage * 20 - 20, currentPage * 20);
  }
  // return the new results state
  return {
    items: recipes,
    totalPages,
    currentPage,
    currentPageItems,
    nextPageURL,
  };
};
