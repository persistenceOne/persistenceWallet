import React, { useState } from "react";
import InputText from "../../../atoms/input";
import { Icon } from "../../../atoms/icon";
import { useAppStore } from "../../../../../store/store";

const Gas = () => {
  const handleTxnGasStatus = useAppStore((state) => state.handleTxnGasStatus);
  const handleTxnGasValue = useAppStore((state) => state.handleTxnGasValue);

  const gas = useAppStore((state) => state.transactions.gas);

  const handleAccordion = () => {
    handleTxnGasStatus(!gas.active);
  };

  const handleGas = (e: any) => {
    handleTxnGasValue(e.target.value);
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        className="flex justify-end items-center ml-auto"
        onClick={handleAccordion}
      >
        <span className="mr-2 text-light-white-500 underline">Advanced</span>
        {/*{gas.active ? (*/}
        {/*  <Icon viewClass="arrow-right" iconName="up-arrow" />*/}
        {/*) : (*/}
        {/*  <Icon viewClass="arrow-right" iconName="down-arrow" />*/}
        {/*)}*/}
      </button>
      <div
        className={`${
          gas.active ? "active" : ""
        } collapseMenu ease-in overflow-hidden relative`}
      >
        <div className="mb-2">
          <p className="mb-1 text-light-white-500">Gas</p>
          <InputText
            type="number"
            placeholder="0"
            disable={false}
            required={true}
            onChange={handleGas}
            name="gas"
            value={gas.gas.toString()}
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
