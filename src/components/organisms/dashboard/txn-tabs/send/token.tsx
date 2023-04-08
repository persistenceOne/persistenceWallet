import React, { useState } from "react";
import Dropdown from "../../../../molecules/dropdown";
import { useAppStore } from "../../../../../../store/store";
import { Coin } from "@cosmjs/launchpad";

const Token = () => {
  const [show, setShow] = useState<boolean>(false);
  const [balances] = useAppStore((state) => [state.wallet.balances]);

  const [activeItem, setActiveItem] = useState<string>("XPRT");

  const dropCloseDownHandler = (value: boolean) => {
    setShow(value);
  };

  const sd = balances.totalXprt.currency;
  console.log(sd, "sd");
  const dropDownHandler = (item: any) => {
    setActiveItem(item);
  };

  return (
    <div className="mb-4">
      <p className="mb-1 text-light-white-500">Token</p>
      <Dropdown
        className="text-light-high w-full"
        dropDownVariant="custom"
        closeDropdown={show}
        closeHandler={(value) => dropCloseDownHandler(value)}
        dropdownLabel={
          <span className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm md:ml-2 capitalize">
            {activeItem}
          </span>
        }
        dropDownButtonClass="cursor-pointer py-3 px-4 bg-black-600 justify-between text-[12px] text-light-emphasis rounded-md"
        dropdownType={"click"}
        staticBackDrop={false}
        dropDownIcon={true}
        dropDownContentClass="!bg-[#282828] drop-shadow-md round-md
                       py-1 md:p-0"
      >
        {balances.allBalances.map((item: Coin, index: number): any =>
          item.denom !== activeItem ? (
            <div key={index}>
              <div
                className="px-4 py-2 flex items-center md:py-3
                        hover:cursor-pointer hover:bg-[#383838] text-dark-high whitespace-nowrap"
                key={1}
                onClick={() => {}}
              >
                <div className="flex items-center">
                  <span className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm md:ml-2">
                    {item.denom}
                  </span>
                </div>
              </div>
            </div>
          ) : null
        )}
      </Dropdown>
    </div>
  );
};

export default Token;
