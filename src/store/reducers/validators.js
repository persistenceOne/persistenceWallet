import {combineReducers} from 'redux';
import {
    FETCH_ACTIVE_VALIDATORS_SUCCESS,
    FETCH_DELEGATED_VALIDATORS_SUCCESS,
    FETCH_INACTIVE_VALIDATORS_SUCCESS,
    FETCH_VALIDATORS_ERROR,
    FETCH_VALIDATORS_IN_PROGRESS,
    FETCH_VALIDATORS_SUCCESS,
    SET_VALIDATOR_DELEGATIONS,
    SET_VALIDATOR_REWARDS,
    SET_VALIDATOR_TX_DATA,
    VALIDATOR_TX_MODAL_HIDE,
    VALIDATOR_TX_MODAL_SHOW
} from "../../constants/validators";
import Lodash from "lodash";
import {TX_RESULT_MODAL_HIDE, TX_SUCCESS} from "../../constants/common";

const inProgress = (state = false, action) => {
    switch (action.type) {
    case FETCH_VALIDATORS_IN_PROGRESS:
        return true;
    case FETCH_ACTIVE_VALIDATORS_SUCCESS:
    case FETCH_INACTIVE_VALIDATORS_SUCCESS:
    case FETCH_VALIDATORS_SUCCESS:
    case FETCH_VALIDATORS_ERROR:
        return false;
    default:
        return state;
    }
};


const activeList = (state = [], action) => {
    if (action.type === FETCH_ACTIVE_VALIDATORS_SUCCESS) {
        return action.list;
    }
    return state;
};

const activeVotingPower = (state = 0, action) => {

    if (action.type === FETCH_ACTIVE_VALIDATORS_SUCCESS) {
        const active = Lodash.sumBy(action.list, (item) => {
            return parseInt(item.data.tokens);
        });

        return {
            ...state,
            active,
        };
    }
    return state;
};

const inActiveVotingPower = (state = 0, action) => {
    if (action.type === FETCH_INACTIVE_VALIDATORS_SUCCESS) {
        const inActive = Lodash.sumBy(action.list, (item) => {
            return parseInt(item.data.tokens);
        });
        return {
            ...state,
            inActive,
        };
    }
    return state;
};

const inActiveList = (state = [], action) => {
    if (action.type === FETCH_INACTIVE_VALIDATORS_SUCCESS) {
        return action.list;
    } else {
        return state;
    }
};

const validators = (state = [], action) => {
    if (action.type === FETCH_VALIDATORS_SUCCESS) {
        return action.list;
    } else {
        return state;
    }
};

const delegatedValidators = (state = [], action) => {
    if (action.type === FETCH_DELEGATED_VALIDATORS_SUCCESS) {
        return action.list;
    } else {
        return state;
    }
};

const validatorTxModal = (state = false, {
    type,
}) => {
    switch (type) {
    case VALIDATOR_TX_MODAL_SHOW:
        return true;
    case VALIDATOR_TX_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

const validator = (state = {
    value: {},
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case SET_VALIDATOR_TX_DATA:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_RESULT_MODAL_HIDE:
    case TX_SUCCESS:
        return {
            ...state,
            value: {},
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};

const validatorDelegations = (state = {
    value: 0,
    status: false,
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case SET_VALIDATOR_DELEGATIONS:
        return {
            ...state,
            value: data.value,
            status: data.status,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_RESULT_MODAL_HIDE:
    case TX_SUCCESS:
        return {
            ...state,
            value: 0,
            status: false,
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};


const validatorRewards = (state = {
    value: 0,
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case SET_VALIDATOR_REWARDS:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_RESULT_MODAL_HIDE:
    case TX_SUCCESS:
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

export default combineReducers({
    activeList,
    inActiveList,
    activeVotingPower,
    inActiveVotingPower,
    inProgress,
    validators,
    delegatedValidators,
    validatorTxModal,
    validator,
    validatorDelegations,
    validatorRewards
});
