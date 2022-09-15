import {Modal as ReactModal} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    hideKeyStoreResultModal,
    keyStoreLogin,
    showKeyStoreModal
} from "../../../../store/actions/signIn/keyStore";
import Icon from "../../../../components/Icon";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {QueryClientImpl} from "cosmjs-types/cosmos/bank/v1beta1/query";
import {DefaultChainInfo} from "../../../../config";
import {stringToNumber} from "../../../../utils/scripts";
import {getAccount, tokenValueConversion} from "../../../../utils/helper";
import * as Sentry from "@sentry/browser";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {createProtobufRpcClient, QueryClient} from "@cosmjs/stargate";
import vestingAccount from "../../../../utils/vestingAmount";
const tendermintRPCURL = process.env.REACT_APP_TENDERMINT_RPC_ENDPOINT;

const fetchBalance = async (address) => {
    try {
        const vestingAmountData = await getAccount(address);
        let transferableAmount = 0;
        if (vestingAmountData !== undefined) {
            const tendermintClient = await Tendermint34Client.connect(tendermintRPCURL);
            const queryClient = new QueryClient(tendermintClient);
            const rpcClient = createProtobufRpcClient(queryClient);
            const stakingQueryService = new QueryClientImpl(rpcClient);
            const response = await stakingQueryService.AllBalances({address: address});
            for (let item of response.balances) {
                if (item.denom === DefaultChainInfo.currency.coinMinimalDenom) {
                    item.ibcBalance = false;
                    const balance = tokenValueConversion(stringToNumber(item.amount));
                    const vestingBalance = await vestingAccount.getTransferableVestingAmount(address, balance);
                    transferableAmount = vestingBalance[1];
                } else {
                    transferableAmount = 0;
                }
            }
        }
        return transferableAmount;
    } catch (error) {
        Sentry.captureException(error.response
            ? error.response.data.message
            : error.message);
        console.log(error, "error");
    }
};

const ModalAddress = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const show = useSelector((state) => state.signInKeyStore.keyStoreResultModal);
    const response = useSelector((state) => state.signInKeyStore.response.value);
    const [coin118Balance, setCoin118Balance] = useState(0);
    const [coin750Balance, setCoin750Balance] = useState(0);
    const dispatch = useDispatch();

    useEffect(async () => {
        setCoin750Balance(await fetchBalance(response?.coin750Data?.address));
        setCoin118Balance(await fetchBalance(response?.coin118Data?.address));
    },[response]);

    const handleClose = () => {
        dispatch(hideKeyStoreResultModal());
    };

    const handleLogin = () => {
        dispatch(keyStoreLogin(history, response.coin750Data.address, response.coin118Data, response.coin750Data, '750'));
    };

    const keyStorePrevious = () => {
        dispatch(hideKeyStoreResultModal());
        dispatch(showKeyStoreModal());
    };

    return (
        <ReactModal
            animation={false}
            backdrop="static"
            className="modal-custom"
            centered={true}
            keyboard={false}
            show={show}
            onHide={handleClose}>
            <ReactModal.Header closeButton>
                <div className="previous-section">
                    <button className="button" onClick={() => keyStorePrevious("advancedForm")}>
                        <Icon
                            viewClass="arrow-right"
                            icon="left-arrow"/>
                    </button>
                </div>
                <h3 className="heading">{t("LOGIN_WITH_KEYSTORE")}</h3>
            </ReactModal.Header>

            <ReactModal.Body className="create-wallet-body import-wallet-body">
                <div className="form-field radio">
                    <div className="d-flex mb-3">
                        <div>
                            <p className="mnemonic-result text-left p-0">
                                <b>{t("WALLET_PATH")}: </b>{response?.coin118Data?.walletPath}</p>
                            <p className="mnemonic-result text-left">
                                <b>{t("Balance")}: </b>{coin118Balance} XPRT</p>
                            <p className="mnemonic-result text-left p-0"><b>{t("ADDRESS")}: </b>{response?.coin118Data?.address}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="form-field radio">
                    <div className="d-flex mb-3">
                        <div>
                            <p className="mnemonic-result text-left p-0">
                                <b>{t("WALLET_PATH")}: </b>{response?.coin750Data?.walletPath}</p>
                            <p className="mnemonic-result text-left">
                                <b>{t("Balance")}: </b>{coin750Balance} XPRT</p>
                            <p className="mnemonic-result text-left p-0"><b>{t("ADDRESS")} : </b>{response?.coin750Data?.address}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button className="button button-primary" onClick={handleLogin}>{t("LOGIN")}</button>
                </div>
            </ReactModal.Body>
        </ReactModal>
    );
};


export default ModalAddress;
