import {
  TX_MIGRATE_MODAL_HIDE,
  TX_MIGRATE_MODAL_SHOW,
  TX_MIGRATE_MEMO_SET,
  TX_MIGRATE_AMOUNT_SET,
  TX_MIGRATE_ADDRESS_SET,
  TX_MIGRATE_TOKENS_LIST_SET,
  TX_MIGRATE_BUTTON_STATUS,
  TX_MIGRATE_AMOUNT_ERROR
} from "../../../constants/migrateAssets";
import { setTxIno, setTxName } from "./common";
import { showFeeModal } from "./fee";

export const setTxSendAmount = (data) => {
  return {
    type: TX_MIGRATE_AMOUNT_SET,
    data
  };
};

export const setTxButtonStatus = (data) => {
  return {
    type: TX_MIGRATE_BUTTON_STATUS,
    data
  };
};

export const setTxAmountError = (data) => {
  return {
    type: TX_MIGRATE_AMOUNT_ERROR,
    data
  };
};

export const setTxMigrateTokens = (list) => {
  return {
    type: TX_MIGRATE_TOKENS_LIST_SET,
    list
  };
};

export const setTxSendAddress = (data) => {
  return {
    type: TX_MIGRATE_ADDRESS_SET,
    data
  };
};

export const setTxMemo = (data) => {
  return {
    type: TX_MIGRATE_MEMO_SET,
    data
  };
};

export const showTxMigrateModal = (data) => {
  return {
    type: TX_MIGRATE_MODAL_SHOW,
    data
  };
};

export const hideTxMigrateModal = (data) => {
  return {
    type: TX_MIGRATE_MODAL_HIDE,
    data
  };
};

export const submitFormData = (message) => (dispatch, getState) => {
  console.log(message, "messages");
  dispatch(
    setTxName({
      value: {
        name: "migrateAssets"
      }
    })
  );
  dispatch(
    setTxIno({
      value: {
        modal: showTxMigrateModal(),
        data: {
          message: message,
          amount: getState().migrateAssets.amount.value,
          memo: getState().migrateAssets.memo.value
        }
      }
    })
  );
  dispatch(hideTxMigrateModal());
  dispatch(showFeeModal());
};
