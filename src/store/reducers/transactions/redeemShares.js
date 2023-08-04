import {
  TOKENIZED_ACTIONS_MODAL_SHOW,
  TOKENIZED_ACTIONS_MODAL_HIDE,
  TX_REDEEM_SHARES_MODAL_SHOW,
  TX_REDEEM_SHARES_MODAL_HIDE,
  SET_REDEEM_TX_VALIDATOR,
  TX_REDEEM_SHARES_MEMO_SET
} from "../../../constants/redeemShares";
import { combineReducers } from "redux";
import { TX_RESULT_MODAL_HIDE, TX_SUCCESS } from "../../../constants/common";

const tokenizeActionsModal = (state = false, { type }) => {
  switch (type) {
    case TOKENIZED_ACTIONS_MODAL_SHOW:
      return true;
    case TOKENIZED_ACTIONS_MODAL_HIDE:
      return false;
    default:
      return state;
  }
};

const modal = (state = false, { type }) => {
  switch (type) {
    case TX_REDEEM_SHARES_MODAL_SHOW:
      return true;
    case TX_REDEEM_SHARES_MODAL_HIDE:
      return false;
    default:
      return state;
  }
};

const validator = (
  state = {
    value: {},
    error: {
      message: ""
    }
  },
  { type, data }
) => {
  switch (type) {
    case SET_REDEEM_TX_VALIDATOR:
      return {
        ...state,
        value: data.value,
        error: {
          ...state.error,
          message: data.error.message
        }
      };
    case TX_RESULT_MODAL_HIDE:
    case TX_SUCCESS:
      return {
        ...state,
        value: {},
        error: {
          ...state.error,
          message: ""
        }
      };
    default:
      return state;
  }
};

const memo = (
  state = {
    value: "",
    error: {
      message: ""
    }
  },
  { type, data }
) => {
  switch (type) {
    case TX_REDEEM_SHARES_MEMO_SET:
      return {
        ...state,
        value: data.value,
        error: {
          ...state.error,
          message: data.error.message
        }
      };
    case TX_SUCCESS:
    case TX_RESULT_MODAL_HIDE:
      return {
        ...state,
        value: "",
        error: {
          ...state.error,
          message: ""
        }
      };
    default:
      return state;
  }
};

export default combineReducers({
  tokenizeActionsModal,
  modal,
  validator,
  memo
});
