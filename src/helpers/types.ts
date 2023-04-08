import {
  BaseVestingAccount,
  ContinuousVestingAccount,
  DelayedVestingAccount,
  PeriodicVestingAccount,
} from "cosmjs-types/cosmos/vesting/v1beta1/vesting";
import { BaseAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";
import { DenomTrace } from "cosmjs-types/ibc/applications/transfer/v1/transfer";

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
