import {combineReducers} from 'redux';
import {
    UNBOND_DELEGATIONS_FETCH_ERROR,
    UNBOND_DELEGATIONS_FETCH_IN_PROGRESS,
    UNBOND_DELEGATIONS_FETCH_SUCCESS,
    UNBOND_DELEGATIONS_LIST
} from "../../constants/unbond";

const inProgress = (state = false, action) => {
    switch (action.type) {
    case UNBOND_DELEGATIONS_FETCH_IN_PROGRESS:
        return true;
    case UNBOND_DELEGATIONS_FETCH_SUCCESS:
    case UNBOND_DELEGATIONS_FETCH_ERROR:
        return false;
    default:
        return state;
    }
};

const unbond = (state = 0, action) => {
    if (action.type === UNBOND_DELEGATIONS_FETCH_SUCCESS) {
        return action.data;
    }
    return state;
};

const list = (state = [], action) => {
    if (action.type === UNBOND_DELEGATIONS_LIST) {
        return action.list;
    }
    return state;
};


const _ = (state = 0, action) => {
    if (action.type === UNBOND_DELEGATIONS_FETCH_ERROR) {
        return action.data;
    } else {
        return state;
    }
};


export default combineReducers({
    unbond,
    _,
    list,
    inProgress
});