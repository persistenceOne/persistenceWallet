import React from "react";
import { TabContentTypes } from "./types";

const TabContent = ({
  activeTab,
  id,
  children,
  className
}: TabContentTypes) => {
  return activeTab === id ? (
    <div className={`${className} tabContent`}>{children}</div>
  ) : null;
};

export default TabContent;
