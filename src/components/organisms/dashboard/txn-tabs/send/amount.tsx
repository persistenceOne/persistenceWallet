import React from "react";
import InputText from "../../../../atoms/input";
import { useAppStore } from "../../../../../../store/store";
import { CoinPretty } from "@keplr-wallet/unit";
import { getDecimalize } from "../../../../../helpers/coin";

const Amount = () => {
  const [balances, token, amount] = useAppStore((state) => [
    state.wallet.balances,
    state.transactions.send.token,
    state.transactions.send.amount,
  ]);
  const handleSendTxnAmount = useAppStore((state) => state.handleSendTxnAmount);
  const handleAmount = (evt: any) => {
    let rex = /^\d{0,10}(\.\d{0,6})?$/;
    if (rex.test(evt.target.value)) {
      handleSendTxnAmount(evt.target.value);
    } else {
      return false;
    }
  };

  const maxHandler = (value: string) => {
    handleSendTxnAmount(value);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1 ">
        <p className="text-light-white-500">Amount</p>
        <p
          className="text-light-white-500 cursor-pointer underline"
          onClick={() =>
            maxHandler(
              token
                ? token!.amount instanceof CoinPretty
                  ? token!.amount.toString()
                  : getDecimalize(token!.amount.toString(), 6).toString()
                : "0"
            )
          }
        >
          Available:
          {token
            ? token!.amount instanceof CoinPretty
              ? token!.amount.toString()
              : getDecimalize(token!.amount.toString(), 6).truncate().toString()
            : 0}
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
