import React, { useState } from "react";
import { CreateWalletSteps } from "../../home/types";
import { useAppStore } from "../../../../../store/store";
import Button from "../../../atoms/button";
import Modal from "../../../molecules/modal";
import KeyStore from "../keyStore";
import {
  fileTypeCheck,
  getAccountNumber,
  makeHdPath,
  mnemonicTrim,
} from "../../../../helpers/utils";
import { createWallet, decryptKeyStore } from "../../../../helpers/wallet";
import { shallow } from "zustand/shallow";
import { Icon } from "../../../atoms/icon";

const SignInKeplr = () => {
  const keyStoreModal = useAppStore(
    (state) => state.wallet.signIn.keyStoreModal
  );
  const handleWalletSignInKeyStoreModal = useAppStore(
    (state) => state.handleWalletSignInKeyStoreModal
  );

  const handleClose = () => {
    handleWalletSignInKeyStoreModal(false);
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
            KeyStore Login
          </p>
        </div>
        <div className="px-8 py-6 "></div>
      </>
    </Modal>
  );
};

export default SignInKeplr;
