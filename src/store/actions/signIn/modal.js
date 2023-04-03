import {SIGN_IN_MODAL_HIDE, SIGN_IN_MODAL_SHOW} from "../../../constants/signIn/modal";

export const hideSignInModal = (data) => {
    return {
        type: SIGN_IN_MODAL_HIDE,
        data,
    };
};
export const showSignInModal = (data) => {
    return {
        type: SIGN_IN_MODAL_SHOW,
        data,
    };
};
