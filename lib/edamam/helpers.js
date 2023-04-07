import {
  MEAL_TYPES,
  DIET_LABELS,
  HEALTH_LABELS,
  CUISINE_TYPES,
  DISH_TYPES,
} from "./filters";

export function replaceSpaces(query) {
  const replacement = "%20";
  for (let i = 0; i < query.length; i++) {
    if (query[i] === " ") query = query.replace(query[i], replacement);
  }
  return query;
}

// TODO: MAKE SURE THIS OBJECT IS WHAT I NEED

export function truncateRecipe(data) {
  const recipe = data.recipe;
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

  if (recipe.mealType) {
    for (let type of MEAL_TYPES) {
      if (type.value === recipe.mealType.join()) {
        mealType = type;
      }
    }
  }
  if (recipe.cuisineType) {
    for (let type of CUISINE_TYPES) {
      if (type.value === recipe.cuisineType.join()) {
        cuisineType = type;
      }
    }
  }
  if (recipe.dishType) {
    for (let type of DISH_TYPES) {
      if (type.value === recipe.dishType.join()) {
        dishType = type;
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
    }).then((res) => res.json());
    nextPageURL = data._links?.next?.href || null;
    const nextPageRecipes = data.hits.map((recipe) => {
      return truncateRecipe(recipe);
    });
    console.log('last on this page',recipes[recipes.length-1])
    console.log('first on next page',nextPageRecipes[0]);
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
