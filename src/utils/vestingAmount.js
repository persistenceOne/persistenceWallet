import * as Sentry from "@sentry/browser";
import { getAccount, tokenValueConversion } from "./helper";
import { DefaultChainInfo } from "../config";

const periodicVesting = "/cosmos.vesting.v1beta1.PeriodicVestingAccount";
const baseAccount = "/cosmos.auth.v1beta1.BaseAccount";
const delayedVesting = "/cosmos.vesting.v1beta1.DelayedVestingAccount";
const continuousVesting = "/cosmos.vesting.v1beta1.ContinuousVestingAccount";

export const getUTOKEN_Balance = (amountList) => {
  let balance = 0;
  for (let i = 0; i < amountList.length; i++) {
    if (amountList[i].denom === DefaultChainInfo.currency.coinMinimalDenom) {
      balance = parseInt(amountList[i].amount);
      break;
    }
  }
  return balance;
};

export const getPeriodicVestingAmount = (account, currentEpochTime) => {
  let accountVestingAmount = getUTOKEN_Balance(
    account.baseVestingAccount.originalVesting
  );
  let freeBalance = 0;
  const endTime = parseInt(account.baseVestingAccount.endTime);
  if (endTime >= currentEpochTime) {
    let vestingTimes = parseInt(account.startTime);
    for (let i = 0; i < account.vestingPeriods.length; i++) {
      let length = parseInt(account.vestingPeriods[i]["length"]);
      vestingTimes = vestingTimes + length;
      if (currentEpochTime >= vestingTimes) {
        freeBalance =
          freeBalance + getUTOKEN_Balance(account.vestingPeriods[i].amount);
      }
    }
  } else {
    accountVestingAmount = 0;
  }
  accountVestingAmount = accountVestingAmount - freeBalance;
  return accountVestingAmount;
};

export const getDelayedVestingAmount = (account, currentEpochTime) => {
  const endTime = parseInt(account.baseVestingAccount.endTime);
  if (endTime >= currentEpochTime) {
    return getUTOKEN_Balance(account.baseVestingAccount.originalVesting);
  } else {
    return 0;
  }
};

export const getContinuousVestingAmount = (account, currentEpochTime) => {
  const endTime = parseInt(account.baseVestingAccount.endTime);
  const startTime = parseInt(account.startTime);
  if (endTime >= currentEpochTime) {
    let originalVestingAmount = getUTOKEN_Balance(
      account.baseVestingAccount.originalVesting
    );
    return (
      (originalVestingAmount * (endTime - currentEpochTime)) /
      (endTime - startTime)
    );
  } else {
    return 0;
  }
};

function getAccountVestingAmount(account, currentEpochTime) {
  let accountVestingAmount = 0;
  switch (account.typeUrl) {
    case periodicVesting:
      accountVestingAmount = getPeriodicVestingAmount(
        account.accountData,
        currentEpochTime
      );
      break;
    case delayedVesting:
      accountVestingAmount = getDelayedVestingAmount(account, currentEpochTime);
      break;
    case continuousVesting:
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

async function getTransferableVestingAmount(address, balance) {
  try {
    const currentEpochTime = Math.floor(new Date().getTime() / 1000);
    let transferableAmount = 0;

    const res = await getAccount(address);
    const amount = tokenValueConversion(
      getAccountVestingAmount(res, currentEpochTime)
    );
    let delegatedVesting = 0;
    if (res.typeUrl !== baseAccount) {
      delegatedVesting = tokenValueConversion(
        getDenomAmount(res.accountData.baseVestingAccount.delegatedVesting)
      );
    }
    transferableAmount = balance + delegatedVesting - amount;
    if (transferableAmount < 0) {
      transferableAmount = 0;
    }
    if (delegatedVesting > amount) {
      transferableAmount = balance;
    }
    return [amount, transferableAmount];
  } catch (error) {
    Sentry.captureException(
      error.response ? error.response.data.message : error.message
    );
    console.log(error.message);
  }
}

export const getTransferableAmount = async (address, accountData, balance) => {
  try {
    let transferableAmount = 0;

    const amount = tokenValueConversion(accountData.vestingBalance);
    let delegatedVesting = 0;
    if (accountData.typeUrl !== "/cosmos.auth.v1beta1.BaseAccount") {
      delegatedVesting = tokenValueConversion(
        getDenomAmount(
          accountData.accountData.baseVestingAccount.delegatedVesting
        )
      );
    }
    transferableAmount = balance + delegatedVesting - amount;
    if (transferableAmount < 0) {
      transferableAmount = 0;
    }
    if (delegatedVesting > amount) {
      transferableAmount = balance;
    }
    return transferableAmount;
  } catch (error) {
    return 0;
  }
};

function getDenomAmount(
  coins,
  denom = DefaultChainInfo.currency.coinMinimalDenom
) {
  if (coins.length > 0) {
    for (let coin of coins) {
      if (coin.denom === denom) {
        return coin.amount;
      }
    }
    return 0;
  } else {
    return 0;
  }
}

export default { getTransferableVestingAmount, getAccountVestingAmount };
