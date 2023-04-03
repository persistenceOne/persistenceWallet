import {
    CHANGE_KEYSTORE_MODAL_HIDE, CHANGE_KEYSTORE_MODAL_NEXT,
    CHANGE_KEYSTORE_MODAL_SHOW,
    CHANGE_KEYSTORE_NEW_PASSWORD_MODAL_HIDE, CHANGE_KEYSTORE_NEW_PASSWORD_MODAL_NEXT,
    CHANGE_KEYSTORE_NEW_PASSWORD_MODAL_SHOW,
    CHANGE_KEYSTORE_RESULT_MODAL_HIDE,
    CHANGE_KEYSTORE_RESULT_MODAL_SHOW,
    CHANGE_KEYSTORE_RESULT_SET,
    KEYSTORE_NEW_PASSWORD_SET,
    CHANGE_KEYSTORE_SET_COIN_TYPE
} from "../../constants/changePassword";
import {combineReducers} from "redux";
import {DefaultChainInfo} from "../../config";

const newPassword = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case KEYSTORE_NEW_PASSWORD_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case CHANGE_KEYSTORE_NEW_PASSWORD_MODAL_HIDE:
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

const keyStoreModal = (state = false, {
    type,
}) => {
    switch (type) {
    case CHANGE_KEYSTORE_MODAL_SHOW:
        return true;
    case CHANGE_KEYSTORE_MODAL_NEXT:
    case CHANGE_KEYSTORE_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

const newPasswordModal = (state = false, {
    type,
}) => {
    switch (type) {
    case CHANGE_KEYSTORE_NEW_PASSWORD_MODAL_SHOW:
        return true;
    case CHANGE_KEYSTORE_NEW_PASSWORD_MODAL_HIDE:
    case CHANGE_KEYSTORE_NEW_PASSWORD_MODAL_NEXT:
        return false;
    default:
        return state;
    }
};

const coinType = (state = DefaultChainInfo.coinType , {type, data}) => {
    switch (type) {
    case CHANGE_KEYSTORE_SET_COIN_TYPE:
        return data;
    default:
        return state;
    }
};

const resultModal = (state = false, {
    type,
}) => {
    switch (type) {
    case CHANGE_KEYSTORE_RESULT_MODAL_SHOW:
        return true;
    case CHANGE_KEYSTORE_RESULT_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

const response = (state = {
    value: '',
    error: {
        message: ''
    }
}, {
    type,
    data,
}) => {
    switch (type) {
    case CHANGE_KEYSTORE_RESULT_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case CHANGE_KEYSTORE_NEW_PASSWORD_MODAL_HIDE:
    case CHANGE_KEYSTORE_MODAL_HIDE:
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
    newPassword,
    resultModal,
    keyStoreModal,
    newPasswordModal,
    response,
    coinType
});
