import React, { useState } from "react";
import TabItem from "../../../molecules/tabs/tabItem";
import TabContent from "../../../molecules/tabs/tabContent";
import Send from "./send";
import SendIbc from "./send-ibc";

const TxnTabs = () => {
  const [activeTab, setActiveTab] = useState("Send");
  const tabItemClasses =
    "cursor-pointer w-full" +
    "font-semibold text-lg leading-normal text-center" +
    " text-light-mid flex-1 p-2 md:text-base";

  return (
    <div className="[#2b2b2b] w-full rounded-md">
      <div className={``}>
        <ul className="sendTabs flex flex-wrap p-3 bg-black-500 rounded-full mb-4">
          <TabItem
            id="Send"
            title={"Send"}
            activeTab={activeTab}
            className={`${tabItemClasses} rounded-full`}
            setActiveTab={setActiveTab}
          />
          <TabItem
            id="SendIbc"
            title={"SendIbc"}
            activeTab={activeTab}
            className={`${tabItemClasses} rounded-full`}
            setActiveTab={setActiveTab}
          />
        </ul>
        <div>
          <TabContent
            id="Send"
            activeTab={activeTab}
            className="p-6 md:p-4 rounded-md bg-black-500"
          >
            <Send />
          </TabContent>
          <TabContent
            id="SendIbc"
            activeTab={activeTab}
            className="p-6 md:p-4 bg-black-800 bg-black-500"
          >
            <SendIbc />
          </TabContent>
        </div>
      </div>
    </div>
  );
};

export default TxnTabs;
