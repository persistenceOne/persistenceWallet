import React, { useEffect, useRef } from "react";
import NavigationBar from "../organisms/navigationBar";
import SideBar from "../organisms/sidebar";
import useLocalStorage, {
  getStorageValue,
} from "../../customHooks/useLocalStorage";
import { useAppStore } from "../../../store/store";
import { useRouter } from "next/router";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

export const Template = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className: string;
  title: string;
}) => {
  return (
    <div>
      <div className="flex md:block bg-body-bg">
        <SideBar />
        <div
          className={`flex-1 h-screen overflow-auto bg-no-repeat ` + className}
        >
          <NavigationBar />
          {children}
        </div>
      </div>
    </div>
  );
};
