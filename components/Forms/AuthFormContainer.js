import Image from "next/image";
import rttLogo from "public/rtt-logo.svg";

const AuthFormContainer = ({ children }) => {
  return (
    <div className="flex flex-col space-between h-screen justify-center bg-emerald-50">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl shadow-slate-700  lg:max-w-4xl">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
          }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
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

          {children}
        </div>
      </div>
    </div>
  );
};
