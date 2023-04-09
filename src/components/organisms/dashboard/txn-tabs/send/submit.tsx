import React from "react";
import Button from "../../../../atoms/button";
import { useAppStore } from "../../../../../../store/store";
import { Dec } from "@keplr-wallet/unit";
import { DefaultChainInfo } from "../../../../../helpers/config";
import { getDecimalize, toDec } from "../../../../../helpers/coin";

const Submit = () => {
  const [balances, token, amount, fee] = useAppStore((state) => [
    state.wallet.balances,
    state.transactions.send.token,
    state.transactions.send.amount,
    state.transactions.feeInfo.fee,
  ]);
  console.log("test enable", fee.value!.toString());
  const enable =
    balances.totalXprt.toDec().gt(new Dec("0")) &&
    (token!.denom === DefaultChainInfo.currency.coinDenom
      ? balances.totalXprt
          .toDec()
          .gte(
            getDecimalize(
              fee.value!.toString(),
              DefaultChainInfo.currency.coinDecimals
            ).add(toDec(amount.toString()))
          )
      : balances.totalXprt
          .toDec()
          .gte(
            getDecimalize(
              fee.value!.toString(),
              DefaultChainInfo.currency.coinDecimals
            )
          ) && toDec(amount.toString()).lte(toDec(token!.amount.toString())));

  return (
    <div className="pt-6">
      <Button
        className="button md:text-sm flex items-center
            justify-center w-[250px] mx-auto mb-4"
        type="primary"
        size="medium"
        disabled={!enable}
        content="Send"
        onClick={() => {}}
      />
    </div>
  );
};

export default Submit;
