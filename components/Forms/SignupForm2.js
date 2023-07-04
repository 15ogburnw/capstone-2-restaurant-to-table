// TODO: THIS WILL BE A SECOND FORM FOR COLLECTING USER PREFERENCES, DIET RESTRICTIONS, ETC...

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DIET_LABELS, HEALTH_LABELS } from "@/lib/edamam/filters";
import { ImInfo } from "react-icons/im";
import { useContext } from "react";
import ToastContext from "@/lib/contexts/ToastContext";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const SignupForm2 = ({ setSignupStep, newUser, setNewUser, resetSignup }) => {
  const showToast = useContext(ToastContext);
  const router = useRouter();
  const supabase = useSupabaseClient();

  const validationSchema = Yup.object().shape({
    healthRestrictions: Yup.array(),
    dietRestrictions: Yup.array(),
    acknowledgement: Yup.boolean().oneOf(
      [true],
      "**You must acknowledge that you have reviewed all health and diet restrictions thoroughly and have selected all that apply to you**"
    ),
  });

  // TODO: Style

  const handleSecondStep = async (values) => {
    setNewUser((old) => ({ ...old, ...values }));
    const { email, password, name, dietRestrictions, healthRestrictions } =
      newUser;
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      showToast("error", {
        text: error.msg,
      });
      setSignupStep(1);
      resetSignup();
    } else if (user) {
      const { data: regUser, error: prefsError } = await supabase
        .from("users")
        .update({
          diet_restrictions: dietRestrictions,
          health_restrictions: healthRestrictions,
          name,
        })
        .eq("id", user.id)
        .select();
      console.log(regUser);

      const { data: newAuthUser } = await supabase.auth.updateUser({
        uuser_metadata: { name: "faggot" },
      });
      console.log(newAuthUser);
      if (prefsError) {
        showToast("error", {
          text: "There was a problem saving your preferences. Please try updating them in the settings section",
        });
      }
      showToast("success", {
        text: `Welcome ${user.name}! You have successfully created a new account`,
      });

      router.push("/");
    }
  };
  return (
    <Formik
      initialValues={{
        healthRestrictions: newUser.healthRestrictions,
        dietRestrictions: newUser.dietRestrictions,
        acknowledgement: false,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSecondStep}
      validateOnMount>
      {({ isValid, values }) => (
        <Form>
          <div>
            <span
              id="health-restrictions-label"
              className="font-bold text-lg underline mt-4  text-primary-700 ">
              Health Restrictions
            </span>
            <div
              role="group"
              className="grid grid-flow-row grid-cols-3  bg-primary-400/40 px-6 py-4 mt-2 rounded-lg flex-wrap"
              aria-labelledby="health-restrictions-label">
              {HEALTH_LABELS.map((element) => (
                <div key={element.label} className="flex items-center">
                  <div className="  mt-2 flex items-center cursor-pointer  group">
                    <Field
                      type="checkbox"
                      className="mr-2 inline-block cursor-pointer accent-primary-600"
                      id={element.label}
                      name="healthRestrictions"
                      value={element.value}
                    />
                    <label
                      className="text-sm font-bold inline-block mr-2 text-primary-700 cursor-pointer group-hover:text-primary-600"
                      htmlFor={element.label}>
                      {element.label}
                    </label>
                    <ImInfo className="mr-6 inline-block text-primary-700 cursor-pointer group-hover:text-primary-600 " />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <span
                id="diet-restrictions-label"
                className="font-bold text-lg underline mt-4 text-primary-700 ">
                Diet Restrictions
              </span>
              <div
                role="group"
                className="grid grid-flow-row grid-cols-3  bg-primary-400/40 px-6 py-4 mt-2 rounded-lg flex-wrap "
                aria-labelledby="diet-restrictions-label">
                {DIET_LABELS.map((element) => (
                  <div key={element.label} className="flex items-center">
                    <div className="  mt-2 flex items-center cursor-pointer  group">
                      <Field
                        type="checkbox"
                        className="mr-2 inline-block cursor-pointer accent-primary-600"
                        id={element.label}
                        name="dietRestrictions"
                        value={element.value}
                      />
                      <label
                        className="text-sm font-bold inline-block mr-2 text-primary-700 cursor-pointer group-hover:text-primary-600"
                        htmlFor={element.label}>
                        {element.label}
                      </label>
                      <ImInfo className="mr-6 inline-block text-primary-700 cursor-pointer group-hover:text-primary-600 " />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="group flex items-start flex-row mt-8 mb-4">
              <Field
                type="checkbox"
                className="mr-3 h-fit mt-2 cursor-pointer accent-primary-600"
                id="acknowledgement"
                name="acknowledgement"
              />
              <label
                className={`text-md font-bold  flex flex-col justify-between mr-2

                  text-primary-700 group-hover:text-primary-600
                  cursor-pointer `}
                htmlFor="acknowledgement">
                <div>
                  {
                    "Please confirm that you have read all of the above health and "
                  }
                </div>
                <div>
                  {
                    "diet restrictions carefully and selected all of those that apply to you."
                  }

                  <span className=" font-extrabold text-2xl ml-1 text-red-700">
                    *
                  </span>
                </div>
              </label>
            </div>
            <ErrorMessage
              className="text-sm  text-red-500 mb-4 font-bold text-left"
              component="div"
              name="acknowledgement"
            />
          </div>
          <button
            disabled={!isValid ? true : false}
            type="submit"
            className={
              "py-2 px-6 mt-2 disabled:opacity-80 disabled:bg-primary-500 rounded-md bg-primary-700 text-white text-lg font-bold hover:enabled:bg-primary-600 cursor-pointer"
            }>
            Submit Form
          </button>
          <div
            onClick={() => {
              setNewUser((old) => ({ ...old, values }));
              setSignupStep(1);
            }}
            className="text-2xl inline-block text-primary-700 font-black ml-5 cursor-pointer hover:text-primary-600 transition hover:scale-105"
            type="button">
            Go Back
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm2;
