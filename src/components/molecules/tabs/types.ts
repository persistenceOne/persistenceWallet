import React, { Dispatch, SetStateAction } from "react";

export interface TabItemTypes {
  id: string;
  title: React.ReactNode | string;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  className?: string;
}

export interface TabContentTypes {
  id: string;
  children: React.ReactNode | string;
  activeTab: string;
  className?: string;
}
