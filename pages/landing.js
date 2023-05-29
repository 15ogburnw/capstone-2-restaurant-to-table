import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  const router = useRouter();
  const [signupLoading, setSignupLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  return (
    <section className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-2xl font-semibold text-slate-700">
        This is the landing page: Please login below to use the application:
      </h1>
      <div className="flex flex-row align-middle items-center justify-center ">
        <button
          onClick={() => {
            setLoginLoading(true);
            router.push("/auth/login");
          }}
          className="rounded-lg py-2 px-6 my-2 mx-2 disabled disabled:bg-emerald-200 disabled:border-emerald-200 sm:w-55 sm- text-xl w-auto h-auto bg-gray-100 border border-gray-400 hover:bg-emerald-100 hover:border-emerald-400 text-center font-bold text-emerald-500"
        >
          {loginLoading ? (
            <>
              <FontAwesomeIcon
                className="inline mr-2"
                icon={faCircleNotch}
                spin
              />
              <span >Loading...</span>
            </>
          ) : (
            "Login"
          )}
        </button>
        <button
          name="signup"
          onClick={() => {
            setSignupLoading(true);
            router.push("/auth/signup");
          }}
          className="rounded-lg py-2 px-6 my-2 mx-2 disabled disabled:bg-emerald-200 disabled:border-emerald-200 sm:w-55 sm- text-xl w-auto h-auto bg-gray-100 border border-gray-400 hover:bg-emerald-100 hover:border-emerald-400 text-center font-bold"
        >
          {signupLoading ? (
            <>
              <FontAwesomeIcon
                className="inline text-emerald-500 mr-2"
                icon={faCircleNotch}
                spin
              />
              <span className="text-emerald-400 font-semibold">Loading...</span>
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
      <div className="flex flex-row align-middle items-center justify-center"></div>
    </section>
  );
}
