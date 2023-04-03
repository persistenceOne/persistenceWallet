import {TX_SEND_ADDRESS_SET, TX_SEND_AMOUNT_SET, TX_SEND_MEMO_SET, TX_SEND_TOKEN_SET} from "../../../constants/send";
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
    case TX_SEND_ADDRESS_SET:
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
            value: '',
            error: {
                message: '',
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
    case TX_SEND_AMOUNT_SET:
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

const token = (state = {value: []}, action) => {
    if (action.type === TX_SEND_TOKEN_SET) {
        return {
            ...state,
            value: action.data.value,
        };
    } else {
        return state;
    }
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
    case TX_SEND_MEMO_SET:
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
export default combineReducers({
    toAddress,
    amount,
    token,
    memo
});
