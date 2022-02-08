import {combineReducers} from 'redux';
import {TX_GAS_SET, TX_AUTO_GAS_SET} from "../../../constants/gas";
import {TX_RESULT_MODAL_HIDE, TX_SUCCESS} from "../../../constants/common";
import config from "../../../config";
import {FEE_MODAL_HIDE} from "../../../constants/fee";

const gas = (state = {
    value: config.gas,
    feeError: {
        message: '',
    },
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_GAS_SET:
        return {
            ...state,
            value: data.value,
            feeError: {
                ...state.error,
                message: data.feeError.message,
            },
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_SUCCESS:
    case FEE_MODAL_HIDE:
    case TX_RESULT_MODAL_HIDE:
        return {
            ...state,
            value: config.gas,
            feeError: {
                message: '',
            },
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};

const autoGas = (state = {
    value: config.gas,
    feeError: {
        message: '',
    },
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_AUTO_GAS_SET:
        return {
            ...state,
            value: data.value,
            feeError: {
                ...state.error,
                message: data.feeError.message,
            },
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_SUCCESS:
    case FEE_MODAL_HIDE:
    case TX_RESULT_MODAL_HIDE:
        return {
            ...state,
            value: config.gas,
            feeError: {
                message: '',
            },
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
    gas,
    autoGas
});
