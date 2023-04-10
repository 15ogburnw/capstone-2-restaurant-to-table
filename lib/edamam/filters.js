export const EDAMAM_API_URL = "https://api.edamam.com/api/recipes/v2";

export const DIET_LABELS = [
  {
    label: "Balanced",
    value: "balanced",
    definition: "Protein/Fat/Carb values in 15/35/50 ratio",
  },
  {
    label: "High-Fiber",
    value: "high-fiber",
    definition: "More than 5g fiber per serving",
  },
  {
    label: "High-Protein",
    value: "high-protein",
    definition: "More than 50% of total calories from proteins",
  },
  {
    label: "Low-Carb",
    value: "low-carb",
    definition: "Less than 20% of total calories from carbs",
  },
  {
    label: "Low-Fat",
    value: "low-fat",
    definition: "Less than 15% of total calories from fat",
  },
  {
    label: "Low-Sodium",
    value: "low-sodium",
    definition: "Less than 140mg Na per serving",
  },
];

export const HEALTH_LABELS = [
  {
    label: "Alcohol-Cocktail",
    value: "alcohol-cocktail",
    definition: "Describes an alcoholic cocktail",
  },
  {
    label: "Alcohol-Free",
    value: "alcohol-free",
    definition: "No alcohol used or contained",
  },
  {
    label: "Celery-Free",
    value: "celery-free",
    definition: "Does not contain celery or derivatives",
  },
  {
    label: "Crustacean-Free",
    value: "crustacean-free",
    definition:
      "Does not contain crustaceans (shrimp, lobster etc.) or derivatives",
  },
  {
    label: "Dairy-Free",
    value: "dairy-free",
    definition: "No dairy; no lactose",
  },
  {
    label: "DASH",
    value: "DASH",
    definition: "Dietary Approaches to Stop Hypertension diet",
  },
  {
    label: "Egg-Free",
    value: "egg-free",
    definition: "No eggs or products containing eggs",
  },
  {
    label: "Fish-Free",
    value: "fish-free",
    definition: "No fish or fish derivatives",
  },
  {
    label: "FODMAP-Free",
    value: "fodmap-free",
    definition: "Does not contain FODMAP foods",
  },
  {
    label: "Gluten-Free",
    value: "gluten-free",
    definition: "No ingredients containing gluten",
  },
  {
    label: "Immuno-Supportive",
    value: "immuno-supportive",
    definition:
      "Recipes which fit a science-based approach to eating to strengthen the immune system",
  },
  {
    label: "Keto-Friendly",
    value: "keto-friendly",
    definition: "Maximum 7 grams of net carbs per serving",
  },
  {
    label: "Kidney-Friendly",
    value: "kidney-friendly",
    definition:
      "Per serving - phosphorus less than 250 mg AND potassium less than 500 mg AND sodium less than 500 mg",
  },
  {
    label: "Kosher",
    value: "kosher",
    definition:
      "Contains only ingredients allowed by the kosher diet. However it does not guarantee kosher preparation of the ingredients themselves",
  },
  {
    label: "Low Potassium",
    value: "low-potassium",
    definition: "Less than 150mg per serving",
  },
  {
    label: "Low Sugar",
    value: "low-sugar",
    definition:
      "No simple sugars – glucose, dextrose, galactose, fructose, sucrose, lactose, maltose",
  },
  {
    label: "Lupine-Free",
    value: "lupine-free",
    definition: "Does not contain lupine or derivatives",
  },
  {
    label: "Mediterranean",
    value: "Mediterranean",
    definition: "Mediterranean diet",
  },
  {
    label: "Mollusk-Free",
    value: "mollusk-free",
    definition: "No mollusks",
  },
  {
    label: "Mustard-Free",
    value: "mustard-free",
    definition: "Does not contain mustard or derivatives",
  },
  {
    label: "No oil added",
    value: "No-oil-added",
    definition:
      "No oil added except to what is contained in the basic ingredients",
  },
  {
    label: "Paleo",
    value: "paleo",
    definition:
      "Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils",
  },
  {
    label: "Peanut-Free",
    value: "peanut-free",
    definition: "No peanuts or products containing peanuts",
  },
  {
    label: "Pescatarian",
    value: "pescatarian",
    definition:
      "Does not contain meat or meat based products, can contain dairy and fish",
  },
  {
    label: "Pork-Free",
    value: "pork-free",
    definition: "Does not contain pork or derivatives",
  },
  {
    label: "Red-Meat-Free",
    value: "red-meat-free",
    definition:
      "Does not contain beef, lamb, pork, duck, goose, game, horse, and other types of red meat or products containing red meat.",
  },
  {
    label: "Sesame-Free",
    value: "sesame-free",
    definition: "Does not contain sesame seed or derivatives",
  },
  {
    label: "Shellfish-Free",
    value: "shellfish-free",
    definition: "No shellfish or shellfish derivatives",
  },
  {
    label: "Soy-Free",
    value: "soy-free",
    definition: "No soy or products containing soy",
  },
  {
    label: "Sugar-Conscious",
    value: "sugar-conscious",
    definition: "Less than 4g of sugar per serving",
  },
  {
    label: "Sulfite-Free",
    value: "sulfite-free",
    definition: "No Sulfites",
  },
  {
    label: "Tree-Nut-Free",
    value: "tree-nut-free",
    definition: "No tree nuts or products containing tree nuts",
  },
  {
    label: "Vegan",
    value: "vegan",
    definition: "No meat, poultry, fish, dairy, eggs or honey",
  },
  {
    label: "Vegetarian",
    value: "vegetarian",
    definition: "No meat, poultry, or fish",
  },
  {
    label: "Wheat-Free",
    value: "wheat-free",
    definition: "No wheat, can have gluten though",
  },
];

export const MEAL_TYPES = ["Breakfast", "Dinner", "Snack", "Lunch", "Teatime"];
export const DISH_TYPES = [
  "Alcohol Cocktail",
  "Biscuits and Cookies",
  "Bread",
  "Cereals",
  "Condiments and Sauces",
  "Desserts",
  "Drinks",
  "Egg",
  "Ice Cream and Custard",
  "Main Course",
  "Pancake",
  "Pasta",
  "Pastry",
  "Pies and Tarts",
  "Pizza",
  "Preps",
  "Preserve",
  "Salad",
  "Sandwiches",
  "Seafood",
  "Side Dish",
  "Soup",
  "Special Occasions",
  "Starter",
  "Sweets",
];
export const CUISINE_TYPES = [
  "American",
  "Asian",
  "British",
  "Caribbean",
  "Central Europe",
  "Chinese",
  "Eastern Europe",
  "French",
  "Greek",
  "Indian",
  "Italian",
  "Japanese",
  "Korean",
  "Kosher",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "South American",
  "South East Asian",
  "World",
];

const filters = {
  CUISINE_TYPES,
  MEAL_TYPES,
  DIET_LABELS,
  HEALTH_LABELS,
  DISH_TYPES,
};

export default filters;
