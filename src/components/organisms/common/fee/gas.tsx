import React, { useState } from "react";
import InputText from "../../../atoms/input";
import { Icon } from "../../../atoms/icon";
import { useAppStore } from "../../../../../store/store";

const Gas = () => {
  const handleWalletAdvanceMode = useAppStore(
    (state) => state.handleWalletAdvanceMode
  );
  const handleWalletAccountNumber = useAppStore(
    (state) => state.handleWalletAccountNumber
  );

  const advancedInfo = useAppStore((state) => state.wallet.advancedInfo.active);
  const handleAccordion = () => {
    handleWalletAdvanceMode(!advancedInfo);
  };

  const handleAccountNumber = (e: any) => {
    handleWalletAccountNumber(e.target.value);
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        className="flex justify-center items-center mx-auto"
        onClick={handleAccordion}
      >
        <span className="mr-2">Advanced</span>
        {advancedInfo ? (
          <Icon viewClass="arrow-right" iconName="up-arrow" />
        ) : (
          <Icon viewClass="arrow-right" iconName="down-arrow" />
        )}
      </button>
      <div
        className={`${
          advancedInfo ? "active" : ""
        } collapseMenu ease-in overflow-hidden relative`}
      >
        <div className="mb-2">
          <p className="mb-1">Gas</p>
          <InputText
            type="number"
            placeholder="0"
            disable={false}
            required={true}
            onChange={handleAccountNumber}
            name="gas"
            className={`border-0
             p-2 text-dark-high leading-normal 
             box-shadow-none font-normal focus:border-0 
             focus:box-shadow-none placeholder:text-light-mid placeholder:leading-normal 
             placeholder:font-normal outline-none w-full rounded-md`}
          />
        </div>
      </div>
    </div>
  );
};

export default Gas;
