// TODO: DESIGN THIS RECIPE RESULT CARD

import Image from "next/image";
import Link from "next/link";

export default function RecipeSearchCard({ recipe }) {
  return (
    <div className="flex flex-row items-center w-full border-b">
      <div className="my-2 ml-2 relative h-44 w-44 flex-none">
        <Image
          fill
          className=" object-cover rounded-xl"
          alt="recipe-image"
          blurDataURL={recipe.placeholder}
          placeholder="blur"
          src={recipe.image}
        />
      </div>
      <div className="flex flex-col items-start justify-start align-top">
        <div className=" px-4 py-1 text-md font-bold whitespace-nowrap">
          {recipe.name}
        </div>
        <div className=" px-4 py-1 text-sm font-semibold whitespace-nowrap">
          Serves: {recipe.servings}
        </div>
        <div className=" px-4 py-1 text-sm font-semibold whitespace-nowrap">
          Total calories: {Math.floor(recipe.calories)}
        </div>

        <div className=" px-4 py-1 text-sm font-semibold whitespace-nowrap">
          Total cook time:{" "}
          {recipe.totalTime ? `${recipe.totalTime} minutes` : "Not provided"}
        </div>
        <div className=" px-4 py-1 text-sm font-semibold whitespace-nowrap">
          Total cook time:{" "}
          <Link
            href={{
              pathname: "/dashboard/recipes/[id]",
              query: {
                id: recipe.id,
                recipe: JSON.stringify(recipe),
              },
            }}
            as={`/dashboard/recipes/${recipe.id}`}
          >
            See more Info
          </Link>
        </div>
      </div>
    </div>
  );
}
