import {combineReducers} from 'redux';
import send from './send';
import common from "./common";

export default combineReducers({
    send,
    common
});
