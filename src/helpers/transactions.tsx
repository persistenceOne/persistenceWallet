import { useAppStore } from "../../store/store";
import { exceptionHandle, stringTruncate } from "./utils";
import { transaction } from "./rpc";
import { OfflineSigner } from "@cosmjs/launchpad";
import {
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";
import { displayToast } from "../components/molecules/toast";
import { ToastType } from "../components/molecules/toast/types";
import { TransactionNames } from "../../store/slices/transactions";
import { Icon } from "../components/atoms/icon";
import { explorerLink } from "./config";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

export interface Transaction {
  signer: OfflineSigner | OfflineDirectSigner | DirectSecp256k1HdWallet;
  signerAddress: string;
  msgs: any;
  rpc: string;
  fee: any;
  memo: string;
}

export const executeSendTransactionActions = async (
  Props: Transaction,
  txnName: TransactionNames
) => {};

export const formBlockExplorerLink = (txnHash: string) => {
  const chain = explorerLink[env];
  if (txnHash) return `${chain}/txs/${txnHash}`;
  return "";
};

export const executeTransaction = async (
  Props: Transaction,
  txnName: TransactionNames
) => {
  useAppStore.getState().handleTxnMemoValue("");
  useAppStore.getState().setTxnInfo({ name: txnName, inProgress: true });
  try {
    displayToast(
      {
        message: "Transaction in progress",
      },
      ToastType.LOADING
    );
    const transactionResponse = await transaction({ ...Props });
    console.log(transactionResponse, "transactionResponse");
    if (transactionResponse.code === 0) {
      displayToast(
        {
          message: (
            <>
              <a
                rel="noreferrer"
                className="flex items-center cursor-pointer"
                target={"_blank"}
                href={formBlockExplorerLink(
                  transactionResponse!.transactionHash
                )}
              >
                {stringTruncate(transactionResponse!.transactionHash)}
                <Icon iconName="arrow-redirect" viewClass="icon" />
              </a>
            </>
          ),
        },
        ToastType.SUCCESS
      );
      useAppStore.getState().setTxnInfo({ name: null, inProgress: false });
    } else {
      throw new Error(transactionResponse.rawLog);
    }
  } catch (e: any) {
    exceptionHandle(e, { "Error while send": "" });
  }
};
