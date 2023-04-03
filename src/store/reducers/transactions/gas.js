import {combineReducers} from 'redux';
import {TX_GAS_SET} from "../../../constants/gas";
import {TX_RESULT_MODAL_HIDE, TX_SUCCESS} from "../../../constants/common";
import {FEE_MODAL_HIDE} from "../../../constants/fee";
import {GasInfo} from "../../../config";

const gas = (state = {
    value: GasInfo.gas,
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
            value: GasInfo.gas,
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
    gas
});
