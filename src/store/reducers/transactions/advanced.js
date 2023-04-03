import {combineReducers} from 'redux';
import {SET_ACCOUNT_INDEX, SET_ACCOUNT_NUMBER, SET_BIP_39_PASSPHRASE} from "../../../constants/advanced";
import {KEYSTORE_MODAL_HIDE} from "../../../constants/keyStore";
import {TX_RESULT_MODAL_HIDE} from "../../../constants/common";

const accountIndex = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case SET_ACCOUNT_INDEX:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_RESULT_MODAL_HIDE:
    case KEYSTORE_MODAL_HIDE:
        return {
            ...state,
            value: '',
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};

const accountNumber = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case SET_ACCOUNT_NUMBER:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_RESULT_MODAL_HIDE:
    case KEYSTORE_MODAL_HIDE:
        return {
            ...state,
            value: '',
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};
const bip39PassPhrase = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case SET_BIP_39_PASSPHRASE:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_RESULT_MODAL_HIDE:
    case KEYSTORE_MODAL_HIDE:
        return {
            ...state,
            value: '',
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};
export default combineReducers({
    accountIndex,
    accountNumber,
    bip39PassPhrase
});
