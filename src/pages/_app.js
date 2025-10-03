
import { Provider } from 'react-redux';
import { store } from '../store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import I18nProvider from '../components/Internationalization/I18nProvider';
import { useDispatch } from 'react-redux';
import { fetchDelegationsCount } from '../store/actions/delegations';
import { fetchTransferableVestingAmount } from '../store/actions/balance';
import { fetchRewards, fetchTotalRewards } from '../store/actions/rewards';
import { fetchUnbondDelegations } from '../store/actions/unbond';
import { fetchTokenPrice } from '../store/actions/tokenPrice';
import { fetchValidators } from '../store/actions/validators';
import { keplrLogin, setKeplrInfo } from '../store/actions/signIn/keplr';
import { KEPLR_ADDRESS, LOGIN_INFO } from '../constants/localStorage';
import { updateFee } from '../utils/helper';
import { ledgerDisconnect } from '../utils/ledger';
import KeplrWallet from '../utils/keplr';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import ReactGA from "react-ga4";
import packageJson from "../../package.json";
import {
  fetchTokenizedShareRewards,
  fetchTokenizedShares
} from '../store/actions/tokenizeShares';
import ModalTerms from '../containers/TermsModal';
import '../assets/scss/index.scss';
import '../components/Internationalization/i18n';

const SENTRY_API = process.env.NEXT_PUBLIC_SENTRY_API;
const GOOGLE_ANALYTICS = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

// Initialize Google Analytics only if the tracking ID is provided
if (GOOGLE_ANALYTICS) {
  ReactGA.initialize(GOOGLE_ANALYTICS);
}

const trackPage = (page) => {
  if (GOOGLE_ANALYTICS) {
    ReactGA.set({ page });
    ReactGA.send(page);
  }
};

// Component that uses Redux hooks - must be inside Provider
function AppContent({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOnline, setNetwork] = useState(true);

  const updateNetwork = () => {
    if (window.navigator.onLine) {
      window.location.reload();
    }
    setNetwork(window.navigator.onLine);
  };

  useEffect(() => {
    // Set initial network status
    setNetwork(window.navigator.onLine);
  }, []);

  useEffect(() => {
    // Network status listeners
    window.addEventListener("offline", updateNetwork);
    window.addEventListener("online", updateNetwork);
    return () => {
      window.removeEventListener("offline", updateNetwork);
      window.removeEventListener("online", updateNetwork);
    };
  }, []);

  useEffect(() => {
    // Initialize data fetching for logged-in users
    const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO) || 'null');
    const address = loginInfo?.address;

    if (address) {
      const fetchApi = async () => {
        await Promise.all([
          dispatch(fetchDelegationsCount(address)),
          dispatch(fetchRewards(address)),
          dispatch(fetchTotalRewards(address)),
          dispatch(fetchUnbondDelegations(address)),
          dispatch(fetchTokenPrice()),
          dispatch(fetchTransferableVestingAmount(address)),
          dispatch(fetchTokenizedShares(address)),
          dispatch(fetchTokenizedShareRewards(address)),
          dispatch(fetchValidators(address)),
          updateFee(address),
          setInterval(() => dispatch(fetchTotalRewards(address)), 10000)
        ]);
        
        if (loginInfo && loginInfo.loginMode === "ledger") {
          ledgerDisconnect(dispatch, router);
        }
      };
      fetchApi();
    }
  }, [dispatch, router]);

  useEffect(() => {
    // Keplr keystore change listener
    const handleKeplrKeystoreChange = () => {
      const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO) || 'null');
      if (loginInfo && loginInfo.loginMode === "keplr") {
        const keplr = KeplrWallet();
        keplr
          .then(function () {
            const address = localStorage.getItem(KEPLR_ADDRESS);
            dispatch(
              setKeplrInfo({
                value: address,
                error: {
                  message: ""
                }
              })
            );
            dispatch(keplrLogin(router));
          })
          .catch((error) => {
            if (SENTRY_API) {
              Sentry.captureException(
                error.response ? error.response.data.message : error.message
              );
            }
            console.log(error.message);
          });
      }
    };

    window.addEventListener("keplr_keystorechange", handleKeplrKeystoreChange);
    
    return () => {
      window.removeEventListener("keplr_keystorechange", handleKeplrKeystoreChange);
    };
  }, [dispatch, router]);

  return (
    <>
      {!isOnline ? (
        <div className="network-check">
          <div className="stage">
            <div className="bouncer-holder">
              <div className="bouncer">
                <img src="/images/icon_white.svg" className="icon-white" alt="icon_white" width={32} height={32} />
              </div>
            </div>
            <h3 className="text-left">No Internet Connection</h3>
            <p>Try:</p>
            <ul>
              <li>Check your internet connection</li>
              <li>Refresh the page</li>
            </ul>
          </div>
        </div>
      ) : (
        <Component {...pageProps} />
      )}
      <ModalTerms />
    </>
  );
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Initialize any global setup here
    console.log('Persistence Wallet - Next.js App Started');
    
    // Initialize Sentry only if the API key is provided
    if (SENTRY_API) {
      Sentry.init({
        dsn: SENTRY_API,
        release: "wallet" + packageJson.version,
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 1.0
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <I18nProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </I18nProvider>
    </Provider>
  );
}

export default MyApp;
