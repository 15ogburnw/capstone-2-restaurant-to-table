import Dashboard from "@/layouts/Dashboard";

const RecipePage = ({ recipe }) => {
  const menu = {
    recipeName: { name: recipe.name },
    imageUrl: { name: recipe.id },
    nutritionFacts: {
      calories: 250,
      fat: 12,
      carbohydrates: 35,
      protein: 8,
    },
    recipeUrl: "https://www.example.com/recipe",
  };

  const handleAddToCart = () => {
    // Handle adding the recipe to the cart
  };

  const handleRemoveFromCart = () => {
    // Handle removing the recipe from the cart
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{menu.recipeName}</h1>
      <div className="flex justify-between">
        <div className="w-1/2">
          <img src={menu.imageUrl} alt={menu.recipeName} className="w-full" />
          <div className="mt-4">
            <a
              href={menu.recipeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500">
              View Recipe
            </a>
          </div>
        </div>
        <div className="w-1/2">
          <div className="p-4 bg-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Nutrition Facts</h2>
            <ul>
              <li>Calories: {menu.nutritionFacts.calories}</li>
              <li>Fat: {menu.nutritionFacts.fat}g</li>
              <li>Carbohydrates: {menu.nutritionFacts.carbohydrates}g</li>
              <li>Protein: {menu.nutritionFacts.protein}g</li>
            </ul>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleRemoveFromCart}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
