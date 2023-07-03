import SignupForm1 from "@/components/Forms/SignupForm1";
import SignupForm2 from "@/components/Forms/SignupForm2";
import { useState, useRef, useContext } from "react";
import Auth from "@/layouts/Auth";
import ToastContext from "@/lib/contexts/ToastContext";

export default function SignupPage() {
  const [signupStep, setSignupStep] = useState(1);
  const INITIAL_USER = useRef({
    name: "",
    email: "",
    password: "",
    dietRestrictions: [],
    healthRestrictions: [],
  });
  const [newUser, setNewUser] = useState(INITIAL_USER.current);
  const showToast = useContext(ToastContext);

  const resetSignup = () => {
    setNewUser(INITIAL_USER.current);
    setSignupStep(1);
    showToast("error", {
      text: "There was a problem creating your account. Please try again or use different credenntials",
    });
  };
  return (
    <div className="mb-6">
      <div className="flex justify-center md:max-w-3xl lg:max-w-max  my-32 min-h-fit  bg-white rounded-lg shadow-lg shadow-primary-800/50   ">
        <div className="px-12 py-8 ">
          {signupStep === 1 ? (
            <SignupForm1
              setSignupStep={setSignupStep}
              newUser={newUser}
              setNewUser={setNewUser}
            />
          ) : (
            <SignupForm2
              setSignupStep={setSignupStep}
              newUser={newUser}
              setNewUser={setNewUser}
              resetSignup={resetSignup}
            />
          )}
        </div>
      </div>
    </div>
  );
}

SignupPage.layout = Auth;
