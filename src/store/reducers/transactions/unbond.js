import {combineReducers} from "redux";
import {TX_RESULT_MODAL_HIDE, TX_SUCCESS} from "../../../constants/common";
import {
    TX_UNBOND_AMOUNT_SET,
    TX_UNBOND_MEMO_SET,
    TX_UNBOND_MODAL_HIDE,
    TX_UNBOND_MODAL_SHOW
} from "../../../constants/unbond";

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
    case TX_UNBOND_AMOUNT_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };

    case TX_SUCCESS:
    case TX_UNBOND_MODAL_HIDE:
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


const modal = (state = false, {
    type,
}) => {
    switch (type) {
    case TX_UNBOND_MODAL_SHOW:
        return true;
    case TX_UNBOND_MODAL_HIDE:
        return false;
    default:
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
    case TX_UNBOND_MEMO_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_UNBOND_MODAL_HIDE:
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
    amount,
    modal,
    memo
});
