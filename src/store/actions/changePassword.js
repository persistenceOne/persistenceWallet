import {
    CHANGE_KEYSTORE_MODAL_HIDE,
    CHANGE_KEYSTORE_MODAL_SHOW,
    CHANGE_KEYSTORE_NEW_PASSWORD_MODAL_HIDE,
    CHANGE_KEYSTORE_NEW_PASSWORD_MODAL_SHOW,
    CHANGE_KEYSTORE_RESULT_MODAL_HIDE,
    CHANGE_KEYSTORE_RESULT_MODAL_SHOW,
    CHANGE_KEYSTORE_RESULT_SET,
    KEYSTORE_NEW_PASSWORD_SET,
    CHANGE_KEYSTORE_MODAL_NEXT,
    CHANGE_KEYSTORE_NEW_PASSWORD_MODAL_NEXT,
    CHANGE_KEYSTORE_SET_COIN_TYPE
} from "../../constants/changePassword";

export const setKeyStoreNewPassword = (data) => {
    return {
        type: KEYSTORE_NEW_PASSWORD_SET,
        data,
    };
};

export const showKeyStoreModal = (data) => {
    return {
        type: CHANGE_KEYSTORE_MODAL_SHOW,
        data,
    };
};

export const keyStoreModalNext = (data) => {
    return {
        type: CHANGE_KEYSTORE_MODAL_NEXT,
        data,
    };
};

export const hideKeyStoreModal = (data) => {
    return {
        type: CHANGE_KEYSTORE_MODAL_HIDE,
        data,
    };
};

export const showKeyStoreNewPasswordModal = (data) => {
    return {
        type: CHANGE_KEYSTORE_NEW_PASSWORD_MODAL_SHOW,
        data,
    };
};

export const hideKeyStoreNewPasswordModal = (data) => {
    return {
        type: CHANGE_KEYSTORE_NEW_PASSWORD_MODAL_HIDE,
        data,
    };
};

export const keyStoreNewPasswordModalNext = (data) => {
    return {
        type: CHANGE_KEYSTORE_NEW_PASSWORD_MODAL_NEXT,
        data,
    };
};

export const showResultModal = (data) => {
    return {
        type: CHANGE_KEYSTORE_RESULT_MODAL_SHOW,
        data,
    };
};

export const hideResultModal = (data) => {
    return {
        type: CHANGE_KEYSTORE_RESULT_MODAL_HIDE,
        data,
    };
};

export const setResult = (data) => {
    return {
        type: CHANGE_KEYSTORE_RESULT_SET,
        data,
    };
};

export const setCoinType = (data) => {
    return {
        type: CHANGE_KEYSTORE_SET_COIN_TYPE,
        data,
    };
};
