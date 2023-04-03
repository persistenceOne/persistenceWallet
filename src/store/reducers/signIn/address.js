import {
    SET_SIGN_IN_ADDRESS,
    SIGN_IN_ADDRESS_MODAL_HIDE,
    SIGN_IN_ADDRESS_MODAL_SHOW
} from "../../../constants/signIn/address";
import {combineReducers} from "redux";

const addressModal = (state = false, {
    type,
}) => {
    switch (type) {
    case SIGN_IN_ADDRESS_MODAL_SHOW:
        return true;
    case SIGN_IN_ADDRESS_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

const address = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case SET_SIGN_IN_ADDRESS:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case SIGN_IN_ADDRESS_MODAL_HIDE:
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
    addressModal,
    address,
});
