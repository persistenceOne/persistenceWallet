import React, { useEffect, useState } from "react";
import Icon from "../../components/Icon";
import { NavLink, useHistory } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Copy from "../../components/Copy";
import { useTranslation } from "react-i18next";
import Darktheme from "../DarkTheme";
import MobileSidebar from "./MobileSidebar";
import transactions from "../../utils/transactions";
import { userLogout } from "../../store/actions/logout";
import { useDispatch, useSelector } from "react-redux";
import { showKeyStoreMnemonicModal } from "../../store/actions/generateKeyStore";
import { LOGIN_INFO, THEME } from "../../constants/localStorage";
import { formatNumber, stringTruncate } from "../../utils/scripts";
import { makeHdPath } from "../../utils/helper";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import ReactGA from "react-ga4";
import { DefaultChainInfo, ExternalChains } from "../../config";
import Banner from "../../components/Banner";
import { keyStoreLogin } from "../../store/actions/signIn/keyStore";
import NumberView from "../../components/NumberView";

const DashboardHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const [activeWallet, setActiveWallet] = useState("");
  const tokenPrice = useSelector((state) => state.tokenPrice.tokenPrice);
  useEffect(() => {
    const localTheme = window.localStorage.getItem(THEME);
    if (localTheme === "light") {
      if (document.getElementById("root").classList.contains("dark-mode")) {
        document.getElementById("root").classList.add("light-mode");
        document.getElementById("root").classList.remove("dark-mode");
      }
    } else {
      if (document.getElementById("root").classList.contains("light-mode")) {
        document.getElementById("root").classList.add("dark-mode");
        document.getElementById("root").classList.remove("light-mode");
      }
    }
    setActiveWallet(
      loginInfo && loginInfo?.coin118Response?.address === loginInfo?.address
        ? "118"
        : "750"
    );
  }, []);

  const closeWallet = () => {
    dispatch(userLogout());
    localStorage.clear();
    history.push("/");
    window.location.reload();
    if (loginInfo && loginInfo.loginMode === "ledger") {
      TransportWebUSB.close();
    }
  };

  const handleKeyStore = () => {
    dispatch(showKeyStoreMnemonicModal());
  };

  const ledgerShowAddress = async () => {
    const accountNumber = loginInfo && loginInfo.accountNumber;
    const addressIndex = loginInfo && loginInfo.accountIndex;
    const ledgerApp = localStorage.getItem("ledgerAppName");
    const cosmos = ExternalChains.find((chain) => chain.chainName === "Cosmos");
    const coinType =
      ledgerApp === cosmos.ledgerAppName
        ? cosmos.coinType
        : DefaultChainInfo.deprecatedCoinType;
    const [wallet] = await transactions.LedgerWallet(
      makeHdPath(accountNumber, addressIndex, coinType),
      DefaultChainInfo.prefix
    );
    await wallet.showAddress(makeHdPath(accountNumber, addressIndex, coinType));
  };

  const onClick = (name) => {
    ReactGA.event({
      category: name,
      action: `Clicked on ${name}`
    });
  };

  const handleAddressChange = (response, walletType) => {
    dispatch(
      keyStoreLogin(
        history,
        response.address,
        loginInfo?.coin118Response,
        loginInfo?.coin750Response,
        walletType
      )
    );
    setActiveWallet(walletType);
  };

  const ProfileIcon = <Icon viewClass="profile" icon="profile" />;

  return (
    <div className="header dashboard">
      <Banner />
      <Navbar collapseOnSelect expand="lg">
        <div className="container">
          <div className="nav-menu-icon">
            <MobileSidebar />
          </div>
          <Navbar.Brand>
            <NavLink to="/dashboard/wallet" className="header-logo"></NavLink>
          </Navbar.Brand>

          <Nav className="ml-auto" onClick={() => onClick(t("DASHBOARD"))}>
            <li className="nav-item link mobile-nav-item">
              <div
                className="nav-link primary-medium-color price"
                title={"XPRT Price"}
              >
                <img
                  src={"/images/tokens/xprt.png"}
                  alt={"logo"}
                  width={20}
                  className="mr-1"
                />
                $<NumberView value={formatNumber(tokenPrice)} />
              </div>
            </li>
            <li className="nav-item link mobile-nav-item">
              <NavLink
                className="nav-link primary-medium-color"
                onClick={() => onClick(t("STAKING"))}
                to="/dashboard/staking"
              >
                <div className="icon-box">
                  <Icon viewClass="icon" icon="staking" />
                </div>
                {t("STAKING")}
              </NavLink>
            </li>
            <li className="nav-item link mobile-nav-item">
              <NavLink
                className="nav-link primary-medium-color"
                to="/dashboard/wallet"
              >
                <div className="icon-box">
                  <Icon viewClass="icon" icon="wallet" />
                </div>
                {t("WALLET")}
              </NavLink>
            </li>
            <li className="nav-item link help-section">
              <NavDropdown
                title={
                  <>
                    <div className="icon-box">
                      <Icon viewClass="icon" icon="help" />
                    </div>
                    {t("HELP")}
                  </>
                }
                id="basic-nav-dropdown"
                className="profile-dropdown"
              >
                <div className="info">
                  <a
                    className="profile-item primary-medium-color pb-2 pl-2"
                    href="https://t.me/PersistenceOneChat"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={() => onClick(t("HELP"))}
                  >
                    Contact
                  </a>
                  <a
                    className="profile-item primary-medium-color pb-2 pl-2 pb-2"
                    href="https://blog.persistence.one/category/guides/"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={() => onClick(t("HELP"))}
                  >
                    {t("Guide")}
                  </a>
                  <a
                    className="profile-item primary-medium-color pb-2 pl-2"
                    href="https://persistence.one/terms"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={() => onClick(t("Terms of Use"))}
                  >
                    {t("Terms of Use")}
                  </a>
                  <a
                    className="profile-item primary-medium-color pl-2"
                    href="https://persistence.one/privacy"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={() => onClick(t("Privacy Policy"))}
                  >
                    {t("Privacy Policy")}
                  </a>
                </div>
              </NavDropdown>
            </li>
            <li className="profile-section">
              <NavDropdown
                title={
                  <div className="d-flex align-items-center">
                    <span>
                      {stringTruncate(
                        loginInfo !== null && loginInfo && loginInfo?.address
                      )}
                    </span>
                    <Copy id={loginInfo && loginInfo?.address} />
                  </div>
                }
                id="basic-nav-dropdown"
                className="profile-dropdown"
              >
                <div className="info">
                  <p className="key">
                    {loginInfo !== null &&
                    loginInfo &&
                    loginInfo.loginMode === "ledger" ? (
                      <button
                        className="ledger-verify"
                        onClick={ledgerShowAddress}
                      >
                        {t("VERIFY")}
                      </button>
                    ) : (
                      ""
                    )}
                  </p>
                  <p onClick={handleKeyStore} className="profile-item">
                    <Icon viewClass="copy" icon="add" />
                    {t("GENERATE_KEYSTORE")}
                  </p>
                  <p onClick={closeWallet} className="profile-item">
                    <Icon viewClass="copy" icon="logout" />
                    Disconnect
                  </p>
                </div>
              </NavDropdown>
            </li>
            <li className="nav-item link">
              <Darktheme />
            </li>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
};

export default DashboardHeader;
