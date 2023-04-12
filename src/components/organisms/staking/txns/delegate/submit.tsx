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
    amount,
    selectedValidator,
    fee,
    accountDetails,
    transactionInfo,
  ] = useAppStore(
    (state) => [
      state.wallet.balances,
      state.transactions.delegate.amount,
      state.transactions.staking.selectedValidator,
      state.transactions.feeInfo.fee,
      state.wallet.accountDetails,
      state.transactions.transactionInfo,
    ],
    shallow
  );

  const handleSubmit = () => {
    const msg = sendMsg(
      accountDetails!.address!,
      selectedValidator!.validatorAddress,
      getUnDecimalize(amount.toString(), 6).truncate().toString(),
      defaultChain.currency.coinMinimalDenom
    );
    setTxnMsgs([msg]);
    handleDecryptKeystoreModal(true);
  };

  console.log(
    balances.totalXprt.toDec().gt(new Dec("0")),
    toDec(amount.toString()).lte(toDec(balances.totalXprt.toString())),
    "test"
  );
  const enable =
    toDec(amount.toString()).gt(new Dec("0")) &&
    balances.totalXprt.toDec().gt(new Dec("0")) &&
    balances.totalXprt
      .toDec()
      .gte(
        getDecimalize(
          fee.value!.toString(),
          defaultChain.currency.coinDecimals
        ).add(toDec(amount.toString()))
      ) &&
    toDec(amount.toString()).lte(toDec(balances.totalXprt.toString()));

  return (
    <div className="pt-6">
      <Button
        className="button md:text-sm flex items-center
            justify-center w-[250px] mx-auto mb-4"
        type="primary"
        size="medium"
        disabled={
          !enable ||
          (transactionInfo.name === "delegate" && transactionInfo.inProgress)
        }
        content={
          transactionInfo.name === "delegate" && transactionInfo.inProgress ? (
            <Spinner size={"medium"} />
          ) : (
            "Delegate"
          )
        }
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Submit;
