import {
    TX_MIGRATE_ADDRESS_SET,
    TX_MIGRATE_MEMO_SET,
    TX_MIGRATE_MODAL_SHOW,
    TX_MIGRATE_MODAL_HIDE,
    TX_MIGRATE_AMOUNT_SET,
    TX_MIGRATE_TOKENS_LIST_SET,
    TX_MIGRATE_BUTTON_STATUS,
    TX_MIGRATE_AMOUNT_ERROR
} from "../../../constants/migrateAssets";
import {combineReducers} from 'redux';
import {TX_RESULT_MODAL_HIDE, TX_SUCCESS} from "../../../constants/common";

const toAddress = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_MIGRATE_ADDRESS_SET:
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

const amount = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_MIGRATE_AMOUNT_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
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

const migrationTokenList = (state = [], action) => {
    if (action.type === TX_MIGRATE_TOKENS_LIST_SET) {
        return {
            ...state,
            list: action.list,
        };
    }
    return state;
};

const memo = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_MIGRATE_MEMO_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
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

const buttonStatus = (state = [], {type, data}) => {
    switch (type) {
    case TX_MIGRATE_BUTTON_STATUS:
        return data;
    default:
        return state;
    }
};

const amountError = (state = "", {type, data}) => {
    switch (type) {
    case TX_MIGRATE_AMOUNT_ERROR:
        return data;
    default:
        return state;
    }
};

const modal = (state = false, {
    type,
}) => {
    switch (type) {
    case TX_MIGRATE_MODAL_SHOW:
        return true;
    case TX_MIGRATE_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    amount,
    memo,
    modal,
    toAddress,
    amountError,
    migrationTokenList,
    buttonStatus
});
