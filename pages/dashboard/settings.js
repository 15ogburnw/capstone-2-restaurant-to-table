import Dashboard from "@/layouts/Dashboard";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { ImInfo } from "react-icons/im";
import { HEALTH_LABELS, DIET_LABELS } from "@/lib/edamam/filters";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import ToastContext from "@/lib/contexts/ToastContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading";

export default function SettingsPage() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const showToast = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [dietRestrictions, setDietRestrictions] = useState([]);
  const [healthRestrictions, setHealthRestrictions] = useState([]);

  // useEffect(() => {
  //   async function getPublicUser(user) {
  //     const { data, error } = await supabase
  //       .from("users")
  //       .select("*")
  //       .eq("id", user.id);
  //     if (error)
  //       showToast("error", {
  //         text: "Something went wrong retrieving user info",
  //       });
  //     if (data) {
  //       setDietRestrictions(data[0]['diet_restrictions'])
  //     };
  //   }
  //   if (user) {
  //     getPublicUser(user);
  //   }
  // }, [user, showToast, supabase]);

  const validationSchema = Yup.object().shape({
    healthRestrictions: Yup.array(),
    dietRestrictions: Yup.array(),
    acknowledgement: Yup.boolean().oneOf(
      [true],
      "**You must acknowledge that you have reviewed all health and diet restrictions thoroughly and have selected all that apply to you**"
    ),
  });

  const handleUserRestrictionsUpdate = async (values) => {
    setIsLoading(true);
    const { healthRestrictions, dietRestrictions } = values;
    console.log(healthRestrictions, dietRestrictions);
    const { data, error } = await supabase.from("users").update({
      healthRestrictions: healthRestrictions,
      dietRestrictions: dietRestrictions,
    });

    if (error) {
      showToast("error", {
        text: "There was a problem updating your preferences. Please try again",
      });
    } else {
      console.log(data);
      showToast("success", { text: "Successfully updated your preferences!" });
    }
    setIsLoading(false);
  };
  if (!user) return <Loading size={"xl"} />;
  return (
    <Formik
      initialValues={{
        healthRestrictions: user?.user_metadata.healthRestrictions,
        dietRestrictions: user?.user_metadata.dietRestrictions,
        acknowledgement: false,
      }}
      validationSchema={validationSchema}
      onSubmit={handleUserRestrictionsUpdate}
      validateOnMount>
      {({ isValid, values }) => (
        <Form>
          <h1 className="text-center mt-5 text-primary-700 text-2xl font-black">
            Update Your Preferences
          </h1>
          <div className="mx-20 mt-10">
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

            <div className="group flex items-center flex-row mt-8 mb-6">
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
                    "Please confirm that you have read all of the above health and diet restrictions carefully and selected all of those that apply to you."
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
            disabled={!isValid || isLoading ? true : false}
            type="submit"
            className={
              "py-2 px-6 mt-2 disabled:opacity-80 disabled:bg-primary-500 rounded-md bg-primary-700 text-white text-lg font-bold hover:enabled:bg-primary-600 cursor-pointer mx-20 mb-10"
            }>
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faCircleNotch} spin className="mr-2 " />
                <span>Loading</span>
              </>
            ) : (
              "Submit Form"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}

SettingsPage.layout = Dashboard;
