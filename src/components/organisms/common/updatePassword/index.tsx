import React, { useState } from "react";
import { CreateWalletSteps } from "../../home/types";
import { useAppStore } from "../../../../../store/store";
import Button from "../../../atoms/button";
import Modal from "../../../molecules/modal";
import KeyStore from "../keyStore";
import ChangePassword from "./change-password";
import {
  fileTypeCheck,
  getAccountNumber,
  makeHdPath,
  mnemonicTrim,
} from "../../../../helpers/utils";
import { createWallet, decryptKeyStore } from "../../../../helpers/wallet";
import { shallow } from "zustand/shallow";

const UpdateKeyStore = () => {
  const [steps, setSteps] = useState<CreateWalletSteps>("1");
  const [errorMessage, setErrorMessage] = useState("");
  const [response, setResponse] = useState("");

  const [
    accountNumber,
    accountIndex,
    bip39Passphrase,
    active,
    file,
    password,
    coinType,
  ] = useAppStore(
    (state) => [
      state.wallet.advancedInfo.accountNumber,
      state.wallet.advancedInfo.accountIndex,
      state.wallet.advancedInfo.bip39Passphrase,
      state.wallet.advancedInfo.active,
      state.wallet.keyStore.file,
      state.wallet.keyStore.password,
      state.wallet.keyStore.coinType,
    ],
    shallow
  );

  const handleWalletChangePassWordModal = useAppStore(
    (state) => state.handleWalletChangePassWordModal
  );
  const modal = useAppStore((state) => state.wallet.changePassword.modal);

  const handleClose = () => {
    setSteps("1");
    handleWalletChangePassWordModal(false);
  };

  const handleSteps = (step: CreateWalletSteps) => {
    setSteps(step);
  };

  const handleSubmit = () => {
    let filePath = file.name;
    if (fileTypeCheck(filePath)) {
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = async (event: any) => {
        const res = JSON.parse(event.target.result);

        const decryptedData = decryptKeyStore(res, password);
        if (decryptedData.error != null) {
          setErrorMessage(decryptedData.error);
        } else {
          let mnemonic = mnemonicTrim(decryptedData.mnemonic);
          const walletPath = makeHdPath(
            getAccountNumber(accountNumber.toString()),
            getAccountNumber(accountIndex.toString()),
            coinType
          );
          const responseData: any = await createWallet(
            mnemonic,
            walletPath,
            bip39Passphrase
          );
          setResponse(responseData);
          setSteps("2");
          setErrorMessage("");
          console.log(responseData, "responseData");
        }
      };
    } else {
      setErrorMessage("File type not supported");
    }
  };

  return (
    <Modal
      show={modal}
      onClose={handleClose}
      header=""
      modalBodyClassName={"!p-0"}
      modalDialogClassName={"!max-w-[600px]"}
      staticBackDrop={true}
      closeButton={true}
    >
      <div className="px-8 pt-8 md:px-6 md:pt-6">
        <p className="text-center text-light-high font-semibold text-2xl leading-normal">
          Change KeyStore Password
        </p>
      </div>
      <div className="px-8 py-6">
        {steps === "1" ? (
          <>
            <KeyStore />
            <p className={"text-sm text-red"}>{errorMessage}</p>
            <div className={"my-2"}>
              <Button
                className="button md:text-sm flex items-center
            justify-center w-[150px] md:w-[200px] mx-auto mb-4"
                type="primary"
                size="medium"
                content="Submit"
                onClick={handleSubmit}
              />
            </div>
          </>
        ) : steps === "2" ? (
          <ChangePassword resposne={response} />
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
};

export default UpdateKeyStore;
