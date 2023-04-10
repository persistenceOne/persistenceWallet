import React, { useState } from "react";
import Button from "../../atoms/button";
import NavigationBar from "../homePageNav";
import { useAppStore } from "../../../../store/store";
import CreateWallet from "./create-wallet";
import Modal from "../../molecules/modal";
import SeedCreation from "./seed-creation";
import { downloadFile, validateMnemonic } from "../../../helpers/utils";
import { createKeyStore } from "../../../helpers/wallet";

const GenerateKeyStore = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [downLoadStatus, setDownloadStatus] = useState<boolean>(false);
  const [mnemonic, setMnemonic] = useState("");

  const handleCreateWalletKeystoreModal = useAppStore(
    (state) => state.handleCreateWalletKeystoreModal
  );

  const modal = useAppStore(
    (state) => state.createWallet.generateKeyStore.modal
  );
  const handleWalletChangePassWordModal = useAppStore(
    (state) => state.handleWalletChangePassWordModal
  );

  const handleClose = () => {
    setErrorMessage("");
    setDownloadStatus(false);
    handleCreateWalletKeystoreModal(false);
  };

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
  const submitHandler = async () => {
    let encryptedData = createKeyStore(mnemonic, password);
    let jsonContent = JSON.stringify(encryptedData.Response);
    await downloadFile(jsonContent);
    setDownloadStatus(true);
  };

  const mnemonicHandler = (evt: any) => {
    if (validateMnemonic(evt.target.value)) {
      setMnemonic(evt.target.value);
    } else {
      setErrorMessage("Invalid mnemonic");
    }
  };

  const handleChangeKeyStore = () => {
    setDownloadStatus(false);
    handleCreateWalletKeystoreModal(false);
    handleWalletChangePassWordModal(true);
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
          Generate KeyStore
        </p>
      </div>
      {!downLoadStatus ? (
        <div className="px-8 py-6">
          <div className="">
            <div className="mb-2">
              <p className="mb-1">Mnemonic</p>
              <textarea
                name="postContent"
                className="w-full rounded-sm"
                onChange={mnemonicHandler}
                rows={3}
              />
            </div>

            <div className="mb-2">
              <p className="mb-1">Password</p>
              <input
                disabled={false}
                onChange={onChangePassword}
                className="h-[40px] w-full p-2 rounded-sm"
                type="password"
                defaultValue=""
                required={true}
              />
              <p className={"text-sm text-red"}>{errorMessage}</p>
            </div>
            <p>
              Note: Password encrypts your seed phrase. This password does not
              help you generate your seed phrase.
            </p>
          </div>
          <div className={"mb-2 mt-6"}>
            <Button
              className="button md:text-sm flex items-center
            justify-center w-[250px] md:w-[200px] mx-auto mb-4"
              type="primary"
              size="medium"
              disabled={errorMessage !== ""}
              content="Submit"
              onClick={submitHandler}
            />
          </div>
          <p
            className={
              "text-light-emphasis text-center font-medium underline cursor-pointer"
            }
            onClick={handleChangeKeyStore}
          >
            Change KeyStore Password
          </p>
        </div>
      ) : (
        <div className="px-8 py-6">
          <p className={"text-green text-center font-medium"}>
            Keystore Successfully downloaded
          </p>
          <div className={"mt-6"}>
            <Button
              className="button md:text-sm flex items-center
            justify-center w-[250px] md:w-[200px] mx-auto mb-4"
              type="primary"
              size="medium"
              content="Close"
              onClick={handleClose}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default GenerateKeyStore;
