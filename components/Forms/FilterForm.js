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
    collapsedArrows: "stroke-primary-500 group-hover:stroke-primary-700",
    openArrows: "stroke-primary-500 group-hover:stroke-primary-700",
    collapsed: "text-primary-500 hover:text-primary-700",
    open: "text-primary-800 hover:text-primary-400",
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
        className={`font-bold group indent-1text-center text-md underline mt-4 ${
          mealTypesCollapsed
            ? collapsedStyles.collapsed
            : collapsedStyles.openArrows
        } cursor-pointer`}>
        Meal Types
        {mealTypesCollapsed ? (
          <FontAwesomeIcon
            name="meal-types-group"
            icon={faAnglesDown}
            onClick={toggleCollapse}
            className={`h-3 ml-1 w-3 flex-none ${collapsedStyles.collapsedArrows}`}
          />
        ) : (
          <FontAwesomeIcon
            name="meal-types-group"
            icon={faAnglesUp}
            onClick={toggleCollapse}
            className={`h-3 ml-1 w-3 flex-none ${collapsedStyles.open}`}
          />
        )}
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
                  className="mr-2 inline cursor-pointer accent-primary-400"
                  id={label}
                  name="mealType"
                  value={label}
                />
                <label
                  className="text-sm font-medium inline mr-3 text-primary-800 cursor-pointer group-hover:text-primary-400"
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
        className={`font-bold text-md underline mt-4 ${
          cuisineTypesCollapsed
            ? collapsedStyles.collapsed
            : collapsedStyles.open
        } cursor-pointer`}>
        Cuisine Types
        {cuisineTypesCollapsed ? (
          <FontAwesomeIcon
            name="cuisine-types-group"
            icon={faAnglesDown}
            onClick={toggleCollapse}
            className={`h-3 ml-1 w-3 flex-none ${collapsedStyles.collapsedArrows}`}
          />
        ) : (
          <FontAwesomeIcon
            name="cuisine-types-group"
            icon={faAnglesUp}
            onClick={toggleCollapse}
            className={`h-3 ml-1 w-3 flex-none ${collapsedStyles.openArrows}`}
          />
        )}
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
                  className="mr-2 inline cursor-pointer accent-primary-300"
                  id={label}
                  name="cuisineType"
                  value={label}
                />
                <label
                  className="text-sm font-medium inline mr-3 text-primary-700  cursor-pointer hover:text-primary-400"
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
        className={`font-bold text-md underline mt-4 ${
          dishTypesCollapsed ? collapsedStyles.collapsed : collapsedStyles.open
        } cursor-pointer `}>
        Dish Types
        {dishTypesCollapsed ? (
          <FontAwesomeIcon
            name="dish-types-group"
            icon={faAnglesDown}
            onClick={toggleCollapse}
            className={`h-3 ml-1 w-3 flex-none ${collapsedStyles.collapsedArrows}`}
          />
        ) : (
          <FontAwesomeIcon
            name="dish-types-group"
            icon={faAnglesUp}
            onClick={toggleCollapse}
            className={`h-3 ml-1 w-3 flex-none ${collapsedStyles.openArrows}`}
          />
        )}
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
                  className="mr-2 inline cursor-pointer accent-primary-300"
                  id={label}
                  name="dishType"
                  value={label}
                />
                <label
                  className="text-sm font-medium inline mr-3 text-primary-700 cursor-pointer group-hover:text-primary-400"
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
        className={`font-bold text-md underline mt-4 ${
          dietLabelsCollapsed ? collapsedStyles.collapsed : collapsedStyles.open
        } cursor-pointer`}>
        Diet Labels
        {dietLabelsCollapsed ? (
          <FontAwesomeIcon
            name="diet-labels-group"
            icon={dietLabelsCollapsed ? faAnglesDown : faAnglesUp}
            onClick={toggleCollapse}
            className={`h-3 ml-1 w-3 flex-none ${collapsedStyles.collapsedArrows}`}
          />
        ) : (
          <FontAwesomeIcon
            name="diet-labels-group"
            icon={faAnglesUp}
            onClick={toggleCollapse}
            className={`h-3 ml-1 w-3 flex-none ${collapsedStyles.openArrows}`}
          />
        )}
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
                  className="mr-2 h-8 w-auto inline cursor-pointer accent-primary-300"
                  id={item.label}
                  name="diet"
                  value={item.value}
                />
                <label
                  className=" inline mr-3 text-sm font-medium text-primary-700 cursor-pointer group-hover:text-primary-400"
                  htmlFor={item.label}>
                  {item.label}
                </label>
                <ImInfo className=" cursor-pointer text-primary-700 group-hover:text-primary-400" />
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <hr className="mt-2 border-primary-800" />
      <div
        name="health-labels-group"
        onClick={toggleCollapse}
        className={`font-bold text-md underline mt-4 ${
          healthLabelsCollapsed
            ? collapsedStyles.collapsed
            : collapsedStyles.open
        } cursor-pointer`}>
        Health Labels
        {healthLabelsCollapsed ? (
          <FontAwesomeIcon
            name="health-labels-group"
            icon={faAnglesDown}
            onClick={toggleCollapse}
            className={`h-3 ml-1 w-3 flex-none ${collapsedStyles.collapsedArrows}`}
          />
        ) : (
          <FontAwesomeIcon
            name="health-labels-group"
            icon={faAnglesUp}
            onClick={toggleCollapse}
            className={`h-3 ml-1 w-3 flex-none ${collapsedStyles.openArrows}`}
          />
        )}
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
                  className="accent-primary-300 mr-2 cursor-pointer "
                  id={item.label}
                  name="health"
                  value={item.value}
                />
                <label
                  className="text-sm inline mr-1 font-medium text-primary-700 group-hover:text-primary-400 cursor-pointer "
                  htmlFor={item.label}>
                  {item.label}
                </label>
                <ImInfo className=" cursor-pointer text-primary-700 group-hover:text-primary-400 ml-1" />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
