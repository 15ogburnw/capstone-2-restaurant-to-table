// TODO: THIS WILL BE A SECOND FORM FOR COLLECTING USER PREFERENCES, DIET RESTRICTIONS, ETC...

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  DIET_LABELS,
  HEALTH_LABELS,
  CUISINE_TYPES,
  DISH_TYPES,
  MEAL_TYPES,
} from "@/lib/edamam/filters";

const validationSchema = Yup.object().shape({
  healthRestrictions: Yup.array(),
  healthAcknowledgment: Yup.boolean().oneOf(
    [true],
    "You must acknowledge that you have reviewed all health restrictions thoroughly and have selected all that apply to you."
  ),
  dietRestrictions: Yup.array(),
  dietAcknowledgement: Yup.boolean().oneOf(
    [true],
    "You must acknowledge that you have reviewed all diet restrictions thoroughly and have selected all that apply to you"
  ),
});

export const SignupForm2 = () => {
  return (
    <Formik
      initialValues={{
        healthRestrictions: [],
        healthAcknowledgment: false,
        dietRestrictions: [],
        dietAcknowledgement: false,
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
