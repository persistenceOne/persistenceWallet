import { combineReducers } from "redux";
import { TX_RESULT_MODAL_HIDE, TX_SUCCESS } from "../../../constants/common";
import {
  TX_TOKENIZE_AMOUNT_SET,
  TX_TOKENIZE_MEMO_SET,
  TX_TOKENIZE_MODAL_HIDE,
  TX_TOKENIZE_MODAL_SHOW,
  TX_TOKENIZE_OWNER_ADDRESS_SET,
  TX_TOKENIZE_SHARE_STATUS_FAILED,
  TX_TOKENIZE_SHARE_STATUS_SUCCESS,
  TX_TOKENIZE_TXN_INFO_SET,
  TX_TOKENIZE_SHARE_STATUS_SET,
  TX_TOKENIZE_BUTTON_SET
} from "../../../constants/tokenizeShares";
import { UNBOND_DELEGATIONS_LIST } from "../../../constants/unbond";
import { VALIDATOR_TX_MODAL_HIDE } from "../../../constants/validators";

const toAddress = (
  state = {
    value: "",
    error: {
      message: ""
    }
  },
  { type, data }
) => {
  switch (type) {
    case TX_TOKENIZE_OWNER_ADDRESS_SET:
      return {
        ...state,
        value: data.value,
        error: {
          ...state.error,
          message: data.error.message
        }
      };
    case TX_RESULT_MODAL_HIDE:
      return {
        value: "",
        error: {
          message: ""
        }
      };
    default:
      return state;
  }
};

const amount = (
  state = {
    value: "",
    error: {
      message: ""
    }
  },
  { type, data }
) => {
  switch (type) {
    case TX_TOKENIZE_AMOUNT_SET:
      return {
        ...state,
        value: data.value,
        error: {
          ...state.error,
          message: data.error.message
        }
      };

    case TX_SUCCESS:
    // case TX_TOKENIZE_MODAL_HIDE:
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

const modal = (state = false, { type }) => {
  switch (type) {
    case TX_TOKENIZE_MODAL_SHOW:
      return true;
    case TX_TOKENIZE_MODAL_HIDE:
      return false;
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
    case TX_TOKENIZE_MEMO_SET:
      return {
        ...state,
        value: data.value,
        error: {
          ...state.error,
          message: data.error.message
        }
      };
    case TX_TOKENIZE_MODAL_HIDE:
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

const txnInfo = (
  state = {
    txnTokenizeHash: ""
  },
  { type, data }
) => {
  switch (type) {
    case TX_TOKENIZE_TXN_INFO_SET:
      return {
        txnTokenizeHash: data.txnTokenizeHash
      };
    case TX_RESULT_MODAL_HIDE:
      return {
        txnTokenizeHash: ""
      };
    default:
      return state;
  }
};

const tokenizeButton = (state = false, { type, data }) => {
  switch (type) {
    case TX_TOKENIZE_BUTTON_SET:
      return data;
    case VALIDATOR_TX_MODAL_HIDE:
      return false;
    default:
      return state;
  }
};

// const tokenizeShareTxStatus = (state = "pending", { type }) => {
//   switch (type) {
//     case TX_TOKENIZE_SHARE_STATUS_SUCCESS:
//       return "success";
//     case TX_TOKENIZE_SHARE_STATUS_FAILED:
//       return "failed";
//     default:
//       return state;
//   }
// };

const tokenizeShareTxStatus = (state = "", action) => {
  if (action.type === TX_TOKENIZE_SHARE_STATUS_SET) {
    return action.data;
  }
  return state;
};

export default combineReducers({
  amount,
  modal,
  memo,
  toAddress,
  tokenizeShareTxStatus,
  txnInfo,
  tokenizeButton
});
