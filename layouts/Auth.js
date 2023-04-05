const Auth = ({ children }) => {
  return (
    <>
      {/* TODO Add a Header Here */}
      <div className="flex flex-col space-between h-screen justify-center bg-emerald-50">
        {children}
      </div>
      {/* TODO Add a footer here  */}
    </>
  );
};

export default Auth;
