import {
  TX_CANCEL_UNBOND_MODAL_HIDE,
  TX_CANCEL_UNBOND_MODAL_SHOW,
  TX_CANCEL_UNBOND_MEMO_SET,
  TX_CANCEL_UNBOND_AMOUNT_SET
} from "../../../constants/cancel-unbond";
import { setTxIno, setTxName } from "./common";
import { showFeeModal } from "./fee";

export const setTxCancelUnbondAmount = (data) => {
  return {
    type: TX_CANCEL_UNBOND_AMOUNT_SET,
    data
  };
};

export const showTxCancelUnbondModal = (data) => {
  return {
    type: TX_CANCEL_UNBOND_MODAL_SHOW,
    data
  };
};

export const hideTxCancelUnbondModal = (data) => {
  return {
    type: TX_CANCEL_UNBOND_MODAL_HIDE,
    data
  };
};

export const setTxMemo = (data) => {
  return {
    type: TX_CANCEL_UNBOND_MEMO_SET,
    data
  };
};

export const submitFormData = (message) => (dispatch, getState) => {
  dispatch(
    setTxName({
      value: {
        name: "cancel-unbond"
      }
    })
  );
  dispatch(
    setTxIno({
      value: {
        modal: showTxCancelUnbondModal(),
        data: {
          message: message,
          memo: getState().cancelUnbondTx.memo.value
        }
      }
    })
  );
  dispatch(hideTxCancelUnbondModal());
  dispatch(showFeeModal());
};
