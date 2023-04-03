import {SET_ACCOUNT_INDEX, SET_ACCOUNT_NUMBER, SET_BIP_39_PASSPHRASE} from "../../../constants/advanced";

export const setAccountNumber = (data) => {
    return {
        type: SET_ACCOUNT_NUMBER,
        data,
    };
};

export const setAccountIndex = (data) => {
    return {
        type: SET_ACCOUNT_INDEX,
        data,
    };
};

export const setBip39Passphrase = (data) => {
    return {
        type: SET_BIP_39_PASSPHRASE,
        data,
    };
};
