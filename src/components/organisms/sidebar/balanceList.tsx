import React from "react";
import Styles from "./styles.module.css";
import Tooltip from "rc-tooltip";
import { Icon } from "../../atoms/icon";
import { truncateToFixedDecimalPlaces } from "../../../helpers/utils";

const BalanceList = () => {
  const balance = 1;
  const ethPrice = 1;
  const network = ""

  return (
    <>
      <div className={`${Styles.balanceList} px-6 py-5`}>
        <h2 className="text-light-emphasis text-base flex items-center font-semibold leading-normal mb-4">
          Balances
          <Tooltip
            placement="bottom"
            overlay={
              <span>
                Showing assets on <br />
                <span className="capitalize">{network}</span> network
              </span>
            }
          >
            <button className="icon-button px-1">
              <Icon viewClass="arrow-right" iconName="info" />
            </button>
          </Tooltip>
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={"/images/logos/stkEth.svg"}
              width={22}
              height={22}
              alt="stkEth"
            />
            <span className="text-light-mid text-sm leading-5 ml-2.5">
              stkETH
            </span>
          </div>
          <p
            className="text-light-mid text-sm font-medium leading-5"
            title={`$${truncateToFixedDecimalPlaces(
              ethPrice * Number(balance),
              3
            )}`}
          >
            {truncateToFixedDecimalPlaces(balance, 6)}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <img
              src={"/images/logos/eth.svg"}
              width={22}
              height={22}
              alt="eth"
            />
            <span className="text-light-mid text-sm leading-5 ml-2.5">ETH</span>
          </div>
          <p className="text-light-mid text-sm font-medium leading-5">
            {truncateToFixedDecimalPlaces(balance, 6)}
          </p>
        </div>
      </div>
    </>
  );
};

export default BalanceList;
