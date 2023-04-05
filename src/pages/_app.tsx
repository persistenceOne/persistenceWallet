import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useAppStore } from "../../store/store";
import { useEffect } from "react";
import { getStorageValue } from "../customHooks/useLocalStorage";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const handleWalletAccountDetails = useAppStore(
    (state) => state.handleWalletAccountDetails
  );
  const handleWalletKeyStoreLoginDetails = useAppStore(
    (state) => state.handleWalletKeyStoreLoginDetails
  );
  useEffect(() => {
    const accountInfo = getStorageValue("accountDetails", "");
    console.log(accountInfo, "accountInfo");
    if (accountInfo !== "") {
      handleWalletAccountDetails(accountInfo);
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
