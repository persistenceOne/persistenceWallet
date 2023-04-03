import {USER_LOGOUT} from "../../constants/logout";

export const userLogout = (data) => {
    return {
        type: USER_LOGOUT,
        data,
    };
};
