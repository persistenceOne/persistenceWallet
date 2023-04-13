import { create } from "zustand";
import { createSidebarSlice, SidebarSlice } from "./slices/sidebarSlice";
import { mountStoreDevtool } from "simple-zustand-devtools";
import {
  createCreateWalletSlice,
  CreateWalletSlice,
} from "./slices/create-wallet";
import { WalletSlice, createWalletSlice } from "./slices/wallet";
import {
  TransactionSlice,
  createTransactionSlice,
} from "./slices/transactions";
import {
  InitialFetchSlice,
  createInitialFetchSlice,
} from "./slices/initial-fetch";
// import { persist } from "zustand/middleware";

type StoreState = SidebarSlice &
  CreateWalletSlice &
  WalletSlice &
  TransactionSlice &
  InitialFetchSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createSidebarSlice(...a),
  ...createCreateWalletSlice(...a),
  ...createWalletSlice(...a),
  ...createTransactionSlice(...a),
  ...createInitialFetchSlice(...a),
}));
//
// export const useAppStore = create<StoreState>()(
//     persist(
//         (...a) => ({
//             ...createSidebarSlice(...a),
//             ...createCreateWalletSlice(...a),
//             ...createWalletSlice(...a),
//         }),
//         {
//             name: "auth",
//         }
//     )
// );

mountStoreDevtool("Store", useAppStore);
