import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import rttLogo from "public/rtt-logo.svg";
import SignupForm from "@/components/Forms/SignupForm";

const SignupPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("test").select("*");
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user, supabaseClient]);

  if (!user) {
    return (
      <div className="flex flex-col space-between h-screen justify-center bg-emerald-50">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl shadow-slate-700  lg:max-w-xl">
          <div className="w-full px-6 py-8 md:px-8">
            <div className="flex justify-center mx-auto">
              <div className="w-auto h-7 sm:h-8">
                <Image
                  height={40}
                  width={40}
                  className="mb-5"
                  src={rttLogo}
                  alt=""
                />
              </div>
            </div>

            <SignupForm />
          </div>
        </div>
      </div>
    );
  } else return <>hello</>;
};

export default SignupPage;
