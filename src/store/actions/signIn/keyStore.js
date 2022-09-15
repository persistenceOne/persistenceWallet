import {
    SET_KEYSTORE_RESULT,
    SIGN_IN_KEYSTORE_MODAL_HIDE,
    SIGN_IN_KEYSTORE_MODAL_SHOW,
    SIGN_IN_KEYSTORE_RESULT_MODAL_HIDE,
    SIGN_IN_KEYSTORE_RESULT_MODAL_SHOW,
    SIGN_IN_KEYSTORE_MODAL_NEXT, SET_COIN_TYPE
} from "../../../constants/signIn/keyStore";
import {setLoginInfo} from "../transactions/common";
import helper, {decryptKeyStore, vestingAccountCheck, getAccount, makeHdPath} from "../../../utils/helper";
import wallet from "../../../utils/wallet";
import * as Sentry from "@sentry/browser";
import {
    COIN_TYPE,
    ENCRYPTED_MNEMONIC,
    LOGIN_INFO,
} from "../../../constants/localStorage";
import {mnemonicTrim} from "../../../utils/scripts";
import {FeeInfo} from "../../../config";
import packageJson from "../../../../package.json";

export const hideKeyStoreModal = (data) => {
    return {
        type: SIGN_IN_KEYSTORE_MODAL_HIDE,
        data,
    };
};

export const keyStoreModalNext = (data) => {
    return {
        type: SIGN_IN_KEYSTORE_MODAL_NEXT,
        data,
    };
};

export const showKeyStoreModal = (data) => {
    return {
        type: SIGN_IN_KEYSTORE_MODAL_SHOW,
        data,
    };
};

export const hideKeyStoreResultModal = (data) => {
    return {
        type: SIGN_IN_KEYSTORE_RESULT_MODAL_HIDE,
        data,
    };
};

export const showKeyStoreResultModal = (data) => {
    return {
        type: SIGN_IN_KEYSTORE_RESULT_MODAL_SHOW,
        data,
    };
};

export const setKeyStoreResult = (data) => {
    return {
        type: SET_KEYSTORE_RESULT,
        data,
    };
};

export const setCoinType = (data) => {
    return {
        type: SET_COIN_TYPE,
        data,
    };
};

export const keyStoreSubmit = () => {
    return async (dispatch, getState) => {
        try {
            const password = getState().keyStore.password;
            const keyStoreData = getState().keyStore.keyStore;
            const fileReader = new FileReader();
            let mnemonic = "";
            fileReader.readAsText(keyStoreData.value, "UTF-8");
            fileReader.onload = async event => {
                localStorage.setItem(ENCRYPTED_MNEMONIC, event.target.result);
                const res = JSON.parse(event.target.result);
                const decryptedData = decryptKeyStore(res, password.value);
                if (decryptedData.error != null) {
                    dispatch(setKeyStoreResult(
                        {
                            value: "",
                            error: {
                                message: decryptedData.error,
                            },
                        }));
                } else {
                    mnemonic = mnemonicTrim(decryptedData.mnemonic);
                    const accountNumber = helper.getAccountNumber(getState().advanced.accountNumber.value);
                    const accountIndex = helper.getAccountNumber(getState().advanced.accountIndex.value);
                    const bip39PassPhrase = getState().advanced.bip39PassPhrase.value;

                    const walletPath118 = makeHdPath(accountNumber, accountIndex, 118);
                    const walletPath750 = makeHdPath(accountNumber, accountIndex, 750);

                    const coin118Response = await wallet.createWallet(mnemonic, walletPath118, bip39PassPhrase);
                    const coin750Response = await wallet.createWallet(mnemonic, walletPath750, bip39PassPhrase);

                    const coin118Data = {
                        address: coin118Response.address,
                        walletPath: coin118Response.walletPath
                    };

                    const coin750Data = {
                        address: coin750Response.address,
                        walletPath: coin750Response.walletPath
                    };

                    dispatch(keyStoreModalNext());
                    dispatch(showKeyStoreResultModal());
                    dispatch(setKeyStoreResult(
                        {
                            value: {coin118Data, coin750Data},
                            error: {
                                message: "",
                            }
                        }));
                }
            };
        }catch (error) {
            Sentry.captureException(error.response
                ? error.response.data.message
                : error.message);
            console.log("in error");
            dispatch(setKeyStoreResult(
                {
                    value: "",
                    error: {
                        message: error.message,
                    },
                }));
        }
    };
};


export const keyStoreLogin = (history, address, coin118Response, coin750Response, coinType) => {
    return async (dispatch, getState) => {
        const accountNumber = helper.getAccountNumber(getState().advanced.accountNumber.value);
        const accountIndex = helper.getAccountNumber(getState().advanced.accountIndex.value);

        const loginInfo = {
            fee: '',
            account: '',
            loginToken: '',
            address: '',
            loginMode: '',
            version: '',
            accountNumber: '',
            accountIndex: '',
            coinType:'',
            coin118Response:'',
            coin750Response:'',
            keyStoreLogin:false,
        };

        const res = await getAccount(address).catch(error => {
            Sentry.captureException(error.response
                ? error.response.data.message
                : error.message);
            console.log(error.message);
            loginInfo.fee = FeeInfo.defaultFee;
            loginInfo.account = "non-vesting";
        });
        const accountType = await vestingAccountCheck(res && res.typeUrl);
        if (accountType) {
            loginInfo.fee = FeeInfo.vestingAccountFee;
            loginInfo.account = "vesting";
        } else {
            loginInfo.fee = FeeInfo.defaultFee;
            loginInfo.account = "non-vesting";
        }
        loginInfo.loginToken = "loggedIn";
        loginInfo.address = address;
        loginInfo.loginMode = "normal";
        loginInfo.version = packageJson.version;
        loginInfo.accountNumber = accountNumber;
        loginInfo.accountIndex = accountIndex;
        loginInfo.coinType = coinType;
        loginInfo.coin118Response = coin118Response;
        loginInfo.coin750Response = coin750Response;
        loginInfo.keyStoreLogin = true;
        localStorage.setItem(LOGIN_INFO, JSON.stringify(loginInfo));
        localStorage.setItem(COIN_TYPE, coinType);
        dispatch(setLoginInfo({
            encryptedSeed: true,
            error: {
                message: ''
            }
        }));
        history.push('/dashboard/wallet');
        window.location.reload();
    };
};