import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useAppStore } from "../../store/store";
import { useEffect } from "react";
import { getStorageValue } from "../customHooks/useLocalStorage";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
