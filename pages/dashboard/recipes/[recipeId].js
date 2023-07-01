import Dashboard from "@/layouts/Dashboard";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";

export default function RecipePage() {
  const router = useRouter();
  const { recipeId } = router.query;

  const { data: recipe, isLoading, error } = useSWR(`/api/recipes/${recipeId}`);

  useEffect(() => {
    if (recipe) {
      console.log(recipe);
    }
  }, [recipe]);

  return (
    <>
      {recipe ? (
        <h1>{`This a page for the ${recipe[0].name} recipe!`}</h1>
      ) : null}
    </>
  );
}

RecipePage.layout = Dashboard;
