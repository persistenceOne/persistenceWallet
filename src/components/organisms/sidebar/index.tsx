import React, { useEffect, useRef } from "react";
import { useOnClickOutside } from "../../../customHooks/useOnClickOutside";
import { useWindowSize } from "../../../customHooks/useWindowSize";
import styles from "./styles.module.css";
import SidebarContent from "./sidebarContent";
import {useAppStore} from "../../../../store/store";

const SideBar = () => {
  const handleSidebar = useAppStore((state) => state.handleSidebar);
  const show = useAppStore((state) => state.sidebar.show);

  const closeHandler = () => {
    handleSidebar(false);
  };
  const { isMobile } = useWindowSize();
  const sideBarRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(sideBarRef, closeHandler);
  return (
    <div
      className={`${
        isMobile ? `${styles.mobileDropdownContainer} offCanvas` : ""
      } ${show ? "show" : "close"} w-[284px]`}
    >
      <div
        className={`${isMobile ? styles.mobileSidebarBackdrop : ""} backDrop`}
      />
      <div
        className={`${isMobile ? styles.mobileSidebar : ""}`}
        ref={isMobile ? sideBarRef : null}
      >
        <SidebarContent />
      </div>
    </div>
  );
};

export default SideBar;
