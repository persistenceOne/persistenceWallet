import type { NextPage } from "next";
import { Template } from "../components/templates";
import StakingContainer from "../components/organisms/staking";

const Staking: NextPage = () => {
  return (
    <Template className={""} title={"stake"}>
      <StakingContainer />
    </Template>
  );
};

export default Staking;
