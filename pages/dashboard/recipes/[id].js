import { useRouter } from "next/router";
import { useState } from "react";
import Dashboard from "@/layouts/Dashboard";

// TODO: (LOW PRIORITY) FIGURE OUT HOW TO MAINTAIN STATE OF THIS PAGE IF THE USER NAVIGATES BACK FROM THE RECIPE WEBSITE
export default function RecipePage() {
  const router = useRouter();

  const [recipe] = useState(JSON.parse(router.query.recipe));

  return (
    <>
      <h1>
        You are currently viewing the recipe page for recipe with Id of{" "}
        {recipe.id}
      </h1>
      <h2>This is a recipe for {recipe.name} </h2>
      <p>
        You can view more information on the{" "}
        <a href={recipe.websiteURL}>official recipe website</a>
      </p>
    </>
  );
}

RecipePage.layout = Dashboard;
