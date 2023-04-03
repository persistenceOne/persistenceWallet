import {combineReducers} from 'redux';
import {TOKEN_PRICE_FETCH_ERROR, TOKEN_PRICE_FETCH_SUCCESS,} from "../../constants/tokenPrice";
import {stringToNumber} from "../../utils/scripts";


const tokenPrice = (state = 0, action) => {
    if (action.type === TOKEN_PRICE_FETCH_SUCCESS) {
        return (action.data * 1);
    }
    return state;
};

const _ = (state = {}, action) => {
    if (action.type === TOKEN_PRICE_FETCH_ERROR) {
        return (stringToNumber(action.data));
    } else {
        return state;
    }
};


export default combineReducers({
    tokenPrice,
    _,
});