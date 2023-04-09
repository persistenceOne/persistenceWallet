import { CoinPretty, Dec, DecUtils } from "@keplr-wallet/unit";
import { getChain } from "./utils";

export const toPrettyCoin = (
  amount: string | Dec,
  denom: string,
  chainId: string
): CoinPretty => {
  const chainInfo = getChain(chainId)!;
  return new CoinPretty(
    chainInfo.currencies.find(
      (currency) => currency.coinMinimalDenom === denom
    ) || chainInfo.currencies[0],
    toDec(amount.toString())
  )
    .trim(true)
    .hideDenom(true);
};

export const getDecimalize = (value: string, precision: number) => {
  return toDec(value).quo(DecUtils.getTenExponentNInPrecisionRange(precision));
};

export const getUnDecimalize = (value: string, precision: number) => {
  return toDec(value).mul(DecUtils.getTenExponentNInPrecisionRange(precision));
};

export const toDec = (value: string, test = "s123") => {
  const valueTrim = value.replace(/,/g, "");
  return new Dec(valueTrim === "" ? "0" : valueTrim);
};
