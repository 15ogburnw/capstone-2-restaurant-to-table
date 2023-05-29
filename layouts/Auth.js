export default function Auth({ children }) {
  return (
    <>
      {/* TODO Add a Header Here */}
      <div className="min-w-screen flex flex-col min-h-screen bg-emerald-50">
        {children}
      </div>
      {/* TODO Add a footer here  */}
    </>
  );
}
