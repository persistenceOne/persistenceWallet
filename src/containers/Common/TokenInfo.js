import React, {useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from 'react-redux';
import {fetchDelegationsCount} from "../../store/actions/delegations";
import {fetchBalance, fetchTransferableVestingAmount} from "../../store/actions/balance";
import {fetchRewards, fetchTotalRewards} from "../../store/actions/rewards";
import {fetchUnbondDelegations} from "../../store/actions/unbond";
import {fetchTokenPrice} from "../../store/actions/tokenPrice";
import {useTranslation} from "react-i18next";
import ModalViewUnbondDetails from "./ModalViewUnbondDetails";
import ModalViewVestingDetails from "./ModalViewVestingDetails";
import ModalViewAmountDetails from "./ModalVIewAmountDetails";
import Icon from "../../components/Icon";
import {Dropdown, OverlayTrigger, Popover} from "react-bootstrap";
import ModalViewDelegationDetails from "./ModalViewDelegationDetails";
import {fetchValidators} from "../../store/actions/validators";
import NumberView from "../../components/NumberView";
import {decimalize, formatNumber, stringTruncate} from "../../utils/scripts";
import {showTxWithDrawTotalModal} from "../../store/actions/transactions/withdrawTotalRewards";
import ReactGA from "react-ga4";
import {DefaultChainInfo, PstakeInfo} from "../../config";
import {LOGIN_INFO} from "../../constants/localStorage";
import {keyStoreLogin} from "../../store/actions/signIn/keyStore";
import {useHistory} from "react-router-dom";
import Copy from "../../components/Copy";
import ModalMigrateBalance from "../Transactions/ModalMigrateBalance";
import {tokenValueConversion} from "../../utils/helper";
import {setTxMigrateTokens} from "../../store/actions/transactions/migrateAssets";
const TokenInfo = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const tokenList = useSelector((state) => state.balance.tokenList);
    const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
    const history = useHistory();
    const [activeWallet, setActiveWallet] = useState('');

    useEffect(()=>{
        setActiveWallet(loginInfo && loginInfo?.coin118Response?.address === loginInfo?.address  ?
            '118' :
            '750');
    }, []);

    useEffect(() => {
        let balance = [];
        tokenList.forEach((item) => {
            let denom;
            denom = item.denom;
            balance.push({
                denom:denom,
                amount: item.denom === PstakeInfo.coinMinimalDenom ?
                    decimalize(item.amount)
                    :
                    tokenValueConversion(item.amount)
            });
        });
        dispatch(setTxMigrateTokens(balance));
    }, [tokenList]);

    const handleRewards = (key) => {
        ReactGA.event({
            category: `claim ${key} modal`,
            action: `Clicked on claim ${key} modal`
        });
        if (key === "rewards") {
            dispatch(showTxWithDrawTotalModal());
        }
    };

    const popoverVesting = (
        <Popover id="popover-vesting">
            <Popover.Content>
                {t("VESTING_NOTE")}
            </Popover.Content>
        </Popover>
    );
    const popoverDelegatable = (
        <Popover id="popover-vesting">
            <Popover.Content>
                {t("DELEGATABLE_NOTE")}
            </Popover.Content>
        </Popover>
    );
    const popoverTransferable = (
        <Popover id="popover-vesting">
            <Popover.Content>
                {t("TRANSFERABLE_NOTE")}
            </Popover.Content>
        </Popover>
    );

    const popoverTotal = (
        <Popover id="popover-total">
            <Popover.Content>
                {t("TOTAL_BALANCE_NOTE")}
            </Popover.Content>
        </Popover>
    );

    const handleDropdown = (walletType) => {
        const address = loginInfo && loginInfo?.coin118Response?.address === loginInfo?.address  ?
            loginInfo?.coin750Response.address :
            loginInfo?.coin118Response.address;
        dispatch(keyStoreLogin(history, address, loginInfo?.coin118Response, loginInfo?.coin750Response, walletType ));
    };

    return (
        <div className="token-info-section">
            <div className="heading-section">
                <p className="info-heading">Wallet Balances</p>
                {loginInfo && loginInfo?.keyStoreLogin ?
                    <div className="address-section d-flex align-items-center">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" title={loginInfo?.address}>
                                <span className='address'>Address:</span>
                                &nbsp;{stringTruncate(loginInfo && loginInfo?.address, 10)}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleDropdown('118')}
                                    className={`${activeWallet === '118' ? 'active' : ''} d-flex align-items-center justify-content-between`}>
                                    <div>
                                        <span
                                            className='address-truncate'>{stringTruncate(loginInfo?.coin118Response?.address, 10)}</span>
                                        <><span className='label'>118 Coin-type wallet</span>
                                            <span className='rec'>(Recommended)</span></>

                                    </div>
                                    {activeWallet === '118' ?
                                        <Icon viewClass="success" icon="success-small"/> : ''
                                    }
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDropdown('750')}
                                    className={`${activeWallet === '750' ? 'active' : ''} d-flex align-items-center justify-content-between`}>
                                    <div className="">
                                        <span
                                            className='address-truncate'>{stringTruncate(loginInfo?.coin750Response?.address, 10)}</span>
                                        <span className='label'>750 Coin-type wallet</span>
                                    </div>
                                    {activeWallet === '750' ?
                                        <Icon viewClass="success" icon="success-small"/> : ''
                                    }
                                </Dropdown.Item>
                                {activeWallet === '750' && tokenList.length > 0?
                                    <ModalMigrateBalance />
                                    : null
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <Copy id={loginInfo && loginInfo?.address}/>
                    </div>
                    : null
                }
            </div>

            <div className="token-info-section-body">
                <div className="token-info info-box">
                    <div className="inner-box">
                        <div className="line">
                            <p className="key">Total
                                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom"
                                    overlay={popoverTotal}>
                                    <button className="icon-button info" type="button"><Icon
                                        viewClass="arrow-right"
                                        icon="info"/></button>
                                </OverlayTrigger>
                            </p>
                            <p className="value"
                                title={(props.delegations + props.balance + props.unbond).toFixed(DefaultChainInfo.currency.coinDecimals)}>
                                <span
                                    className="inner-grid-icon">
                                    {
                                        props.list.length > 1 ?
                                            <ModalViewAmountDetails/>
                                            : ""
                                    }
                                </span>
                                <NumberView value={formatNumber(props.delegations + props.balance + props.unbond)}/>
                                {DefaultChainInfo.currency.coinDenom}
                            </p>
                        </div>
                        <div className="line">
                            <p className="key">{t("CURRENT_PRICE")}</p>
                            <p className="value"><span className="inner-grid-icon"/>
                                $<NumberView value={formatNumber(props.tokenPrice)}/>
                            </p>
                        </div>
                        <div className="line">
                            <p className="key">{t("CURRENT_VALUE")}</p>
                            <p className="value"><span className="inner-grid-icon"/>
                                $<NumberView
                                    value={formatNumber((props.delegations + props.balance + props.unbond) * props.tokenPrice)}/>
                            </p>
                        </div>

                    </div>
                </div>
                <div className="price-info info-box">
                    <div className="inner-box">
                        <div className="line">
                            <p className="key">Vesting
                                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom"
                                    overlay={popoverVesting}>
                                    <button className="icon-button info" type="button"><Icon
                                        viewClass="arrow-right"
                                        icon="info"/></button>
                                </OverlayTrigger>
                            </p>
                            <p className="value" title={props.vestingAmount}>
                                <span className="inner-grid-icon">
                                    {
                                        props.vestingAmount > 0 ?
                                            <ModalViewVestingDetails/>
                                            : ""
                                    }
                                </span>
                                <NumberView value={formatNumber(props.vestingAmount)}/> {DefaultChainInfo.currency.coinDenom}
                            </p>
                        </div>
                        <div className="line">
                            <p className="key">Transferable
                                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom"
                                    overlay={popoverTransferable}>
                                    <button className="icon-button info" type="button"><Icon
                                        viewClass="arrow-right"
                                        icon="info"/></button>
                                </OverlayTrigger>
                            </p>
                            <p className="value" title={props.transferableAmount.toFixed(6)}><span
                                className="inner-grid-icon"/>
                            <NumberView value={formatNumber(props.transferableAmount)}/> {DefaultChainInfo.currency.coinDenom}
                            </p>
                        </div>
                        <div className="line">
                            <p className="key">{t("DELEGATABLE")}
                                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom"
                                    overlay={popoverDelegatable}>
                                    <button className="icon-button info" type="button"><Icon
                                        viewClass="arrow-right"
                                        icon="info"/></button>
                                </OverlayTrigger>
                            </p>
                            <p className="value" title={props.balance.toFixed(6)}><span className="inner-grid-icon"/>
                                <NumberView value={formatNumber(props.balance)}/> {DefaultChainInfo.currency.coinDenom}</p>
                        </div>

                    </div>
                </div>
                <div className="rewards-info info-box">
                    <div className="inner-box">
                        <div className="line">
                            <p className="key">{t("DELEGATED")}</p>
                            <p className="value" title={props.delegations}>
                                <span
                                    className="inner-grid">
                                    {
                                        props.delegationStatus ?
                                            <ModalViewDelegationDetails/>
                                            : ""
                                    }
                                </span>
                                <span> <NumberView value={formatNumber(props.delegations)}/> {DefaultChainInfo.currency.coinDenom}</span>
                            </p>
                        </div>
                        <div className="line">
                            <p className="key">{t("REWARDS")}</p>
                            <p className="value rewards"><span onClick={() => handleRewards("rewards")}
                                className="claim inner-grid">{t("CLAIM")}</span>
                            <span title={props.rewards[0]}>
                                <NumberView value={formatNumber(props.rewards[0])}/> {DefaultChainInfo.currency.coinDenom}
                            </span>
                            </p>
                        </div>
                        <div className="line">
                            <p className="key">{t("UNBONDING")}</p>
                            <p className="value"><span
                                className="inner-grid">
                                {
                                    props.unbond > 0 ?
                                        <ModalViewUnbondDetails/>
                                        : ""
                                }
                            </span>
                            <span title={props.unbond}>
                                <NumberView value={formatNumber(props.unbond)}/>{DefaultChainInfo.currency.coinDenom}
                            </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

const stateToProps = (state) => {
    return {
        delegations: state.delegations.count,
        delegationStatus: state.delegations.status,
        balance: state.balance.amount,
        rewards: state.rewards.rewards,
        unbond: state.unbond.unbond,
        tokenPrice: state.tokenPrice.tokenPrice,
        list: state.balance.list,
        transferableAmount: state.balance.transferableAmount,
        vestingAmount: state.balance.vestingAmount
    };
};

const actionsToProps = {
    fetchDelegationsCount,
    fetchBalance,
    fetchRewards,
    fetchUnbondDelegations,
    fetchTokenPrice,
    fetchTransferableVestingAmount,
    fetchTotalRewards,
    fetchValidators
};

export default connect(stateToProps, actionsToProps)(TokenInfo);

