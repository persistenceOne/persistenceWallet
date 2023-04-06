import React from "react";
import Balances from "./balances";
import Send from "./send";

const DashboardContainer = () => {
  return (
    <div className="flex max-h-full w-full shrink grow items-start justify-start gap-4 overflow-auto p-8">
      <div
        className="flex w-full flex-col items-center justify-start rounded-lg border border-gray-100 bg-gray-50
        dark:border-gray-900 dark:bg-gray-950 -lg:w-[calc((100%-32px)*0.58)]"
      >
        <Send />
      </div>
      <div
        className="flex max-h-full w-full flex-col items-center justify-start rounded-lg
        border border-gray-100 bg-gray-50 dark:border-gray-900 dark:bg-gray-950 -lg:w-[calc((100%-32px)*0.42)]"
      >
        <Balances />
      </div>
    </div>
  );
};

export default DashboardContainer;
