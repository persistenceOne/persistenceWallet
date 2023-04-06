import type { NextPage } from "next";
import { Template } from "../components/templates";
import DashboardContainer from "../components/organisms/dashboard";

const Home: NextPage = () => {
  return (
    <Template className={""} title={"stake"}>
      <DashboardContainer />
    </Template>
  );
};

export default Home;
