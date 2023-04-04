import React, { useState } from "react";
import InputText from "../../../atoms/input";
import { Icon } from "../../../atoms/icon";
import { useAppStore } from "../../../../../store/store";

const AdvancedOptions = () => {
  const handleWalletAccountIndex = useAppStore(
    (state) => state.handleWalletAccountIndex
  );
  const handleWalletAccountNumber = useAppStore(
    (state) => state.handleWalletAccountNumber
  );
  const handleWalletAccountPassPhrase = useAppStore(
    (state) => state.handleWalletAccountPassPhrase
  );
  const [activeKey, setActiveKey] = useState<boolean>(false);
  const handleAccordion = () => {
    setActiveKey(!activeKey);
  };

  const handleAccountNumber = (e: any) => {
    handleWalletAccountNumber(e.target.value);
  };

  const handleAccountIndex = (e: any) => {
    handleWalletAccountIndex(e.target.value);
  };

  const handleAccountPassPhrase = (e: any) => {
    handleWalletAccountPassPhrase(e.target.value);
  };

  return (
    <div>
      <button
        type="button"
        className="flex justify-center items-center mx-auto"
        onClick={handleAccordion}
      >
        <span className="mr-2">Advanced</span>
        {activeKey ? (
          <Icon viewClass="arrow-right" iconName="up-arrow" />
        ) : (
          <Icon viewClass="arrow-right" iconName="down-arrow" />
        )}
      </button>
      <div
        className={`${
          activeKey ? "active" : ""
        } collapseMenu ease-in overflow-hidden relative`}
      >
        <div className="mb-2">
          <p className="mb-1">Account Number</p>
          <InputText
            type="number"
            placeholder="Account Number"
            disable={false}
            required={true}
            onChange={handleAccountNumber}
            name="account"
            className={`border-0
             p-2 text-dark-high leading-normal 
             box-shadow-none font-normal focus:border-0 
             focus:box-shadow-none placeholder:text-light-mid placeholder:leading-normal 
             placeholder:font-normal outline-none w-full rounded-md`}
          />
        </div>
        <div className="mb-2">
          <p className="mb-1">Account Index</p>
          <InputText
            type="number"
            placeholder="Account Index"
            disable={false}
            required={true}
            onChange={handleAccountIndex}
            name="account"
            className={`border-0
             p-2 text-dark-high leading-normal 
             box-shadow-none font-normal focus:border-0 
             focus:box-shadow-none placeholder:text-light-mid placeholder:leading-normal 
             placeholder:font-normal outline-none w-full rounded-md`}
          />
        </div>
        <div className="mb-2">
          <p className="mb-1">bip39Passphrase</p>
          <InputText
            type="text"
            placeholder="bip39Passphrase"
            disable={false}
            required={true}
            name="account"
            onChange={handleAccountPassPhrase}
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

export default AdvancedOptions;
