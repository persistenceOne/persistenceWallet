import {
    TX_VALIDATOR_REWARDS_WITHDRAW_HIDE,
    TX_VALIDATOR_REWARDS_WITHDRAW_MEMO_SET,
    TX_VALIDATOR_REWARDS_WITHDRAW_SHOW
} from "../../../constants/withdrawValidatorRewards";
import {setTxIno, setTxName} from "./common";
import {showFeeModal} from "./fee";

export const showTxWithdrawValidatorRewardsModal = (data) => {
    return {
        type: TX_VALIDATOR_REWARDS_WITHDRAW_SHOW,
        data,
    };
};

export const hideTxWithdrawValidatorRewardsModal = (data) => {
    return {
        type: TX_VALIDATOR_REWARDS_WITHDRAW_HIDE,
        data,
    };
};

export const setTxMemo = (data) => {
    return {
        type: TX_VALIDATOR_REWARDS_WITHDRAW_MEMO_SET,
        data,
    };
};


export const submitFormData = (message) => (dispatch, getState) => {
    dispatch(setTxName({
        value: {
            name: "withdrawValidatorRewards",
        }
    }));
    dispatch(setTxIno({
        value: {
            modal: showTxWithdrawValidatorRewardsModal(),
            data: {
                message: message,
                memo: getState().withdrawValidatorRewards.memo.value,
            }
        }
    }));
    dispatch(hideTxWithdrawValidatorRewardsModal());
    dispatch(showFeeModal());
};