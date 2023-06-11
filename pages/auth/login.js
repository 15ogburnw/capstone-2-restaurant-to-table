import LoginForm from "@/components/Forms/LoginForm";
import SVG from "react-inlinesvg";
import Auth from "@/layouts/Auth";
import Link from "next/link";
import RttCircleLogo from "@/public/img/rtt-logos/RttCircleLogo";

export default function LoginPage() {
  return (
    <div className="flex w-full aspect-auto mx-auto my-32 min-h-fit overflow-hidden bg-white rounded-lg shadow-xl shadow-slate-500 xl:max-w-5xl lg:max-w-4xl md:max-w-xl max-w-md">
      <div
        className="hidden bg-cover lg:block lg:w-1/2 flex-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
        }}></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}

LoginPage.layout = Auth;
