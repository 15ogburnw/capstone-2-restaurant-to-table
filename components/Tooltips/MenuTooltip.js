import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function MenuTooltip({ recipeId, menuId, favoriteRecipes }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [isFavorite, setIsFavorite] = useState();

  useEffect(() => {
    if (favoriteRecipes) {
      setIsFavorite(
        favoriteRecipes.data?.map((recipe) => recipe.id)?.includes(recipeId)
          ? true
          : false
      );
    }
  }, [favoriteRecipes, recipeId]);

  // TODO: incorporate a toast error/success here
  const removeRecipe = async () => {
    const { error } = await supabase
      .from("menu_recipes")
      .delete()
      .eq("recipe_id", recipeId);

    if (error)
      return {
        error:
          "There was a problem deleting this recipe from the menu. Please try again",
      };
    else return { success: "Recipe successfully removed from the menu" };
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      const { error } = await supabase
        .from("favorite_recipes")
        .delete()
        .eq("recipe_id", recipeId);
      if (error) {
        return {
          error:
            "There was a problem removing this recipe from your favorites. Please try again",
        };
      } else {
        return {
          success: "Recipe successfully removed from your favorites!",
        };
      }
    } else {
      const { error } = await supabase
        .from("favorite_recipes")
        .insert({ recipe_id: recipeId, user_id: user?.id });

      if (error) {
        return {
          error:
            "There was a problem adding this recipe to your favorites. Please try again",
        };
      } else {
        return { success: "Recipe successfully added to your favorites!" };
      }
    }
  };

  const { trigger: menuTrigger, isMutating: menuMutating } = useSWRMutation(
    `/api/user/menus/${menuId}`,
    removeRecipe
  );
  const { trigger: favsTrigger, isMutating: favsMutating } = useSWRMutation(
    `/api/user/favorite-recipes`,
    toggleFavorite
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className=" w-full mt-2 mx-1 rounded-md  disabled:bg-primary-500/70 disabled:cursor-wait hover:enabled:bg-primary-700 p-2 font-bold hover:enabled:text-white disabled:text-white text-primary-700"
        disabled={favsMutating ? true : false}
        onClick={(e) => {
          e.stopPropagation();
          favsTrigger();
        }}>
        {favsMutating ? (
          <span className="flex items-center justify-center">
            <FontAwesomeIcon
              className="inline font-bold mr-2"
              icon={faCircleNotch}
              spin
            />
            <span>Loading</span>
          </span>
        ) : isFavorite ? (
          "Remove From Favorites"
        ) : (
          "Add To Favorites"
        )}
      </button>
      <button
        className="my-2 mx-1 w-full rounded-md disabled:bg-primary-500/70 disabled:cursor-wait hover:enabled:bg-primary-700 p-2 font-bold hover:enabled:text-white disabled:text-white text-primary-700"
        onClick={(e) => {
          e.stopPropagation();
          menuTrigger();
        }}
        disabled={menuMutating ? true : false}>
        {menuMutating ? (
          <span className="flex items-center justify-center">
            <FontAwesomeIcon
              className="inline font-bold mr-2"
              icon={faCircleNotch}
              spin
            />
            <span>Loading</span>
          </span>
        ) : (
          <>
            <span>Remove From Menu</span>
          </>
        )}
      </button>
    </div>
  );
}
