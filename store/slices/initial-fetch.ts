import { StateCreator } from "zustand";
import produce from "immer";
import { fetchXPRTPrice } from "../../src/pages/api/api";
import { CoinPretty } from "@keplr-wallet/unit";
import { emptyPrettyCoin } from "./wallet";

export interface InitialFetchSliceState {
  initialData: {
    xprtPrice: number;
  };
}

export interface InitialFetchSliceActions {
  fetchTokenPrice: () => void;
  resetCreateWalletSlice: () => void;
}

export type InitialFetchSlice = InitialFetchSliceState &
  InitialFetchSliceActions;

const initialState = {
  initialData: {
    xprtPrice: 0,
  },
};

export const createInitialFetchSlice: StateCreator<InitialFetchSlice> = (
  set
) => ({
  ...initialState,
  fetchTokenPrice: async () => {
    const response = await fetchXPRTPrice();
    set(
      produce((state: InitialFetchSlice) => {
        state.initialData.xprtPrice = response;
      })
    );
  },
  resetCreateWalletSlice: () => {
    set(initialState);
  },
});
