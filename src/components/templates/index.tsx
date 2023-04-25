import React, { useEffect, useRef } from "react";
import NavigationBar from "../organisms/navigationBar";
import SideBar from "../organisms/sidebar";
import { getStorageValue } from "../../customHooks/useLocalStorage";
import { useAppStore } from "../../../store/store";
import { persistenceChain } from "../../helpers/utils";
import DecryptKeyStore from "../organisms/common/decrypt-keystore";
import { useRouter } from "next/router";
import GenerateKeyStore from "../organisms/home/genarate-keystore";
import UpdateKeyStore from "../organisms/common/updatePassword";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

export const Template = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className: string;
  title: string;
}) => {
  const router = useRouter();
  const handleWalletAccountDetails = useAppStore(
    (state) => state.handleWalletAccountDetails
  );
  const handleWalletKeyStoreLoginDetails = useAppStore(
    (state) => state.handleWalletKeyStoreLoginDetails
  );

  const address = useAppStore((state) => state.wallet.accountDetails.address);

  const fetchWalletBalances = useAppStore((state) => state.fetchWalletBalances);
  const fetchWalletDelegations = useAppStore(
    (state) => state.fetchWalletDelegations
  );
  const fetchTokenPrice = useAppStore((state) => state.fetchTokenPrice);
  const fetchWalletUnbonding = useAppStore(
    (state) => state.fetchWalletUnbonding
  );

  useEffect(() => {
    if (address !== null) {
      fetchWalletBalances(persistenceChain!.rpc, address);
      fetchWalletDelegations(persistenceChain!.rpc, address);
      fetchWalletUnbonding(persistenceChain!.rpc, address);
    }
  }, [address]);

  useEffect(() => {
    const accountInfo = getStorageValue("accountDetails", "");
    const accountKeyStoreDetails = getStorageValue(
      "accountKeyStoreDetails",
      ""
    );
    console.log(accountInfo, "accountInfo");
    if (accountInfo !== "") {
      handleWalletAccountDetails(accountInfo);
      handleWalletKeyStoreLoginDetails(accountKeyStoreDetails);
    }
  }, []);

  useEffect(() => {
    fetchTokenPrice();
  }, []);

  return address !== null ? (
    <div className="bg-body-bg">
      <NavigationBar />
      <div className="flex md:block h-[calc(100vh-84px)]">
        <SideBar />
        <div
          className={`flex-1 h-full overflow-auto bg-no-repeat ` + className}
        >
          {children}
        </div>
      </div>
      <DecryptKeyStore />
      <GenerateKeyStore />
      <UpdateKeyStore />
    </div>
  ) : (
    <div className="bg-body-bg"></div>
  );
};
