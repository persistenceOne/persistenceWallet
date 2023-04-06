import { StateCreator } from "zustand";
import produce from "immer";

export interface TransactionSliceState {
  transactions: {
    fee: {
      modal: boolean;
      fee: number | string | null;
    };
  };
}

export interface TransactionSliceActions {
  handleTxnFeeModal: (value: boolean) => void;
  handleTxnFeeValue: (value: string) => void;
}

export type TransactionSlice = TransactionSliceState & TransactionSliceActions;

const initialState = {
  transactions: {
    fee: {
      modal: false,
      fee: "",
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
        state.transactions.fee.modal = value;
      })
    ),
  handleTxnFeeValue: (value: string) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.fee.fee = value;
      })
    ),
});
