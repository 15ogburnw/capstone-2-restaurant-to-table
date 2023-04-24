import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const LoginForm = () => {
  const router = useRouter();
  const inputStyles = {
    valid: "focus:border-emerald-400",
    invalid: "border-red-400",
  };

  const loginUser = async (values) => {
    console.log(values);
    return fetch("/api/user/auth/login", {
      method: "POST",
      body: JSON.stringify({ login: values }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const {
    trigger,
    isMutating,
    reset,
    error: loginError,
  } = useSWRMutation("/api/user/auth/login", loginUser, {
    onError: (err, key, config) => {
      console.log(
        "Within on error func: (err.message,key,config)",
        err,
        key,
        config
      );
      reset();
    },
    onSuccess: async (resp, key, config) => {
      console.log(
        "Within on success func: (user,key,config)",
        resp.error.message,
        key,
        config
      );
      // await router.redirect("/dashboard");
      reset();
    },
  });

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const onSubmit = async (values) => {
    trigger(values);
  };

  if (isMutating) return <Loading size="lg" />;
  else {
    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ errors, touched, isValid }) => (
          <Form>
            <p className="mt-3 text-xl text-center text-gray-600">
              Welcome back!
            </p>
            <div className="">
              {loginError && (
                <p className="text-red-500 font-medium text-medium text-center my-2">
                  Something went wrong! Please try again later
                </p>
              )}
            </div>
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
                Sign in with Google
              </span>
            </a>

            {/* Login with email horizontal line break */}
            <div className="flex items-center justify-between mt-3">
              <span className="w-1/5 border border-green-400 lg:w-1/4"></span>

              <span className="text-sm text-center text-green-500 font-semibold">
                Or login with Email
              </span>

              <span className="w-1/5 border border-green-400 lg:w-1/4"></span>
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
                placeholder="Email"
              />
              {touched.email && errors.email ? (
                <div className="text-sm text-red-500 mt-1 font-medium">
                  {errors.email}
                </div>
              ) : null}
            </div>

            {/* Password input with forgot password link */}
            <div className="mt-3">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-base font-bold text-gray-600 "
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-emerald-500 hover:underline"
                >
                  Forget Password?
                </a>
              </div>

              <Field
                name="password"
                placeholder="Password"
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

            {/* Sign In Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-500  rounded-lg disabled:bg-emerald-300 enabled:hover:bg-emerald-300 enabled:focus:outline-none enabled:focus:ring enabled:focus:ring-emerald-500 enabled:focus:ring-opacity-50 "
                disabled={!isValid}
              >
                Sign In
              </button>
            </div>

            {/* Sign up redirect link */}
            <div className="flex items-center justify-center mt-4">
              <span className="text-sm text-center text-green-500 font-semibold mr-3">
                Need to make an account?
              </span>

              <Link
                href="/auth/signup"
                className="text-sm text-green-500 font-semibold hover:underline"
              >
                Sign up here
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
};

export default LoginForm;
