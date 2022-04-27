import {
    SET_LEDGER_ACCOUNT_INDEX,
    SET_LEDGER_ACCOUNT_NUMBER,
    SET_LEDGER_INFO,
    SIGN_IN_LEDGER_MODAL_HIDE,
    SIGN_IN_LEDGER_MODAL_SHOW,
    SET_LEDGER_APP_NAME
} from "../../../constants/signIn/ledger";
import {combineReducers} from "redux";

const ledgerModal = (state = false, {
    type,
}) => {
    switch (type) {
    case SIGN_IN_LEDGER_MODAL_SHOW:
        return true;
    case SIGN_IN_LEDGER_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

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
    case SET_LEDGER_ACCOUNT_INDEX:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
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
    case SET_LEDGER_ACCOUNT_NUMBER:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    default:
        return state;
    }
};

const ledgerInfo = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case SET_LEDGER_INFO:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case SIGN_IN_LEDGER_MODAL_HIDE:
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

const ledgerAppName = (state = {
    value: '',
}, {
    type,
    data,
}) => {
    switch (type) {
    case SET_LEDGER_APP_NAME:
        return {
            ...state,
            value: data.value,
        };
    default:
        return state;
    }
};

export default combineReducers({
    ledgerModal,
    ledgerInfo,
    accountIndex,
    accountNumber,
    ledgerAppName
});
