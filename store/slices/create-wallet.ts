import { StateCreator } from "zustand";
import produce from "immer";

export interface CreateWalletSliceState {
    createWallet: {
        modal:{
            show: boolean,
        }
    },
}

export interface CreateWalletSliceActions {
    handleCreateWalletModal: (value: boolean) => void;
}

export type CreateWalletSlice = CreateWalletSliceState & CreateWalletSliceActions;

const initialState = {
    createWallet: {
        modal:{
            show: false,
        }
    },
};

export const createCreateWalletSlice: StateCreator<CreateWalletSlice> = (set) => ({
    ...initialState,
    handleCreateWalletModal: (value: boolean) =>
        set(
            produce((state: CreateWalletSlice) => {
                state.createWallet.modal.show = value;
            })
        ),
});
