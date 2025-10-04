import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
  MsgCancelUnbondingDelegation
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
  MsgRedeemTokensForShares,
  MsgTransferTokenizeShareRecord,
  MsgValidatorBond,
  MsgTokenizeShares
} from "persistenceonejs/cosmos/staking/v1beta1/tx";
import { MsgWithdrawTokenizeShareRecordReward } from "persistenceonejs/cosmos/distribution/v1beta1/tx";
import Decimal from "decimal.js";
export const msgSendTypeUrl = "/cosmos.bank.v1beta1.MsgSend";
const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
const msgRedelegateTypeUrl = "/cosmos.staking.v1beta1.MsgBeginRedelegate";
const msgUnbondTypeUrl = "/cosmos.staking.v1beta1.MsgUndelegate";
export const msgCancelUnbondTypeUrl =
  "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation";
const msgWithdrawRewardsTypeUrl =
  "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward";
const msgSetWithdrawAddressTypeUrl =
  "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress";
const msgTransferTypeUrl = "/ibc.applications.transfer.v1.MsgTransfer";
const msgValidatorCommission =
  "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission";
export const msgTransferTokenizeShareRecord =
  "/gaia.liquid.v1beta1.MsgTransferTokenizeShareRecord";
export const msgTokenizeShares = "/gaia.liquid.v1beta1.MsgTokenizeShares";
export const msgRedeemTokensforShares =
  "/gaia.liquid.v1beta1.MsgRedeemTokensForShares";
export const msgValidatorBondUrl = "/cosmos.staking.v1beta1.MsgValidatorBond";
export const msgWithdrawTokenizeShareRecordReward =
  "/cosmos.distribution.v1beta1.MsgWithdrawTokenizeShareRecordReward";
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

function ValidatorBond(delegatorAddress, validatorAddress) {
  return {
    typeUrl: msgValidatorBondUrl,
    value: MsgValidatorBond.fromPartial({
      delegatorAddress: delegatorAddress,
      validatorAddress: validatorAddress
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

function CancelUnbondingMsg(
  delegatorAddress,
  validatorAddress,
  amount,
  creationHeight
) {
  return {
    typeUrl: msgCancelUnbondTypeUrl,
    value: MsgCancelUnbondingDelegation.fromPartial({
      delegatorAddress: delegatorAddress,
      validatorAddress: validatorAddress,
      amount: {
        denom: DefaultChainInfo.currency.coinMinimalDenom,
        amount: String(amount)
      },
      creationHeight: creationHeight
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
      tokenizeShareRecordId: recordId.toString(),
      sender: sender,
      newOwner: newOwner
    })
  };
}

function RedeemTokenizedSharesMsg(fromAddress, denom, amount) {
  const value = new Decimal(amount);
  return {
    typeUrl: msgRedeemTokensforShares,
    value: MsgRedeemTokensForShares.fromPartial({
      delegatorAddress: fromAddress,
      amount: {
        denom: denom,
        amount: value.trunc().toString()
      }
    })
  };
}

function TokenizedSharesRewardsMsg(ownerAddress, tokenId) {
  return {
    typeUrl: msgWithdrawTokenizeShareRecordReward,
    value: MsgWithdrawTokenizeShareRecordReward.fromPartial({
      ownerAddress: ownerAddress,
      recordId: tokenId
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
  TokenizeSharesTransferMsg,
  ValidatorBond,
  TokenizedSharesRewardsMsg,
  CancelUnbondingMsg
};
