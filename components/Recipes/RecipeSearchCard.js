// TODO: DESIGN THIS RECIPE RESULT CARD

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownCircleIcon,
  HeartIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowDownCircleIcon as ArrowDownCircleIconSolid,
  HeartIcon as HeartIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
} from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react/dist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function RecipeSearchCard({
  recipe,
  getSavedRecipes,
  getFavoriteRecipes,
}) {
  const user = useUser();
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState(
    user.user_metadata.savedRecipes
  );
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    user.user_metadata.favoriteRecipes
  );

  const supabase = useSupabaseClient();

  const handleHover = (name) => {
    setHoveredIcon(name);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoadingSave(true);
    async function saveRecipe() {
      await supabase.from("recipes").insert({ id: recipe.id });

      const { error } = await supabase
        .from("saved_recipes")
        .insert({ recipe_id: recipe.id, user_id: user.id });

      if (error) console.log(error);
      await getSavedRecipes();
      setSavedRecipes(user.user_metadata.savedRecipes);
      setLoadingSave(false);
    }
    saveRecipe();
  };

  const handleUnSave = (e) => {
    e.preventDefault();
    setLoadingSave(true);
    async function unSaveRecipe() {
      const { error } = await supabase
        .from("saved_recipes")
        .delete()
        .eq("recipe_id", recipe.id);

      if (error) console.log(error);
      await getSavedRecipes();
      setSavedRecipes(user.user_metadata.savedRecipes);
      setLoadingSave(false);
    }
    unSaveRecipe();
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    setLoadingFavorite(true);
    async function favoriteRecipe() {
      await supabase.from("recipes").insert({ id: recipe.id });

      const { error } = await supabase
        .from("favorite_recipes")
        .insert({ recipe_id: recipe.id, user_id: user.id });

      if (error) console.log(error);
      await getFavoriteRecipes();
      setFavoriteRecipes(user.user_metadata.favoriteRecipes);
      setLoadingFavorite(false);
    }
    favoriteRecipe();
  };

  const handleUnFavorite = (e) => {
    e.preventDefault();
    setLoadingFavorite(true);
    async function unFavoriteRecipe() {
      const { error } = await supabase
        .from("favorite_recipes")
        .delete()
        .eq("recipe_id", recipe.id);

      if (error) console.log(error);
      await getFavoriteRecipes();
      setFavoriteRecipes(user.user_metadata.favoriteRecipes);
      setLoadingFavorite(false);
    }
    unFavoriteRecipe();
  };

  const showAddOptions = (e) => {
    e.preventDefault();
  };

  return (
    <Link href={`/dashboard/recipes/${recipe.id}`}>
      <div className="flex flex-row items-center w-full border-b border-gray-400 hover:bg-gray-200">
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

          <div
            onMouseLeave={() => handleHover(null)}
            className=" px-4 py-1 text-sm font-semibold whitespace-nowrap flex flex-row"
          >
            {!loadingFavorite ? (
              <div
                onClick={
                  favoriteRecipes.includes(recipe.id)
                    ? handleUnFavorite
                    : handleFavorite
                }
                onMouseEnter={() => handleHover("heart")}
                onMouseLeave={() => handleHover(null)}
                className="h-6 w-6 ml-3 cursor-pointer disabled:cursor-wait"
              >
                {hoveredIcon === "heart" ||
                favoriteRecipes.includes(recipe.id) ? (
                  <HeartIconSolid className="text-red-500 stroke-2" />
                ) : (
                  <HeartIcon className="text-red-500 stroke-2" />
                )}
              </div>
            ) : (
              <FontAwesomeIcon
                className="h-5 w-5 ml-3"
                icon={faCircleNotch}
                spin
              />
            )}

            {!loadingSave ? (
              <div
                onClick={
                  savedRecipes.includes(recipe.id) ? handleUnSave : handleSave
                }
                onMouseEnter={() => handleHover("save")}
                onMouseLeave={() => handleHover(null)}
                className="h-6 w-6 ml-3 cursor-pointer"
              >
                {hoveredIcon === "save" || savedRecipes.includes(recipe.id) ? (
                  <ArrowDownCircleIconSolid className="text-emerald-600 stroke-2" />
                ) : (
                  <ArrowDownCircleIcon className="text-emerald-600 stroke-2" />
                )}
              </div>
            ) : (
              <FontAwesomeIcon
                className="h-5 w-5 ml-3"
                icon={faCircleNotch}
                spin
              />
            )}

            <div
              onClick={showAddOptions}
              onMouseEnter={() => handleHover("plus")}
              onMouseLeave={() => handleHover(null)}
              className="h-6 w-6 ml-3 cursor-pointer"
            >
              {hoveredIcon === "plus" ? (
                <PlusCircleIconSolid className="text-blue-600 stroke-2" />
              ) : (
                <PlusCircleIcon className="text-blue-600 stroke-2" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
