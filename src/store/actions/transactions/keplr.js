import transactions from "../../../utils/transactions";
import { fee } from "../../../utils/aminoMsgHelper";
import {
  closeLoader,
  showTxResultModal,
  txFailed,
  txInProgress,
  txResponse,
  txSuccess
} from "./common";
import * as Sentry from "@sentry/browser";
import { fetchTransferableVestingAmount } from "../balance";
import { handleDelegationTransferModal } from "./delegationTransfer";
import { LOGIN_INFO } from "../../../constants/localStorage";
import { pollAccountBalance } from "../../../utils/queries";
import { hideKeyStoreModal } from "./keyStore";
import { setTxTokenizeShareStatus } from "./tokenizeShares";
import { store } from "../../index";

export const keplrSubmit =
  (messages = "") =>
  async (dispatch, getState) => {
    dispatch(txInProgress());
    try {
      const txName = getState().common.txName.value.name;
      const balance = getState().balance.list;
      console.log("messages", messages, txName);
      const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
      const response = await transactions.TransactionWithKeplr(
        messages,
        fee(0, 250000),
        ""
      );
      if (response.code !== undefined && response.code === 0) {
        if (txName !== "send" && txName !== "ibc") {
          dispatch(getState().common.txInfo.value.modal);
        }
        dispatch(txSuccess());
        dispatch(txResponse(response));
        dispatch(showTxResultModal());
        dispatch(setTxTokenizeShareStatus(""));
      } else {
        if (response.transactionHash) {
          dispatch(txResponse(response));
          throw Error(`transaction error: ${response.rawLog}`);
        } else {
          throw Error(response.rawLog);
        }
      }
    } catch (error) {
      if (error.message.includes("transaction error")) {
        dispatch(showTxResultModal());
        dispatch(store.getState().common.txInfo.value.modal);
      }
      dispatch(setTxTokenizeShareStatus(""));
      console.log(error.message, "error");
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
      dispatch(txFailed(error.message));
    }
  };
