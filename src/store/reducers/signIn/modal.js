import {SIGN_IN_MODAL_HIDE, SIGN_IN_MODAL_SHOW} from "../../../constants/signIn/modal";
import {combineReducers} from "redux";

const modal = (state = false, {
    type,
}) => {
    switch (type) {
    case SIGN_IN_MODAL_SHOW:
        return true;
    case SIGN_IN_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    modal,
});
