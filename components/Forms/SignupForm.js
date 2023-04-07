import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const SignupForm = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const inputStyles = {
    valid: "focus:border-emerald-400",
    invalid: "border-red-400",
  };

  const registerSchema = yup.object().shape({
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

  const onSubmit = async (values) => {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (data) router.push("/dashboard");
    // TODO: NEED TO DISPLAY ERROR MESSAGE TO USER ON FORM AND FIGURE OUT HOW TO PREVENT AUTOMATIC REDIRECT
    if (error) console.error(error);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerSchema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {({ errors, touched, isValid }) => (
        <Form>
          <p className="mt-3 text-xl text-center text-gray-600">
            Welcome to Restaurant to Table!
          </p>

          {/* Google Sign In Button */}
          <a
            href="#"
            className="flex items-center justify-center mt-4 text-green-500 transition-colors duration-300 transform border-2 border-emerald-200 rounded-lg  hover:bg-emerald-400 hover:text-white hover:border-white"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign In with Google
            </span>
          </a>

          {/* Signup with email horizontal line break */}
          <div className="flex items-center justify-between mt-3">
            <span className="w-1/4 border border-green-400 lg:w-1/3"></span>

            <span className="text-sm text-center text-green-500 font-semibold">
              Or sign up with Email
            </span>

            <span className="w-1/4 border border-green-400 lg:w-1/3"></span>
          </div>

          {/* Name input */}
          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-base font-bold text-gray-600 "
                htmlFor="name"
              >
                Name
              </label>
            </div>

            <Field
              className={`block w-full px-4 py-2 text-gray-700 bg-white border-2 rounded-lg  focus:ring-opacity-40  focus:outline-none 
            ${
              errors.name && touched.name
                ? inputStyles.invalid
                : inputStyles.valid
            }`}
              name="name"
              placeholder="Please enter your name"
            />
            {touched.name && errors.name ? (
              <div className="text-sm text-red-500 mt-1 font-medium">
                {errors.name}
              </div>
            ) : null}
          </div>

          {/* Email input */}
          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-base font-bold text-gray-600 "
                htmlFor="email"
              >
                Email
              </label>
            </div>

            <Field
              className={`block w-full px-4 py-2 text-gray-700 bg-white border-2 rounded-lg  focus:ring-opacity-40  focus:outline-none 
            ${
              errors.email && touched.email
                ? inputStyles.invalid
                : inputStyles.valid
            }`}
              name="email"
              placeholder="Please enter your email"
            />
            {touched.email && errors.email ? (
              <div className="text-sm text-red-500 mt-1 font-medium">
                {errors.email}
              </div>
            ) : null}
          </div>

          {/* Password input */}
          <div className="mt-3">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-base font-bold text-gray-600 "
                htmlFor="password"
              >
                Password
              </label>
            </div>

            <Field
              name="password"
              placeholder="Please enter your password"
              className={`block w-full px-4 py-2 text-gray-700 bg-white border-2 rounded-lg  focus:ring-opacity-40  focus:outline-none
            ${
              errors.password && touched.password
                ? inputStyles.invalid
                : inputStyles.valid
            }`}
              type="password"
            />
            {touched.password && errors.password ? (
              <div className="text-sm text-red-500 mt-1 font-medium">
                {errors.password}
              </div>
            ) : null}
          </div>

          {/* Confirm password input */}
          <div className="mt-3">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-base font-bold text-gray-600 "
                htmlFor="confirmPassword"
              >
                Password
              </label>
            </div>

            <Field
              name="confirmPassword"
              placeholder="Please confirm your password"
              className={`block w-full px-4 py-2 text-gray-700 bg-white border-2 rounded-lg  focus:ring-opacity-40  focus:outline-none
            ${
              errors.confirmPassword && touched.confirmPassword
                ? inputStyles.invalid
                : inputStyles.valid
            }`}
              type="password"
            />
            {touched.confirmPassword && errors.confirmPassword ? (
              <div className="text-sm text-red-500 mt-1 font-medium">
                {errors.confirmPassword}
              </div>
            ) : null}
          </div>

          {/* Sign Up Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-500  rounded-lg disabled:bg-emerald-300 enabled:hover:bg-emerald-300 enabled:focus:outline-none enabled:focus:ring enabled:focus:ring-emerald-500 enabled:focus:ring-opacity-50 "
              disabled={!isValid}
            >
              Create Account
            </button>
          </div>

          {/* Login redirect link */}
          <div className="flex items-center justify-center mt-4">
            <span className="text-sm text-center text-green-500 font-semibold mr-3">
              Already have an account?
            </span>

            <Link
              href="/auth/login"
              className="text-sm text-green-500 font-semibold hover:underline"
            >
              Login here
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;