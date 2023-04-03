import {combineReducers} from 'redux';
import {
    BALANCE_FETCH_ERROR,
    BALANCE_FETCH_IN_PROGRESS,
    BALANCE_FETCH_SUCCESS,
    BALANCE_LIST_FETCH_SUCCESS,
    TOKEN_LIST_FETCH_SUCCESS,
    TRANSFERABLE_BALANCE_LIST_FETCH_SUCCESS,
    VESTING_BALANCE_FETCH_SUCCESS
} from "../../constants/balance";
import {stringToNumber} from "../../utils/scripts";

const inProgress = (state = false, action) => {
    switch (action.type) {
    case BALANCE_FETCH_IN_PROGRESS:
        return true;
    case BALANCE_FETCH_SUCCESS:
    case BALANCE_FETCH_ERROR:
        return false;
    default:
        return state;
    }
};

const amount = (state = 0, action) => {
    if (action.type === BALANCE_FETCH_SUCCESS) {
        return (action.data);
    }
    return state;
};

const _ = (state = 0, action) => {
    if (action.type === BALANCE_FETCH_ERROR) {
        return (stringToNumber(action.data));
    } else {
        return state;
    }
};


const list = (state = [], action) => {
    if (action.type === BALANCE_LIST_FETCH_SUCCESS) {
        return action.list;
    }
    return state;
};

const transferableAmount = (state = 0, action) => {
    if (action.type === TRANSFERABLE_BALANCE_LIST_FETCH_SUCCESS) {
        return action.data;
    }
    return state;
};

const vestingAmount = (state = 0, action) => {
    if (action.type === VESTING_BALANCE_FETCH_SUCCESS) {
        return action.data;
    }
    return state;
};

const tokenList = (state = [], action) => {
    if (action.type === TOKEN_LIST_FETCH_SUCCESS) {
        return action.list;
    }
    return state;
};

export default combineReducers({
    amount,
    _,
    list,
    transferableAmount,
    vestingAmount,
    inProgress,
    tokenList
});
