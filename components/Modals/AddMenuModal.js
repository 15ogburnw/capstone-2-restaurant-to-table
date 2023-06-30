import { useState } from "react";
import * as yup from "yup";
import { preload } from "swr";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useSWRConfig } from "swr";

// **JANKY MODAL FOR CREATING A NEW MENU FROM THE SIDEBAR... THIS IS DEFINITELY GOING TO CHANGE**
export default function AddMenuModal({ closeModal }) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const { mutate } = useSWRConfig();

  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState();

  // TODO: ALERTS AREN'T DISAPPEARING ON THE MODAL PAGE AFTER IT IS CLOSED. MODAL POPS UP EVERY TIME I CLICK ON THE PAGE OUTSIDE OF IT, EVEN IF ITS CLOSED

  const addMenuSchema = yup.object().shape({
    menuName: yup.string().required("Menu name is required"),
  });

  const handleCreateMenu = async (values) => {
    const { menuName } = values;
    setIsLoading(true);
    setErrorMessage(null);
    console.log("new menu name:", menuName);
    const { error } = await supabase
      .from("menus")
      .upsert({ name: menuName, user_id: user.id })
      .select();

    if (error) {
      console.error(error);
      setErrorMessage(
        "You already have a menu with this name! Try another name"
      );
      setIsLoading(false);
    } else {
      closeModal();
    }
    mutate("/api/user/menus");
  };

  return (
    <>
      <p className="mt-2 text-md text-center font-semibold text-primary-600 ">
        Create a custom menu: Just give your new menu a name and get started
        organizing your favorite recipes however you like!
      </p>

      {errorMessage ? (
        <p className="mt2 text-md text-center text-red-500 font-semibold">
          {errorMessage}
        </p>
      ) : null}

      <Formik
        initialValues={{
          menuName: "",
        }}
        validationSchema={addMenuSchema}
        onSubmit={handleCreateMenu}
        validateOnMount>
        {({ errors, touched, isValid }) => (
          <Form>
            <div className="my-3">
              <div className="flex justify-start">
                <label
                  className="block text-lg mb-2 text-base font-bold text-primary-700 "
                  htmlFor="menuName">
                  Menu Name
                </label>
              </div>

              <Field
                type="text"
                name="menuName"
                id="menuName"
                placeholder="Enter a menu name"
                className={`block w-full px-4 py-2 focus:placeholder-transparent text-primary-600 font-bold bg-white border-2 rounded-lg focus:border-transparent focus:ring-2 focus:outline-none ${
                  errors.menuName && touched.menuName
                    ? "border-red-500 focus:ring-red-500 placeholder-red-500"
                    : "focus:ring-primary-500 mb-3 border-primary-600 placeholder-primary-600"
                }`}
              />
              <ErrorMessage
                name="menuName"
                component="div"
                className="text-md text-red-500 mt-2 font-bold text-left  -mb-3"
              />
            </div>
            <div className="sm:mt-7 flex flex-col items-center sm:flex-row ">
              <button
                onClick={closeModal}
                className="bg-primary-700 text-xl py-1.5 leading-none focus:outline-none px-2 border-4 border-primary-700   text-primary-700 focus:outline-2 focus:outline-offset-2 hover:bg-transparent hover:text-primary-700 text-white font-bold inline-flex items-center justify-center shadow-md shadow-primary-70 transition hover:scale-105 ">
                Cancel
              </button>

              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="bg-primary-500 text-xl py-1.5 ml-4 leading-none focus:outline-none px-2 border-4 border-primary-500   text-primary-500 focus:outline-2 focus:outline-offset-2 hover:enabled:bg-transparent hover:enabled:text-primary-500 text-white font-bold inline-flex items-center justify-center shadow-md shadow-primary-700  transition  hover:enabled:scale-105 disabled:shadow-none disabled:opacity-70 ">
                {!isLoading ? (
                  "Create Your Menu"
                ) : (
                  <>
                    <FontAwesomeIcon
                      className="inline font-bold mr-3"
                      icon={faCircleNotch}
                      spin
                    />
                    <span className="font-bold">Loading</span>
                  </>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
