export default function LightBtn({
  onClick,
  secondColor,
  children,
  className,
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-white ${className} font-bold inline-flex items-center justify-center shadow-md shadow-primary-900 leading-none border-4 text-primary-800 border-white focus:outline-none  duration-200 focus-visible:outline-2  groupfocus-visible:outline-white focus-visible:outline-offset-2  hover:border-${secondColor}   hover:bg-transparent hover:text-${secondColor}   hover:contrast-200 hover:shadow-primary-700/40 hover:scale-105 }`}>
      {children}
    </button>
  );
}
