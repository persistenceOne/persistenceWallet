import React from "react";
import Button from "../../../../atoms/button";
import { useAppStore } from "../../../../../../store/store";
import { Dec } from "@keplr-wallet/unit";
import { defaultChain } from "../../../../../helpers/utils";
import { getDecimalize, toDec } from "../../../../../helpers/coin";
import {
  validatorCommissionMsg,
  withdrawMsg,
} from "../../../../../helpers/protoMsg";
import { shallow } from "zustand/shallow";
import { Spinner } from "../../../../atoms/spinner";
import { DataState } from "./validators";

interface Props {
  selected: DataState[];
  selectedCommission: boolean;
}

const Submit = ({ selected, selectedCommission }: Props) => {
  const handleDecryptKeystoreModal = useAppStore(
    (state) => state.handleDecryptKeystoreModal
  );

  const handleClaimTxnModal = useAppStore((state) => state.handleClaimTxnModal);
  const setTxnMsgs = useAppStore((state) => state.setTxnMsgs);
  const [balances, amount, fee, accountDetails, transactionInfo, commission] =
    useAppStore(
      (state) => [
        state.wallet.balances,
        state.transactions.delegate.amount,
        state.transactions.feeInfo.fee,
        state.wallet.accountDetails,
        state.transactions.transactionInfo,
        state.wallet.validatorCommission,
      ],
      shallow
    );

  const handleSubmit = () => {
    let messages: any = [];
    selected.forEach(async (item) => {
      messages.push(
        withdrawMsg(accountDetails!.address!, item.validatorAddress)
      );
    });
    if (selectedCommission) {
      messages.push(validatorCommissionMsg(commission.validatorAddress!));
    }
    setTxnMsgs(messages);
    handleDecryptKeystoreModal(true);
    handleClaimTxnModal(false);
  };

  const enable =
    (selected.length > 0 &&
      balances.totalXprt
        .toDec()
        .gte(
          getDecimalize(
            fee.value!.toString(),
            defaultChain.currency.coinDecimals
          )
        )) ||
    selectedCommission;

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
            "Claim"
          )
        }
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Submit;
