import {TX_GAS_SET} from "../../../constants/gas";

export const setTxGas = (data) => {
    return {
        type: TX_GAS_SET,
        data,
    };
};
