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
import { delegateMsg, unBondMsg } from "../../../../../helpers/protoMsg";
import { shallow } from "zustand/shallow";
import { Spinner } from "../../../../atoms/spinner";

const Submit = () => {
  const handleDecryptKeystoreModal = useAppStore(
    (state) => state.handleDecryptKeystoreModal
  );
  const handleUnDelegateTxnModal = useAppStore(
    (state) => state.handleUnDelegateTxnModal
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
      state.transactions.unbond.amount,
      state.transactions.staking.selectedValidator,
      state.transactions.feeInfo.fee,
      state.wallet.accountDetails,
      state.transactions.transactionInfo,
    ],
    shallow
  );

  const handleSubmit = () => {
    const msg = unBondMsg(
      accountDetails!.address!,
      selectedValidator!.validatorAddress,
      getUnDecimalize(amount.toString(), 6).truncate().toString(),
      defaultChain.currency.coinMinimalDenom
    );
    setTxnMsgs([msg]);
    handleDecryptKeystoreModal(true);
    handleUnDelegateTxnModal(false);
  };

  console.log(
    toDec(amount.toString()).gt(new Dec("0")),
    balances.totalXprt.toDec().gt(new Dec("0")),
    balances.totalXprt
      .toDec()
      .gte(
        getDecimalize(
          fee.value!.toString(),
          defaultChain.currency.coinDecimals
        ).add(toDec(amount.toString()))
      ),
    "console",
    fee.value!.toString()
  );
  const enable =
    toDec(amount.toString()).gt(new Dec("0")) &&
    balances.totalXprt
      .toDec()
      .gte(
        getDecimalize(fee.value!.toString(), defaultChain.currency.coinDecimals)
      );

  return (
    <div className="pt-6">
      <Button
        className="button md:text-sm flex items-center
            justify-center w-[250px] mx-auto mb-4"
        type="primary"
        size="medium"
        disabled={
          !enable ||
          (transactionInfo.name === "un-delegate" && transactionInfo.inProgress)
        }
        content={
          transactionInfo.name === "un-delegate" &&
          transactionInfo.inProgress ? (
            <Spinner size={"medium"} />
          ) : (
            "Unbond"
          )
        }
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Submit;
