import React, { useState } from "react";
import { useAppStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/router";
import { Icon } from "../../atoms/icon";
import { delegateMsg, withdrawMsg } from "../../../helpers/protoMsg";
import { RewardsList } from "../../../helpers/types";

const Balances = () => {
  const [
    balances,
    validatorsInfo,
    unBondingInfo,
    xprtPrice,
    rewardsInfo,
    accountDetails,
  ] = useAppStore(
    (state) => [
      state.wallet.balances,
      state.wallet.validatorsInfo,
      state.wallet.unBondingInfo,
      state.initialData.xprtPrice,
      state.wallet.rewardsInfo,
      state.wallet.accountDetails,
    ],
    shallow
  );
  const router = useRouter();
  const handleDecryptKeystoreModal = useAppStore(
    (state) => state.handleDecryptKeystoreModal
  );
  const handleClaimTxnModal = useAppStore((state) => state.handleClaimTxnModal);

  const setTxnMsgs = useAppStore((state) => state.setTxnMsgs);

  const handleRoute = (value: string) => {
    router.push({ pathname: "/staking", query: { name: value } });
  };

  const handleClaimAll = () => {
    let messages: any = [];
    rewardsInfo.rewardsList.forEach(async (item: RewardsList) => {
      messages.push(
        withdrawMsg(accountDetails!.address!, item.reward.amount.toString())
      );
    });
    setTxnMsgs(messages);
    handleClaimTxnModal(true);
  };
  const styles =
    "flex items-center justify-between py-3 px-6 hover:bg-black-600";

  return (
    <div className="w-full ">
      <div className="bg-black-500 px-6 py-4 mb-2 rounded-md">
        <p className="text-light-emphasis text-lg">Wallet balances</p>
      </div>

      <div className="py-4 bg-black-500 rounded-md">
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
        <div
          className={`${styles} group cursor-pointer`}
          onClick={() => {
            handleClaimAll();
          }}
        >
          <p className="text-light-emphasis">Delegation Rewards</p>
          <div className={"flex items-center"}>
            <p className="text-light-emphasis cursor-pointer underline">
              {rewardsInfo.totalAmount.toString()}
            </p>
            <span
              className="text-light-emphasis flex items-center max-w-[0px] transition-all ease-out duration-300 overflow-hidden group-hover:ease-in-out
             group-hover:transition-all group-hover:duration-300 group-hover:max-w-[150px] group-hover:w-auto group-hover:px-2 whitespace-nowrap"
            >
              Claim All
              <Icon
                iconName={"right-arrow"}
                viewClass={"fill-[#f5f5f5] w-[20px] ml-1"}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balances;
