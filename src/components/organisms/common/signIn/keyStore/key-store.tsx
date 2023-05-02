import React, { useState } from "react";
import { CreateWalletSteps } from "../../../home/types";
import { useAppStore } from "../../../../../../store/store";
import Button from "../../../../atoms/button";
import Modal from "../../../../molecules/modal";
import KeyStore from "../../keyStore";
import {
  fileTypeCheck,
  getAccountNumber,
  makeHdPath,
  mnemonicTrim,
} from "../../../../../helpers/utils";
import {
  createWallet,
  decryptKeyStore,
  vestingAccountCheck,
} from "../../../../../helpers/wallet";
import { shallow } from "zustand/shallow";
import { displayToast } from "../../../../molecules/toast";
import { ToastType } from "../../../../molecules/toast/types";
import AdvancedOptions from "../../advanced";
import AccountInfo, { AccountInfoProps } from "./account-info";
import { GetAccount } from "../../../../../helpers/types";
import { getAccount } from "../../../../../pages/api/rpcQueries";

const SignInKeyStore = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [response, setResponse] = useState<AccountInfoProps | null>(null);
  const keyStoreModal = useAppStore(
    (state) => state.wallet.signIn.keyStoreModal
  );
  const handleWalletSignInKeyStoreModal = useAppStore(
    (state) => state.handleWalletSignInKeyStoreModal
  );

  const handleClose = () => {
    handleWalletSignInKeyStoreModal(false);
  };

  const [accountNumber, accountIndex, bip39Passphrase, file, password] =
    useAppStore(
      (state) => [
        state.wallet.advancedInfo.accountNumber,
        state.wallet.advancedInfo.accountIndex,
        state.wallet.advancedInfo.bip39Passphrase,
        state.wallet.keyStore.file,
        state.wallet.keyStore.password,
      ],
      shallow
    );

  const handleSubmit = () => {
    try {
      const fileReader = new FileReader();
      let mnemonic = "";
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = async (event: any) => {
        const encryptedMnemonic = event.target.result;
        const res = JSON.parse(event.target.result);
        const decryptedData = decryptKeyStore(res, password);
        if (decryptedData.error != null) {
          throw Error(decryptedData.error);
        } else {
          mnemonic = mnemonicTrim(decryptedData.mnemonic);
          const walletPath118 = makeHdPath(
            getAccountNumber(accountNumber.toString()),
            getAccountNumber(accountIndex.toString()),
            118
          );
          const walletPath750 = makeHdPath(
            getAccountNumber(accountNumber.toString()),
            getAccountNumber(accountIndex.toString()),
            750
          );

          const coin118Response: any = await createWallet(
            mnemonic,
            walletPath118,
            bip39Passphrase
          );
          const coin750Response: any = await createWallet(
            mnemonic,
            walletPath750,
            bip39Passphrase
          );

          const accountType118: GetAccount = await getAccount(
            coin118Response.address!
          );

          const accountType750: GetAccount = await getAccount(
            coin750Response.address!
          );

          const coin118Data = {
            address: coin118Response.address!,
            walletPath: coin118Response.walletPath,
            accountType: vestingAccountCheck(accountType118.typeUrl!)
              ? "vesting"
              : "non-vesting",
          };

          const coin750Data = {
            address: coin750Response.address,
            walletPath: coin750Response.walletPath,
            accountType: vestingAccountCheck(accountType750.typeUrl!)
              ? "vesting"
              : "non-vesting",
          };

          setResponse({
            coin118Data,
            coin750Data,
            accountNumber,
            accountIndex,
            bip39Passphrase,
            encryptedMnemonic,
          });
        }
      };
    } catch (e: any) {
      console.log(e, "tesssss");
      displayToast(
        {
          heading: "Login Error",
          message: e.error || e.message,
        },
        ToastType.ERROR
      );
    }
  };
  return (
    <Modal
      show={keyStoreModal}
      onClose={handleClose}
      header=""
      modalBodyClassName={"!p-0"}
      modalDialogClassName={"!max-w-[650px]"}
      staticBackDrop={true}
      closeButton={true}
    >
      {response === null ? (
        <>
          <div className="px-8 pt-8 md:px-6 md:pt-6">
            <p className="text-center text-light-high font-semibold text-2xl leading-normal">
              KeyStore Login
            </p>
          </div>
          <div className="px-8 py-6 ">
            <KeyStore setErrorMessage={setErrorMessage} />
            <p className={"text-sm text-red"}>{errorMessage}</p>
            <AdvancedOptions />
            <div className={"my-2"}>
              <Button
                className="button md:text-sm flex items-center
            justify-center w-[150px] md:w-[200px] mx-auto mb-4"
                type="primary"
                size="medium"
                content="Submit"
                disabled={errorMessage !== "" || password === ""}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </>
      ) : (
        <AccountInfo {...response} />
      )}
    </Modal>
  );
};

export default SignInKeyStore;
