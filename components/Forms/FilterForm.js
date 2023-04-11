import { Field } from "formik";
import filters from "@/lib/edamam/filters";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";

export default function FilterForm() {
  const { MEAL_TYPES, DISH_TYPES, CUISINE_TYPES, DIET_LABELS, HEALTH_LABELS } =
    filters;

  const [mealTypesCollapsed, setMealTypesCollapsed] = useState(true);
  const [dishTypesCollapsed, setDishTypesCollapsed] = useState(true);
  const [cuisineTypesCollapsed, setCuisineTypesCollapsed] = useState(true);
  const [dietLabelsCollapsed, setDietLabelsCollapsed] = useState(true);
  const [healthLabelsCollapsed, setHealthLabelsCollapsed] = useState(true);

  const toggleCollapse = (e) => {
    const name = e.target.getAttribute("name");
    switch (name) {
      case "meal-types-group":
        setMealTypesCollapsed(!mealTypesCollapsed);
        break;
      case "cuisine-types-group":
        setCuisineTypesCollapsed(!cuisineTypesCollapsed);
        break;
      case "dish-types-group":
        setDishTypesCollapsed(!dishTypesCollapsed);
        break;
      case "diet-labels-group":
        setDietLabelsCollapsed(!dietLabelsCollapsed);
        break;
      case "health-labels-group":
        setHealthLabelsCollapsed(!healthLabelsCollapsed);
        break;
    }
  };

  return (
    <div className="mb-4 ">
      <div
        key="meal-types-group"
        name="meal-types-group"
        onClick={toggleCollapse}
        className="flex items-center align-middle font-bold text-md text-gray-700 mt-4 underline cursor-pointer hover:text-gray-500"
      >
        Meal Types
        {mealTypesCollapsed ? (
          <FontAwesomeIcon
            name="meal-types-group"
            icon={faAnglesDown}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        ) : (
          <FontAwesomeIcon
            name="meal-types-group"
            icon={faAnglesUp}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        )}
      </div>
      {!mealTypesCollapsed ? (
        <div
          role="group"
          className="flex mb-2 flex-wrap flex-row"
          aria-labelledby="meal-types-group"
        >
          {MEAL_TYPES.map((label) => (
            <div key={label}>
              <div className="flex flex-row mt-2 flex-no-wrap">
                <Field
                  type="checkbox"
                  className="mr-2 inline cursor-pointer accent-emerald-600"
                  id={label}
                  name="mealTypes"
                  value={label}
                />
                <label
                  className="text-sm font-medium inline mr-3 text-gray-700 cursor-pointer hover:text-slate-400"
                  htmlFor={label}
                >
                  {label}
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div
        key="cuisine-types-group"
        name="cuisine-types-group"
        onClick={toggleCollapse}
        className="font-bold text-md mt-4 underline text-gray-700 cursor-pointer hover:text-gray-500"
      >
        Cuisine Types
        {cuisineTypesCollapsed ? (
          <FontAwesomeIcon
            name="meal-types-group"
            icon={faAnglesDown}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        ) : (
          <FontAwesomeIcon
            name="meal-types-group"
            icon={faAnglesUp}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        )}
      </div>
      {!cuisineTypesCollapsed ? (
        <div
          role="group"
          className="flex mb-2 flex-wrap flex-row"
          aria-labelledby="cuisine-types-group"
        >
          {CUISINE_TYPES.map((label) => (
            <div key={label}>
              <div className="flex flex-row mt-2 flex-no-wrap">
                <Field
                  type="checkbox"
                  className="mr-2 inline cursor-pointer accent-emerald-600"
                  id={label}
                  name="cuisineTypes"
                  value={label}
                />
                <label
                  className="text-sm font-medium inline mr-3 text-gray-700  cursor-pointer hover:text-slate-400"
                  htmlFor={label}
                >
                  {label}
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div
        name="dish-types-group"
        onClick={toggleCollapse}
        className="font-bold mt-4 font-md underline text-gray-700 cursor-pointer hover:text-gray-500"
      >
        Dish Types
        {dishTypesCollapsed ? (
          <FontAwesomeIcon
            name="meal-types-group"
            icon={faAnglesDown}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        ) : (
          <FontAwesomeIcon
            name="meal-types-group"
            icon={faAnglesUp}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        )}
      </div>
      {!dishTypesCollapsed ? (
        <div
          role="group"
          className="flex mb-2 flex-wrap flex-row"
          aria-labelledby="dish-types-group"
        >
          {DISH_TYPES.map((label) => (
            <div key={label}>
              <div className="flex flex-row mt-2 flex-no-wrap">
                <Field
                  type="checkbox"
                  className="mr-2 inline cursor-pointer accent-emerald-600"
                  id={label}
                  name="dishTypes"
                  value={label}
                />
                <label
                  className="text-sm font-medium inline mr-3 text-gray-700 cursor-pointer hover:text-slate-400"
                  htmlFor={label}
                >
                  {label}
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* TODO: ADD TOOLTIPS TO EACH HEALTH AND DIET LABEL TO SHOW THEIR DESCRIPTIONS */}
      <div
        name="diet-labels-group"
        onClick={toggleCollapse}
        className="font-bold mt-4 text-medium underline text-gray-700 cursor-pointer hover:text-gray-500"
      >
        Diet Labels
        {dietLabelsCollapsed ? (
          <FontAwesomeIcon
            name="meal-types-group"
            icon={faAnglesDown}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        ) : (
          <FontAwesomeIcon
            name="meal-types-group"
            icon={faAnglesUp}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        )}
      </div>
      {!dietLabelsCollapsed ? (
        <div
          role="group"
          className="flex mb-2 flex-wrap flex-row"
          aria-labelledby="diet-labels-group"
        >
          {DIET_LABELS.map((item) => (
            <div key={item.label}>
              <div className="flex flex-row mt-2 flex-no-wrap">
                <Field
                  type="checkbox"
                  className="mr-2 inline cursor-pointer accent-emerald-600"
                  id={item.label}
                  name="dietLabels"
                  value={item.value}
                />
                <label
                  className=" inline mr-3 text-sm font-medium text-gray-700 cursor-pointer hover:text-slate-400"
                  htmlFor={item.label}
                >
                  {item.label}
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div
        name="health-labels-group"
        onClick={toggleCollapse}
        className="font-bold text-md underline mt-4 text-gray-700 cursor-pointer hover:text-gray-500"
      >
        Health Labels
        {healthLabelsCollapsed ? (
          <FontAwesomeIcon
            name="meal-types-group"
            icon={faAnglesDown}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        ) : (
          <FontAwesomeIcon
            name="meal-types-group"
            icon={faAnglesUp}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        )}
      </div>
      {!healthLabelsCollapsed ? (
        <div
          role="group"
          aria-labelledby="health-labels-group"
          className="flex flex-row mb-2 flex-wrap"
        >
          {HEALTH_LABELS.map((item) => (
            <div key={item.label}>
              <div className="flex flex-row mt-2 flex-no-wrap">
                <Field
                  type="checkbox"
                  className="accent-emerald-600 mr-2 cursor-pointer"
                  id={item.label}
                  name="healthLabels"
                  value={item.value}
                />
                <label
                  className="text-sm inline mr-3 font-medium  cursor-pointer "
                  htmlFor={item.label}
                >
                  {item.label}
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
