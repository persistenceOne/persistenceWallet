import {
    TX_IBC_SEND_ADDRESS_SET,
    TX_IBC_SEND_AMOUNT_SET,
    TX_IBC_SEND_CHAIN_INFO_SET,
    TX_IBC_SEND_CUSTOM_CHANNEL_SET,
    TX_IBC_SEND_CUSTOM_PORT_SET,
    TX_IBC_SEND_MEMO_SET,
    TX_IBC_SEND_TOKEN_SET
} from "../../../constants/sendIbc";
import {combineReducers} from 'redux';
import {TX_RESULT_MODAL_HIDE, TX_SUCCESS} from "../../../constants/common";
import {IBCConfiguration} from "../../../config";

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
    case TX_IBC_SEND_ADDRESS_SET:
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
    case TX_IBC_SEND_AMOUNT_SET:
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
    if (action.type === TX_IBC_SEND_TOKEN_SET) {
        return {
            ...state,
            value: action.data.value,
        };
    } else {
        return state;
    }
};

const customPort = (state = {
    value: IBCConfiguration.ibcDefaultPort,
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_IBC_SEND_CUSTOM_PORT_SET:
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
            value: IBCConfiguration.ibcDefaultPort,
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};

const customChannel = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_IBC_SEND_CUSTOM_CHANNEL_SET:
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

const chainInfo = (state = {
    value: {
        customChain: false,
        chainID: '',
        prefix:'',
        chainName: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_IBC_SEND_CHAIN_INFO_SET:
        return {
            ...state,
            value: data.value,
        };
    case TX_SUCCESS:
    case TX_RESULT_MODAL_HIDE:
        return {
            ...state,
            value: {
                customChain: false,
                chainID: '',
                prefix: '',
                chainName: '',
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
    case TX_IBC_SEND_MEMO_SET:
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
    customPort,
    customChannel,
    chainInfo,
    memo
});
