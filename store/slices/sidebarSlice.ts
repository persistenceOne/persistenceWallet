import { StateCreator } from "zustand";
import produce from "immer";

export interface SidebarSliceState {
  sidebar: {
    show: boolean;
  };
}

export interface SidebarSliceActions {
  handleSidebar: (value: boolean) => void;
}

export type SidebarSlice = SidebarSliceState & SidebarSliceActions;

const initialState = {
  sidebar: {
    show: false,
  },
};

export const createSidebarSlice: StateCreator<SidebarSlice> = (set) => ({
  ...initialState,
  handleSidebar: (value: boolean) =>
    set(
      produce((state: SidebarSlice) => {
        state.sidebar.show = value;
      })
    ),
});
