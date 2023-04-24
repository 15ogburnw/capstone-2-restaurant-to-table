import Image from "next/image";
import SVG from "react-inlinesvg";
import SignupForm from "@/components/Forms/SignupForm";
import Auth from "@/layouts/Auth";

// TODO: IF ALL OTHER FEATURES GET IMPLEMENTED, IMPLEMENT GOOGLE SIGNIN, IF NOT REMOVE BUTTON

export default function SignupPage() {
  return (
    <div className="flex flex-col space-between h-screen justify-center bg-emerald-50">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl shadow-slate-700  lg:max-w-xl">
        <div className="w-full px-6 py-8 md:px-8">
          <div className="flex justify-center mx-auto">
            <div className="w-auto h-7 sm:h-8">
              <SVG
                className="h-8 w-auto inline flex-none"
                src="/img/rtt-logos/rtt-icon.svg"
                alt="logo"
              />
            </div>
          </div>

          <SignupForm />
        </div>
      </div>
    </div>
  );
}

SignupPage.layout = Auth;
