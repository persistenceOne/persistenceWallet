import React, { ChangeEvent, useState } from "react";
import InputText from "../../../atoms/input";
import { Icon } from "../../../atoms/icon";
import { useAppStore } from "../../../../../store/store";
import { MAX_ACCOUNT_NUMBER } from "../../../../../appConstants";

const AdvancedOptions = () => {
  const [error, setError] = useState("");
  const handleWalletAccountIndex = useAppStore(
    (state) => state.handleWalletAccountIndex
  );
  const handleWalletAdvanceMode = useAppStore(
    (state) => state.handleWalletAdvanceMode
  );
  const handleWalletAccountNumber = useAppStore(
    (state) => state.handleWalletAccountNumber
  );
  const handleWalletAccountPassPhrase = useAppStore(
    (state) => state.handleWalletAccountPassPhrase
  );
  const advancedInfo = useAppStore((state) => state.wallet.advancedInfo.active);
  const handleAccordion = () => {
    handleWalletAdvanceMode(!advancedInfo);
  };

  const handleAccountNumber = (evt: ChangeEvent<HTMLInputElement>) => {
    let rex = /^\d{0,10}(\.\d{0,6})?$/;
    if (
      rex.test(evt.target.value) &&
      Number(evt.target.value) <= MAX_ACCOUNT_NUMBER
    ) {
      handleWalletAccountNumber(evt.target.value);
    } else {
      setError("In-valid account number");
      return false;
    }
  };

  const handleAccountIndex = (evt: any) => {
    let rex = /^\d{0,10}(\.\d{0,6})?$/;
    if (
      rex.test(evt.target.value) &&
      Number(evt.target.value) <= MAX_ACCOUNT_NUMBER
    ) {
      handleWalletAccountIndex(evt.target.value);
    } else {
      setError(
        `In-valid account index(must be less than ${MAX_ACCOUNT_NUMBER} characters)`
      );
      return false;
    }
  };

  const handleAccountPassPhrase = (evt: any) => {
    if (evt.target.value.length <= 50) {
      handleWalletAccountPassPhrase(evt.target.value);
    } else {
      setError("In-valid PassPhrase(must be less than 50 characters)");
      return false;
    }
  };

  return (
    <div>
      <button
        type="button"
        className="flex justify-center items-center mx-auto"
        onClick={handleAccordion}
      >
        <span
          className={`${
            advancedInfo ? "text-light-emphasis" : "text-light-mid"
          }  mr-2`}
        >
          Advanced
        </span>
        <Icon
          viewClass={`${
            advancedInfo ? "rotate-180 !fill-[#ECECEC]" : ""
          } arrow-right !w-[14px] !h-[14px]`}
          iconName="down-arrow"
        />
      </button>
      <div
        className={`${
          advancedInfo ? "active" : ""
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
      <p className="text-sm text-red text-center mb-4 md:mb-3 md:text-sm">
        {error}
      </p>
    </div>
  );
};

export default AdvancedOptions;
