import {
    TX_WITH_DRAW_TOTAL_REWARDS_AMOUNT_SET,
    TX_WITH_DRAW_TOTAL_REWARDS_MEMO_SET,
    TX_WITH_DRAW_TOTAL_REWARDS_MODAL_HIDE,
    TX_WITH_DRAW_TOTAL_REWARDS_MODAL_SHOW,
    TX_WITH_DRAW_TOTAL_REWARDS_VALIDATORS_COMMISSION_SET,
    TX_WITH_DRAW_TOTAL_REWARDS_VALIDATORS_SET
} from "../../../constants/withdrawTotalRewards";
import {TX_RESULT_MODAL_HIDE, TX_SUCCESS} from "../../../constants/common";
import {combineReducers} from "redux";


const rewards = (state = {
    value: 0,
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_WITH_DRAW_TOTAL_REWARDS_AMOUNT_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_SUCCESS:
    case TX_WITH_DRAW_TOTAL_REWARDS_MODAL_HIDE:
    case TX_RESULT_MODAL_HIDE:
        return {
            ...state,
            value: 0,
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};

const validatorsList = (state = {
    value: [],
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_WITH_DRAW_TOTAL_REWARDS_VALIDATORS_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_SUCCESS:
    case TX_WITH_DRAW_TOTAL_REWARDS_MODAL_HIDE:
    case TX_RESULT_MODAL_HIDE:
        return {
            ...state,
            value: [],
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};

const commission = (state = {
    value: [],
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_WITH_DRAW_TOTAL_REWARDS_VALIDATORS_COMMISSION_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_SUCCESS:
    case TX_WITH_DRAW_TOTAL_REWARDS_MODAL_HIDE:
    case TX_RESULT_MODAL_HIDE:
        return {
            ...state,
            value: [],
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
    case TX_WITH_DRAW_TOTAL_REWARDS_MODAL_SHOW:
        return true;
    case TX_WITH_DRAW_TOTAL_REWARDS_MODAL_HIDE:
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
    case TX_WITH_DRAW_TOTAL_REWARDS_MEMO_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_WITH_DRAW_TOTAL_REWARDS_MODAL_HIDE:
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
    rewards,
    validatorsList,
    modal,
    commission,
    memo
});
