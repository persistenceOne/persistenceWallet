import React, { useEffect } from "react";
import { Spinner } from "../../../../atoms/spinner";
import Button from "../../../../atoms/button";
import { useAppStore } from "../../../../../../store/store";
import { useRouter } from "next/router";
import {
  AccountDetails,
  KeyStoreLoginDetails,
} from "../../../../../../store/slices/wallet";
import useLocalStorage from "../../../../../customHooks/useLocalStorage";
import { GetAccount } from "../../../../../helpers/types";
import { getAccount } from "../../../../../pages/api/rpcQueries";

export interface AccountInfoProps {
  coin118Data: any;
  coin750Data: any;
  accountNumber: string;
  accountIndex: string;
  bip39Passphrase: string;
  encryptedMnemonic: string;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ ...Props }) => {
  const router = useRouter();
  const [accountInfo, setAccountInfo] = useLocalStorage("accountDetails", "");
  const [keyStoreDetails, setKeyStoreDetails] = useLocalStorage(
    "accountKeyStoreDetails",
    ""
  );
  console.log(Props, "Props");
  const {
    coin118Data,
    accountIndex,
    accountNumber,
    coin750Data,
    encryptedMnemonic,
    bip39Passphrase,
  } = Props;
  useEffect(() => {}, []);
  const handleWalletAccountDetails = useAppStore(
    (state) => state.handleWalletAccountDetails
  );
  const handleWalletKeyStoreLoginDetails = useAppStore(
    (state) => state.handleWalletKeyStoreLoginDetails
  );

  const handleSubmit = async () => {
    const accountDetails: AccountDetails = {
      accountType: coin750Data.accountType,
      address: "persistence1tkng9jvja2a3g49pt08fguh2g28lgmz46nkz7w",
      loginType: "keyStore",
      accountIndex: accountIndex,
      accountNumber: accountNumber,
      bipPasPhrase: bip39Passphrase,
    };
    const accountKeyStoreDetails: KeyStoreLoginDetails = {
      coin118Info: {
        walletPath: coin118Data.walletPath,
        address: "persistence1tkng9jvja2a3g49pt08fguh2g28lgmz46nkz7w",
        accountType: coin118Data.accountType,
      },
      coin750Info: {
        walletPath: coin750Data.walletPath,
        address: "persistence1tkng9jvja2a3g49pt08fguh2g28lgmz46nkz7w",
        accountType: coin750Data.accountType,
      },
      encryptedSeed: encryptedMnemonic,
    };
    setAccountInfo(accountDetails);
    setKeyStoreDetails(accountKeyStoreDetails);
    handleWalletAccountDetails(accountDetails);
    handleWalletKeyStoreLoginDetails(accountKeyStoreDetails);
    await router.push("/dashboard");
  };

  return (
    <>
      <div className="px-8 pt-8 md:px-6 md:pt-6">
        <p className="text-center text-light-high font-semibold text-2xl leading-normal">
          Account Details
        </p>
      </div>
      <div className="px-8 py-6">
        <p className="text-sm mb-2">
          As part of the Persistence v3 chain upgrade, the default coin-type was
          changed from 750 to 118, which means a new address (coin-type 118) was
          generated based on your KeyStore.
        </p>
        <div>
          <p className="text-left pt-0 pb-2">
            <span className="">New address: </span>
            {coin118Data?.address}
          </p>
          <p className="text-left pt-0 pb-2">
            <span className="">Wallet path: </span>
            {coin118Data?.walletPath}
          </p>
          <p className="text-left pt-0 pb-2">
            <span className="">Coin-type: </span>118{" "}
          </p>
          <p className="text-left p-0 d-flex align-items-center">
            <span className="m-0">Balance:&nbsp;</span>
            {true ? <Spinner size={"small"} /> : <>{123} XPRT</>}
          </p>
        </div>
        <div>
          <p className="text-left pt-0 pb-2">
            <span className="">Original address: </span>
            {coin750Data?.address}
          </p>
          <p className="text-left pt-0 pb-2">
            <span className="">Wallet path: </span>
            {coin118Data?.walletPath}
          </p>
          <p className="text-left pt-0 pb-2">
            <span className="">Coin-type: </span>750{" "}
          </p>
          <p className="text-left p-0 d-flex align-items-center">
            <span className="m-0">Balance:&nbsp;</span>
            {true ? <Spinner size={"small"} /> : <>{123} XPRT</>}
          </p>
        </div>
        <p>
          <b>Note: </b>Fungibility of assets is NOT impacted and both coin-types
          are still supported. Each address can hold assets, and assets can be
          transferred between account types. Read all details{" "}
        </p>
        <div className={"my-2"}>
          <Button
            className="button md:text-sm flex items-center
            justify-center w-[250px] md:w-[200px] mx-auto mb-4"
            type="primary"
            size="medium"
            content="Proceed to Login"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
