import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate
} from "cosmjs-types/cosmos/staking/v1beta1/tx";
import {
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission
} from "cosmjs-types/cosmos/distribution/v1beta1/tx";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
import { coin } from "@cosmjs/stargate";
import { trimWhiteSpaces } from "./scripts";
import { DefaultChainInfo } from "../config";
import {
  MsgTokenizeShares,
  MsgRedeemTokensforShares,
  MsgTransferTokenizeShareRecord
} from "../protos/lsnative/staking/v1beta1/tx";

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
export const msgTransferTokenizeShareRecord =
  "/lsnative.staking.v1beta1.MsgTransferTokenizeShareRecord";
export const msgTokenizeShares = "/lsnative.staking.v1beta1.MsgTokenizeShares";
export const msgRedeemTokensforShares =
  "/lsnative.staking.v1beta1.MsgRedeemTokensforShares";

function SendMsg(fromAddress, toAddress, amount, denom) {
  return {
    typeUrl: msgSendTypeUrl,
    value: MsgSend.fromPartial({
      fromAddress: trimWhiteSpaces(fromAddress),
      toAddress: trimWhiteSpaces(toAddress),
      amount: [
        {
          denom: denom,
          amount: String(amount)
        }
      ]
    })
  };
}

function DelegateMsg(
  delegatorAddress,
  validatorAddress,
  amount,
  denom = DefaultChainInfo.currency.coinMinimalDenom
) {
  return {
    typeUrl: msgDelegateTypeUrl,
    value: MsgDelegate.fromPartial({
      delegatorAddress: delegatorAddress,
      validatorAddress: validatorAddress,
      amount: {
        denom: denom,
        amount: String(amount)
      }
    })
  };
}

function RedelegateMsg(
  delegatorAddress,
  validatorSrcAddress,
  validatorDstAddress,
  amount
) {
  return {
    typeUrl: msgRedelegateTypeUrl,
    value: MsgBeginRedelegate.fromPartial({
      delegatorAddress: delegatorAddress,
      validatorSrcAddress: validatorSrcAddress,
      validatorDstAddress: validatorDstAddress,
      amount: {
        denom: DefaultChainInfo.currency.coinMinimalDenom,
        amount: String(amount)
      }
    })
  };
}

function UnbondMsg(delegatorAddress, validatorAddress, amount) {
  return {
    typeUrl: msgUnbondTypeUrl,
    value: MsgUndelegate.fromPartial({
      delegatorAddress: delegatorAddress,
      validatorAddress: validatorAddress,
      amount: {
        denom: DefaultChainInfo.currency.coinMinimalDenom,
        amount: String(amount)
      }
    })
  };
}

function WithdrawMsg(delegatorAddress, validatorAddress) {
  return {
    typeUrl: msgWithdrawRewardsTypeUrl,
    value: MsgWithdrawDelegatorReward.fromPartial({
      delegatorAddress: delegatorAddress,
      validatorAddress: validatorAddress
    })
  };
}

function SetWithDrawAddressMsg(delegatorAddress, withdrawAddress) {
  return {
    typeUrl: msgSetWithdrawAddressTypeUrl,
    value: MsgSetWithdrawAddress.fromPartial({
      delegatorAddress: delegatorAddress,
      withdrawAddress: trimWhiteSpaces(withdrawAddress)
    })
  };
}

function TokenizeSharesMsg(
  fromAddress,
  validatorAddress,
  tokenizedShareOwner,
  amount,
  denom = DefaultChainInfo.currency.coinMinimalDenom
) {
  return {
    typeUrl: msgTokenizeShares,
    value: MsgTokenizeShares.fromPartial({
      delegatorAddress: fromAddress,
      validatorAddress: validatorAddress,
      amount: {
        denom: denom,
        amount: String(amount)
      },
      tokenizedShareOwner: tokenizedShareOwner
    })
  };
}

function TokenizeSharesTransferMsg(recordId, sender, newOwner) {
  return {
    typeUrl: msgTransferTokenizeShareRecord,
    value: MsgTransferTokenizeShareRecord.fromPartial({
      tokenizeShareRecordId: recordId,
      sender: sender,
      newOwner: newOwner
    })
  };
}

function RedeemTokenizedSharesMsg(fromAddress, denom, amount) {
  return {
    typeUrl: msgRedeemTokensforShares,
    value: MsgRedeemTokensforShares.fromPartial({
      delegatorAddress: fromAddress,
      amount: {
        denom: denom,
        amount: String(amount)
      }
    })
  };
}

function TransferMsg(
  channel,
  fromAddress,
  toAddress,
  amount,
  timeoutHeight,
  timeoutTimestamp,
  denom,
  port = "transfer"
) {
  return {
    typeUrl: msgTransferTypeUrl,
    value: MsgTransfer.fromPartial({
      sourcePort: port,
      sourceChannel: channel,
      token: coin(amount, denom),
      sender: trimWhiteSpaces(fromAddress),
      receiver: trimWhiteSpaces(toAddress),
      timeoutHeight: {
        revisionNumber: timeoutHeight.revisionNumber,
        revisionHeight: timeoutHeight.revisionHeight
      },
      timeoutTimestamp: timeoutTimestamp
    })
  };
}

function ValidatorCommissionMsg(address) {
  return {
    typeUrl: msgValidatorCommission,
    value: MsgWithdrawValidatorCommission.fromPartial({
      validatorAddress: address
    })
  };
}

export {
  SendMsg,
  DelegateMsg,
  RedelegateMsg,
  UnbondMsg,
  WithdrawMsg,
  SetWithDrawAddressMsg,
  TransferMsg,
  ValidatorCommissionMsg,
  TokenizeSharesMsg,
  RedeemTokenizedSharesMsg,
  TokenizeSharesTransferMsg
};
