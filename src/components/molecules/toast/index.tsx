import React from "react";
import { Icon } from "../../atoms/icon";
import { toast } from "react-toastify";
import { Alert, ToastType } from "./types";

const BroadCastMsg = ({ message }: any) => (
  <div className="toast-content">
    <div className="title-section">
      <div className="spinner light icon-toast inline-block w-[1.5rem] h-[1.5rem] align-text-bottom rounded-full" />
      <p className="title">Transaction Broadcasting</p>
    </div>
    <p className="content">{message}</p>
  </div>
);

const TransactionSuccess = ({ message, txHash }: any) => (
  <div>
    <div className="toast-content">
      <div className="title-section">
        <Icon iconName="success" viewClass="icon-toast" />
        <p className="title">Transaction Successful</p>
      </div>
      {txHash ? (
        <p className="content flex items-center">Tx:{txHash}</p>
      ) : (
        <div className="content items-center">{message}</div>
      )}
    </div>
  </div>
);

const TransactionFailed = ({ message, heading }: any) => (
  <div className="toast-content">
    <div className="title-section">
      <Icon iconName="failed" viewClass="icon-toast" />
      <p className="title">{heading ? heading : "Transaction Failed"}</p>
    </div>
    <p className="content">{message}</p>
  </div>
);

const TransactionInfo = ({ message }: any) => (
  <div className="toast-content">
    <div className="title-section">
      <Icon iconName="info" viewClass="icon-toast" />
      <p className="title">Info</p>
    </div>
    <p className="content">{message}</p>
  </div>
);

export function displayToast(alert: Alert, type: ToastType) {
  switch (type) {
    case ToastType.SUCCESS:
      toast(<TransactionSuccess {...alert} />);
      break;
    case ToastType.ERROR:
      toast(<TransactionFailed {...alert} />);
      break;
    case ToastType.LOADING:
      toast(<BroadCastMsg {...alert} />);
      break;
    case ToastType.INFO:
      toast(<TransactionInfo {...alert} />);
      break;
  }
}
