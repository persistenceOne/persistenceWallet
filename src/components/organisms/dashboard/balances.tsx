import React from "react";
import { useAppStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/router";
import { Icon } from "../../atoms/icon";
import { toDec } from "../../../helpers/coin";

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
  const router = useRouter();

  const handleRoute = (value: string) => {
    router.push({ pathname: "/staking", query: { name: value } });
  };

  const styles =
    "flex items-center justify-between py-3 px-6 hover:bg-black-600";
  return (
    <div className="bg-black-500 w-full rounded-md">
      <div className="px-6 py-4 border-b border-solid border-[#2b2b2b]">
        <p className="text-light-emphasis">Wallet balances</p>
      </div>
      <div className="py-4">
        <div className={`${styles}`}>
          <p className="text-light-emphasis">Current Token Price</p>
          <p className="text-light-emphasis">${xprtPrice.toFixed(6)}</p>
        </div>
        <div className={`${styles}`}>
          <p className="text-light-emphasis">Delegatable</p>
          <p className="text-light-emphasis">
            {balances.totalXprt.toString()} XPRT
          </p>
        </div>
        <div className={`${styles}`}>
          <p className="text-light-emphasis">Transferable</p>
          <p className="text-light-emphasis">
            {balances.transferableAmount.toString()}
          </p>
        </div>
        <div className={`${styles}`}>
          <p className="text-light-emphasis">Vesting</p>
          <p className="text-light-emphasis">
            {balances.vestingAmount.toString()}
          </p>
        </div>
        <div
          className={`${styles} group cursor-pointer`}
          onClick={() => {
            handleRoute("delegated");
          }}
        >
          <p className="text-light-emphasis">Delegated</p>
          <div className={"flex items-center"}>
            <p className="text-light-emphasis">
              {validatorsInfo.totalDelegatedAmount.toString()}
            </p>
            <span
              className="max-w-[0px] transition-all ease-out duration-300 overflow-hidden group-hover:ease-in-out
             group-hover:transition-all group-hover:duration-300 group-hover:max-w-[30px] group-hover:w-auto group-hover:px-2"
            >
              <Icon
                iconName={"right-arrow"}
                viewClass={"fill-[#f5f5f5] w-[20px]"}
              />
            </span>
          </div>
        </div>
        <div
          className={`${styles} group cursor-pointer`}
          onClick={() => {
            handleRoute("unbond");
          }}
        >
          <p className="text-light-emphasis">Unbonding</p>
          <div className={"flex items-center"}>
            <p className="text-light-emphasis cursor-pointer underline">
              {unBondingInfo.totalAmount.toString()}
            </p>
            <span
              className="max-w-[0px] transition-all ease-out duration-300 overflow-hidden group-hover:ease-in-out
             group-hover:transition-all group-hover:duration-300 group-hover:max-w-[30px] group-hover:w-auto group-hover:px-2"
            >
              <Icon
                iconName={"right-arrow"}
                viewClass={"fill-[#f5f5f5] w-[20px]"}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balances;
