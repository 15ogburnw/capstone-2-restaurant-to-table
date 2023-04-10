import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboard from "@/layouts/Dashboard";
import { EDAMAM_API_URL } from "@/lib/edamam/filters";
import { truncateRecipe } from "@/lib/edamam/helpers";
import { getPlaiceholder } from "plaiceholder";

// TODO: (LOW PRIORITY) FIGURE OUT HOW TO MAINTAIN STATE OF THIS PAGE IF THE USER NAVIGATES BACK FROM THE RECIPE WEBSITE
export default function RecipePage({ recipe }) {
  useEffect(() => {
    console.log(recipe);
  }, [recipe]);
  const router = useRouter();

  return (
    <>
      <h1>
        You are currently viewing the recipe page for recipe with Id of{" "}
        {recipe.id}{" "}
      </h1>
      <h2>This is a recipe for {recipe.name} </h2>
      <p>
        You can view more information on the{" "}
        <a href={recipe.websiteURL}>official recipe website</a>
      </p>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const url = `${EDAMAM_API_URL}/${id}?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}`;

  const data = await fetch(url)
    .then((res) => res.json())
    .catch((e) => console.error(e));

  const { base64: placeholder } = await getPlaiceholder(data.recipe.image);
  data.recipe.placeholder = placeholder;

  const recipe = truncateRecipe(data);
  console.log(recipe);
  return { props: { recipe } };
}

RecipePage.layout = Dashboard;
