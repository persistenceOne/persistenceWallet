import React from "react";
import { useAppStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";

const Balances = () => {
  const [balances, validatorsInfo, unBondingInfo, xprtPrice] = useAppStore(
    (state) => [
      state.wallet.balances,
      state.wallet.validatorsInfo,
      state.wallet.unBondingInfo,
      state.initialData.xprtPrice,
    ],
    shallow
  );
  return (
    <div className="bg-black-500 w-full rounded-md">
      <div className="px-6 py-4 border-b border-solid border-[#2b2b2b]">
        <p className="text-light-emphasis">Wallet balances</p>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between py-2">
          <p className="text-light-emphasis">Current Token Price</p>
          <p className="text-light-emphasis">${xprtPrice.toFixed(6)}</p>
        </div>
        <div className="flex items-center justify-between py-2">
          <p className="text-light-emphasis">Delegatable</p>
          <p className="text-light-emphasis">
            {balances.totalXprt.toString()} XPRT
          </p>
        </div>
        <div className="flex items-center justify-between py-2">
          <p className="text-light-emphasis">Transferable</p>
          <p className="text-light-emphasis">
            {balances.transferableAmount.toString()}
          </p>
        </div>
        <div className="flex items-center justify-between py-2">
          <p className="text-light-emphasis">Vesting</p>
          <p className="text-light-emphasis">
            {balances.vestingAmount.toString()}
          </p>
        </div>
        <div className="flex items-center justify-between py-2">
          <p className="text-light-emphasis">Delegated</p>
          <p className="text-light-emphasis">
            {validatorsInfo.totalDelegatedAmount.toString()}
          </p>
        </div>
        <div className="flex items-center justify-between py-2">
          <p className="text-light-emphasis">Unbonding</p>
          <p className="text-light-emphasis">
            {unBondingInfo.totalAmount.toString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Balances;
