import Image from "next/image";
import SVG from "react-inlinesvg";
import SignupForm from "@/components/Forms/SignupForm";
import Auth from "@/layouts/Auth";

export default function SignupPage() {
  return (
    <div className="flex w-full max-w-md md:max-w-lg m-auto min-h-fit self-center overflow-hidden bg-white rounded-lg shadow-2xl shadow-slate-700  lg:max-w-xl">
      <div className="px-6 py-8 md:px-8 w-full">
        <div className="flex justify-center">
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
  );
}

SignupPage.layout = Auth;
