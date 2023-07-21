import { setTxIno, setTxName } from "./common";
import { showFeeModal } from "./fee";
import {
  TOKENIZED_ACTIONS_MODAL_SHOW,
  TOKENIZED_ACTIONS_MODAL_HIDE
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
