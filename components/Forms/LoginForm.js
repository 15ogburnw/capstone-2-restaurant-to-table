import { useRouter } from "next/router";
import { useFormik } from "formik";

const LoginForm = () => {
  const router = useRouter();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <p className="mt-3 text-xl text-center text-gray-600">Welcome back!</p>
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
      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border border-green-400 lg:w-1/4"></span>

        <a
          href="#"
          className="text-xs text-center text-green-500 uppercase font-semibold hover:underline"
        >
          or login with email
        </a>

        <span className="w-1/5 border border-green-400 lg:w-1/4"></span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between">
          <label
            className="block mb-2 text-base font-bold text-gray-600 "
            for="email"
          >
            Email
          </label>
        </div>

        <input
          className="block w-full px-4 py-2 text-gray-700 bg-white border-2 rounded-lg   focus:border-emerald-400 focus:ring-opacity-40  focus:outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
          id="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />

        {/* TODO - STYLE THIS ERROR MESSAGE */}
        {formik.touched.email && formik.errors.email ? (
          <div className="text-sm text-red-500">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="mt-4">
        <div className="flex justify-between">
          <label
            className="block mb-2 text-base font-bold text-gray-600 "
            for="loggingPassword"
          >
            Password
          </label>
          <a href="#" className="text-sm text-emerald-500 hover:underline">
            Forget Password?
          </a>
        </div>

        <input
          id="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          className="block w-full px-4 py-2 text-gray-700 bg-white border-2 rounded-lg   focus:border-emerald-400 focus:ring-opacity-40  focus:outline-none"
          type="password"
        />
        {/* TODO - STYLE THIS ERROR MESSAGE */}
        {formik.touched.password && formik.errors.password ? (
          <div className="text-sm text-red-500">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-500  rounded-lg hover:bg-emerald-300 focus:outline-none focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
        >
          Sign In
        </button>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border border-green-400 md:w-1/3"></span>

        <a
          href="#"
          className="text-xs text-green-500 font-semibold uppercase hover:underline"
          onClick={(e) => {
            e.preventDefault();
            router.push("/auth/signup");
          }}
        >
          or sign up
        </a>

        <span className="w-1/5 border border-green-400 md:w-1/3"></span>
      </div>
    </form>
  );
};

export default LoginForm;
