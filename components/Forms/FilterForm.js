import { Field } from "formik";
import filters from "@/lib/edamam/filters";

export default function FilterForm({ setFieldValue }) {
  const { MEAL_TYPES, DISH_TYPES, CUISINE_TYPES, DIET_LABELS, HEALTH_LABELS } =
    filters;

  return (
    <>
      <div id="meal-types-group">Meal Types</div>
      <div role="group" aria-labelledby="meal-types-group">
        {MEAL_TYPES.map((label) => (
          <label key={label}>
            <Field type="checkbox" name="mealTypes" value={label} />
            {label}
          </label>
        ))}
      </div>
      <div id="cuisine-types-group">Cuisine Types</div>
      <div role="group" aria-labelledby="cuisine-types-group">
        {CUISINE_TYPES.map((label) => (
          <label key={label}>
            <Field type="checkbox" name="cuisineTypes" value={label} />
            {label}
          </label>
        ))}
      </div>
      <div id="dish-types-group">Dish Types</div>
      <div role="group" aria-labelledby="dish-types-group">
        {DISH_TYPES.map((label) => (
          <label key={label}>
            <Field type="checkbox" name="dishTypes" value={label} />
            {label}
          </label>
        ))}
      </div>

      {/* TODO: ADD TOOLTIPS TO EACH HEALTH AND DIET LABEL TO SHOW THEIR DESCRIPTIONS */}
      <div id="diet-labels-group">Diet Labels</div>
      <div role="group" aria-labelledby="diet-labels-group">
        {DIET_LABELS.map((item) => (
          <label key={item.label}>
            <Field type="checkbox" name="dietLabels" value={item.value} />
            {item.label}
          </label>
        ))}
      </div>
      <div id="health-labels-group">Health Labels</div>
      <div role="group" aria-labelledby="health-labels-group">
        {HEALTH_LABELS.map((item) => (
          <label key={item.label}>
            <Field type="checkbox" name="healthLabels" value={item.value} />
            {item.label}
          </label>
        ))}
      </div>
    </>
  );
}
