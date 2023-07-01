import { Field } from "formik";
import filters from "@/lib/edamam/filters";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesDown,
  faAnglesUp,
  faC,
} from "@fortawesome/free-solid-svg-icons";
import { ImInfo } from "react-icons/im";
import { faCircleInfo } from "@fortawesome/free-regular-svg-icons";

export default function FilterForm() {
  const { MEAL_TYPES, DISH_TYPES, CUISINE_TYPES, DIET_LABELS, HEALTH_LABELS } =
    filters;

  const [mealTypesCollapsed, setMealTypesCollapsed] = useState(true);
  const [dishTypesCollapsed, setDishTypesCollapsed] = useState(true);
  const [cuisineTypesCollapsed, setCuisineTypesCollapsed] = useState(true);
  const [dietLabelsCollapsed, setDietLabelsCollapsed] = useState(true);
  const [healthLabelsCollapsed, setHealthLabelsCollapsed] = useState(true);

  const collapsedStyles = {
    collapsedArrows: "stroke-primary-800 group-hover:stroke-primary-600",
    openArrows: "stroke-primary-800 group-hover:stroke-primary-600",
    collapsed: "text-primary-800 hover:text-primary-600",
    open: "text-primary-800 hover:text-primary-600",
  };

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
        className="font-bold text-md underline mt-4 text-primary-800 hover:text-primary-600 cursor-pointer">
        Meal Types
        <FontAwesomeIcon
          name="meal-types-group"
          icon={mealTypesCollapsed ? faAnglesDown : faAnglesUp}
          onClick={toggleCollapse}
          className="h-3 ml-1 w-3 flex-none"
        />
      </div>
      {!mealTypesCollapsed ? (
        <div
          role="group"
          className="grid grid-flow-row grid-cols-6 flex-wrap "
          aria-labelledby="meal-types-group">
          {MEAL_TYPES.map((label) => (
            <div key={label}>
              <div className="flex flex-row mt-2 flex-no-wrap group">
                <Field
                  type="checkbox"
                  className="mr-2 inline cursor-pointer accent-primary-600"
                  id={label}
                  name="mealType"
                  value={label}
                />
                <label
                  className="text-sm font-bold inline mr-3 text-primary-800 cursor-pointer group-hover:text-primary-600"
                  htmlFor={label}>
                  {label}
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <hr className="mt-2 border-primary-800" />
      <div
        key="cuisine-types-group"
        name="cuisine-types-group"
        onClick={toggleCollapse}
        className="font-bold text-md underline mt-4 text-primary-800 hover:text-primary-600 cursor-pointer">
        Cuisine Types
        <FontAwesomeIcon
          name="cuisine-types-group"
          icon={cuisineTypesCollapsed ? faAnglesDown : faAnglesUp}
          onClick={toggleCollapse}
          className="h-3 ml-1 w-3 flex-none "
        />
      </div>
      {!cuisineTypesCollapsed ? (
        <div
          role="group"
          className="grid grid-flow-row grid-cols-6 flex-wrap group"
          aria-labelledby="cuisine-types-group">
          {CUISINE_TYPES.map((label) => (
            <div key={label}>
              <div className="flex flex-row mt-2 flex-no-wrap">
                <Field
                  type="checkbox"
                  className="mr-2 inline cursor-pointer accent-primary-600"
                  id={label}
                  name="cuisineType"
                  value={label}
                />
                <label
                  className="text-sm font-bold inline mr-3 text-primary-800  cursor-pointer hover:text-primary-600"
                  htmlFor={label}>
                  {label}
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <hr className="mt-2 border-primary-800" />
      <div
        name="dish-types-group"
        onClick={toggleCollapse}
        className="font-bold text-md underline mt-4 text-primary-800 hover:text-primary-600 cursor-pointer ">
        Dish Types
        <FontAwesomeIcon
          name="dish-types-group"
          icon={dishTypesCollapsed ? faAnglesDown : faAnglesUp}
          onClick={toggleCollapse}
          className="h-3 ml-1 w-3 flex-none"
        />
      </div>
      {!dishTypesCollapsed ? (
        <div
          role="group"
          className="grid grid-flow-row grid-cols-6 flex-wrap"
          aria-labelledby="dish-types-group">
          {DISH_TYPES.map((label) => (
            <div key={label}>
              <div className="flex flex-row mt-2 flex-no-wrap group">
                <Field
                  type="checkbox"
                  className="mr-2 inline cursor-pointer accent-primary-600"
                  id={label}
                  name="dishType"
                  value={label}
                />
                <label
                  className="text-sm font-bold inline mr-3 text-primary-800 cursor-pointer group-hover:text-primary-600"
                  htmlFor={label}>
                  {label}
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <hr className="mt-2 border-primary-800" />
      {/* TODO: ADD TOOLTIPS TO EACH HEALTH AND DIET LABEL TO SHOW THEIR DESCRIPTIONS */}
      <div
        name="diet-labels-group"
        onClick={toggleCollapse}
        className="font-bold text-md underline mt-4 text-primary-800 hover:text-primary-600 cursor-pointer">
        Diet Labels
        <FontAwesomeIcon
          name="diet-labels-group"
          icon={dietLabelsCollapsed ? faAnglesDown : faAnglesUp}
          onClick={toggleCollapse}
          className="h-3 ml-1 w-3 flex-none"
        />
      </div>
      {!dietLabelsCollapsed ? (
        <div
          role="group"
          className="grid  grid-flow-row grid-cols-6 mb-2 flex-wrap"
          aria-labelledby="diet-labels-group">
          {DIET_LABELS.map((item) => (
            <div key={item.label}>
              <div className="flex flex-row mt-2 items-center flex-no-wrap group">
                <Field
                  type="checkbox"
                  className="mr-2 h-8 w-auto inline cursor-pointer accent-primary-600"
                  id={item.label}
                  name="diet"
                  value={item.value}
                />
                <label
                  className=" inline mr-3 text-sm font-bold text-primary-800 cursor-pointer group-hover:text-primary-600"
                  htmlFor={item.label}>
                  {item.label}
                </label>
                <ImInfo className=" cursor-pointer text-primary-800 group-hover:text-primary-600" />
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <hr className="mt-2 border-primary-800" />
      <div
        name="health-labels-group"
        onClick={toggleCollapse}
        className={`font-bold text-md underline mt-4 text-primary-800 hover:text-primary-600 cursor-pointer`}>
        Health Labels
        <FontAwesomeIcon
          name="health-labels-group"
          icon={healthLabelsCollapsed ? faAnglesDown : faAnglesUp}
          onClick={toggleCollapse}
          className={`h-3 ml-1 w-3 flex-none ${collapsedStyles.collapsedArrows}`}
        />
      </div>

      {/*  TODO: FIGURE OUT WHY BOTH KOSHER CHECKBOXES GET CHECKED AT THE SAME
        TIME WHEN YOU CKICK ON THE WORDS */}
      {!healthLabelsCollapsed ? (
        <div
          role="group"
          aria-labelledby="health-labels-group"
          className="grid  grid-flow-row grid-cols-6 mb-2 flex-wrap">
          {HEALTH_LABELS.map((item) => (
            <div key={item.label} className="group">
              <div className="flex flex-row align-middle items-center mt-2 group flex-no-wrap group">
                <Field
                  type="checkbox"
                  className="accent-primary-600 mr-2 cursor-pointer "
                  id={item.label}
                  name="health"
                  value={item.value}
                />
                <label
                  className="text-sm inline mr-1 font-medium text-primary-800 group-hover:text-primary-600 cursor-pointer "
                  htmlFor={item.label}>
                  {item.label}
                </label>
                <ImInfo className=" cursor-pointer text-primary-800 group-hover:text-primary-600 ml-1" />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
