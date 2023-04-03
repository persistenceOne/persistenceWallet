import {combineReducers} from 'redux';
import {
    SET_LOGIN_INFO,
    SET_TX_INFO,
    SET_TX_NAME,
    TX_FAILED,
    TX_IN_PROGRESS,
    TX_RESPONSE,
    TX_RESULT_MODAL_HIDE,
    TX_RESULT_MODAL_SHOW,
    TX_SUCCESS
} from "../../../constants/common";
import {KEYSTORE_MODAL_HIDE} from "../../../constants/keyStore";
import {TX_WITH_DRAW_TOTAL_REWARDS_MODAL_HIDE} from "../../../constants/withdrawTotalRewards";
import {TX_SET_WITH_DRAW_ADDRESS_MODAL_HIDE} from "../../../constants/setWithdrawAddress";
import {TX_DELEGATE_MODAL_HIDE} from "../../../constants/delegate";
import {TX_RE_DELEGATE_MODAL_HIDE} from "../../../constants/redelegate";
import {TX_UNBOND_MODAL_HIDE} from "../../../constants/unbond";
import {TX_VALIDATOR_REWARDS_WITHDRAW_HIDE} from "../../../constants/withdrawValidatorRewards";
import {SIGN_IN_ADDRESS_MODAL_HIDE} from "../../../constants/signIn/address";

const modal = (state = false, {
    type,
}) => {
    switch (type) {
    case TX_RESULT_MODAL_SHOW:
        return true;
    case TX_RESULT_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

const txName = (state = {
    value: {
        name: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case SET_TX_NAME:
        return {
            ...state,
            value: data.value,
        };
    case TX_SUCCESS:
    case TX_RESULT_MODAL_HIDE:
        return {
            ...state,
            value: {
                name: '',
            },
        };
    default:
        return state;
    }
};

const txInfo = (state = {
    value: {
        data: ''
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case SET_TX_INFO:
        return {
            ...state,
            value: data.value,
        };
    case TX_SUCCESS:
    case TX_RESULT_MODAL_HIDE:
        return {
            ...state,
            value: {
                data: ''
            },
        };
    default:
        return state;
    }
};

const loginInfo = (state = {
    loggedIn: false,
    encryptedSeed: false,
    error: {
        message: ''
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case SET_LOGIN_INFO:
        return {
            ...state,
            loggedIn: data.loggedIn,
            encryptedSeed: data.encryptedSeed,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case SIGN_IN_ADDRESS_MODAL_HIDE:
        return {
            ...state,
            loggedIn: false,
            encryptedSeed: false,
            error: {
                ...state.error,
                message: '',
            },
        };  
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case TX_IN_PROGRESS:
        return true;
    case TX_FAILED:
    case TX_SUCCESS:
        return false;
    default:
        return state;
    }
};

const txResponse = (state = {}, action) => {
    if (action.type === TX_RESPONSE) {
        return {
            ...state,
            value: action.data,
        };
    } else {
        return state;
    }
};


const error = (state = {
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_FAILED:
        return {
            ...state,
            error: {
                ...state.error,
                message: data,
            },
        };

    case TX_RESULT_MODAL_HIDE:
    case KEYSTORE_MODAL_HIDE:
    case TX_WITH_DRAW_TOTAL_REWARDS_MODAL_HIDE:
    case TX_SET_WITH_DRAW_ADDRESS_MODAL_HIDE:
    case TX_DELEGATE_MODAL_HIDE:
    case TX_RE_DELEGATE_MODAL_HIDE:
    case TX_UNBOND_MODAL_HIDE:
    case TX_VALIDATOR_REWARDS_WITHDRAW_HIDE:
        return {
            ...state,
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
    modal,
    txInfo,
    loginInfo,
    inProgress,
    txResponse,
    error,
    txName
});
