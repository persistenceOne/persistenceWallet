import React from "react";
import Button from "../../atoms/button";
import NavigationBar from "../homePageNav";
import { useAppStore } from "../../../../store/store";
import CreateWallet from "./create-wallet";
import GenerateKeyStore from "./genarate-keystore";
import UpdateKeyStore from "../common/updatePassword";
import SignIn from "../common/signIn";
import SignInKeyStore from "../common/signIn/keyStore/key-store";

const HomeContainer = () => {
  const handleCreateWalletModal = useAppStore(
    (state) => state.handleCreateWalletModal
  );
  const createWalletHandler = () => {
    handleCreateWalletModal(true);
  };
  const handleCreateWalletKeystoreModal = useAppStore(
    (state) => state.handleCreateWalletKeystoreModal
  );

  const createWalletKeyStoreHandler = () => {
    handleCreateWalletKeystoreModal(true);
  };

  return (
    <div className="bg-homepage-bg h-screen">
      <NavigationBar />
      <div className="max-w-[700px] mx-auto">
        <div className={"pt-[150px]"}>
          <p
            className={
              "text-4xl text-light-high font-semibold text-center mb-2"
            }
          >
            Securely store, transfer and stake your XPRT tokens with the
            Persistence Wallet
          </p>
          <p
            className={"text-base text-light-emphasis font-medium text-center"}
          >
            Earn upto 35% annual rewards by staking your XPRT
          </p>
          <div className="pt-8">
            <Button
              className="button md:text-sm flex items-center
            justify-center w-[150px] mx-auto mb-4"
              type="primary"
              size="medium"
              content="Create Wallet"
              onClick={createWalletHandler}
            />
            <p
              className={
                "text-base text-light-emphasis text-center underline cursor-pointer"
              }
              onClick={createWalletKeyStoreHandler}
            >
              Generate KeyStore File
            </p>
          </div>
        </div>
      </div>
      <CreateWallet />
      <GenerateKeyStore />
      <UpdateKeyStore />
      <SignIn />
      <SignInKeyStore />
    </div>
  );
};

export default HomeContainer;
