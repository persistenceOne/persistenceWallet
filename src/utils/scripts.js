import _ from "lodash";
import empty from "is-empty";
import moment from "moment";
import { Decimal } from "@cosmjs/math";
const encoding = require("@cosmjs/encoding");

export const removeCommas = (str) => _.replace(str, new RegExp(",", "g"), "");
const reverseString = (str) =>
  removeCommas(_.toString(_.reverse(_.toArray(str))));

const recursiveReverse = (input) => {
  if (_.isArray(input))
    return _.toString(_.reverse(_.map(input, (v) => recursiveReverse(v))));
  if (_.isString) return reverseString(input);
  return reverseString(`${input}`);
};

export const formatNumber = (v = 0, size = 3) => {
  let str = `${v}`;
  if (empty(str)) return "NaN";
  let substr = str.split(".");
  if (substr[1] === undefined) {
    substr.push("000000");
  } else {
    substr[1] = sixDigitsNumber(substr[1]);
  }
  str = reverseString(substr[0]);
  const regex = `.{1,${size}}`;
  const arr = str.match(new RegExp(regex, "g"));
  return `${recursiveReverse(arr)}${substr[1] ? `.${substr[1]}` : ""}`;
};

export const localTime = (stringData) => {
  return moment(new Date(stringData).toString()).format("DD MMM YYYY hh:mm A");
};

export const emptyFunc = () => ({});

export const stringToNumber = (stringData) => {
  return +stringData;
};

export const randomNum = (min, max) => {
  let randomNumbers = [];
  for (let i = 0; i < 3; i++) {
    let random_number = Math.floor(Math.random() * (max - min) + min);
    if (randomNumbers.indexOf(random_number) === -1) {
      randomNumbers.push(random_number);
    }
  }
  return randomNumbers;
};

export const stringTruncate = (str, length = 7) => {
  if (str && str.length > 30) {
    return (
      str.substr(0, length) +
      "..." +
      str.substring(str.length - length, str.length)
    );
  }
  return str;
};

export const fileTypeCheck = (filePath) => {
  let allowedExtensions = /(\.json)$/i;
  return allowedExtensions.exec(filePath);
};

export const trimWhiteSpaces = (data) => {
  return data.split(" ").join("");
};

export const sixDigitsNumber = (value, length = 6) => {
  let inputValue = value.toString();
  if (inputValue.length >= length) {
    return inputValue.substr(0, 6);
  } else {
    const stringLength = length - inputValue.length;
    let newString = inputValue;
    for (let i = 0; i < stringLength; i++) {
      newString += "0";
    }
    return newString;
  }
};

export const isBech32Address = (address, prefix) => {
  try {
    let decodedAddress = encoding.fromBech32(address);
    return decodedAddress.prefix === prefix;
  } catch (e) {
    return false;
  }
};

export const mnemonicTrim = (mnemonic) => {
  let mnemonicList = mnemonic.replace(/\s/g, " ").split(/\s/g);
  let mnemonicWords = [];
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

export const decimalize = (valueString, decimals = 18) => {
  return Decimal.fromAtomics(valueString.toString(), decimals).toString();
};

export const unDecimalize = (valueString, decimals = 18) => {
  return Decimal.fromUserInput(valueString, decimals).atomics;
};
