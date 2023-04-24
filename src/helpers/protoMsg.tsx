import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
import { coin } from "@cosmjs/amino";
import Long from "long";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import {
  decodeTendermintClientStateAny,
  decodeTendermintConsensusStateAny,
  defaultChain,
} from "./utils";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { IBC_TRANSFER_URL } from "../../appConstants";
import { IBCConfiguration } from "./config";
import { QueryClient, setupIbcExtension } from "@cosmjs/stargate";
import { QueryChannelClientStateResponse } from "cosmjs-types/ibc/core/channel/v1/query";
const tendermintRPC = require("@cosmjs/tendermint-rpc");

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

export const delegateMsg = (
  delegatorAddress: string,
  validatorAddress: string,
  amount: string,
  denom = defaultChain.currency.coinMinimalDenom
) => {
  return {
    typeUrl: msgDelegateTypeUrl,
    value: MsgDelegate.fromPartial({
      delegatorAddress: delegatorAddress,
      validatorAddress: validatorAddress,
      amount: {
        denom: denom,
        amount: amount,
      },
    }),
  };
};

export const unBondMsg = (
  delegatorAddress: string,
  validatorAddress: string,
  amount: string,
  denom = defaultChain.currency.coinMinimalDenom
) => {
  return {
    typeUrl: msgUnbondTypeUrl,
    value: MsgUndelegate.fromPartial({
      delegatorAddress: delegatorAddress,
      validatorAddress: validatorAddress,
      amount: {
        denom: denom,
        amount: amount,
      },
    }),
  };
};

export const RedelegateMsg = (
  delegatorAddress: string,
  validatorSrcAddress: string,
  validatorDstAddress: string,
  amount: string
) => {
  return {
    typeUrl: msgRedelegateTypeUrl,
    value: MsgBeginRedelegate.fromPartial({
      delegatorAddress: delegatorAddress,
      validatorSrcAddress: validatorSrcAddress,
      validatorDstAddress: validatorDstAddress,
      amount: {
        denom: defaultChain.currency.coinMinimalDenom,
        amount: amount,
      },
    }),
  };
};

export const fee = (amount: string, gas = "250000"): StdFee => {
  return {
    amount: [{ amount: amount, denom: defaultChain.currency.coinMinimalDenom }],
    gas: gas.toString(),
  };
};

export interface TransferMsgTypes {
  typeUrl?: string;
  value?: MsgTransfer;
}

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

export async function MakeIBCTransferMsg({
  channel,
  fromAddress,
  toAddress,
  amount,
  timeoutHeight,
  timeoutTimestamp = IBCConfiguration.timeoutTimestamp,
  denom,
  sourceRPCUrl,
  destinationRPCUrl,
  port = "transfer",
}: any) {
  const tendermintClient = await tendermintRPC.Tendermint34Client.connect(
    sourceRPCUrl
  );
  const queryClient = new QueryClient(tendermintClient);

  const ibcExtension = setupIbcExtension(queryClient);

  return await ibcExtension.ibc.channel
    .clientState(port, channel)
    .then(async (clientStateResponse: QueryChannelClientStateResponse) => {
      const clientStateResponseDecoded = decodeTendermintClientStateAny(
        clientStateResponse?.identifiedClientState?.clientState
      );
      timeoutHeight = {
        revisionHeight:
          clientStateResponseDecoded.latestHeight.revisionHeight.add(
            IBCConfiguration.ibcRevisionHeightIncrement
          ),
        revisionNumber: clientStateResponseDecoded.latestHeight.revisionNumber,
      };
      if (destinationRPCUrl === undefined) {
        const consensusStateResponse =
          await ibcExtension.ibc.channel.consensusState(
            port,
            channel,
            clientStateResponseDecoded.latestHeight.revisionNumber.toInt(),
            clientStateResponseDecoded.latestHeight.revisionHeight.toInt()
          );
        const consensusStateResponseDecoded = decodeTendermintConsensusStateAny(
          consensusStateResponse.consensusState
        );
        const timeoutTime = Long.fromNumber(
          consensusStateResponseDecoded.timestamp.seconds.toNumber()
        )
          .add(timeoutTimestamp)
          .multiply(1000000000); //get time in nanoesconds
        return TransferMsg(
          channel,
          fromAddress,
          toAddress,
          amount,
          timeoutHeight,
          timeoutTime,
          denom,
          port
        );
      } else {
        const remoteTendermintClient =
          await tendermintRPC.Tendermint34Client.connect(destinationRPCUrl);
        const latestBlockHeight = (await remoteTendermintClient.status())
          .syncInfo.latestBlockHeight;
        timeoutHeight.revisionHeight = Long.fromNumber(latestBlockHeight).add(
          IBCConfiguration.ibcRemoteHeightIncrement
        );
        const timeoutTime = Long.fromNumber(0);
        return TransferMsg(
          channel,
          fromAddress,
          toAddress,
          amount,
          timeoutHeight,
          timeoutTime,
          denom,
          port
        );
      }
    })
    .catch((error: any) => {
      console.log(error, "makeibc ");
    });
}
