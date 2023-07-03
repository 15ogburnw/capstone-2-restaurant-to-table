import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Link from "next/link";

export default function SignupForm1({ newUser, setNewUser, setSignupStep }) {
  const inputStyles = {
    valid:
      "focus:ring-primary-400 mb-3 border-primary-800/60 placeholder-primary-800/60 ",
    invalid: "border-red-400 focus:ring-red-400 placeholder-red-400",
  };

  const validationSchema = yup.object().shape({
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
  const handleSubmitStep1 = async (values) => {
    setNewUser((old) => ({ ...old, ...values }));
    setSignupStep(2);
  };

  return (
    <Formik
      initialValues={{
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmitStep1}
      validateOnMount>
      {({ errors, touched, isValid }) => (
        <Form>
          <p className="mt-3 text-3xl text-center font-extrabold text-primary-700">
            Welcome to Restaurant to Table!
          </p>

          {/* Signup with email horizontal line break */}
          <div className="flex items-center justify-between mt-3">
            <span className="w-1/4 border-2 border-primary-700 lg:w-1/3"></span>

            <span className="text-lg text-center text-primary-700 font-bold">
              Sign Up Below
            </span>

            <span className="w-1/4 border-2 border-primary-700 lg:w-1/3"></span>
          </div>

          {/* Name input */}
          <div className="mt-4">
            <label
              className="block mb-2 text-lg font-bold text-primary-700 "
              htmlFor="name">
              Name
            </label>

            <Field
              className={`block w-full px-4 py-2 focus:placeholder-transparent text-primary-700 font-bold bg-white border-2 rounded-lg focus:border-transparent  focus:ring-2 focus:outline-none placeholder-primary-700 ${
                errors.name && touched.name
                  ? inputStyles.invalid
                  : inputStyles.valid
              }`}
              name="name"
              type="text"
              placeholder="Please enter your name"
              autoComplete="name"
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
                className="block mb-2 text-lg font-bold text-primary-700 "
                htmlFor="email">
                Email
              </label>
            </div>

            <Field
              className={`block w-full px-4 py-2 focus:placeholder-transparent text-primary-700 placeholder-primary-700 font-bold bg-white border-2 rounded-lg focus:border-transparent  focus:ring-2 focus:outline-none
            ${
              errors.email && touched.email
                ? inputStyles.invalid
                : inputStyles.valid
            }`}
              name="email"
              placeholder="Please enter your email"
              autoComplete="email"
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
                className="block mb-2 text-lg font-bold text-primary-700 "
                htmlFor="password">
                Password
              </label>
            </div>

            <Field
              name="password"
              placeholder="Please enter your password"
              autoComplete="new-password"
              className={`block w-full px-4 py-2 focus:placeholder-transparent text-primary-700 placeholder-primary-700 font-bold bg-white border-2 rounded-lg focus:border-transparent  focus:ring-2 focus:outline-none
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
                className="block mb-2 text-lg font-bold text-primary-700 "
                htmlFor="confirmPassword">
                Confirm Password
              </label>
            </div>

            <Field
              name="confirmPassword"
              placeholder="Please confirm your password"
              autoComplete="new-password"
              className={`block w-full px-4 py-2 focus:placeholder-transparent text-primary-700 placeholder-primary-700 font-bold bg-white border-2 rounded-lg focus:border-transparent  focus:ring-2 focus:outline-none
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
              className="text-sm text-red-500 mt-1 font-bold   text-right"
            />
          </div>

          {/* Sign Up Button */}

          <button
            className="w-full bg-primary-700 text-lg font-bold  py-2  px-6    hover:enabled:bg-primary-500 text-white font-bold  mt-3  disabled:opacity-70 disabled:bg-primary-500"
            disabled={!isValid}>
            Continue
          </button>

          {/* Login redirect link */}
          <div className="flex items-center justify-center mt-4">
            <span className="text-lg text-center text-primary-800 font-bold mr-3">
              Already have an account?
            </span>

            <Link
              href="/auth/login"
              className="text-lg text-primary-700 font-bold transition-all duration-150 hover:scale-105 hover:underline">
              Login Here
            </Link>
          </div>

          <div className="flex items-center justify-center mt-2">
            <Link
              href="/landing"
              className="transition-all duration-150 hover:scale-105">
              <span className="text-lg text-primary-700 font-bold  hover:underline">
                Take Me Home
              </span>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
