import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LandingPage() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAuthRedirect = (e) => {
    e.prventdefault();
    goToAuth();
  };
  const goToAuth = async (type) => {
    if (type === "login") await router.redirect("/auth/login");
    if (type === "signup") await router.redirect("/auth/signup");
    setLoading(false);
  };

  return (
    <section className="flex flex-col justify-center items-center w-1/2 h-auto">
      <h1>
        This is the landing page: Please login below to use the application:
      </h1>
      <div className="flex flex-row align-middle items-center justify-evenly ">
        {/* TODO:MAKE THE LOGIN AND SIGNUP BUTTONS AGAIN */}
        <button
          onClick={
            (() => {
              setLoading(true);
              goToAuth("login");
            },
            [])
          }
          disabled={loading ? true : false}
        >
          Login
        </button>
        <button
          onClick={
            (() => {
              setLoading(true);
              goToAuth("signup");
            },
            [])
          }
          disabled={loading ? true : false}
        ></button>
      </div>
    </section>
  );
}
