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

const SignIn = () => {
  const modal = useAppStore((state) => state.wallet.signIn.modal);
  const handleWalletSignInModal = useAppStore(
    (state) => state.handleWalletSignInModal
  );

  const handleWalletSignInKeyStoreModal = useAppStore(
    (state) => state.handleWalletSignInKeyStoreModal
  );

  const handleClose = () => {
    handleWalletSignInModal(false);
  };

  const keyStoreHandler = () => {
    handleWalletSignInModal(false);
    handleWalletSignInKeyStoreModal(true);
  };

  return (
    <Modal
      show={modal}
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
            Login
          </p>
        </div>
        <div className="px-8 py-6 flex justify-center items-center">
          <div className="flex items-center flex-wrap justify-center">
            <div className="p-4 rounded-md bg-[#383838] w-[170px] text-center cursor-pointer group m-2">
              <Icon
                iconName="ledger"
                viewClass="fill-[#A6A6A6] mx-auto mb-2 !w-[24px] !h-[24px] group-hover:fill-[#ececec]"
              />
              <p className="group-hover:text-[#ececec] text-[#A6A6A6] font-medium">
                Cosmos Ledger
              </p>
            </div>
            <div className="p-4 rounded-md bg-[#383838] w-[170px] text-center cursor-pointer group m-2">
              <Icon
                iconName="ledger"
                viewClass="fill-[#A6A6A6] mx-auto mb-2 !w-[24px] !h-[24px] group-hover:fill-[#ececec]"
              />
              <p className="group-hover:text-[#ececec] text-[#A6A6A6] font-medium">
                Persistence Ledger
              </p>
            </div>
            <div className="p-4 rounded-md bg-[#383838] w-[170px] text-center cursor-pointer group m-2">
              <img
                src={"/images/keplr.svg"}
                width={22}
                height={22}
                className={"mx-auto mb-2"}
                alt="ledger"
              />
              <p className="group-hover:text-[#ececec] text-[#A6A6A6] font-medium">
                Keplr Wallet
              </p>
            </div>
            <div
              className="p-4 rounded-md bg-[#383838] w-[170px] text-center cursor-pointer group m-2"
              onClick={keyStoreHandler}
            >
              <img
                src={"/images/keplr.svg"}
                width={22}
                height={22}
                className={"mx-auto mb-2"}
                alt="ledger"
              />
              <p className="group-hover:text-[#ececec] text-[#A6A6A6] font-medium">
                Use KeyStore
              </p>
            </div>
            <div className="p-4 rounded-md bg-[#383838] w-[170px] text-center cursor-pointer group m-2">
              <img
                src={"/images/keplr.svg"}
                width={22}
                height={22}
                className={"mx-auto mb-2"}
                alt="ledger"
              />
              <p className="group-hover:text-[#ececec] text-[#A6A6A6] font-medium">
                Use Address
              </p>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default SignIn;
