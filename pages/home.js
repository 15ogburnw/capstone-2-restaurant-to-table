import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const Home = ({ user }) => {
  return (
    <>
      <h1 className="text-xl7 text-center origin-center">YOU ARE HOME</h1>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Home;
