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
    new Dec(amount.toString())
  )
    .trim(true)
    .hideDenom(true);
};

export const getUnDecimaliedValue = (
  value: string | number,
  precision: number
) => {
  const bridgeFee: Dec = new Dec(value).mul(
    DecUtils.getTenExponentNInPrecisionRange(precision)
  );
  return bridgeFee;
};
