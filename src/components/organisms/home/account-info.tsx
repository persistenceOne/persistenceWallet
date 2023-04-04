import { Icon } from "../../atoms/icon";
import React, { useEffect, useState } from "react";
import { useAppStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";
import { makeHdPath } from "../../../helpers/utils";
import { createWallet } from "../../../helpers/wallet";
import Button from "../../atoms/button";

const AccountInfo = ({ mnemonic }: any) => {
  const [info, setInfo] = useState<any>("");
  const [accountNumber, accountIndex, bip39Passphrase, active] = useAppStore(
    (state) => [
      state.wallet.advancedInfo.accountNumber,
      state.wallet.advancedInfo.accountIndex,
      state.wallet.advancedInfo.bip39Passphrase,
      state.wallet.advancedInfo.active,
    ],
    shallow
  );

  const handleSubmit = async () => {
    let defaultAccountNumber = 0;
    let defaultAddressIndex = 0;
    let defaultBip39Passphrase = "";

    if (active) {
      defaultAccountNumber = accountNumber;
      defaultAddressIndex = accountIndex;
      defaultBip39Passphrase = bip39Passphrase;
    }

    const walletPath = makeHdPath(
      defaultAccountNumber.toString(),
      defaultAddressIndex.toString()
    );
    const responseData = await createWallet(
      mnemonic,
      walletPath,
      defaultBip39Passphrase
    );
    setInfo(responseData);
    console.log(responseData, "responseData");
  };

  useEffect(() => {
    handleSubmit();
  }, []);
  return (
    <>
      <div className="px-8 pt-8 md:px-6 md:pt-6">
        <button className="absolute left-[50px] top-[40px]">
          <Icon viewClass="arrow-right" iconName="left-arrow" />
        </button>
        <p className="text-center text-light-high font-semibold text-2xl leading-normal">
          Wallet Details
        </p>
      </div>
      <div className="p-6">
        <p className="text-center text-light-emphasis mb-2">
          <span className="font-semibold">Wallet path:</span> {info.walletPath}
        </p>
        <p className="text-center text-light-emphasis">
          <span className="font-semibold">
            {" "}
            Address generated with Coin Type 118:
          </span>
          {info.address}
        </p>
        <div className={"my-2"}>
          <Button
            className="button md:text-sm flex items-center
            justify-center w-[150px] md:w-[200px] mx-auto mb-4"
            type="primary"
            size="medium"
            content="LogIn"
          />
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
