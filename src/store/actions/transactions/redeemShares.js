import { setTxIno, setTxName } from "./common";
import { showFeeModal } from "./fee";
import { handleDelegationTokenizeModal } from "./delegationTransfer";

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
