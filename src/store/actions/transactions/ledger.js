import transactions from "../../../utils/transactions";
import {closeLoader, showTxResultModal, txFailed, txInProgress, txResponse, txSuccess} from "./common";
import {hideFeeModal} from "./fee";
import * as Sentry from "@sentry/browser";
import helper, {privateKeyReader} from "../../../utils/helper";
import {LOGIN_INFO} from "../../../constants/localStorage";
import {DefaultChainInfo, ExternalChains} from "../../../config";
import {setTxTokenizeShareStatus, showTxTokenizeModal} from "./tokenizeShares";
import {hideKeyStoreModal} from "./keyStore";

export const ledgerSubmit = (loginAddress, loginMode) => {
    return async (dispatch, getState) => {
        dispatch(txInProgress());
        const password = getState().keyStore.password;
        const keyStoreData = getState().keyStore.keyStore;

        const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));

        const accountNumber = helper.getAccountNumber(loginInfo && loginInfo.accountNumber);
        const accountIndex = helper.getAccountNumber(loginInfo && loginInfo.accountIndex);
        const bip39PassPhrase = getState().advanced.bip39PassPhrase.value;

        const formData = getState().common.txInfo.value.data;
        const txName = getState().common.txName.value.name;

        const fee = getState().fee.fee.value.fee;
        const gas = getState().gas.gas.value;

        const ledgerApp = localStorage.getItem('ledgerAppName');
        const cosmos = ExternalChains.find(chain => chain.chainName === 'Cosmos');
        const coinType = ledgerApp === cosmos.ledgerAppName ? cosmos.coinType : DefaultChainInfo.deprecatedCoinType;

        let mnemonic = "";
        if (loginMode !== "ledger") {
            mnemonic = await privateKeyReader(keyStoreData.value, password.value, loginAddress, accountNumber, accountIndex, bip39PassPhrase, coinType);
        }
        console.log(formData, "formData");
        let response = transactions.getTransactionResponse(loginAddress, formData, fee, gas, mnemonic, txName, accountNumber, accountIndex, bip39PassPhrase, coinType);
        response.then(result => {
            if (result.code !== undefined && result.code === 0) {
                if (txName === "tokenize") {
                    dispatch(closeLoader());
                    dispatch(hideFeeModal());
                    dispatch(showTxTokenizeModal());
                    dispatch(txResponse(result));
                }else {
                    dispatch(closeLoader());
                    dispatch(hideFeeModal());
                    dispatch(txSuccess());
                    dispatch(txResponse(result));
                    dispatch(showTxResultModal());
                    dispatch(setTxTokenizeShareStatus(""));
                }
            } else {
                throw Error(result.rawLog);
            }
        }).catch(error => {
            console.log(error, "error.message");
            Sentry.captureException(error.response
                ? error.response.data.message
                : error.message);
            dispatch(txFailed(error.message));
        });
    };
};

