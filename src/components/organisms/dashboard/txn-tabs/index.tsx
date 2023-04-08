import React, { useState } from "react";
import TabItem from "../../../molecules/tabs/tabItem";
import TabContent from "../../../molecules/tabs/tabContent";
import Send from "./send";

const TxnTabs = () => {
  const [activeTab, setActiveTab] = useState("Send");
  const tabItemClasses =
    "cursor-pointer w-full" +
    "font-semibold text-lg leading-normal text-center" +
    " text-light-mid flex-1 px-6 py-4 md:px-2 md:py-1.5 md:text-base";

  return (
    <div className="border border-solid border-[#2b2b2b] w-full rounded-md">
      <div className={``}>
        <ul className="sendTabs flex flex-wrap mb-4 border-b border-solid border-[#2b2b2b]">
          <TabItem
            id="Send"
            title={"Send"}
            activeTab={activeTab}
            className={`${tabItemClasses} border-r border-solid border-[#2b2b2b] rounded-tl-md`}
            setActiveTab={setActiveTab}
          />
          <TabItem
            id="SendIbc"
            title={"SendIbc"}
            activeTab={activeTab}
            className={`${tabItemClasses} rounded-tr-md`}
            setActiveTab={setActiveTab}
          />
        </ul>
        <div>
          <TabContent
            id="Send"
            activeTab={activeTab}
            className="p-6 md:p-4 rounded-md"
          >
            <Send />
          </TabContent>
          <TabContent
            id="SendIbc"
            activeTab={activeTab}
            className="p-6 md:p-4 bg-tabContent rounded-md"
          >
            <p>send ibc</p>
          </TabContent>
        </div>
      </div>
    </div>
  );
};

export default TxnTabs;
