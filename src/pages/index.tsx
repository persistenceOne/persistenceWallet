import type { NextPage } from "next";
import ExampleAtom from "../components/atoms/Example";

const Home: NextPage = () => {
  return (
    <>
    <div className="flex flex-col justify-center items-center min-h-screen animate-pulse font-bold">
      <div className="text-9xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Frontend Starter Repo</div>
      <ExampleAtom />
      </div>
    </>
  );
};

export default Home;
