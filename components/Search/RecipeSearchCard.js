// Next components
import Image from "next/image";
import Link from "next/link";

// Icons
import {
  ArrowDownCircleIcon,
  HeartIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowDownCircleIcon as ArrowDownCircleIconSolid,
  HeartIcon as HeartIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

// React components
import { useState, useEffect } from "react";

// UI components
import Tooltip from "../Tooltips/TopTooltip";

// Get global SWR config

import { useSWRConfig } from "swr";

// Supabase
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

// TODO: IMPLEMENT FUNCTIONALITY FOR ADDING RECIPES TO MENUS (ONCE I HAVE COMPLETED THE MENU CREATION/UPDATING FUNCTIONALITY)

// TODO: FINISH STYLING THIS

/**
 * TODO TIMELINE:
 * FIRST ==> GET THIS PAGE WORKING AGAIN!!! NEED TO BE ABLE TO ADD AND REMOVE SAVES AND FAVORITES, PAGINATE WITH SWR, AND NO EXTRANEOUS ERRORS.
 * NEXT ==> WORK ON USER - COMPLETE THE REST OF THE USER CREATION PATHWAY AND BUILD OUT THE USER PROFILE PAGE.
 * NEXT ==> BUILD OUT GUI FOR RECIPE PAGES AND MENU PAGES. ALONG THE WAY ==> IRON OUT ERROR HANDLING STRATEGIES AND OTHER ORGANIZATIONAL KINKS.
 * NEXT ==> FIGURE OUT PLAN FOR RESTAURANT SEARCHING FUNCTIONALITY, THEN INTEGRATE RECOMMENDATIONS.
 */

export default function RecipeSearchCard({
  recipe,
  favoriteRecipes,
  savedRecipes,
}) {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [tooltipShowing, setTooltipShowing] = useState(false);
  const [toastMessage, setToastMessage] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [isSaved, setIsSaved] = useState();
  const [savedLoading, setSavedLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    if (favoriteRecipes) {
      if (favoriteRecipes.map((val) => val.id).includes(recipe.id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [favoriteRecipes, recipe.id]);

  useEffect(() => {
    if (savedRecipes) {
      if (savedRecipes.map((val) => val.id).includes(recipe.id)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    }
  }, [savedRecipes, recipe.id]);

  async function toggleFavorite(e) {
    e.preventDefault();
    setFavoriteLoading(true);

    // TODO: IMPLEMENT THESE TOAST MESSAGES
    /** If the recipe is already in the user's favorites, we attempt to delete it from the supabase database.
     * A toast message is displayed with the outcome of the user's action.
     * If successful we update the local state to reflect the change on the UI.
     */
    if (isFavorite) {
      const { error } = await supabase
        .from("favorite_recipes")
        .delete()
        .eq("recipe_id", recipe.id);
      if (error) {
        setToastMessage({
          failure: `There was a problem removing the ${recipe.name} recipe from your favorites! Please try again`,
          message: error.message,
        });
        console.error(error);
      } else {
        setToastMessage({
          success: `This ${recipe.name} recipe has been successfully removed from your favorites!`,
        });
        setIsFavorite(!isFavorite);
      }
    } else {
      /** If the recipe is not already in the user's favorites, we attempt to add it to the supabase database.
       * If successful we update the local state to reflect the change on the UI. Toast messages as before
       */
      await supabase
        .from("recipes")
        .upsert({ id: recipe.id, name: recipe.name });
      const { error } = await supabase
        .from("favorite_recipes")
        .insert({ recipe_id: recipe.id, user_id: user.id });
      if (error) {
        setToastMessage({
          failure: `There was a problem adding the ${recipe.name} recipe to your favorites! Please try again`,
          message: error.message,
        });
        console.error(error);
      } else {
        setToastMessage({
          success: `This ${recipe.name} recipe has been successfully added to your favorites!`,
        });
        setIsFavorite(!isFavorite);
      }
    }

    // Update the SWR cache with the to get the user's new favorite recipes, and set reset the loading state
    await mutate("/api/user/favorite-recipes");
    setFavoriteLoading(false);
  }

  // TODO: IMPLEMENT TOAST MESSAGES
  /** This function does the same thing as the one above, but for the user's favorite recipes
   */
  async function toggleSave(e) {
    e.preventDefault();
    setSavedLoading(true);

    if (isSaved) {
      const { error } = await supabase
        .from("saved_recipes")
        .delete()
        .eq("recipe_id", recipe.id);
      if (error) {
        setToastMessage({
          failure: `There was a problem removing the ${recipe.name} recipe from your saved recipes! Please try again`,
          message: error.message,
        });
        console.error(error);
      } else {
        setToastMessage({
          success: `This ${recipe.name} recipe has been successfully removed from your saved songs!`,
        });
        setIsSaved(!isSaved);
      }
    } else {
      await supabase
        .from("saved_recipes")
        .upsert({ recipe_id: recipe.id, user_id: user.id });
      const { error } = await supabase
        .from("saved_recipes")
        .insert({ recipe_id: recipe.id, user_id: user.id });
      if (error) {
        setToastMessage({
          failure: `There was a problem removing the ${recipe.name} recipe from your saved recipes! Please try again`,
          message: error.message,
        });
        console.log(error.message);
      } else {
        setToastMessage({
          success: `This ${recipe.name} recipe has been successfully added to your saved songs!`,
        });
        setIsSaved(!isSaved);
      }
    }

    // update the SWR cache
    await mutate("/api/user/saved-recipes");
    setSavedLoading(false);
  }

  // TODO: TRY OUT THE PACKAGE THAT I INSTALLED THAT HANDLES MODALS AND TOOLTIPS
  const showTooltip = (name) => {
    if (name === null) return setTooltipShowing(false);
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setTooltipShowing(true);
    })();
    return;
  };

  /**
   * sets the state for when a user is hovering over an icon on the card, and
   * shows a tooltip for it. Also sets a "url" state which we will use to
   * determine the appropriate endpoint to call for our backend
   */
  const handleHover = (name) => {
    setHoveredIcon(name);
    showTooltip(name);
  };

  // TODO: NEED TO WRITE THIS FUNCTIONALITY... selection dropdown for adding recipe to a menu
  const showAddOptions = (e) => {
    e.preventDefault();
  };

  return (
    <Link href={`/dashboard/recipes/${recipe.id}`} className="w-full">
      <div className="flex flex-row items-center px-10 py-6 w-full border border-primary-800 bg-base-accent hover:bg-primary-500/30  hover:text-emerald-900">
        <Image
          width={150}
          height={150}
          className=" rounded-xl mr-4 border border-2 shadow flex-none "
          alt="recipe-image"
          blurDataURL={recipe.placeholder}
          placeholder="blur"
          src={recipe.image}
        />

        <div className="flex flex-col items-start justify-start align-top">
          <div className=" px-4  text-xl font-bold whitespace-nowrap">
            {recipe.name}
          </div>
          <div className=" px-4  text-md font-semibold whitespace-nowrap">
            Serves: {recipe.servings}
          </div>
          <div className=" px-4  text-md font-semibold whitespace-nowrap">
            Total calories: {Math.floor(recipe.calories)}
          </div>

          <div className=" px-4 pb-1 text-md font-semibold whitespace-nowrap">
            Total cook time:{" "}
            {recipe.totalTime ? `${recipe.totalTime} minutes` : "Not provided"}
          </div>

          <div
            onMouseLeave={() => handleHover(null)}
            className=" px-4 py-1 text-2xl font-semibold whitespace-nowrap flex items-center flex-row">
            {/* If the favorite recipes state is not currently loading or validating, show heart icon,
							otherwise show a small loading spinner */}
            {!favoriteLoading ? (
              <div
                // TODO: ADD A TOAST TO THIS FOR SUCCESS AND FAIL
                onClick={toggleFavorite}
                onMouseEnter={() => handleHover("heart")}
                onMouseLeave={() => handleHover(null)}
                className="h-8 w-8 ml-3 cursor-pointer disabled:cursor-wait">
                {hoveredIcon === "heart" || isFavorite ? (
                  <HeartIconSolid className="text-red-500 stroke-2" />
                ) : (
                  <HeartIcon className="text-red-500 stroke-2" />
                )}
                {hoveredIcon === "heart" && tooltipShowing ? (
                  <Tooltip
                    message={
                      isFavorite
                        ? "Remove recipe from your favs"
                        : "Add recipe to your favs"
                    }
                    adjustments="ml-3 bottom-14"
                  />
                ) : null}
              </div>
            ) : (
              <FontAwesomeIcon
                className=" text-red-500 ml-4"
                icon={faCircleNotch}
                spin
              />
            )}

            {!savedLoading ? (
              <div
                onClick={toggleSave}
                onMouseEnter={() => handleHover("save")}
                onMouseLeave={() => handleHover(null)}
                className="h-8 w-8 ml-3 fa-s cursor-pointer">
                {hoveredIcon === "save" || isSaved ? (
                  <ArrowDownCircleIconSolid className="text-green-700 stroke-2" />
                ) : (
                  <ArrowDownCircleIcon className="text-green-700 stroke-2" />
                )}
                {hoveredIcon === "save" && tooltipShowing ? (
                  <Tooltip
                    message={
                      isSaved
                        ? "Remove this recipe from your saved recipes"
                        : "Save this recipe for later"
                    }
                    adjustments="ml-3  bottom-14"
                  />
                ) : null}
              </div>
            ) : (
              <FontAwesomeIcon
                className="text-green-700 ml-4"
                icon={faCircleNotch}
                spin
              />
            )}

            <div
              onClick={showAddOptions}
              onMouseEnter={() => handleHover("menu")}
              onMouseLeave={() => handleHover(null)}
              className="h-8 w-8 ml-3 cursor-pointer">
              {hoveredIcon === "menu" ? (
                <ClipboardDocumentListIconSolid className="text-blue-600 stroke-2" />
              ) : (
                <ClipboardDocumentListIcon className="text-blue-600 stroke-2" />
              )}
              {hoveredIcon === "menu" && tooltipShowing ? (
                <Tooltip
                  message="Add this recipe to a menu"
                  adjustments="ml-3 bottom-14"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
