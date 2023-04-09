import { StateCreator } from "zustand";
import produce from "immer";
import { BalanceList } from "../../src/helpers/types";
import { Dec } from "@keplr-wallet/unit";
import { FeeInfo, GasInfo } from "../../src/helpers/config";

export type FeeType = "low" | "average" | "high";

export type transactionNames =
  | "send"
  | "sendIBC"
  | "delegate"
  | "un-delegate"
  | "re-delegate"
  | "claim"
  | null;

export interface Fee {
  value: number | string | null;
  type: FeeType;
}

export interface TransactionInfo {
  inProgress: boolean;
  name: transactionNames | null;
  failed?: boolean;
}

export interface TransactionSliceState {
  transactions: {
    feeInfo: {
      modal: boolean;
      fee: Fee;
    };
    gas: {
      active: boolean;
      gas: number | string;
    };
    send: {
      token: BalanceList | null;
      amount: Dec | string;
    };
    transactionInfo: TransactionInfo;
  };
}

export interface TransactionSliceActions {
  handleTxnFeeModal: (value: boolean) => void;
  handleTxnGasValue: (value: string) => void;
  handleTxnGasStatus: (value: boolean) => void;
  handleTxnFeeValue: (value: Fee) => void;
  handleSendTxnToken: (value: any) => void;
  handleSendTxnAmount: (value: any) => void;
  setTxnInfo: (value: TransactionInfo) => void;
}

export type TransactionSlice = TransactionSliceState & TransactionSliceActions;

const initialState = {
  transactions: {
    feeInfo: {
      modal: false,
      fee: {
        value: FeeInfo.averageFee,
        type: "average" as const,
      },
    },
    gas: {
      active: false,
      gas: GasInfo.gas,
    },
    send: {
      token: null,
      amount: "", //new Dec("0")
    },
    transactionInfo: {
      inProgress: false,
      name: null,
      failed: false,
    },
  },
};

export const createTransactionSlice: StateCreator<TransactionSlice> = (
  set
) => ({
  ...initialState,
  handleTxnFeeModal: (value: boolean) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.feeInfo.modal = value;
      })
    ),
  handleTxnFeeValue: (value: Fee) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.feeInfo.fee = value;
      })
    ),
  handleTxnGasStatus: (value: boolean) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.gas.active = value;
      })
    ),
  handleTxnGasValue: (value: string) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.gas.gas = value;
      })
    ),
  handleSendTxnToken: (value: any) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.send.token = value;
      })
    ),
  handleSendTxnAmount: (value: any) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.send.amount = value;
      })
    ),
  setTxnInfo: (value: TransactionInfo) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.transactionInfo = value;
      })
    ),
});
