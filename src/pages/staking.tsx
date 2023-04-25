import type { NextPage } from "next";
import { Template } from "../components/templates";
import StakingContainer from "../components/organisms/staking";
import { useRouter } from "next/router";

const Staking: NextPage = () => {
  const router = useRouter();
  return (
    <Template className={""} title={"stake"}>
      <StakingContainer
        defaultTab={
          router.query.name !== undefined
            ? router.query!.name.toString()
            : "all"
        }
      />
    </Template>
  );
};

export default Staking;
