import {
    KEYSTORE_MNEMONIC_MODAL_HIDE,
    KEYSTORE_MNEMONIC_MODAL_SHOW,
    KEYSTORE_MNEMONIC_SET,
    KEYSTORE_PASSWORD_MODAL_HIDE,
    KEYSTORE_PASSWORD_MODAL_SHOW,
    KEYSTORE_PASSWORD_SET,
    KEYSTORE_RESULT_MODAL_HIDE,
    KEYSTORE_RESULT_MODAL_SHOW,
    KEYSTORE_MNEMONIC_MODAL_NEXT
} from "../../constants/generateKeyStore";
import wallet from "../../utils/wallet";
import * as Sentry from "@sentry/browser";
import {mnemonicTrim} from "../../utils/scripts";

export const setKeyStoreMnemonic = (data) => {
    return {
        type: KEYSTORE_MNEMONIC_SET,
        data,
    };
};

export const setKeyStorePassword = (data) => {
    return {
        type: KEYSTORE_PASSWORD_SET,
        data,
    };
};


export const showKeyStoreMnemonicModal = (data) => {
    return {
        type: KEYSTORE_MNEMONIC_MODAL_SHOW,
        data,
    };
};

export const keyStoreMnemonicModalNext = (data) => {
    return {
        type: KEYSTORE_MNEMONIC_MODAL_NEXT,
        data,
    };
};


export const hideKeyStoreMnemonicModal = (data) => {
    return {
        type: KEYSTORE_MNEMONIC_MODAL_HIDE,
        data,
    };
};

export const showKeyStorePasswordModal = (data) => {
    return {
        type: KEYSTORE_PASSWORD_MODAL_SHOW,
        data,
    };
};

export const hideKeyStorePasswordModal = (data) => {
    return {
        type: KEYSTORE_PASSWORD_MODAL_HIDE,
        data,
    };
};

export const showResultModal = (data) => {
    return {
        type: KEYSTORE_RESULT_MODAL_SHOW,
        data,
    };
};

export const hideResultModal = (data) => {
    return {
        type: KEYSTORE_RESULT_MODAL_HIDE,
        data,
    };
};

export const mnemonicSubmit = () => {
    return async (dispatch, getState) => {
        try {
            await wallet.createWallet(getState().generateKeyStore.mnemonic.value);
            let mnemonic = mnemonicTrim(getState().generateKeyStore.mnemonic.value);
            dispatch(setKeyStoreMnemonic({
                value: mnemonic,
                error: {
                    message: ''
                }
            }));
            dispatch(keyStoreMnemonicModalNext());
            dispatch(showKeyStorePasswordModal());
        } catch (error) {
            Sentry.captureException(error.response
                ? error.response.data.message
                : error.message);
            dispatch(setKeyStoreMnemonic({
                value: '',
                error: {
                    message: error.message
                }
            }));
        }
    };
};