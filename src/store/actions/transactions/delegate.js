import {
    TX_DELEGATE_AMOUNT_SET,
    TX_DELEGATE_MEMO_SET,
    TX_DELEGATE_MODAL_HIDE,
    TX_DELEGATE_MODAL_SHOW
} from "../../../constants/delegate";
import {setTxIno, setTxName} from "./common";
import {showFeeModal} from "./fee";

export const setTxDelegateAmount = (data) => {
    return {
        type: TX_DELEGATE_AMOUNT_SET,
        data,
    };
};

export const showTxDelegateModal = (data) => {
    return {
        type: TX_DELEGATE_MODAL_SHOW,
        data,
    };
};

export const hideTxDelegateModal = (data) => {
    return {
        type: TX_DELEGATE_MODAL_HIDE,
        data,
    };
};

export const setTxMemo = (data) => {
    return {
        type: TX_DELEGATE_MEMO_SET,
        data,
    };
};

export const submitFormData = (message) => (dispatch, getState) => {
    dispatch(setTxName({
        value: {
            name: "delegate",
        }
    }));
    dispatch(setTxIno({
        value: {
            modal: showTxDelegateModal(),
            data: {
                message: message,
                memo: getState().delegate.memo.value,
            }
        }
    }));
    dispatch(hideTxDelegateModal());
    dispatch(showFeeModal());
};