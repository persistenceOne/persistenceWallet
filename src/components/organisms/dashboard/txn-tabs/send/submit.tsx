import React from "react";
import Button from "../../../../atoms/button";
import { useAppStore } from "../../../../../../store/store";
import { Dec } from "@keplr-wallet/unit";
import { defaultChain } from "../../../../../helpers/utils";
import {
  getDecimalize,
  getUnDecimalize,
  toDec,
} from "../../../../../helpers/coin";
import { sendMsg } from "../../../../../helpers/protoMsg";
import { shallow } from "zustand/shallow";
import { Spinner } from "../../../../atoms/spinner";

const Submit = () => {
  const handleDecryptKeystoreModal = useAppStore(
    (state) => state.handleDecryptKeystoreModal
  );
  const setTxnMsgs = useAppStore((state) => state.setTxnMsgs);
  const [
    balances,
    token,
    amount,
    fee,
    accountDetails,
    recipient,
    transactionInfo,
  ] = useAppStore(
    (state) => [
      state.wallet.balances,
      state.transactions.send.token,
      state.transactions.send.amount,
      state.transactions.feeInfo.fee,
      state.wallet.accountDetails,
      state.transactions.send.recipient,
      state.transactions.transactionInfo,
    ],
    shallow
  );

  const handleSubmit = () => {
    const msg = sendMsg(
      accountDetails!.address!,
      recipient,
      getUnDecimalize(amount.toString(), 6).truncate().toString(),
      token!.minimalDenom!
    );
    setTxnMsgs([msg]);
    handleDecryptKeystoreModal(true);
  };

  console.log(
    balances.totalXprt.toDec().gt(new Dec("0")),
    balances.totalXprt
      .toDec()
      .gte(
        getDecimalize(
          fee.value!.toString(),
          defaultChain.currency.coinDecimals
        ).add(toDec(amount.toString()))
      ),
    toDec(amount.toString()).lte(toDec(token!.amount.toString()))
  );
  const enable =
    recipient !== "" &&
    balances.totalXprt.toDec().gt(new Dec("0")) &&
    toDec(amount.toString()).gt(new Dec("0")) &&
    (token!.minimalDenom === defaultChain.currency.coinMinimalDenom
      ? balances.totalXprt
          .toDec()
          .gte(
            getDecimalize(
              fee.value!.toString(),
              defaultChain.currency.coinDecimals
            ).add(toDec(amount.toString()))
          )
      : balances.totalXprt
          .toDec()
          .gte(
            getDecimalize(
              fee.value!.toString(),
              defaultChain.currency.coinDecimals
            )
          ) && toDec(amount.toString()).lte(toDec(token!.amount.toString())));

  return (
    <div className="pt-6">
      <Button
        className="button md:text-sm flex items-center
            justify-center w-[250px] mx-auto mb-4"
        type="primary"
        size="medium"
        disabled={
          !enable ||
          (transactionInfo.name === "send" && transactionInfo.inProgress)
        }
        content={
          transactionInfo.name === "send" && transactionInfo.inProgress ? (
            <Spinner size={"medium"} />
          ) : (
            "Send"
          )
        }
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Submit;
