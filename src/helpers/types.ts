import {
  BaseVestingAccount,
  ContinuousVestingAccount,
  DelayedVestingAccount,
  PeriodicVestingAccount,
} from "cosmjs-types/cosmos/vesting/v1beta1/vesting";
import { BaseAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";
import { DenomTrace } from "cosmjs-types/ibc/applications/transfer/v1/transfer";
import { emptyPrettyCoin } from "../../store/slices/wallet";
import { CoinPretty } from "@keplr-wallet/unit";
import { Validator } from "cosmjs-types/cosmos/staking/v1beta1/staking";
import { fetchUnBondings } from "../pages/api/rpcQueries";

export interface GetAccount {
  typeUrl: string | null;
  accountData:
    | DelayedVestingAccount
    | ContinuousVestingAccount
    | PeriodicVestingAccount
    | BaseAccount
    | BaseVestingAccount
    | null;
  vestingBalance: number;
}

export interface BalanceList {
  denom: string;
  amount: string;
  denomTrace?: DenomTrace;
}
export interface Delegations {
  amount: CoinPretty;
  list: any[];
}

export interface GetDelegatedValidatorInfo {
  validator: Validator;
  delegatedAmount: string;
}

export interface ValidatorsInfo {
  validators: Validator[];
  activeValidators: Validator[];
  inActiveValidators: Validator[];
  delegatedValidators: GetDelegatedValidatorInfo[];
  totalDelegatedAmount: CoinPretty;
}

export interface UnBondingListInfo {
  unBondingList: { completionTime?: any; balance: string }[];
  totalAmount: number | string;
}
