import React from "react";
import Button from "../../../../atoms/button";
import { useAppStore } from "../../../../../../store/store";
import { Dec } from "@keplr-wallet/unit";
import { defaultChain, persistenceChain } from "../../../../../helpers/utils";
import {
  getDecimalize,
  getUnDecimalize,
  toDec,
} from "../../../../../helpers/coin";
import {
  MakeIBCTransferMsg,
  sendMsg,
  TransferMsg,
} from "../../../../../helpers/protoMsg";
import { shallow } from "zustand/shallow";
import { Spinner } from "../../../../atoms/spinner";
import {
  ExternalChains,
  IBCConfiguration,
} from "../../../../../helpers/config";
import { PERSISTENCE_PREFIX } from "../../../../../../appConstants";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

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
    chain,
  ] = useAppStore(
    (state) => [
      state.wallet.balances,
      state.transactions.sendIbc.token,
      state.transactions.sendIbc.amount,
      state.transactions.feeInfo.fee,
      state.wallet.accountDetails,
      state.transactions.sendIbc.recipient,
      state.transactions.transactionInfo,
      state.transactions.sendIbc.chain,
    ],
    shallow
  );

  const handleSubmit = async () => {
    const destinationChain = ExternalChains[env].find(
      (chain) => chain.chainId === chain.chainId
    );
    const msg = await MakeIBCTransferMsg({
      channel: chain!.sourceChannelId,
      fromAddress: accountDetails.address,
      toAddress: recipient,
      amount: getUnDecimalize(amount.toString(), 6).truncate().toString(),
      timeoutHeight: undefined,
      timeoutTimestamp: undefined,
      denom: token!.minimalDenom!,
      sourceRPCUrl: persistenceChain?.rpc,
      destinationRPCUrl: destinationChain?.rpc,
      port: IBCConfiguration.ibcDefaultPort,
    });
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
    balances.totalXprt.toDec().gt(new Dec("0")) &&
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
