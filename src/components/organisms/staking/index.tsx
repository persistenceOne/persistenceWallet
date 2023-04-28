import React, { useState } from "react";
import TabItem from "../../molecules/tabs/tabItem";
import TabContent from "../../molecules/tabs/tabContent";
import DelegatedValidators from "./delegated-validators";
import AllValidators from "./all-validators/all-validators";
import TransactionModal from "./txns";
import { useAppStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";
import DelegateModal from "./txns/delegate";
import UnDelegateModal from "./txns/un-delegate";
import ReDelegateModal from "./txns/re-delegate";
import UnbondValidators from "./unbonding-validators";
import ToggleSwitch from "../../atoms/switch";
import ClaimModal from "./txns/claim";

export type ValidatorTypes = "active" | "in-active";

interface Props {
  defaultTab: string;
}

const StakingContainer: React.FC<Props> = ({ defaultTab }) => {
  const [value, setValue] = useState(true);
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const [selectedValidator] = useAppStore(
    (state) => [state.transactions.staking.selectedValidator],
    shallow
  );

  const tabItemClasses =
    "cursor-pointer w-full" +
    "font-semibold text-lg leading-normal text-center" +
    " text-light-mid py-2 px-6 md:text-base";
  return (
    <div className="flex max-h-full w-full shrink grow items-start justify-start gap-4 overflow-auto p-8">
      <div className="w-full rounded-md">
        <div className={``}>
          <ul className="stakingTabs flex justify-between flex-wrap p-3 bg-black-500 mb-2 rounded-md">
            <div className="flex items-center">
              <TabItem
                id="all"
                title={"All Validators"}
                activeTab={activeTab}
                className={`${tabItemClasses}  rounded-md`}
                setActiveTab={setActiveTab}
              />
              <TabItem
                id="delegated"
                title={"Delegated"}
                activeTab={activeTab}
                className={`${tabItemClasses} rounded-md`}
                setActiveTab={setActiveTab}
              />
              <TabItem
                id="unbond"
                title={"Unbondings"}
                activeTab={activeTab}
                className={`${tabItemClasses} rounded-md`}
                setActiveTab={setActiveTab}
              />
            </div>
            {activeTab === "all" ? (
              <div className="p-2 flex items-center">
                <p className="text-light-emphasis mr-2">Active Validators</p>
                <ToggleSwitch
                  isOn={value}
                  color="#EF476F"
                  variant={"medium"}
                  onChange={() => setValue(!value)}
                />
              </div>
            ) : (
              ""
            )}
          </ul>
          <div>
            <TabContent
              id="all"
              activeTab={activeTab}
              className=" md:p-4 bg-black-500 rounded-xl"
            >
              <AllValidators
                activeValidatorsType={value ? "active" : "in-active"}
              />
            </TabContent>
            <TabContent
              id="delegated"
              activeTab={activeTab}
              className="p-6 md:p-4 bg-black-500 rounded-xl"
            >
              <DelegatedValidators />
            </TabContent>
            <TabContent
              id="unbond"
              activeTab={activeTab}
              className="p-6 md:p-4 bg-black-500 rounded-xl"
            >
              <UnbondValidators />
            </TabContent>
          </div>
        </div>
      </div>
      {selectedValidator !== null ? <TransactionModal /> : ""}
      <DelegateModal />
      <ClaimModal />
      <UnDelegateModal />
      <ReDelegateModal />
    </div>
  );
};

export default StakingContainer;
