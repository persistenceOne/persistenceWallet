import _ from "lodash";
import { Scope } from "@sentry/nextjs";
import * as Sentry from "@sentry/nextjs";
import { CaptureContext } from "@sentry/types/types/scope";
import { Primitive } from "@sentry/types";
import { displayToast } from "../components/molecules/toast";
import { ToastType } from "../components/molecules/toast/types";
import {useAppStore} from "../../store/store";
import { Coin } from "@cosmjs/proto-signing";
import {DefaultChainInfo, MainNetFoundationNodes, TestNetFoundationNodes} from "./config";

export const emptyFunc = () => ({});

export const removeCommas = (str: any) =>
  _.replace(str, new RegExp(",", "g"), "");

const reverseString = (str: any) =>
  removeCommas(_.toString(_.reverse(_.toArray(str))));

const recursiveReverse = (input: any): string => {
  if (_.isArray(input))
    return _.toString(_.reverse(_.map(input, (v: any) => recursiveReverse(v))));
  if (_.isString()) return reverseString(input);
  return reverseString(`${input}`);
};

export const sixDigitsNumber = (value: string, length = 6): string => {
  let inputValue = value.toString();
  if (inputValue.length >= length) {
    return inputValue.substring(0, length);
  } else {
    const stringLength = length - inputValue.length;
    let newString = inputValue;
    for (let i = 0; i < stringLength; i++) {
      newString += "0";
    }
    return newString;
  }
};

export const formatNumber = (v = 0, size = 3, decimalLength = 6): string => {
  let str = `${v}`;
  if (!str) return "NaN";
  let substr = str.split(".");
  if (substr[1] === undefined) {
    let newString = "0";
    for (let i = 1; i < decimalLength; i++) {
      newString += "0";
    }
    substr.push(newString);
  } else {
    substr[1] = sixDigitsNumber(substr[1], decimalLength);
  }
  str = reverseString(substr[0]);
  const regex = `.{1,${size}}`;
  const arr = str.match(new RegExp(regex, "g"));
  return `${recursiveReverse(arr)}${substr[1] ? `.${substr[1]}` : ""}`;
};

export const stringTruncate = (str: string, length = 7): string => {
  if (str.length > 30) {
    return (
      str.substring(0, length) +
      "..." +
      str.substring(str.length - length, str.length)
    );
  }
  return str;
};

export const truncateToFixedDecimalPlaces = (
  num: number | string,
  decimalPlaces = 6
): number => {
  const regexString = "^-?\\d+(?:\\.\\d{0,dp})?";
  const regexToMatch = regexString.replace("dp", `${decimalPlaces}`);
  const regex = new RegExp(regexToMatch);
  const matched = num.toString().match(regex);
  if (matched) {
    return parseFloat(matched[0]);
  }
  return 0;
};

export const numberFormat = (number: any, decPlaces: number) => {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ["K", "M", "M", "T"];

  // Go through the array backwards, so we do the largest first
  for (let i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    const size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round((number * decPlaces) / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      // Add the letter for the abbreviation
      number += abbrev[i];

      break;
    }
  }

  return number;
};

export const exceptionHandle = (
  e: any,
  sentryTag: { [key: string]: Primitive }
) => {
  displayToast(
    {
      message: "This transaction could not be completed",
    },
    ToastType.ERROR
  );
  // useAppStore.getState().setTxnInfo(false, null, "failed");
  const customScope = new Scope();
  customScope.setLevel("fatal");
  customScope.setTags(sentryTag);
  sentryReport(e, customScope);
};

export const sentryReport = (exception: any, context: CaptureContext) => {
  console.log(exception);
  Sentry.captureException(exception, context);
};

export const resetStore = () => {
  // useAppStore.getState().resetWalletSlice();
  // useAppStore.getState().resetBalanceSlice();
  // useAppStore.getState().resetInitialDataSlice();
  // useAppStore.getState().resetTxnSlice();
};

function isActive(item:any) {
  return item.jailed === false && item.status === 3;
}

function checkLastPage(pageNumber:number, limit:number, totalTransactions:number) {
  return totalTransactions / limit <= pageNumber;
}

export const tokenValueConversion = (data:string) => {
  return Number(data) / DefaultChainInfo.uTokenValue;
};

export const denomModify = (amount:Coin)=> {
  if (Array.isArray(amount)) {
    if (amount.length) {
      if (amount[0].denom === DefaultChainInfo.currency.coinMinimalDenom) {
        return [tokenValueConversion(amount[0].amount), DefaultChainInfo.currency.coinDenom];
      } else {
        return [amount[0].amount, amount[0].denom];
      }
    } else {
      return '';
    }
  } else {
    if (amount.denom === DefaultChainInfo.currency.coinMinimalDenom) {
      return [tokenValueConversion(amount.amount), DefaultChainInfo.currency.coinDenom];
    } else {
      return [amount.amount, amount.denom];
    }
  }
}

const  foundationNodeCheck = (validatorAddress:string) => {
  if (NODE_CONF === "ibcStaging.json") {
    if (TestNetFoundationNodes.includes(validatorAddress)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (MainNetFoundationNodes.includes(validatorAddress)) {
      return true;
    } else {
      return false;
    }
  }
}