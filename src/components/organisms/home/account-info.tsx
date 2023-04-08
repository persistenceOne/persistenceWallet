import { Icon } from "../../atoms/icon";
import React, { useEffect, useState } from "react";
import { useAppStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";
import { makeHdPath } from "../../../helpers/utils";
import { createKeyStore, createWallet } from "../../../helpers/wallet";
import Button from "../../atoms/button";

const AccountInfo = ({ mnemonic }: any) => {
  const [info, setInfo] = useState<any>("");
  const [keyStoreGenerate, setKeyStoreGenerate] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");

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
    let defaultAccountNumber = "0";
    let defaultAddressIndex = "0";
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

  const onChangePassword = (evt: any) => {
    const value = evt.target.value;
    const regex = /^\S{3}\S+$/;
    if (regex.test(value)) {
      setPassword(value);
      setErrorMessage("");
    } else {
      setErrorMessage(
        "Password must be greater than 3 letters and no spaces allowed"
      );
    }
  };

  const downloadFile = async (jsonContent: any) => {
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

  const keyStoreGenerateHandler = () => {
    let encryptedData = createKeyStore(mnemonic, password);
    let jsonContent = JSON.stringify(encryptedData.Response);
    downloadFile(jsonContent);
  };

  const previousHandler = () => {
    setKeyStoreGenerate(false);
  };
  console.log("password", password.length);

  return !keyStoreGenerate ? (
    <>
      <div className="px-8 pt-8 md:px-6 md:pt-6">
        <p className="text-center text-light-high font-semibold text-2xl leading-normal">
          Wallet Details
        </p>
      </div>
      <div className="px-8 py-6">
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
        <p
          onClick={() => setKeyStoreGenerate(true)}
          className="bg-[#e9721c12] px-4 py-2 text-[#e9721c] cursor-pointer underline text-center my-4 "
        >
          Generate KeyStore
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
  ) : (
    <>
      <div className="px-8 pt-8 md:px-6 md:pt-6">
        <button
          className="absolute left-[40px] top-[40px]"
          onClick={previousHandler}
        >
          <Icon viewClass="arrow-right fill-[#fff]" iconName="left-arrow" />
        </button>
        <p className="text-center text-light-high font-semibold text-2xl leading-normal">
          Generate KeyStore
        </p>
      </div>
      <div className="px-8 py-6">
        <div className="">
          <div className="mb-6">
            <p className="mb-1">Password</p>
            <input
              disabled={false}
              onChange={onChangePassword}
              className="h-[40px] w-full p-2 rounded-sm"
              type="password"
              defaultValue=""
              required={true}
            />
            {errorMessage}
          </div>
          <div className={"my-2"}>
            <Button
              className="button md:text-sm flex items-center
            justify-center w-[250px] md:w-[200px] mx-auto mb-4"
              type="primary"
              size="medium"
              disabled={errorMessage !== ""}
              content="Generate KeyStore"
              onClick={keyStoreGenerateHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
