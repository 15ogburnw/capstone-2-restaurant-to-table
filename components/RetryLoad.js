import { useRouter } from "next/router";

const RetryLoad = ({ dataName, textSize }) => {
  const router = useRouter();
  return (
    <div className="flex align-middle flex-col text-center text-primary-700 justify-center w-full h-full items-center">
      <p className={`mb-4 text-${textSize} font-bold text-primary-700`}>
        {`Oops! There was a problem loading the ${dataName} data.`}
      </p>
      <button
        className="bg-primary-700 text-xl py-1.5 leading-none focus:outline-none px-2 border-4 border-primary-700   text-primary-700 focus:outline-2 focus:outline-offset-2 group hover:bg-transparent hover:text-primary-700 text-white font-bold inline-flex items-center justify-center shadow-md shadow-primary-700 hover:shadow-primary-600/40 transition-all duration-150 hover:scale-105"
        onClick={() => router.reload()}>
        Try again
      </button>
    </div>
  );
};

export default RetryLoad;
