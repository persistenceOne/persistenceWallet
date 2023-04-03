import {combineReducers} from 'redux';
import {
    PAGE_NUMBER_FETCH_SUCCESS,
    RECEIVE_PAGE_NUMBER_FETCH_SUCCESS,
    RECEIVE_TRANSACTIONS_FETCH_ERROR,
    RECEIVE_TRANSACTIONS_FETCH_SUCCESS,
    RECEIVE_TRANSACTIONS_IN_PROGRESS,
    TRANSACTIONS_FETCH_ERROR,
    TRANSACTIONS_FETCH_SUCCESS,
    TRANSACTIONS_IN_PROGRESS
} from "../../constants/transactionQueries";

const inProgress = (state = false, action) => {
    switch (action.type) {
    case TRANSACTIONS_IN_PROGRESS:
        return true;
    case TRANSACTIONS_FETCH_SUCCESS:
    case TRANSACTIONS_FETCH_ERROR:
        return false;
    default:
        return state;
    }
};

const list = (state = [], action) => {
    if (action.type === TRANSACTIONS_FETCH_SUCCESS) {
        return action.list;
    }
    return state;
};

const _ = (state = [], action) => {
    if (action.type === TRANSACTIONS_FETCH_SUCCESS) {
        return action.list;
    } else {
        return state;
    }
};

const pageNumber = (state = 1, action) => {
    if (action.type === PAGE_NUMBER_FETCH_SUCCESS) {
        return [action.number, action.totalPages];
    }
    return state;
};

const inReceiveTxnProgress = (state = false, action) => {
    switch (action.type) {
    case RECEIVE_TRANSACTIONS_IN_PROGRESS:
        return true;
    case RECEIVE_TRANSACTIONS_FETCH_SUCCESS:
    case RECEIVE_TRANSACTIONS_FETCH_ERROR:
        return false;
    default:
        return state;
    }
};

const receiveTxnList = (state = [], action) => {
    if (action.type === RECEIVE_TRANSACTIONS_FETCH_SUCCESS) {
        return action.list;
    }
    return state;
};


const receiveTxnPageNumber = (state = 1, action) => {
    if (action.type === RECEIVE_PAGE_NUMBER_FETCH_SUCCESS) {
        return [action.number, action.totalPages];
    }
    return state;
};


export default combineReducers({
    list,
    _,
    inProgress,
    pageNumber,
    inReceiveTxnProgress,
    receiveTxnList,
    receiveTxnPageNumber
});