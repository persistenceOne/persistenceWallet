import React, { useState } from "react";
import Radio from "../../../atoms/radio";
import { useAppStore } from "../../../../../store/store";
import { CoinType } from "../../../../../store/slices/wallet";

const CoinType = () => {
  const coinType = useAppStore((state) => state.wallet.keyStore.coinType);

  const handleWalletKeyStoreCoinType = useAppStore(
    (state) => state.handleWalletKeyStoreCoinType
  );

  const handleRadioChange = (value: CoinType) => {
    handleWalletKeyStoreCoinType(value);
  };

  return (
    <div className="flex my-4">
      <Radio
        checked={coinType === 750}
        label="Coin Type 750"
        id={"Persistence"}
        className="mr-3"
        onClick={() => handleRadioChange(750)}
      />
      <Radio
        checked={coinType === 118}
        label="Coin Type 118"
        id={"Ethereum"}
        onClick={() => handleRadioChange(118)}
      />
    </div>
  );
};

export default CoinType;
