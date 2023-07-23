import { combineReducers } from "redux";
import { TOKENIZE_SHARES_FETCH_SUCCESS } from "../../constants/tokenizeShares";

const sharesList = (state = [], action) => {
  if (action.type === TOKENIZE_SHARES_FETCH_SUCCESS) {
    return action.list;
  }
  return state;
};

export default combineReducers({
  sharesList
});
