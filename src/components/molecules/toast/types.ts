export interface Alert {
  message: any;
  txHash?: string;
  heading?: string;
}

export const enum ToastType {
  SUCCESS,
  ERROR,
  LOADING,
  INFO,
}
