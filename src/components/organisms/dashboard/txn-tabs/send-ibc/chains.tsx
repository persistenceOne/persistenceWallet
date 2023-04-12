import React, { useEffect, useState } from "react";
import Dropdown from "../../../../molecules/dropdown";
import { useAppStore } from "../../../../../../store/store";
import { BalanceList } from "../../../../../helpers/types";
import { ibcChainInfo, stringTruncate } from "../../../../../helpers/utils";
import { getDecimalize } from "../../../../../helpers/coin";
import { CoinPretty } from "@keplr-wallet/unit";
import { Spinner } from "../../../../atoms/spinner";
import { shallow } from "zustand/shallow";

const Chains = () => {
  const [show, setShow] = useState<boolean>(false);

  const [token, chain] = useAppStore(
    (state) => [
      state.transactions.sendIbc.token,
      state.transactions.sendIbc.chain,
    ],
    shallow
  );

  const handleSendIbcTxnChain = useAppStore(
    (state) => state.handleSendIbcTxnChain
  );

  const dropCloseDownHandler = (value: boolean) => {
    setShow(value);
  };

  const dropDownHandler = (item: any) => {
    handleSendIbcTxnChain(item);
    setShow(false);
  };

  return (
    <div className="mb-4">
      <p className="mb-1 text-light-white-500">Chain</p>
      <Dropdown
        className="text-light-high w-full"
        dropDownVariant="custom"
        closeDropdown={show}
        closeHandler={(value) => dropCloseDownHandler(value)}
        dropdownLabel={
          token ? (
            <div className="flex items-center">
              <span className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm md:ml-2">
                {chain!.chainName} ({chain!.sourceChannelId} / {chain!.portID})
              </span>
            </div>
          ) : (
            <Spinner size={"small"} />
          )
        }
        dropDownButtonClass="cursor-pointer py-3 px-4 bg-black-600 justify-between text-[12px] text-light-emphasis rounded-md"
        dropdownType={"click"}
        staticBackDrop={false}
        dropDownIcon={true}
        dropDownContentClass="!bg-[#282828] drop-shadow-md round-md
                       py-1 md:p-0"
      >
        {ibcChainInfo.map((channel, index) =>
          channel.chainName !== chain!.chainName ? (
            <div key={index}>
              <div
                className="px-4 py-2 flex items-center md:py-3
                        hover:cursor-pointer hover:bg-[#383838] text-dark-high whitespace-nowrap"
                key={1}
                onClick={() => {
                  dropDownHandler(channel);
                }}
              >
                <div className="flex justify-between w-full">
                  <p className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm md:ml-2">
                    {channel.chainName} ({channel.sourceChannelId} /{" "}
                    {channel.portID})
                  </p>
                </div>
              </div>
            </div>
          ) : null
        )}
      </Dropdown>
    </div>
  );
};

export default Chains;
