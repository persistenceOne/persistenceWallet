import { setTxIno, setTxName } from "./common";
import { showFeeModal } from "./fee";
import {
  TOKENIZED_ACTIONS_MODAL_SHOW,
  TOKENIZED_ACTIONS_MODAL_HIDE,
  TX_REDEEM_SHARES_MODAL_HIDE,
  TX_REDEEM_SHARES_MODAL_SHOW,
  SET_REDEEM_TX_VALIDATOR
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
        modal: () => {},
        data: {
          message: message,
          amount: getState().send.amount.value,
          list: getState().send.token.value.tokenDenom,
          memo: getState().send.memo.value
        }
      }
    })
  );
  dispatch(showFeeModal());
};
