import { StateCreator } from "zustand";
import produce from "immer";

export interface WalletSliceState {
  wallet: {
    advancedInfo: {
      accountNumber: number | string;
      accountIndex: number | string;
      bip39Passphrase: string;
    };
  };
}

export interface WalletSliceActions {
  handleWalletAccountNumber: (value: number | string) => void;
  handleWalletAccountIndex: (value: number | string) => void;
  handleWalletAccountPassPhrase: (value: string) => void;
}

export type WalletSlice = WalletSliceState & WalletSliceActions;

const initialState = {
  wallet: {
    advancedInfo: {
      accountNumber: "",
      accountIndex: "",
      bip39Passphrase: "",
    },
  },
};

export const createWalletSlice: StateCreator<WalletSlice> = (set) => ({
  ...initialState,
  handleWalletAccountNumber: (value: number | string) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.advancedInfo.accountNumber = value;
      })
    ),
  handleWalletAccountIndex: (value: number | string) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.advancedInfo.accountIndex = value;
      })
    ),
  handleWalletAccountPassPhrase: (value: string) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.advancedInfo.bip39Passphrase = value;
      })
    ),
});
