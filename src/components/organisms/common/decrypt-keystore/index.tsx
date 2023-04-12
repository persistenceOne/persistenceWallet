import React, { useState } from "react";
import { useAppStore } from "../../../../../store/store";
import Button from "../../../atoms/button";
import Modal from "../../../molecules/modal";
import { shallow } from "zustand/shallow";
import {
  decryptKeyStore,
  MnemonicWalletWithPassphrase,
} from "../../../../helpers/wallet";
import {
  exceptionHandle,
  makeHdPath,
  persistenceChain,
} from "../../../../helpers/utils";
import { defaultChain } from "../../../../helpers/utils";
import { executeSendTransaction } from "../../../../helpers/transactions";
import { fee, sendMsg } from "../../../../helpers/protoMsg";
import {
  getDecimalize,
  getUnDecimalize,
  toDec,
} from "../../../../helpers/coin";

const DecryptKeyStore = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [
    keyStoreModal,
    encryptedSeed,
    accountDetails,
    coinType,
    txnInfo,
    feeValue,
    gas,
    msgs,
  ] = useAppStore(
    (state) => [
      state.wallet.decryptKeyStore.modal,
      state.wallet.keyStoreLoginDetails.encryptedSeed,
      state.wallet.accountDetails,
      state.wallet.keyStore.coinType,
      state.transactions.send,
      state.transactions.feeInfo.fee.value,
      state.transactions.gas.gas,
      state.transactions.txnMsgs,
    ],
    shallow
  );

  const handleDecryptKeystoreModal = useAppStore(
    (state) => state.handleDecryptKeystoreModal
  );

  const handleClose = () => {
    handleDecryptKeystoreModal(false);
  };

  const onChange = (evt: any) => {
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

  const handleSubmit = async () => {
    try {
      const res = JSON.parse(encryptedSeed!);
      const decryptedData = decryptKeyStore(res, password);
      if (decryptedData.error != null) {
        throw new Error(decryptedData.error);
      }
      const mnemonic = decryptedData.mnemonic;

      const hdPath = makeHdPath(
        accountDetails.accountNumber!,
        accountDetails.accountIndex!,
        coinType!
      );
      const feeMsg = fee(
        toDec(feeValue!.toString()).truncate().toString(),
        gas.toString()
      );

      const response = await MnemonicWalletWithPassphrase(
        mnemonic,
        hdPath,
        accountDetails.bipPasPhrase!,
        defaultChain.prefix
      );
      handleDecryptKeystoreModal(false);
      await executeSendTransaction({
        signer: response.wallet,
        fee: feeMsg,
        rpc: persistenceChain!.rpc,
        msgs: msgs,
        signerAddress: response.address!,
        memo: "",
      });
    } catch (e: any) {
      exceptionHandle(e, { "Error while submitting txn": "" });
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
      <>
        <div className="px-8 pt-8 md:px-6 md:pt-6">
          <p className="text-center text-light-high font-semibold text-2xl leading-normal">
            KeyStore
          </p>
        </div>
        <div className="px-8 py-6 ">
          <div className="mb-2">
            <p className="mb-1">Password</p>
            <input
              disabled={false}
              onChange={onChange}
              className="h-[40px] w-full p-2 rounded-sm"
              type="password"
              defaultValue=""
              required={true}
            />
          </div>
          <p className={"text-sm text-red"}>{errorMessage}</p>
          <div className="pt-6">
            <Button
              className="button md:text-sm flex items-center
            justify-center w-[250px] mx-auto mb-4"
              type="primary"
              size="medium"
              disabled={false}
              content="Send"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </>
    </Modal>
  );
};

export default DecryptKeyStore;
