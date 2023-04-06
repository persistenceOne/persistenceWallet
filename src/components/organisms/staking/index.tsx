import React, { useState } from "react";
import TabItem from "../../molecules/tabs/tabItem";
import TabContent from "../../molecules/tabs/tabContent";
import DelegatedValidators from "./delegated-validators";
import AllValidators from "./all-validators";

const StakingContainer = () => {
  const [activeTab, setActiveTab] = useState("Send");
  const tabItemClasses =
    "cursor-pointer w-full" +
    "font-semibold text-lg leading-normal text-center" +
    " text-light-mid px-6 py-4 md:px-2 md:py-1.5 md:text-base";

  return (
    <div className="flex max-h-full w-full shrink grow items-start justify-start gap-4 overflow-auto p-8">
      <div className="border border-solid border-[#2b2b2b] w-full rounded-md">
        <div className={``}>
          <ul className="stakingTabs flex flex-wrap mb-4 border-b border-solid border-[#2b2b2b]">
            <TabItem
              id="Send"
              title={"All Validators"}
              activeTab={activeTab}
              className={`${tabItemClasses} border-r border-solid border-[#2b2b2b]`}
              setActiveTab={setActiveTab}
            />
            <TabItem
              id="SendIbc"
              title={"Delegated"}
              activeTab={activeTab}
              className={`${tabItemClasses}`}
              setActiveTab={setActiveTab}
            />
          </ul>
          <div>
            <TabContent
              id="Send"
              activeTab={activeTab}
              className="p-6 md:p-4 bg-tabContent rounded-md"
            >
              <AllValidators />
            </TabContent>
            <TabContent
              id="SendIbc"
              activeTab={activeTab}
              className="p-6 md:p-4 bg-tabContent rounded-md"
            >
              <DelegatedValidators />
            </TabContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingContainer;
