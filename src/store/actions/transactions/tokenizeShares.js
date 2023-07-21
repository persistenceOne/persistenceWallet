import {
    TX_TOKENIZE_AMOUNT_SET,
    TX_TOKENIZE_MEMO_SET,
    TX_TOKENIZE_MODAL_HIDE,
    TX_TOKENIZE_MODAL_SHOW
} from "../../../constants/tokenizeShares";
import {setTxIno, setTxName} from "./common";
import {showFeeModal} from "./fee";

export const setTxTokenizeAmount = (data) => {
    return {
        type: TX_TOKENIZE_AMOUNT_SET,
        data,
    };
};

export const showTxTokenizeModal = (data) => {
    return {
        type: TX_TOKENIZE_MODAL_SHOW,
        data,
    };
};

export const hideTxTokenizeModal = (data) => {
    return {
        type: TX_TOKENIZE_MODAL_HIDE,
        data,
    };
};

export const setTxMemo = (data) => {
    return {
        type: TX_TOKENIZE_MEMO_SET,
        data,
    };
};

export const submitFormData = (message) => (dispatch, getState) => {
    dispatch(setTxName({
        value: {
            name: "tokenize",
        }
    }));
    dispatch(setTxIno({
        value: {
            modal: showTxTokenizeModal(),
            data: {
                message: message,
                memo: getState().tokenizeShares.memo.value,
            }
        }
    }));
    dispatch(hideTxTokenizeModal());
    dispatch(showFeeModal());
};