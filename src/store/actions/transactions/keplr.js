import transactions from "../../../utils/transactions";
import { fee } from "../../../utils/aminoMsgHelper";
import {
  showTxResultModal,
  txFailed,
  txInProgress,
  txResponse,
  txSuccess
} from "./common";
import * as Sentry from "@sentry/browser";
import { fetchTransferableVestingAmount } from "../balance";
import { handleDelegationTransferModal } from "./delegationTransfer";
import { hideKeyStoreModal } from "./keyStore";
import { LOGIN_INFO } from "../../../constants/localStorage";

export const keplrSubmit =
  (messages = "") =>
  (dispatch, getState) => {
    dispatch(txInProgress());
    const txName = getState().common.txName.value.name;
    const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
    const response = transactions.TransactionWithKeplr(
      messages,
      fee(0, 250000),
      ""
    );
    console.log(messages, "messages");
    response
      .then((result) => {
        console.log(result, "result");

        if (
          getState().common.txName.value.name !== "send" &&
          getState().common.txName.value.name !== "ibc"
        ) {
          dispatch(getState().common.txInfo.value.modal);
        }
        if (result.code !== undefined) {
          if (txName === "delegation-transfer") {
            dispatch(
              fetchTransferableVestingAmount(loginInfo && loginInfo.address)
            );
            dispatch(handleDelegationTransferModal(true));
          } else {
            dispatch(txSuccess());
            dispatch(txResponse(result));
            dispatch(showTxResultModal());
          }
        } else {
          console.log(result, "final result");
        }
      })
      .catch((error) => {
        dispatch(showTxResultModal());
        console.log(error.message, "error");
        Sentry.captureException(
          error.response ? error.response.data.message : error.message
        );
        dispatch(txFailed(error.message));
      });
  };
