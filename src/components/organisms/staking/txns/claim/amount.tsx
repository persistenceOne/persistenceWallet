import React from "react";
import { useAppStore } from "../../../../../../store/store";
import { shallow } from "zustand/shallow";
import InputText from "../../../../atoms/input";
import { CoinPretty } from "@keplr-wallet/unit";
import { getDecimalize } from "../../../../../helpers/coin";

const Amount = () => {
  const [amount, available] = useAppStore(
    (state) => [
      state.transactions.delegate.amount,
      state.wallet.balances.totalXprt,
    ],
    shallow
  );

  const handleDelegateTxnAmount = useAppStore(
    (state) => state.handleDelegateTxnAmount
  );

  const handleAmount = (evt: any) => {
    let rex = /^\d{0,10}(\.\d{0,6})?$/;
    if (rex.test(evt.target.value)) {
      handleDelegateTxnAmount(evt.target.value);
    } else {
      return false;
    }
  };

  const maxHandler = (value: string) => {
    handleDelegateTxnAmount(value);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1 ">
        <p className="text-light-white-500">Amount</p>
        <p
          className="text-light-white-500 cursor-pointer underline"
          onClick={() => maxHandler(available.toString())}
        >
          Available:
          {available.toString()}
        </p>
      </div>
      <InputText
        type="text"
        placeholder="0.0"
        disable={false}
        required={true}
        onChange={handleAmount}
        value={amount.toString()}
        name="account"
        className={`w-full rounded-md`}
      />
    </div>
  );
};

export default Amount;
