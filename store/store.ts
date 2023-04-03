import { create } from "zustand";
import { createSidebarSlice, SidebarSlice } from "./slices/sidebarSlice";
import { mountStoreDevtool } from "simple-zustand-devtools";

type StoreState =
  SidebarSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createSidebarSlice(...a),
}));

mountStoreDevtool("Store", useAppStore);
