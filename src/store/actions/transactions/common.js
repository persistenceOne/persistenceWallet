import {
    SET_LOGIN_INFO,
    SET_TX_INFO,
    SET_TX_NAME,
    TX_FAILED,
    TX_IN_PROGRESS,
    TX_RESPONSE,
    TX_RESULT_MODAL_HIDE,
    TX_RESULT_MODAL_SHOW,
    TX_SUCCESS
} from "../../../constants/common";

export const showTxResultModal = (data) => {
    return {
        type: TX_RESULT_MODAL_SHOW,
        data,
    };
};

export const hideTxResultModal = (data) => {
    return {
        type: TX_RESULT_MODAL_HIDE,
        data,
    };
};


export const setLoginInfo = (data) => {
    return {
        type: SET_LOGIN_INFO,
        data,
    };
};


export const setTxName = (data) => {
    return {
        type: SET_TX_NAME,
        data,
    };
};

export const setTxIno = (data) => {
    return {
        type: SET_TX_INFO,
        data,
    };
};


export const txInProgress = (data) => {
    return {
        type: TX_IN_PROGRESS,
        data,
    };
};

export const txSuccess = (data) => {
    return {
        type: TX_SUCCESS,
        data,
    };
};

export const txFailed = (data) => {
    return {
        type: TX_FAILED,
        data,
    };
};

export const txResponse = (data) => {
    return {
        type: TX_RESPONSE,
        data,
    };
};
