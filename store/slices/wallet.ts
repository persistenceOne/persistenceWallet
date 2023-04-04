import { StateCreator } from "zustand";
import produce from "immer";

export type CoinType = 118 | 750;

export interface WalletSliceState {
  wallet: {
    advancedInfo: {
      accountNumber: number;
      accountIndex: number;
      bip39Passphrase: string;
      active: boolean;
    };
    keyStore: {
      file: any;
      password: any;
      coinType: number;
    };
  };
}

export interface WalletSliceActions {
  handleWalletAdvanceMode: (value: boolean) => void;
  handleWalletAccountNumber: (value: number) => void;
  handleWalletAccountIndex: (value: number) => void;
  handleWalletAccountPassPhrase: (value: string) => void;
  handleWalletKeyStoreFile: (value: any) => void;
  handleWalletKeyStoreFilePassword: (value: any) => void;
  handleWalletKeyStoreCoinType: (value: CoinType) => void;
}

export type WalletSlice = WalletSliceState & WalletSliceActions;

const initialState = {
  wallet: {
    advancedInfo: {
      accountNumber: 0,
      accountIndex: 0,
      bip39Passphrase: "",
      active: false,
    },
    keyStore: {
      file: null,
      password: null,
      coinType: 750,
    },
  },
};

export const createWalletSlice: StateCreator<WalletSlice> = (set) => ({
  ...initialState,
  handleWalletAccountNumber: (value: number) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.advancedInfo.accountNumber = value;
      })
    ),
  handleWalletAccountIndex: (value: number) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.advancedInfo.accountIndex = value;
      })
    ),
  handleWalletAdvanceMode: (value: boolean) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.advancedInfo.active = value;
      })
    ),
  handleWalletAccountPassPhrase: (value: string) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.advancedInfo.bip39Passphrase = value;
      })
    ),
  handleWalletKeyStoreFile: (value: any) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.keyStore.file = value;
      })
    ),
  handleWalletKeyStoreFilePassword: (value: any) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.keyStore.password = value;
      })
    ),
  handleWalletKeyStoreCoinType: (value: CoinType) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.keyStore.coinType = value;
      })
    ),
});
