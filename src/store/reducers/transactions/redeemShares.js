import {
  TOKENIZED_ACTIONS_MODAL_SHOW,
  TOKENIZED_ACTIONS_MODAL_HIDE
} from "../../../constants/redeemShares";
import { combineReducers } from "redux";

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

export default combineReducers({
  tokenizeActionsModal
});
