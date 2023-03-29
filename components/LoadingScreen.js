export default function LoadingScreen() {
  return (
    <div
      id="loading-screen"
      className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50 flex flex-col items-center justify-center"
    >
      <i className="fa-solid text-blue-950 fa-circle-notch fa-spin fa-5x"></i>
      <p className="text-center text-3xl font-medium mt-4">
        Loading... please wait a moment
      </p>
    </div>
  );
}
