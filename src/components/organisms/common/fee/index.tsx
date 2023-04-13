import React, { useEffect, useState } from "react";
import Gas from "./gas";
import { useAppStore } from "../../../../../store/store";
import { shallow } from "zustand/shallow";
import { FeeInfo } from "../../../../helpers/config";
import { defaultChain } from "../../../../helpers/utils";
import { FeeType } from "../../../../../store/slices/transactions";
import { getDecimalize, toDec } from "../../../../helpers/coin";

interface Props {
  amount: string;
}

const FeeOptions = ({ amount }: Props) => {
  const [error, setError] = useState("");
  const handleTxnFeeModal = useAppStore((state) => state.handleTxnFeeModal);
  const handleTxnFeeValue = useAppStore((state) => state.handleTxnFeeValue);

  const [fee, gas, totalXprt, transactionInfo] = useAppStore(
    (state) => [
      state.transactions.feeInfo.fee,
      state.transactions.gas.gas,
      state.wallet.balances.totalXprt,
      state.transactions.transactionInfo,
    ],
    shallow
  );

  useEffect(() => {
    feeHandler(FeeInfo.averageFee, "average");
  }, [gas]);

  const feeHandler = (feeValue: any, feeType: FeeType) => {
    const feeV = toDec(feeValue.toString()).mul(toDec(gas!.toString()));
    handleTxnFeeValue({
      value: feeV.toString(),
      type: feeType,
    });
    if (
      feeV.lte(totalXprt.toDec()) &&
      (transactionInfo.name === "send" ||
        transactionInfo.name === "delegate") &&
      feeV.lte(totalXprt.toDec().sub(toDec(amount.toString())))
    ) {
      setError("Insufficient wallet balance to process the transaction");
    }
  };

  return (
    <div className="">
      <p className="mb-1 text-light-white-500">Fee</p>
      <div className="flex items-center justify-center">
        <div
          className={`p-4 flex-1 text-center  cursor-pointer shadow-lg rounded-md ${
            fee.type === "low" ? "bg-black-600" : "bg-black-700"
          }`}
          onClick={() => {
            feeHandler(FeeInfo.lowFee, "low");
          }}
        >
          <p className="text-sm text-light-mid ">Low</p>
          <p className="text-sm text-light-mid ">0($0)</p>
        </div>
        <div
          className={`p-4 flex-1 text-center  cursor-pointer shadow-lg mx-4 rounded-md ${
            fee.type === "average" ? "bg-black-600" : "bg-black-700"
          }`}
          onClick={() => {
            feeHandler(FeeInfo.averageFee, "average");
          }}
        >
          <p className="text-sm text-light-mid ">Avg</p>
          <p className="text-sm text-light-mid ">
            {Number(
              getDecimalize(
                (FeeInfo.averageFee * Number(gas)).toString(),
                defaultChain.currency.coinDecimals
              ).toString()
            ).toFixed(6)}{" "}
            {defaultChain.currency.coinDenom}
            ($4.5)
          </p>
        </div>
        <div
          className={`p-4 flex-1 text-center  cursor-pointer shadow-lg rounded-md ${
            fee.type === "high" ? "bg-black-600" : "bg-black-700"
          }`}
          onClick={() => {
            feeHandler(FeeInfo.highFee, "high");
          }}
        >
          <p className="text-sm text-light-mid ">High</p>
          <p className="text-sm text-light-mid ">
            {Number(
              getDecimalize(
                (FeeInfo.highFee * Number(gas)).toString(),
                defaultChain.currency.coinDecimals
              ).toString()
            ).toFixed(6)}{" "}
            {defaultChain.currency.coinDenom}
            ($10)
          </p>
        </div>
      </div>
      <Gas />
      <p>{error}</p>
    </div>
  );
};

export default FeeOptions;
