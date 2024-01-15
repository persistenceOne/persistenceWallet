import React, { useEffect, useState } from "react";
import {
  HashRouter,
  Route,
  Switch,
  useHistory,
  withRouter
} from "react-router-dom";
import DashboardWallet from "./views/DashboardWallet";
import Homepage from "./views/Homepage";
import DashboardStaking from "./views/Staking";
import PrivateRoute from "./containers/PrivateRoute";
import RouteNotFound from "./components/RouteNotFound";
import icon_white from "./assets/images/icon_white.svg";
import { useTranslation } from "react-i18next";
import KeplrWallet from "./utils/keplr";
import { useDispatch } from "react-redux";
import { fetchDelegationsCount } from "./store/actions/delegations";
import { fetchTransferableVestingAmount } from "./store/actions/balance";
import { fetchRewards, fetchTotalRewards } from "./store/actions/rewards";
import { fetchUnbondDelegations } from "./store/actions/unbond";
import { fetchTokenPrice } from "./store/actions/tokenPrice";
import { fetchValidators } from "./store/actions/validators";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { keplrLogin, setKeplrInfo } from "./store/actions/signIn/keplr";
import { KEPLR_ADDRESS, LOGIN_INFO } from "./constants/localStorage";
import { updateFee } from "./utils/helper";
import { ledgerDisconnect } from "./utils/ledger";
import ReactGA from "react-ga4";
import packageJson from "../package.json";
import {
  fetchTokenizedShareRewards,
  fetchTokenizedShares
} from "./store/actions/tokenizeShares";
import ModalTerms from "./containers/TermsModal";

const SENTRY_API = process.env.REACT_APP_SENTRY_API;
const GOOGLE_ANALYTICS = process.env.REACT_APP_GA_TRACKING_ID;

ReactGA.initialize(GOOGLE_ANALYTICS);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.send(page);
};

//Update the package.json version everytime whenever new deployment happened to production to clear the browser cache.

const Main = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));

  const routes = [
    {
      path: "/dashboard/wallet",
      component: DashboardWallet,
      private: true
    },
    {
      path: "/dashboard/staking",
      component: DashboardStaking,
      private: true
    }
  ];

  const [isOnline, setNetwork] = useState(window.navigator.onLine);
  const updateNetwork = () => {
    if (window.navigator.onLine) {
      window.location.reload();
    }
    setNetwork(window.navigator.onLine);
  };

  const dispatch = useDispatch();

  let address;

  address = loginInfo && loginInfo.address;
  const page = location.pathname;

  if (page === "/dashboard/wallet") {
    console.log(page, "page-1");
    history.push("/#/dashboard/wallet");
  } else if (page === "/dashboard/staking") {
    history.push("/#/dashboard/staking");
  }

  useEffect(() => {
    const fetchApi = async () => {
      if (address !== null && address !== undefined) {
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
          ledgerDisconnect(dispatch, history);
        }
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    window.addEventListener("offline", updateNetwork);
    window.addEventListener("online", updateNetwork);
    return () => {
      window.removeEventListener("offline", updateNetwork);
      window.removeEventListener("online", updateNetwork);
    };
  });

  window.addEventListener("keplr_keystorechange", () => {
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
          dispatch(keplrLogin(history));
        })
        .catch((error) => {
          Sentry.captureException(
            error.response ? error.response.data.message : error.message
          );
          console.log(error.message);
        });
    }
  });

  Sentry.init({
    dsn: SENTRY_API,
    release: "wallet" + packageJson.version,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0
  });
  return (
    <>
      {!isOnline ? (
        <div className="network-check">
          <div className="stage">
            <div className="bouncer-holder">
              <div className="bouncer">
                <img src={icon_white} className="icon-white" alt="icon_white" />
              </div>
            </div>
            <h3 className="text-left">{t("NO_INTERNET")}</h3>
            <p>Try:</p>
            <ul>
              <li>{t("NO_INTERNET_NOTE1")}</li>
              <li>{t("NO_INTERNET_NOTE2")}</li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
      <HashRouter>
        <Switch>
          <Route path="/dashboard/wallet">
            <Redirect to="/#/dashboard/wallet" />
          </Route>
          <Route path="/dashboard/staking">
            <Redirect to="/#/dashboard/staking" />
          </Route>
          <Route
            key="/"
            exact
            component={
              JSON.parse(window.localStorage.getItem(LOGIN_INFO)) === null ||
              address === undefined ||
              address === null ||
              address === ""
                ? withRouter(Homepage)
                : withRouter(DashboardWallet)
            }
            path="/"
          />
          {routes.map((route) => {
            if (route.private) {
              return (
                <PrivateRoute
                  key={route.path}
                  exact
                  component={withRouter(route.component)}
                  path={route.path}
                />
              );
            }

            return (
              <Route
                key={route.path}
                exact
                component={withRouter(route.component)}
                path={route.path}
              />
            );
          })}
          <Route component={RouteNotFound} />
        </Switch>
      </HashRouter>
      <ModalTerms />
    </>
  );
};
export default Main;
