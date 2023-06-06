import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useSupabaseClient();
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const inputStyles = {
    valid:
      "focus:ring-primary-400 mb-3 border-primary-800/50 placeholder-primary-800/50 ",
    invalid: "border-red-400 focus:ring-red-400 placeholder-red-400",
  };

  const signupSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("You must confirm your password"),
  });

  /* TODO: Add functionality for including basic user metadata along with signup. Do I want to include a name with the supabase object or keep
	it all on the public table?
   */
  const handleSignup = async (values) => {
    const { email, password } = values;
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      setIsLoading(false);
      setErrorMessage("Something went wrong! Please try again");
      console.error(error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={signupSchema}
      onSubmit={handleSignup}
      validateOnMount>
      {({ errors, touched, isValid }) => (
        <Form>
          <p className="mt-3 text-3xl text-center font-extrabold text-primary-600">
            Welcome to Restaurant to Table!
          </p>

          <div className="text-red-500 font-bold text-lg text-center my-2">
            {errorMessage}
          </div>

          {/* Signup with email horizontal line break */}
          <div className="flex items-center justify-between mt-3">
            <span className="w-1/4 border-2 border-primary-600 lg:w-1/3"></span>

            <span className="text-md text-center text-primary-600 font-bold">
              Sign Up Below
            </span>

            <span className="w-1/4 border-2 border-primary-600 lg:w-1/3"></span>
          </div>

          {/* Name input */}
          <div className="mt-4">
            <label
              className="block mb-2 text-base font-bold text-gray-600 "
              htmlFor="name">
              Name
            </label>

            <Field
              className={`block w-full px-4 py-2 focus:placeholder-transparent text-primary-600 font-bold bg-white border-2 rounded-lg focus:border-transparent  focus:ring-2 focus:outline-none 
            					${
                        errors.name && touched.name
                          ? inputStyles.invalid
                          : inputStyles.valid
                      }`}
              name="name"
              type="text"
              placeholder="Please enter your name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-sm text-red-500 mt-1 font-bold text-right -mb-3"
            />
          </div>

          {/* Email input */}
          <div>
            <div className="flex justify-between">
              <label
                className="block mb-2 text-base font-bold text-gray-600 "
                htmlFor="email">
                Email
              </label>
            </div>

            <Field
              className={`block w-full px-4 py-2 focus:placeholder-transparent text-primary-600 font-bold bg-white border-2 rounded-lg focus:border-transparent  focus:ring-2 focus:outline-none 
            					${
                        errors.email && touched.email
                          ? inputStyles.invalid
                          : inputStyles.valid
                      }`}
              name="email"
              placeholder="Please enter your email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-sm text-red-500 mt-1 font-bold text-right -mb-3"
            />
          </div>

          {/* Password input */}
          <div>
            <div className="flex justify-between">
              <label
                className="block mb-2 text-base font-bold text-gray-600 "
                htmlFor="password">
                Password
              </label>
            </div>

            <Field
              name="password"
              placeholder="Please enter your password"
              className={`block w-full px-4 py-2 focus:placeholder-transparent text-primary-600 font-bold bg-white border-2 rounded-lg focus:border-transparent  focus:ring-2 focus:outline-none 
            					${
                        errors.password && touched.password
                          ? inputStyles.invalid
                          : inputStyles.valid
                      }`}
              type="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-sm text-red-500 mt-1 font-bold text-right -mb-3"
            />
          </div>

          {/* Confirm password input */}
          <div>
            <div className="flex justify-between">
              <label
                className="block mb-2 text-base font-bold text-gray-600 "
                htmlFor="confirmPassword">
                Password
              </label>
            </div>

            <Field
              name="confirmPassword"
              placeholder="Please confirm your password"
              className={`block w-full px-4 py-2 focus:placeholder-transparent text-primary-600 font-bold bg-white border-2 rounded-lg focus:border-transparent  focus:ring-2 focus:outline-none 
            					${
                        errors.confirmPassword && touched.confirmPassword
                          ? inputStyles.invalid
                          : inputStyles.valid
                      }`}
              type="password"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-sm text-red-500 mt-1 font-bold -mb-6  text-right"
            />
          </div>

          {/* Sign Up Button */}

          <div className="mt-10">
            <button
              type="submit"
              className="w-full bg-primary-800 text-md py-1.5 leading-none focus:outline-none px-6 border-4 border-primary-800 duration-200  hover:enabled:bg-transparent hover:enabled:text-primary-800 text-white font-medium inline-flex items-center justify-center md:mt-0  disabled:cursor-not-allowed disabled:opacity-30 "
              disabled={!isValid || isLoading}>
              {!isLoading ? (
                "Create Your Account"
              ) : (
                <>
                  <FontAwesomeIcon
                    className="inline mr-3 font-bold"
                    icon={faCircleNotch}
                    spin
                  />
                  <span className="font-bold">Loading</span>
                </>
              )}
            </button>
          </div>
          {/* Login redirect link */}
          <div className="flex items-center justify-center mt-4">
            <span className="text-md text-center text-primary-600 font-bold mr-3">
              Already have an account?
            </span>

            <Link
              href="/auth/login"
              className="text-md text-primary-800 font-bold hover:underline">
              Login here
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
