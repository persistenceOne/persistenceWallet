import { create } from "zustand";
import { createSidebarSlice, SidebarSlice } from "./slices/sidebarSlice";
import { mountStoreDevtool } from "simple-zustand-devtools";
import {createCreateWalletSlice, CreateWalletSlice} from "./slices/create-wallet";

type StoreState =
  SidebarSlice & CreateWalletSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createSidebarSlice(...a),
  ...createCreateWalletSlice(...a)
}));

mountStoreDevtool("Store", useAppStore);
