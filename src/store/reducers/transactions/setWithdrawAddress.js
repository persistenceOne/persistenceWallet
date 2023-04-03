import {
    SET_PREVIOUS_MODAL_NAME,
    TX_SET_WITH_DRAW_ADDRESS_MEMO_SET,
    TX_SET_WITH_DRAW_ADDRESS_MODAL_HIDE,
    TX_SET_WITH_DRAW_ADDRESS_MODAL_SHOW,
    TX_SET_WITH_DRAW_ADDRESS_SET
} from "../../../constants/setWithdrawAddress";
import {TX_RESULT_MODAL_HIDE, TX_SUCCESS} from "../../../constants/common";
import {combineReducers} from "redux";

const revisedAddress = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_SET_WITH_DRAW_ADDRESS_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_SUCCESS:
    case TX_SET_WITH_DRAW_ADDRESS_MODAL_HIDE:
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
    case TX_SET_WITH_DRAW_ADDRESS_MODAL_SHOW:
        return true;
    case TX_SET_WITH_DRAW_ADDRESS_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

const previousModalName = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case SET_PREVIOUS_MODAL_NAME:
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
    case TX_SET_WITH_DRAW_ADDRESS_MEMO_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_SET_WITH_DRAW_ADDRESS_MODAL_HIDE:
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
    revisedAddress,
    modal,
    memo,
    previousModalName
});
