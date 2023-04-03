import {combineReducers} from 'redux';
import {FETCH_WITHDRAW_ADDRESS_SUCCESS,} from "../../constants/withdrawAddress";

const withdrawAddress = (state = "", action) => {
    if (action.type === FETCH_WITHDRAW_ADDRESS_SUCCESS) {
        return (action.address);
    }
    return state;
};

const _ = (state = "", action) => {
    if (action.type === FETCH_WITHDRAW_ADDRESS_SUCCESS) {
        return (action.address);
    } else {
        return state;
    }
};


export default combineReducers({
    withdrawAddress,
    _,
});