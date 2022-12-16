import React, {useEffect, useState} from "react";
import Icon from "../../components/Icon";
import {NavLink, useHistory} from 'react-router-dom';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import Copy from "../../components/Copy";
import {useTranslation} from "react-i18next";
import Darktheme from "../DarkTheme";
import MobileSidebar from "./MobileSidebar";
import transactions from "../../utils/transactions";
import {userLogout} from "../../store/actions/logout";
import {useDispatch} from "react-redux";
import {showKeyStoreMnemonicModal} from "../../store/actions/generateKeyStore";
import {LOGIN_INFO, THEME} from "../../constants/localStorage";
import {stringTruncate} from "../../utils/scripts";
import {makeHdPath} from "../../utils/helper";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import ReactGA from 'react-ga4';
import {DefaultChainInfo, ExternalChains} from "../../config";
import Banner from "../../components/Banner";
import {keyStoreLogin} from "../../store/actions/signIn/keyStore";

const EXPLORER_API = process.env.REACT_APP_EXPLORER_API;

const DashboardHeader = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
    const [activeWallet, setActiveWallet] = useState('');

    useEffect(() => {
        const localTheme = window.localStorage.getItem(THEME);
        if (localTheme === 'light') {
            if (document.getElementById('root').classList.contains('dark-mode')) {
                document.getElementById('root').classList.add('light-mode');
                document.getElementById('root').classList.remove('dark-mode');
            }
        } else {
            if (document.getElementById('root').classList.contains('light-mode')) {
                document.getElementById('root').classList.add('dark-mode');
                document.getElementById('root').classList.remove('light-mode');
            }
        }
        setActiveWallet(loginInfo && loginInfo?.coin118Response?.address === loginInfo?.address  ?
            '118' :
            '750');
    }, []);

    const closeWallet = () => {
        dispatch(userLogout());
        localStorage.clear();
        history.push('/');
        window.location.reload();
        if(loginInfo && loginInfo.loginMode==="ledger"){
            TransportWebUSB.close();
        }
    };

    const handleKeyStore = () => {
        dispatch(showKeyStoreMnemonicModal());
    };

    const ledgerShowAddress = async () => {
        const accountNumber = loginInfo && loginInfo.accountNumber;
        const addressIndex = loginInfo && loginInfo.accountIndex;
        const ledgerApp = localStorage.getItem('ledgerAppName');
        const cosmos = ExternalChains.find(chain => chain.chainName === 'Cosmos');
        const coinType = ledgerApp === cosmos.ledgerAppName ? cosmos.coinType : DefaultChainInfo.deprecatedCoinType;
        const [wallet] = await transactions.LedgerWallet(makeHdPath(accountNumber, addressIndex, coinType), DefaultChainInfo.prefix);
        await wallet.showAddress(makeHdPath(accountNumber, addressIndex, coinType));
    };

    const onClick = (name) => {
        ReactGA.event({
            category: name,
            action: `Clicked on ${name}`
        });
    };

    const handleAddressChange = (response, walletType) => {
        dispatch(keyStoreLogin(history, response.address, loginInfo?.coin118Response, loginInfo?.coin750Response, walletType));
        setActiveWallet(walletType);
    };

    const ProfileIcon = <Icon viewClass="profile" icon="profile"/>;

    return (
        <div className="header dashboard">
            <Banner/>
            <Navbar collapseOnSelect expand="lg">
                <div className="container">
                    <div className="nav-menu-icon">
                        <MobileSidebar/>
                    </div>
                    <Navbar.Brand>
                        <NavLink to="/dashboard/wallet" className="header-logo">
                        </NavLink>
                    </Navbar.Brand>

                    <Nav className="ml-auto" onClick={()=>onClick(t("DASHBOARD"))}>
                        <li className="nav-item link mobile-nav-item">
                            <NavLink className="nav-link primary-medium-color"
                                to="/dashboard/wallet">
                                <div className="icon-box">
                                    <Icon
                                        viewClass="icon"
                                        icon="wallet"
                                    />
                                </div>
                                {t("WALLET")}
                            </NavLink>
                        </li>
                        <li className="nav-item link mobile-nav-item">
                            <NavLink className="nav-link primary-medium-color" onClick={()=>onClick(t("STAKING"))}
                                to="/dashboard/staking">
                                <div className="icon-box">
                                    <Icon
                                        viewClass="icon"
                                        icon="staking"/>
                                </div>
                                {t("STAKING")}
                            </NavLink>
                        </li>
                        <li className="nav-item link mobile-nav-item">
                            <a className="nav-link primary-medium-color" href={`${EXPLORER_API}/account/${loginInfo?.address}`}
                                rel="noopener noreferrer" target="_blank" onClick={() => onClick(t("EXPLORER"))}>
                                <div className="icon-box">
                                    <Icon
                                        viewClass="icon"
                                        icon="explorer"/>
                                </div>
                                {t("EXPLORER")}
                                <div className="icon-box">
                                    <Icon
                                        viewClass="icon"
                                        icon="export"/>
                                </div>
                            </a>
                        </li>
                        <li className="nav-item link help-section">
                            <NavDropdown title={<>
                                <div className="icon-box">
                                    <Icon
                                        viewClass="icon"
                                        icon="help"/>
                                </div>
                                {t("HELP")}
                            </>
                            }
                            id="basic-nav-dropdown"
                            className="profile-dropdown">
                                <div className="info p-3">
                                    <a className="nav-link primary-medium-color pb-2 pl-2"
                                        href="https://blog.persistence.one/coin-type-migration-faqs/" rel="noopener noreferrer"
                                        target="_blank" onClick={() => onClick(t("HELP"))}>
                                        {t("FAQs")}
                                    </a>
                                    <a className="nav-link primary-medium-color pl-2"
                                        href="https://notes.persistence.one/s/9l80_chis" rel="noopener noreferrer"
                                        target="_blank" onClick={() => onClick(t("HELP"))}>
                                        {t("Guide")}
                                    </a>
                                </div>
                            </NavDropdown>
                        </li>
                        <li className="profile-section">
                            <NavDropdown title={ProfileIcon} id="basic-nav-dropdown" className="profile-dropdown">
                                <div className="info">
                                    <p className="key">
                                        {
                                            loginInfo && loginInfo.loginMode === 'ledger' ?
                                                <button className="ledger-verify"
                                                    onClick={ledgerShowAddress}>{t("VERIFY")}</button>
                                                : ""
                                        }
                                    </p>
                                    {loginInfo && loginInfo?.keyStoreLogin ?
                                        <div className='address-list'>
                                            <div className={`${activeWallet === '118' ? 'active': ''} address-box`} onClick={()=> handleAddressChange(loginInfo?.coin118Response, '118')}>
                                                <div className="address keystore">
                                                    <div className='d-flex align-items-center'>
                                                        <span>{stringTruncate(loginInfo && loginInfo?.coin118Response?.address)}</span>
                                                    </div>
                                                    {activeWallet === '118' ?
                                                        <Icon viewClass="success" icon="success-small"/> : ''
                                                    }
                                                </div>
                                                <p className='wallet-path'>
                                                    <span>{t("Path")}: </span>
                                                    {loginInfo && loginInfo?.coin118Response?.walletPath}
                                                </p>
                                            </div>
                                            <div className={`${activeWallet === '750' ? 'active': ''} address-box`} onClick={()=> handleAddressChange(loginInfo?.coin750Response, '750')}>
                                                <div className="address keystore">
                                                    <div className='d-flex align-items-center'>
                                                        <span>{stringTruncate(loginInfo && loginInfo?.coin750Response?.address)}</span>
                                                    </div>
                                                    {activeWallet === '750' ?
                                                        <Icon viewClass="success" icon="success-small"/> : ''
                                                    }
                                                </div>
                                                <p className='wallet-path'>
                                                    <span>{t("Path")}: </span>
                                                    {loginInfo && loginInfo?.coin750Response?.walletPath}
                                                </p>
                                            </div>
                                        </div>
                                        :
                                        <div className='address-list'>
                                            <div className='address-box'>
                                                <div className='address-box'>
                                                    <div className="address">
                                                        <span>{stringTruncate(loginInfo && loginInfo?.address)}</span>
                                                        <Copy id={loginInfo && loginInfo?.address}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="dropdown-footer">
                                    <p onClick={closeWallet} className="link-close">{t("LOGOUT")}</p>
                                    <p onClick={handleKeyStore} className="generate-keystore">{t("GENERATE_KEYSTORE")}</p>
                                </div>
                            </NavDropdown>
                        </li>
                        <li className="nav-item link"><Darktheme/></li>
                    </Nav>
                </div>
            </Navbar>
        </div>
    );
};

export default DashboardHeader;
