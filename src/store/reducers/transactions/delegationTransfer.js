import {
  TX_DELEGATION_TRANSFER_LIST,
  TX_DELEGATION_TRANSFER_AMOUNT_SET,
  TX_DELEGATION_TRANSFER_MEMO_SET,
  TX_DELEGATION_TRANSFER_ADDRESS_SET,
  TX_DELEGATION_TRANSFER_MODAL
} from "../../../constants/delegationTransfer";
import { combineReducers } from "redux";
import { TX_RESULT_MODAL_HIDE, TX_SUCCESS } from "../../../constants/common";

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
    case TX_DELEGATION_TRANSFER_ADDRESS_SET:
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
    case TX_DELEGATION_TRANSFER_AMOUNT_SET:
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

const list = (state = [], action) => {
  if (action.type === TX_DELEGATION_TRANSFER_LIST) {
    return action.list;
  }
  return state;
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
    case TX_DELEGATION_TRANSFER_MEMO_SET:
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

const modal = (state = false, { type, data }) => {
  switch (type) {
    case TX_DELEGATION_TRANSFER_MODAL:
      return data;
    default:
      return state;
  }
};

export default combineReducers({
  toAddress,
  amount,
  list,
  memo,
  modal
});
