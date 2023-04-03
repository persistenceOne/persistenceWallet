import React, { useState } from "react";
import TabItem from "./tabItem";
import TabContent from "./tabContent";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div>
      <ul
        className="flex flex-wrap -mb-px text-sm font-medium text-center"
        data-tabs-toggle="#myTabContent"
        role="tablist"
      >
        <TabItem
          id="tab1"
          title={"tab1"}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabItem
          id="tab2"
          title={"tab2"}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>
      <div>
        <TabContent id="tab1" activeTab={activeTab}>
          <p>Tab 1 works!</p>
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <p>Tab 2 works!</p>
        </TabContent>
      </div>
    </div>
  );
};

export default Tabs;
