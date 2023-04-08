import React, { useEffect, useRef } from "react";
import NavigationBar from "../organisms/navigationBar";
import SideBar from "../organisms/sidebar";
import useLocalStorage, {
  getStorageValue,
} from "../../customHooks/useLocalStorage";
import { useAppStore } from "../../../store/store";
import { useRouter } from "next/router";
import FeeOptions from "../organisms/common/fee";
import { persistenceChain } from "../../helpers/utils";

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
  const handleWalletAccountDetails = useAppStore(
    (state) => state.handleWalletAccountDetails
  );
  const handleWalletKeyStoreLoginDetails = useAppStore(
    (state) => state.handleWalletKeyStoreLoginDetails
  );

  const fetchWalletBalances = useAppStore((state) => state.fetchWalletBalances);
  const fetchWalletDelegations = useAppStore(
    (state) => state.fetchWalletDelegations
  );

  useEffect(() => {
    fetchWalletBalances(
      persistenceChain!.rpc,
      "persistence1g8v9tfy9lpwwdfjc9ylp68zexzt66sek6t4jnu"
    );
    fetchWalletDelegations(
      persistenceChain!.rpc,
      "persistence1g8v9tfy9lpwwdfjc9ylp68zexzt66sek6t4jnu"
    );
  }, []);

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
  return (
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
      <FeeOptions />
    </div>
  );
};
