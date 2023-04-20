import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import LoadingButton from "@/components/LoadingButton";

export default function LandingPage() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const loginButton = useRef(null);
  const signupButton = useRef(null);

  const handleAuthRedirect = (e) => {
    console.log(e.target);
    goToAuth(e.target.name);
  };
  const goToAuth = async (type) => {
    if (type === "login") await router.push("/auth/login");
    if (type === "signup") await router.push("/auth/signup");
  };

  return (
    <section className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-2xl font-semibold text-slate-700">
        This is the landing page: Please login below to use the application:
      </h1>
      <div className="flex flex-row align-middle items-center justify-center ">
        <button
          name="login"
          onClick={handleAuthRedirect}
          originalRef={loginButton}
          className="rounded-lg py-2 px-6 my-2 mx-2 disabled disabled:bg-emerald-200 disabled:border-emerald-200 sm:w-55 sm- text-xl w-auto h-auto bg-gray-100 border border-gray-400 hover:bg-emerald-100 hover:border-emerald-400 text-center font-bold"
        >
          Login
        </button>
        <button
          name="login"
          onClick={handleAuthRedirect}
          originalRef={signupButton}
          className="rounded-lg py-2 px-6 my-2 mx-2 disabled disabled:bg-emerald-200 disabled:border-emerald-200 sm:w-55 sm- text-xl w-auto h-auto bg-gray-100 border border-gray-400 hover:bg-emerald-100 hover:border-emerald-400 text-center font-bold"
        >
          Sign Up
        </button>
      </div>
      <div className="flex flex-row align-middle items-center justify-center"></div>
    </section>
  );
}
