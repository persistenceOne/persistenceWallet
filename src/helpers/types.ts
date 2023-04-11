import {
  BaseVestingAccount,
  ContinuousVestingAccount,
  DelayedVestingAccount,
  PeriodicVestingAccount,
} from "cosmjs-types/cosmos/vesting/v1beta1/vesting";
import { BaseAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";
import { DenomTrace } from "cosmjs-types/ibc/applications/transfer/v1/transfer";
import { CoinPretty } from "@keplr-wallet/unit";
import { Validator } from "cosmjs-types/cosmos/staking/v1beta1/staking";

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
  tokenUrl: string;
  minimalDenom: string;
  amount: string | CoinPretty;
  denomTrace?: DenomTrace | null;
}
export interface Delegations {
  amount: CoinPretty;
  list: any[];
}

export interface GetDelegatedValidatorInfo {
  delegatedAmount: string;
  id: number;
  validatorName: any;
  validatorImage: string;
  validatorAddress: string;
  actions: any;
}

export interface ValidatorProps {
  id: number;
  validatorName: any;
  validatorImage: string;
  validatorAddress: string;
  votingPower: any;
  commission: any;
  actions: any;
}

export interface ValidatorsInfo {
  validators: ValidatorProps[];
  activeValidators: ValidatorProps[];
  inActiveValidators: ValidatorProps[];
  delegatedValidators: GetDelegatedValidatorInfo[];
  totalDelegatedAmount: CoinPretty;
}

export interface UnBondingListInfo {
  unBondingList: { completionTime?: any; balance: CoinPretty }[];
  totalAmount: CoinPretty;
}
