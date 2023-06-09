import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { useRouter } from "next/router";
import MenuTooltip from "@/components/Tooltips/MenuTooltip";
import { AiFillHeart } from "react-icons/ai";

const RecipeListItem = ({ recipe, favoriteRecipes, children, menuId }) => {
  const router = useRouter();

  if (!recipe) {
    return null;
  }

  return (
    <tr
      key={recipe.id}
      className="cursor-pointer hover:bg-primary-600 group"
      onClick={(e) => {
        e.preventDefault();
        router.push(`/dashboard/recipes/${recipe.id}`);
      }}>
      <td className="py-3.5 px-6 flex flex-row items-center text-md text-primary-700 group-hover:text-white font-semibold text-left">
        {children}
        {favoriteRecipes?.data
          ?.map((recipe) => recipe.id)
          ?.includes(recipe.id) ? (
          <AiFillHeart className="ml-2 -mb-1" />
        ) : null}
      </td>

      <td className="py-3.5 px-6 text-md font-semibold group-hover:text-white  text-primary-700  text-right">
        <Tippy
          content={
            <MenuTooltip
              recipeId={recipe.id}
              menuId={menuId}
              favoriteRecipes={favoriteRecipes}
            />
          }
          placement="bottom"
          interactive
          theme="light"
          trigger="click">
          <button
            className="px-1 py-1 hover:bg-primary-700   rounded-lg  "
            onClick={(e) => e.stopPropagation()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </button>
        </Tippy>
      </td>
    </tr>
  );
};

export default RecipeListItem;
