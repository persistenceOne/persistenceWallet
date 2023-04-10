import { StateCreator } from "zustand";
import produce from "immer";

export interface CreateWalletSliceState {
  createWallet: {
    modal: {
      show: boolean;
    };
    generateKeyStore: {
      modal: boolean;
    };
  };
}

export interface CreateWalletSliceActions {
  handleCreateWalletModal: (value: boolean) => void;
  handleCreateWalletKeystoreModal: (value: boolean) => void;
  resetCreateWalletSlice: () => void;
}

export type CreateWalletSlice = CreateWalletSliceState &
  CreateWalletSliceActions;

const initialState = {
  createWallet: {
    modal: {
      show: false,
    },
    generateKeyStore: {
      modal: false,
    },
  },
};

export const createCreateWalletSlice: StateCreator<CreateWalletSlice> = (
  set
) => ({
  ...initialState,
  handleCreateWalletModal: (value: boolean) =>
    set(
      produce((state: CreateWalletSlice) => {
        state.createWallet.modal.show = value;
      })
    ),
  handleCreateWalletKeystoreModal: (value: boolean) =>
    set(
      produce((state: CreateWalletSlice) => {
        state.createWallet.generateKeyStore.modal = value;
      })
    ),
  resetCreateWalletSlice: () => {
    set(initialState);
  },
});
