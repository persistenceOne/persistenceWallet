import * as Sentry from "@sentry/browser";
import { Coin } from "@cosmjs/proto-signing";
import { DefaultChainInfo } from "./config";
import {
  BASE_ACCOUNT,
  CONTINUOUS_VESTING_ACCOUNT,
  DELAYED_VESTING_ACCOUNT,
  PERIODIC_VESTING_ACCOUNT,
} from "../../appConstants";
import { GetAccount } from "./types";
import { Dec } from "@keplr-wallet/unit";
import { toDec } from "./coin";

const periodicVesting = "/cosmos.vesting.v1beta1.PeriodicVestingAccount";
const baseAccount = "/cosmos.auth.v1beta1.BaseAccount";
const delayedVesting = "/cosmos.vesting.v1beta1.DelayedVestingAccount";
const continuousVesting = "/cosmos.vesting.v1beta1.ContinuousVestingAccount";

function getUTOKEN_Balance(amountList: any) {
  let balance = 0;
  for (let i = 0; i < amountList.length; i++) {
    if (amountList[i].denom === DefaultChainInfo.currency.coinMinimalDenom) {
      balance = parseInt(amountList[i].amount);
      break;
    }
  }
  return balance;
}

export const getPeriodicVestingAmount = (
  account: any,
  currentEpochTime: number
) => {
  let accountVestingAmount = getUTOKEN_Balance(
    account.accountData.baseVestingAccount.originalVesting
  );
  let freeBalance = 0;
  const endTime = parseInt(account.accountData.baseVestingAccount.endTime);
  if (endTime >= currentEpochTime) {
    let vestingTimes = parseInt(account.accountData.startTime);
    for (let i = 0; i < account.accountData.vestingPeriods.length; i++) {
      let length = parseInt(account.accountData.vestingPeriods[i]["length"]);
      vestingTimes = vestingTimes + length;
      if (currentEpochTime >= vestingTimes) {
        freeBalance =
          freeBalance +
          getUTOKEN_Balance(account.accountData.vestingPeriods[i].amount);
      }
    }
  } else {
    accountVestingAmount = 0;
  }
  accountVestingAmount = accountVestingAmount - freeBalance;
  return accountVestingAmount;
};

export const getDelayedVestingAmount = (
  account: any,
  currentEpochTime: number
) => {
  const endTime = parseInt(account.accountData.baseVestingAccount.endTime);
  if (endTime >= currentEpochTime) {
    return getUTOKEN_Balance(
      account.accountData.baseVestingAccount.originalVesting
    );
  } else {
    return 0;
  }
};

export const getContinuousVestingAmount = (
  account: any,
  currentEpochTime: number
) => {
  const endTime = parseInt(account.accountData.baseVestingAccount.endTime);
  const startTime = parseInt(account.accountData.startTime);
  if (endTime >= currentEpochTime) {
    let originalVestingAmount = getUTOKEN_Balance(
      account.accountData.baseVestingAccount.originalVesting
    );
    return (
      (originalVestingAmount * (endTime - currentEpochTime)) /
      (endTime - startTime)
    );
  } else {
    return 0;
  }
};

function getAccountVestingAmount(account: any, currentEpochTime: number) {
  let accountVestingAmount = 0;
  switch (account!.typeUrl) {
    case PERIODIC_VESTING_ACCOUNT:
      accountVestingAmount = getPeriodicVestingAmount(
        account,
        currentEpochTime
      );
      break;
    case DELAYED_VESTING_ACCOUNT:
      accountVestingAmount = getDelayedVestingAmount(account, currentEpochTime);
      break;
    case CONTINUOUS_VESTING_ACCOUNT:
      accountVestingAmount = getContinuousVestingAmount(
        account,
        currentEpochTime
      );
      break;
    case baseAccount:
      accountVestingAmount = 0;
      break;
    default:
  }
  return accountVestingAmount;
}

export const getTransferableAmount = async (
  address: string,
  accountData: any,
  balance: string
) => {
  try {
    const balanceDec = toDec(balance);
    let transferableAmount: Dec;
    const amount = toDec(accountData.vestingBalance);
    let delegatedVesting = new Dec(0);
    if (accountData.typeUrl !== BASE_ACCOUNT) {
      delegatedVesting = new Dec(
        getDenomAmount(
          accountData.accountData!.baseVestingAccount.delegatedVesting!
        )!
      );
    }
    console.log(delegatedVesting, "delegatedVesting", amount, balance);
    transferableAmount = balanceDec.add(delegatedVesting.sub(amount));
    if (transferableAmount.lt(new Dec(0))) {
      transferableAmount = new Dec(0);
    }
    if (delegatedVesting.gt(amount)) {
      transferableAmount = balanceDec;
    }
    return transferableAmount;
  } catch (error: any) {
    return new Dec(0);
  }
};

function getDenomAmount(
  coins: Coin[],
  denom = DefaultChainInfo.currency.coinMinimalDenom
) {
  if (coins.length > 0) {
    for (let coin of coins) {
      if (coin.denom === denom) {
        return Number(coin.amount);
      }
    }
    return 0;
  } else {
    return 0;
  }
}
