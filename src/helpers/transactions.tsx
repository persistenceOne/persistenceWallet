import { useAppStore } from "../../store/store";
import { exceptionHandle } from "./utils";
import { transaction } from "./rpc";
import { OfflineSigner } from "@cosmjs/launchpad";
import {
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";
import { displayToast } from "../components/molecules/toast";
import { ToastType } from "../components/molecules/toast/types";

export interface Transaction {
  signer: OfflineSigner | OfflineDirectSigner | DirectSecp256k1HdWallet;
  signerAddress: string;
  msgs: any;
  rpc: string;
  fee: any;
  memo: string;
}

export const executeSendTransaction = async (Props: Transaction) => {
  useAppStore.getState().setTxnInfo({ name: "send", inProgress: true });
  try {
    displayToast(
      {
        message: "Transaction in progress",
      },
      ToastType.LOADING
    );
    const transactionResponse = await transaction({ ...Props });
    if (transactionResponse.code === 0) {
      displayToast(
        {
          message: "Tokens transferred",
        },
        ToastType.SUCCESS
      );
      useAppStore.getState().setTxnInfo({ name: null, inProgress: false });
    }
  } catch (e: any) {
    exceptionHandle(e, { "Error while send": "" });
  }
};
