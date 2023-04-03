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
import {combineReducers} from "redux";

const mnemonic = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case KEYSTORE_MNEMONIC_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case KEYSTORE_MNEMONIC_MODAL_HIDE:
    case KEYSTORE_PASSWORD_MODAL_HIDE:
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
    case KEYSTORE_PASSWORD_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case KEYSTORE_PASSWORD_MODAL_HIDE:
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

const mnemonicModal = (state = false, {
    type,
}) => {
    switch (type) {
    case KEYSTORE_MNEMONIC_MODAL_SHOW:
        return true;
    case KEYSTORE_MNEMONIC_MODAL_NEXT:
    case KEYSTORE_MNEMONIC_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

const passwordModal = (state = false, {
    type,
}) => {
    switch (type) {
    case KEYSTORE_PASSWORD_MODAL_SHOW:
        return true;
    case KEYSTORE_PASSWORD_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

const resultModal = (state = false, {
    type,
}) => {
    switch (type) {
    case KEYSTORE_RESULT_MODAL_SHOW:
        return true;
    case KEYSTORE_RESULT_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};
export default combineReducers({
    mnemonic,
    password,
    mnemonicModal,
    passwordModal,
    resultModal
});
