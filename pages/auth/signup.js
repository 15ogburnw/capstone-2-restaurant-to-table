import Image from "next/image";
import SVG from "react-inlinesvg";
import RttCircleLogo from "@/public/img/rtt-logos/RttCircleLogo";
import SignupForm from "@/components/Forms/SignupForm";
import Auth from "@/layouts/Auth";

export default function SignupPage() {
  return (
    <div className="flex w-full max-w-md md:max-w-lg mx-auto my-32 min-h-fit  overflow-hidden bg-white rounded-lg shadow-lg shadow-slate-400 z-10 lg:max-w-xl">
      <div className="px-6 flex justify-center items-center flex-col py-8 md:px-8 w-full">
        <SignupForm />
      </div>
    </div>
  );
}

SignupPage.layout = Auth;
