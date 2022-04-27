import transactions from "../../../utils/transactions";
import {showTxResultModal, txFailed, txInProgress, txResponse, txSuccess} from "./common";
import {hideFeeModal} from "./fee";
import * as Sentry from "@sentry/browser";
import helper, {privateKeyReader} from "../../../utils/helper";
import {LOGIN_INFO} from "../../../constants/localStorage";
import {DefaultChainInfo, ExternalChains} from "../../../config";

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
        const coinType = ledgerApp === cosmos.ledgerAppName ? cosmos.coinType : DefaultChainInfo.coinType;

        let mnemonic = "";
        if (loginMode !== "ledger") {
            mnemonic = await privateKeyReader(keyStoreData.value, password.value, loginAddress);
        }
        let response = transactions.getTransactionResponse(loginAddress, formData, fee, gas, mnemonic, txName, accountNumber, accountIndex, bip39PassPhrase, coinType);
        response.then(result => {
            if (result.code !== undefined) {
                dispatch(hideFeeModal());
                dispatch(txSuccess());
                dispatch(txResponse(result));
                dispatch(showTxResultModal());
            } else {
                console.log(result, "final result");
            }
        }).catch(error => {
            console.log(error.message, "error.message");
            Sentry.captureException(error.response
                ? error.response.data.message
                : error.message);
            dispatch(txFailed(error.message));
        });
    };
};

