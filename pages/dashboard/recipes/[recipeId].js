import Dashboard from "@/layouts/Dashboard";
import Image from "next/image";

const RecipePage = (recipe) => {
  const { name, id } = recipe;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{menu.recipeName}</h1>
      <div className="flex justify-between">
        <div className="w-1/2">
          <Image
            src={menu.imageUrl}
            alt={menu.recipeName}
            width={100}
            className="w-full"
          />
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
              <li>Calories: {""}</li>
              <li>Fat: {0}g</li>
              <li>Carbohydrates: {""}g</li>
              <li>Protein: {""}g</li>
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
