import {TX_GAS_SET, TX_AUTO_GAS_SET} from "../../../constants/gas";
// const {SigningStargateClient} = require("@cosmjs/stargate");
// const tendermintRPCURL = process.env.REACT_APP_TENDERMINT_RPC_ENDPOINT;

export const setTxGas = (data) => {
    return {
        type: TX_GAS_SET,
        data,
    };
};

export const setTxAutoGas = (data) => {
    return {
        type: TX_AUTO_GAS_SET,
        data,
    };
};
// export const fetchAutoGas = () => {
//     return async (dispatch) => {
//         const client = await SigningStargateClient.connectWithSigner(
//             tendermintRPCURL,
//             wallet,
//         );
//     };
// };
