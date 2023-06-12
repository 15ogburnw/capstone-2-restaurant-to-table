// TODO: THIS WILL BE A SECOND FORM FOR COLLECTING USER PREFERENCES, DIET RESTRICTIONS, ETC...

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./styles.css";
import {
  DIET_LABELS,
  HEALTH_LABELS,
  CUISINE_TYPES,
  DISH_TYPES,
  MEAL_TYPES,
} from "@/lib/edamam/filters";

const dietLabelsSchema = Yup.object().shape({
  check: Yup.array().test("custom", null, (obj) => {
    if (obj?.length > 0) {
      return true;
    }
    return new Yup.ValidationError(
      "You are required to acknowledge the final checkbox, affirming that you do not have any of the above stated diet restrictions",
      null,
      "check"
    );
  }),
});

const healthLabelsSchema = Yup.object().shape({
  check: Yup.array().test("custom", null, (obj) => {
    if (obj?.length > 0) {
      return true;
    }
    return new Yup.ValidationError(
      "If none of these options apply, you must still acknowlege that you have clearly and thoroughly read through the list of diet restrictions above and are comfortable with receiving recipe recommendations in these categories.",
      null,
      "check"
    );
  }),
  check: Yup.array().test(""),
});

export const CustomForm = () => {
  return (
    <Formik
      initialValues={{
        check: [],
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        console.log(values);
      }}>
      {({ touched, errors }) => (
        <Form>
          <ErrorMessage style={{ color: "red" }} component="div" name="check" />
          {disciplines.map((element, index) => (
            <div key={index} className={`mb-1 col-12`}>
              <label>
                <Field type="checkbox" name="check" value={element} />
                {element}
              </label>
            </div>
          ))}
          <button
            disabled={
              !(Object.keys(touched).length > 0) ||
              Object.entries(errors).some(([key, val]) => touched[key] && val)
            }
            type="submit">
            Submit form
          </button>
        </Form>
      )}
    </Formik>
  );
};
