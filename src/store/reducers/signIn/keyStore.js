import {
    SET_KEYSTORE_RESULT,
    SIGN_IN_KEYSTORE_MODAL_HIDE,
    SIGN_IN_KEYSTORE_MODAL_SHOW,
    SIGN_IN_KEYSTORE_RESULT_MODAL_HIDE,
    SIGN_IN_KEYSTORE_RESULT_MODAL_SHOW,
    SIGN_IN_KEYSTORE_MODAL_NEXT, SET_COIN_TYPE
} from "../../../constants/signIn/keyStore";
import {combineReducers} from "redux";
import {DefaultChainInfo} from "../../../config";

const keyStoreModal = (state = false, {
    type,
}) => {
    switch (type) {
    case SIGN_IN_KEYSTORE_MODAL_SHOW:
        return true;
    case SIGN_IN_KEYSTORE_MODAL_NEXT:
    case SIGN_IN_KEYSTORE_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

const keyStoreResultModal = (state = false, {
    type,
}) => {
    switch (type) {
    case SIGN_IN_KEYSTORE_RESULT_MODAL_SHOW:
        return true;
    case SIGN_IN_KEYSTORE_RESULT_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

const response = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case SET_KEYSTORE_RESULT:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case SIGN_IN_KEYSTORE_MODAL_HIDE:
    case SIGN_IN_KEYSTORE_RESULT_MODAL_SHOW:
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

const coinType = (state = DefaultChainInfo.deprecatedCoinType , {type, data}) => {
    switch (type) {
    case SET_COIN_TYPE:
        return data;
    default:
        return state;
    }
};

export default combineReducers({
    keyStoreModal,
    keyStoreResultModal,
    response,
    coinType
});
