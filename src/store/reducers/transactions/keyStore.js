import {combineReducers} from 'redux';
import {
    KEYSTORE_MODAL_HIDE,
    KEYSTORE_MODAL_SHOW,
    TX_KEY_STORE_PASSWORD_SET,
    TX_KEY_STORE_SET
} from "../../../constants/keyStore";
import {TX_RESULT_MODAL_HIDE, TX_SUCCESS} from "../../../constants/common";
import {CHANGE_KEYSTORE_MODAL_HIDE, CHANGE_KEYSTORE_MODAL_NEXT} from "../../../constants/changePassword";
import {SIGN_IN_KEYSTORE_MODAL_HIDE} from "../../../constants/signIn/keyStore";

const keyStore = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_KEY_STORE_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case KEYSTORE_MODAL_HIDE:
    case SIGN_IN_KEYSTORE_MODAL_HIDE:
    case CHANGE_KEYSTORE_MODAL_HIDE:
    case TX_SUCCESS:
    case TX_RESULT_MODAL_HIDE:
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

const password = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_KEY_STORE_PASSWORD_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case KEYSTORE_MODAL_HIDE:
    case CHANGE_KEYSTORE_MODAL_NEXT:
    case CHANGE_KEYSTORE_MODAL_HIDE:
    case TX_SUCCESS:
    case TX_RESULT_MODAL_HIDE:
    case SIGN_IN_KEYSTORE_MODAL_HIDE:
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

const modal = (state = false, {
    type,
}) => {
    switch (type) {
    case KEYSTORE_MODAL_SHOW:
        return true;
    case TX_SUCCESS:
    case KEYSTORE_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    keyStore,
    password,
    modal
});
