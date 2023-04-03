import {
    TX_RE_DELEGATE_AMOUNT_SET,
    TX_RE_DELEGATE_MEMO_SET,
    TX_RE_DELEGATE_MODAL_HIDE,
    TX_RE_DELEGATE_MODAL_SHOW,
    TX_RE_DELEGATE_TO_ADDRESS_SET
} from "../../../constants/redelegate";
import {setTxIno, setTxName} from "./common";
import {showFeeModal} from "./fee";

export const setTxReDelegateAmount = (data) => {
    return {
        type: TX_RE_DELEGATE_AMOUNT_SET,
        data,
    };
};

export const setTxReDelegateAddress = (data) => {
    return {
        type: TX_RE_DELEGATE_TO_ADDRESS_SET,
        data,
    };
};

export const showTxReDelegateModal = (data) => {
    return {
        type: TX_RE_DELEGATE_MODAL_SHOW,
        data,
    };
};

export const hideTxReDelegateModal = (data) => {
    return {
        type: TX_RE_DELEGATE_MODAL_HIDE,
        data,
    };
};

export const setTxMemo = (data) => {
    return {
        type: TX_RE_DELEGATE_MEMO_SET,
        data,
    };
};

export const submitFormData = (message) => (dispatch, getState) => {
    dispatch(setTxName({
        value: {
            name: "reDelegate",
        }
    }));
    dispatch(setTxIno({
        value: {
            modal: showTxReDelegateModal(),
            data: {
                message: message,
                memo: getState().redelegate.memo.value,
            }
        }
    }));
    dispatch(hideTxReDelegateModal());
    dispatch(showFeeModal());
};