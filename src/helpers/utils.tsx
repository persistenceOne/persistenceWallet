import _ from "lodash";
import { Scope } from "@sentry/nextjs";
import * as Sentry from "@sentry/nextjs";
import { CaptureContext } from "@sentry/types/types/scope";
import { Primitive } from "@sentry/types";
import { displayToast } from "../components/molecules/toast";
import { ToastType } from "../components/molecules/toast/types";
const encoding = require("@cosmjs/encoding");
const bip39 = require("bip39");
import { Coin } from "@cosmjs/proto-signing";
import {
  DefaultChainInfo,
  ExternalChains,
  FeeInfo,
  MainNetFoundationNodes,
  TestNetFoundationNodes,
} from "./config";
import { sha256, stringToPath } from "@cosmjs/crypto";
import { BaseAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";
import {
  ContinuousVestingAccount,
  DelayedVestingAccount,
  PeriodicVestingAccount,
} from "cosmjs-types/cosmos/vesting/v1beta1/vesting";
import { decryptKeyStore } from "./wallet";
import {
  ENCRYPTED_MNEMONIC,
  LOGIN_INFO,
  PERSISTENCE,
} from "../../appConstants";
import moment from "moment";

const valoperAddressPrefix = DefaultChainInfo.prefix;
const addressPrefix = DefaultChainInfo.prefix;
const configCoinType = DefaultChainInfo.coinType;

export const persistenceChain = ExternalChains["Mainnet"].find(
  (chain) => chain.chainName === PERSISTENCE
);

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

export const randomNum = (min: number, max: number) => {
  let randomNumbers = [];
  for (let i = 0; i < 3; i++) {
    let random_number = Math.floor(Math.random() * (max - min) + min);
    if (randomNumbers.indexOf(random_number) === -1) {
      randomNumbers.push(random_number);
    }
  }
  return randomNumbers;
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

function isActive(item: any) {
  return item.jailed === false && item.status === 3;
}

function checkLastPage(
  pageNumber: number,
  limit: number,
  totalTransactions: number
) {
  return totalTransactions / limit <= pageNumber;
}

export const tokenValueConversion = (data: string) => {
  return Number(data) / DefaultChainInfo.uTokenValue;
};

export const denomModify = (amount: Coin) => {
  if (Array.isArray(amount)) {
    if (amount.length) {
      if (amount[0].denom === DefaultChainInfo.currency.coinMinimalDenom) {
        return [
          tokenValueConversion(amount[0].amount),
          DefaultChainInfo.currency.coinDenom,
        ];
      } else {
        return [amount[0].amount, amount[0].denom];
      }
    } else {
      return "";
    }
  } else {
    if (amount.denom === DefaultChainInfo.currency.coinMinimalDenom) {
      return [
        tokenValueConversion(amount.amount),
        DefaultChainInfo.currency.coinDenom,
      ];
    } else {
      return [amount.amount, amount.denom];
    }
  }
};

const foundationNodeCheck = (validatorAddress: string) => {
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
};

export const getAccountNumber = (value: string) => {
  return value === "" ? "0" : value;
};

export const addrToValoper = (address: string) => {
  let data = encoding.Bech32.decode(address).data;
  return encoding.Bech32.encode(valoperAddressPrefix, data);
};

export const valoperToAddr = (valoperAddr: string) => {
  let data = encoding.Bech32.decode(valoperAddr).data;
  return encoding.Bech32.encode(addressPrefix, data);
};

export const checkValidatorAccountAddress = (
  validatorAddress: string,
  address: string
) => {
  let validatorAccountAddress = valoperToAddr(validatorAddress);
  return validatorAccountAddress === address;
};

/**
 * @return {boolean}
 */
export const vestingAccountCheck = async (type: string) => {
  return (
    type === "/cosmos.vesting.v1beta1.PeriodicVestingAccount" ||
    type === "/cosmos.vesting.v1beta1.DelayedVestingAccount" ||
    type === "/cosmos.vesting.v1beta1.ContinuousVestingAccount"
  );
};

export const generateHash = (txBytes: Uint8Array) => {
  return encoding.toHex(sha256(txBytes)).toUpperCase();
};

export async function getAccount(address: string) {
  try {
    const rpcClient = await transactions.RpcClient();
    const authAccountService = new QueryClientImpl(rpcClient);
    const accountResponse = await authAccountService.Account({
      address: address,
    });
    if (
      accountResponse.account.typeUrl === "/cosmos.auth.v1beta1.BaseAccount"
    ) {
      let baseAccountResponse = BaseAccount.decode(
        accountResponse.account.value
      );
      return {
        typeUrl: accountResponse.account.typeUrl,
        accountData: baseAccountResponse,
      };
    } else if (
      accountResponse.account.typeUrl ===
      "/cosmos.vesting.v1beta1.PeriodicVestingAccount"
    ) {
      let periodicVestingAccountResponse = PeriodicVestingAccount.decode(
        accountResponse.account.value
      );
      return {
        typeUrl: accountResponse.account.typeUrl,
        accountData: periodicVestingAccountResponse,
      };
    } else if (
      accountResponse.account.typeUrl ===
      "/cosmos.vesting.v1beta1.DelayedVestingAccount"
    ) {
      let delayedVestingAccountResponse = DelayedVestingAccount.decode(
        accountResponse.account.value
      );
      return {
        typeUrl: accountResponse.account.typeUrl,
        accountData: delayedVestingAccountResponse,
      };
    } else if (
      accountResponse.account.typeUrl ===
      "/cosmos.vesting.v1beta1.ContinuousVestingAccount"
    ) {
      let continuousVestingAccountResponse = ContinuousVestingAccount.decode(
        accountResponse.account.value
      );
      return {
        typeUrl: accountResponse.account.typeUrl,
        accountData: continuousVestingAccountResponse,
      };
    }
  } catch (error: any) {
    Sentry.captureException(
      error.response ? error.response.data.message : error.message
    );
    console.log(error.message);
  }
}

export const mnemonicTrim = (mnemonic: string) => {
  let mnemonicList = mnemonic.replace(/\s/g, " ").split(/\s/g);
  let mnemonicWords: any = [];
  for (let word of mnemonicList) {
    if (word === "") {
      console.log();
    } else {
      let trimmedWord = word.replace(/\s/g, "");
      mnemonicWords.push(trimmedWord);
    }
  }
  mnemonicWords = mnemonicWords.join(" ");
  return mnemonicWords;
};

export const validateMnemonic = (mnemonic: string) => {
  const mnemonicWords = mnemonicTrim(mnemonic);
  return bip39.validateMnemonic(mnemonicWords);
};

export const fileTypeCheck = (filePath: string) => {
  let allowedExtensions = /(\.json)$/i;
  return allowedExtensions.exec(filePath);
};

export const downloadFile = async (jsonContent: any) => {
  const json = jsonContent;
  const fileName = "KeyStore";
  const blob = new Blob([json], { type: "application/json" });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const updateFee = (address: string) => {
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO)!);
  if (loginInfo && loginInfo.loginMode === "normal") {
    getAccount(address)
      .then(async (res) => {
        const accountType = await vestingAccountCheck(res!.typeUrl);
        if (accountType) {
          loginInfo.fee = FeeInfo.vestingAccountFee;
          loginInfo.account = "vesting";
        } else {
          loginInfo.fee = FeeInfo.defaultFee;
          loginInfo.account = "non-vesting";
        }
      })
      .catch((error) => {
        Sentry.captureException(
          error.response ? error.response.data.message : error.message
        );
        console.log(error.message);
        loginInfo.fee = FeeInfo.defaultFee;
        loginInfo.account = "non-vesting";
      });
    localStorage.setItem(LOGIN_INFO, JSON.stringify(loginInfo));
  } else {
    loginInfo.fee = FeeInfo.vestingAccountFee;
    localStorage.setItem(LOGIN_INFO, JSON.stringify(loginInfo));
  }
};

export const privateKeyReader = (
  file: Blob,
  password: any,
  loginAddress: string,
  accountNumber = "0",
  addressIndex = "0",
  bip39PassPhrase = "",
  coinType = configCoinType
) => {
  return new Promise(function (resolve, reject) {
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = async (event) => {
      if (event.target!.result !== "") {
        const res = JSON.parse(event.target!.result);
        const decryptedData = decryptKeyStore(res, password);
        if (decryptedData.error != null) {
          reject(new Error(decryptedData.error));
        } else {
          let mnemonic = mnemonicTrim(decryptedData.mnemonic);
          const accountData = await transactions.MnemonicWalletWithPassphrase(
            mnemonic,
            makeHdPath(accountNumber, addressIndex, coinType),
            bip39PassPhrase
          );
          const address = accountData[1];
          if (address === loginAddress) {
            resolve(mnemonic);
            localStorage.setItem(ENCRYPTED_MNEMONIC, event.target!.result);
          } else {
            reject(
              new Error(
                "Your sign in address and keystore file don’t match. Please try again or else sign in again."
              )
            );
          }
        }
      } else {
        reject(new Error("Invalid File data"));
      }
    };
  });
};

export const makeHdPath = (
  accountNumber = "0",
  addressIndex = "0",
  coinType = 118
) => {
  return stringToPath(
    "m/44'/" + coinType + "'/" + accountNumber + "'/0/" + addressIndex
  );
};

export const getAccountNumberAndSequence = (authResponse: any) => {
  if (
    authResponse.account["@type"] ===
    "/cosmos.vesting.v1beta1.PeriodicVestingAccount"
  ) {
    return [
      authResponse.account.base_vesting_account.base_account.account_number,
      authResponse.account.base_vesting_account.base_account.sequence,
    ];
  } else if (
    authResponse.account["@type"] ===
    "/cosmos.vesting.v1beta1.DelayedVestingAccount"
  ) {
    return [
      authResponse.account.base_vesting_account.base_account.account_number,
      authResponse.account.base_vesting_account.base_account.sequence,
    ];
  } else if (
    authResponse.account["@type"] ===
    "/cosmos.vesting.v1beta1.ContinuousVestingAccount"
  ) {
    return [
      authResponse.account.base_vesting_account.base_account.account_number,
      authResponse.account.base_vesting_account.base_account.sequence,
    ];
  } else if (
    authResponse.account["@type"] === "/cosmos.auth.v1beta1.BaseAccount"
  ) {
    return [authResponse.account.account_number, authResponse.account.sequence];
  } else {
    return [-1, -1];
  }
};

// copied from node_modules/@cosmjs/stargate/build/queries/ibc.js
export const decodeTendermintClientStateAny = (clientState: any) => {
  if (
    (clientState === null || clientState === void 0
      ? void 0
      : clientState.typeUrl) !== "/ibc.lightclients.tendermint.v1.ClientState"
  ) {
    throw new Error(
      `Unexpected client state type: ${
        clientState === null || clientState === void 0
          ? void 0
          : clientState.typeUrl
      }`
    );
  }
  return tendermint_1.ClientState.decode(clientState.value);
};

// copied from node_modules/@cosmjs/stargate/build/queries/ibc.js
export const decodeTendermintConsensusStateAny = (consensusState) => {
  if (
    (consensusState === null || consensusState === void 0
      ? void 0
      : consensusState.typeUrl) !==
    "/ibc.lightclients.tendermint.v1.ConsensusState"
  ) {
    throw new Error(
      `Unexpected client state type: ${
        consensusState === null || consensusState === void 0
          ? void 0
          : consensusState.typeUrl
      }`
    );
  }
  return tendermint_1.ConsensusState.decode(consensusState.value);
};

export const getChain = (chainId: string) => {
  return ExternalChains["Mainnet"].find((chain) => chain.chainId === chainId);
};
