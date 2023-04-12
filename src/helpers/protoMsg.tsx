import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
import { coin } from "@cosmjs/amino";
import Long from "long";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { defaultChain } from "./utils";
import { StdFee } from "@cosmjs/amino/build/signdoc";
const msgSendTypeUrl = "/cosmos.bank.v1beta1.MsgSend";
const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
const msgRedelegateTypeUrl = "/cosmos.staking.v1beta1.MsgBeginRedelegate";
const msgUnbondTypeUrl = "/cosmos.staking.v1beta1.MsgUndelegate";
const msgWithdrawRewardsTypeUrl =
  "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward";
const msgSetWithdrawAddressTypeUrl =
  "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress";
const msgTransferTypeUrl = "/ibc.applications.transfer.v1.MsgTransfer";
const msgValidatorCommission =
  "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission";

export interface SendMsgTypes {
  typeUrl?: string;
  value?: MsgSend;
}

export const sendMsg = (
  fromAddress: string,
  toAddress: string,
  amount: string,
  denom: string
) => {
  return {
    typeUrl: msgSendTypeUrl,
    value: MsgSend.fromPartial({
      fromAddress: fromAddress,
      toAddress: toAddress,
      amount: [
        {
          denom: denom,
          amount: amount,
        },
      ],
    }),
  };
};

export const fee = (amount: string, gas = "250000"): StdFee => {
  return {
    amount: [{ amount: amount, denom: defaultChain.currency.coinMinimalDenom }],
    gas: gas.toString(),
  };
};

export const TransferMsg = (
  channel: string,
  fromAddress: string,
  toAddress: string,
  amount: string,
  timeoutHeight: any,
  timeoutTimestamp: string | number | Long.Long | undefined,
  denom: string,
  port = "transfer"
): TransferMsgTypes => {
  return {
    typeUrl: IBC_TRANSFER_URL,
    value: MsgTransfer.fromPartial({
      sourcePort: port,
      sourceChannel: channel,
      token: coin(Math.trunc(Number(amount)), denom),
      sender: fromAddress,
      receiver: toAddress,
      timeoutHeight: {
        revisionNumber: timeoutHeight?.revisionNumber,
        revisionHeight: timeoutHeight?.revisionHeight,
      },
      timeoutTimestamp: timeoutTimestamp,
    }),
  };
};
