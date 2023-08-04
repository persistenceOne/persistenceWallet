import { setTxIno, setTxName } from "./common";
import { showFeeModal } from "./fee";
import {
  TOKENIZED_ACTIONS_MODAL_SHOW,
  TOKENIZED_ACTIONS_MODAL_HIDE,
  TX_REDEEM_SHARES_MODAL_HIDE,
  TX_REDEEM_SHARES_MODAL_SHOW,
  SET_REDEEM_TX_VALIDATOR,
  TX_REDEEM_SHARES_MEMO_SET
} from "../../../constants/redeemShares";

export const showTokenizedActionModal = (data) => {
  return {
    type: TOKENIZED_ACTIONS_MODAL_SHOW,
    data
  };
};

export const hideTokenizedActionModal = (data) => {
  return {
    type: TOKENIZED_ACTIONS_MODAL_HIDE,
    data
  };
};

export const showTxRedeemSharesModal = (data) => {
  return {
    type: TX_REDEEM_SHARES_MODAL_SHOW,
    data
  };
};

export const hideTxRedeemSharesModal = (data) => {
  return {
    type: TX_REDEEM_SHARES_MODAL_HIDE,
    data
  };
};

export const setValidatorTxData = (data) => {
  return {
    type: SET_REDEEM_TX_VALIDATOR,
    data
  };
};

export const setTxMemo = (data) => {
  return {
    type: TX_REDEEM_SHARES_MEMO_SET,
    data
  };
};

export const submitFormData = (message) => (dispatch, getState) => {
  dispatch(
    setTxName({
      value: {
        name: "redeem-shares"
      }
    })
  );
  dispatch(
    setTxIno({
      value: {
        modal: showTxRedeemSharesModal(),
        data: {
          message: message,
          memo: getState().redeemShares.memo.value
        }
      }
    })
  );
  dispatch(showFeeModal());
  dispatch(hideTxRedeemSharesModal());
};
