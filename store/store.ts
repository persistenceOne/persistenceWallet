import { create } from "zustand";
import { createSidebarSlice, SidebarSlice } from "./slices/sidebarSlice";
import { mountStoreDevtool } from "simple-zustand-devtools";
import {
  createCreateWalletSlice,
  CreateWalletSlice,
} from "./slices/create-wallet";
import { WalletSlice, createWalletSlice } from "./slices/wallet";

type StoreState = SidebarSlice & CreateWalletSlice & WalletSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createSidebarSlice(...a),
  ...createCreateWalletSlice(...a),
  ...createWalletSlice(...a),
}));

mountStoreDevtool("Store", useAppStore);
