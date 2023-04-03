import {
    TX_IBC_SEND_ADDRESS_SET,
    TX_IBC_SEND_AMOUNT_SET,
    TX_IBC_SEND_CHAIN_INFO_SET,
    TX_IBC_SEND_CUSTOM_CHANNEL_SET,
    TX_IBC_SEND_CUSTOM_PORT_SET,
    TX_IBC_SEND_MEMO_SET,
    TX_IBC_SEND_TOKEN_SET
} from "../../../constants/sendIbc";
import {setTxIno, setTxName} from "./common";
import {showFeeModal} from "./fee";
import {ExternalChains} from "../../../config";

export const setTxIbcSendAmount = (data) => {
    return {
        type: TX_IBC_SEND_AMOUNT_SET,
        data,
    };
};
export const setTxIbcSendToken = (data) => {
    return {
        type: TX_IBC_SEND_TOKEN_SET,
        data,
    };
};
export const setTxIbcSendAddress = (data) => {
    return {
        type: TX_IBC_SEND_ADDRESS_SET,
        data,
    };
};

export const setTxIbcSendCustomPort = (data) => {
    return {
        type: TX_IBC_SEND_CUSTOM_PORT_SET,
        data,
    };
};

export const setTxIbcSendCustomChannel = (data) => {
    return {
        type: TX_IBC_SEND_CUSTOM_CHANNEL_SET,
        data,
    };
};

export const setTxIbcSendChainInfo = (data) => {
    return {
        type: TX_IBC_SEND_CHAIN_INFO_SET,
        data,
    };
};

export const setTxMemo = (data) => {
    return {
        type: TX_IBC_SEND_MEMO_SET,
        data,
    };
};


export const submitFormData = (message) => (dispatch, getState) => {
    const channelUrl = ExternalChains.find(chain => chain.chainName === getState().sendIbc.chainInfo.chainName);
    dispatch(setTxIno({
        value: {
            data: {
                message: message,
                amount: getState().sendIbc.amount.value,
                denom: getState().sendIbc.token.value.tokenDenom,
                memo: getState().sendIbc.memo.value,
                channelID: getState().sendIbc.chainInfo.value.customChain ? getState().sendIbc.customChannel.value : getState().sendIbc.chainInfo.value.chainID,
                channelUrl : channelUrl && channelUrl.rpc !=='' ? channelUrl.rpc : undefined,
                inputPort: getState().sendIbc.chainInfo.value.customChain ? getState().sendIbc.customPort.value : "transfer",
                toAddress: getState().sendIbc.toAddress.value,
            }
        }
    }));
    dispatch(setTxName({
        value: {
            name: "ibc",
        }
    }));
    dispatch(showFeeModal());
};
