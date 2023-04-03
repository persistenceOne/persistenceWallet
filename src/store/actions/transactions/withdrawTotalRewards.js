import {
    TX_WITH_DRAW_TOTAL_REWARDS_AMOUNT_SET,
    TX_WITH_DRAW_TOTAL_REWARDS_MEMO_SET,
    TX_WITH_DRAW_TOTAL_REWARDS_MODAL_HIDE,
    TX_WITH_DRAW_TOTAL_REWARDS_MODAL_SHOW,
    TX_WITH_DRAW_TOTAL_REWARDS_VALIDATORS_COMMISSION_SET,
    TX_WITH_DRAW_TOTAL_REWARDS_VALIDATORS_SET
} from "../../../constants/withdrawTotalRewards";
import {setTxIno, setTxName} from "./common";
import {showFeeModal} from "./fee";

export const setTxWithDrawTotalRewardsAmount = (data) => {
    return {
        type: TX_WITH_DRAW_TOTAL_REWARDS_AMOUNT_SET,
        data,
    };
};

export const setTxWithDrawTotalValidators = (data) => {
    return {
        type: TX_WITH_DRAW_TOTAL_REWARDS_VALIDATORS_SET,
        data,
    };
};

export const setTxWithDrawTotalValidatorsCommission = (data) => {
    return {
        type: TX_WITH_DRAW_TOTAL_REWARDS_VALIDATORS_COMMISSION_SET,
        data,
    };
};

export const showTxWithDrawTotalModal = (data) => {
    return {
        type: TX_WITH_DRAW_TOTAL_REWARDS_MODAL_SHOW,
        data,
    };
};

export const hideTxWithDrawTotalModal = (data) => {
    return {
        type: TX_WITH_DRAW_TOTAL_REWARDS_MODAL_HIDE,
        data,
    };
};

export const setTxMemo = (data) => {
    return {
        type: TX_WITH_DRAW_TOTAL_REWARDS_MEMO_SET,
        data,
    };
};

export const submitFormData = (messages) => (dispatch, getState) => {
    dispatch(setTxName({
        value: {
            name: "withdrawMultiple",
        }
    }));
    dispatch(setTxIno({
        value: {
            modal: showTxWithDrawTotalModal(),
            data: {
                message: messages,
                memo: getState().mulitpleRewardsWithDraw.memo.value,
            }
        }
    }));
    dispatch(hideTxWithDrawTotalModal());
    dispatch(showFeeModal());
};
