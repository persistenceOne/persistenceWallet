import {
  TX_DELEGATION_TRANSFER_MEMO_SET,
  TX_DELEGATION_TRANSFER_ADDRESS_SET,
  TX_DELEGATION_TRANSFER_MODAL
} from "../../../constants/delegationTransfer";
import { setTxIno, setTxName } from "./common";
import { showFeeModal } from "./fee";

export const setTxDelegationTransferAddress = (data) => {
  return {
    type: TX_DELEGATION_TRANSFER_ADDRESS_SET,
    data
  };
};

export const setTxDelegationTransferMemo = (data) => {
  return {
    type: TX_DELEGATION_TRANSFER_MEMO_SET,
    data
  };
};

export const handleDelegationTransferModal = (data) => {
  return {
    type: TX_DELEGATION_TRANSFER_MODAL,
    data
  };
};

export const submitFormData = (message) => (dispatch, getState) => {
  dispatch(
    setTxName({
      value: {
        name: "transfer-shares"
      }
    })
  );
  dispatch(
    setTxIno({
      value: {
        modal: handleDelegationTransferModal(true),
        data: {
          message: message,
          memo: getState().delegationTransfer.memo.value
        }
      }
    })
  );
  dispatch(handleDelegationTransferModal(false));
  dispatch(showFeeModal());
};
