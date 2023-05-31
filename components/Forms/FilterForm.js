import { Field } from "formik";
import filters from "@/lib/edamam/filters";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-regular-svg-icons"

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
        className={`font-bold text-md underline mt-4 ${mealTypesCollapsed
          ? "text-gray-600 hover:text-gray-500"
          : "text-emerald-600 hover:text-emerald-500"
          } cursor-pointer`}
      >
        Meal Types
        {mealTypesCollapsed ? (
          <FontAwesomeIcon
            name="meal-types-group"
            icon={faAnglesDown}
            onClick={toggleCollapse}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        ) : (
          <FontAwesomeIcon
            name="meal-types-group"
            icon={faAnglesUp}
            onClick={toggleCollapse}
            className="h-3 ml-1 w-3 flex-none text-emerald-700 hover:text-emerald-500"
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
                  name="mealType"
                  value={label}
                />
                <label
                  className="text-sm font-medium inline mr-3 text-gray-600 cursor-pointer hover:text-slate-400"
                  htmlFor={label}
                >
                  {label}
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <hr className="mt-2" />
      <div
        key="cuisine-types-group"
        name="cuisine-types-group"
        onClick={toggleCollapse}
        className={`font-bold text-md underline mt-4 ${cuisineTypesCollapsed
          ? "text-gray-600 hover:text-gray-500"
          : "text-emerald-600 hover:text-emerald-500"
          } cursor-pointer`}
      >
        Cuisine Types
        {cuisineTypesCollapsed ? (
          <FontAwesomeIcon
            name="cuisine-types-group"
            icon={faAnglesDown}
            onClick={toggleCollapse}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        ) : (
          <FontAwesomeIcon
            name="cuisine-types-group"
            icon={faAnglesUp}
            onClick={toggleCollapse}
            className="h-3 ml-1 w-3 flex-none text-emerald-700 hover:text-emerald-500"
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
                  name="cuisineType"
                  value={label}
                />
                <label
                  className="text-sm font-medium inline mr-3 text-gray-600  cursor-pointer hover:text-slate-400"
                  htmlFor={label}
                >
                  {label}
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <hr className="mt-2" />
      <div
        name="dish-types-group"
        onClick={toggleCollapse}
        className={`font-bold text-md underline mt-4 ${dishTypesCollapsed
          ? "text-gray-600 hover:text-gray-500"
          : "text-emerald-600 hover:text-emerald-500"
          } cursor-pointer`}
      >
        Dish Types
        {dishTypesCollapsed ? (
          <FontAwesomeIcon
            name="dish-types-group"
            icon={faAnglesDown}
            onClick={toggleCollapse}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        ) : (
          <FontAwesomeIcon
            name="dish-types-group"
            icon={faAnglesUp}
            onClick={toggleCollapse}
            className="h-3 ml-1 w-3 flex-none text-emerald-700 hover:text-emerald-500"
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
                  name="dishType"
                  value={label}
                />
                <label
                  className="text-sm font-medium inline mr-3 text-gray-600 cursor-pointer hover:text-slate-400"
                  htmlFor={label}
                >
                  {label}
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <hr className="mt-2" />
      {/* TODO: ADD TOOLTIPS TO EACH HEALTH AND DIET LABEL TO SHOW THEIR DESCRIPTIONS */}
      <div
        name="diet-labels-group"
        onClick={toggleCollapse}
        className={`font-bold text-md underline mt-4 ${dietLabelsCollapsed
          ? "text-gray-600 hover:text-gray-500"
          : "text-emerald-600 hover:text-emerald-500"
          } cursor-pointer`}
      >
        Diet Labels
        {dietLabelsCollapsed ? (
          <FontAwesomeIcon
            name="diet-labels-group"
            icon={dietLabelsCollapsed ? faAnglesDown : faAnglesUp}
            onClick={toggleCollapse}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        ) : (
          <FontAwesomeIcon
            name="diet-labels-group"
            icon={faAnglesUp}
            onClick={toggleCollapse}
            className="h-3 ml-1 w-3 flex-none text-emerald-700 hover:text-emerald-500"
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
                  name="diet"
                  value={item.value}
                />
                <label
                  className=" inline mr-3 text-sm font-medium text-gray-600 cursor-pointer hover:text-slate-400"
                  htmlFor={item.label}
                >
                  {item.label}
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <hr className="mt-2" />
      <div
        name="health-labels-group"
        onClick={toggleCollapse}
        className={`font-bold text-md underline mt-4 ${healthLabelsCollapsed
          ? "text-gray-600 hover:text-gray-500"
          : "text-emerald-600 hover:text-emerald-500"
          } cursor-pointer`}
      >
        Health Labels
        {healthLabelsCollapsed ? (
          <FontAwesomeIcon
            name="health-labels-group"
            icon={faAnglesDown}
            onClick={toggleCollapse}
            className="h-3 ml-1 w-3 flex-none text-gray-700 hover:text-gray-500"
          />
        ) : (
          <FontAwesomeIcon
            name="health-labels-group"
            icon={faAnglesUp}
            onClick={toggleCollapse}
            className="h-3 ml-1 w-3 flex-none text-emerald-700 hover:text-emerald-500"
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
                  name="health"
                  value={item.value}
                />
                <label
                  className="text-sm inline mr-1 font-medium text-gray-600 cursor-pointer "
                  htmlFor={item.label}
                >
                  {item.label}
                </label>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-emerald-300 cursor-pointer hover:text-emerald-700 font-bold">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>

              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
