import React from "react";

export interface ModalTypes {
  header?: React.ReactNode | string;
  onClose?: () => void;
  children: React.ReactNode;
  closeButton?: boolean;
  show: boolean;
  className?: string;
  staticBackDrop?: boolean;
}
