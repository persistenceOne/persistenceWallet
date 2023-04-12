import { StateCreator } from "zustand";
import produce from "immer";
import { BalanceList, ValidatorProps } from "../../src/helpers/types";
import { CoinPretty, Dec } from "@keplr-wallet/unit";
import {
  FeeInfo,
  GasInfo,
  IBCChainData,
  IBCChainInfo,
} from "../../src/helpers/config";
import { DenomTrace } from "cosmjs-types/ibc/applications/transfer/v1/transfer";
import { ibcChainInfo } from "../../src/helpers/utils";

export type FeeType = "low" | "average" | "high";

export type TransactionNames =
  | "send"
  | "sendIBC"
  | "delegate"
  | "un-delegate"
  | "re-delegate"
  | "claim"
  | null;

export interface Fee {
  value: number | string | null;
  type: FeeType;
}

export interface TransactionInfo {
  inProgress: boolean;
  name: TransactionNames | null;
  failed?: boolean;
}

export interface TransactionSliceState {
  transactions: {
    feeInfo: {
      modal: boolean;
      fee: Fee;
    };
    gas: {
      active: boolean;
      gas: number | string;
    };
    send: {
      token: BalanceList | null;
      amount: Dec | string;
      recipient: string;
    };
    sendIbc: {
      chain: IBCChainInfo | null;
      token: BalanceList | null;
      amount: Dec | string;
      recipient: string;
    };
    transactionInfo: TransactionInfo;
    txnMsgs: any[];
    staking: {
      stakingModal: boolean;
      selectedValidator: ValidatorProps | null;
    };
    delegate: {
      modal: boolean;
      amount: Dec | string;
    };
    reDelegate: {
      modal: boolean;
      amount: Dec | string;
    };
    unbond: {
      modal: boolean;
      amount: Dec | string;
    };
  };
}

export interface TransactionSliceActions {
  handleTxnFeeModal: (value: boolean) => void;
  handleTxnGasValue: (value: string) => void;
  handleTxnGasStatus: (value: boolean) => void;
  handleTxnFeeValue: (value: Fee) => void;
  handleSendTxnToken: (value: any) => void;
  handleSendTxnAmount: (value: any) => void;
  handleSendTxnRecipient: (value: string) => void;
  setTxnInfo: (value: TransactionInfo) => void;
  setTxnMsgs: (value: any[]) => void;
  resetTxnSlice: () => void;
  handleStakingModal: (value: boolean) => void;
  handleStakingValidator: (value: ValidatorProps) => void;
  handleDelegateTxnAmount: (value: any) => void;
  handleDelegateTxnModal: (value: boolean) => void;
  handleReDelegateTxnAmount: (value: any) => void;
  handleReDelegateTxnModal: (value: boolean) => void;
  handleUnDelegateTxnAmount: (value: any) => void;
  handleUnDelegateTxnModal: (value: boolean) => void;
  handleSendIbcTxnToken: (value: any) => void;
  handleSendIbcTxnAmount: (value: any) => void;
  handleSendIbcTxnRecipient: (value: string) => void;
  handleSendIbcTxnChain: (value: IBCChainInfo) => void;
}

export type TransactionSlice = TransactionSliceState & TransactionSliceActions;

const initialState = {
  transactions: {
    feeInfo: {
      modal: false,
      fee: {
        value: FeeInfo.averageFee,
        type: "average" as const,
      },
    },
    gas: {
      active: false,
      gas: GasInfo.gas,
    },
    send: {
      token: {
        denom: "",
        tokenUrl: "",
        minimalDenom: "",
        amount: "",
        denomTrace: null,
      },
      amount: "", //new Dec("0")
      recipient: "",
    },
    sendIbc: {
      token: {
        denom: "",
        tokenUrl: "",
        minimalDenom: "",
        amount: "",
        denomTrace: null,
      },
      amount: "", //new Dec("0")
      recipient: "",
      chain: ibcChainInfo.length > 0 ? ibcChainInfo[0] : null,
    },
    txnMsgs: [],
    transactionInfo: {
      inProgress: false,
      name: null,
      failed: false,
    },
    staking: {
      stakingModal: false,
      selectedValidator: null,
    },
    delegate: {
      amount: "",
      modal: false,
    },
    reDelegate: {
      amount: "",
      modal: false,
    },
    unbond: {
      amount: "",
      modal: false,
    },
  },
};

export const createTransactionSlice: StateCreator<TransactionSlice> = (
  set
) => ({
  ...initialState,
  handleTxnFeeModal: (value: boolean) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.feeInfo.modal = value;
      })
    ),
  handleTxnFeeValue: (value: Fee) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.feeInfo.fee = value;
      })
    ),
  handleTxnGasStatus: (value: boolean) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.gas.active = value;
      })
    ),
  handleTxnGasValue: (value: string) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.gas.gas = value;
      })
    ),
  handleSendTxnToken: (value: any) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.send.token = value;
      })
    ),
  handleSendTxnAmount: (value: any) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.send.amount = value;
      })
    ),
  handleSendTxnRecipient: (value: string) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.send.recipient = value;
      })
    ),
  setTxnInfo: (value: TransactionInfo) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.transactionInfo = value;
      })
    ),
  setTxnMsgs: (value: any[]) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.txnMsgs = value;
      })
    ),
  handleStakingModal: (value: boolean) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.staking.stakingModal = value;
      })
    ),
  handleStakingValidator: (value: ValidatorProps) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.staking.selectedValidator = value;
      })
    ),
  handleDelegateTxnAmount: (value: any) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.delegate.amount = value;
      })
    ),
  handleDelegateTxnModal: (value: boolean) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.delegate.modal = value;
      })
    ),
  handleReDelegateTxnAmount: (value: any) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.reDelegate.amount = value;
      })
    ),
  handleReDelegateTxnModal: (value: boolean) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.reDelegate.modal = value;
      })
    ),
  handleUnDelegateTxnAmount: (value: any) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.unbond.amount = value;
      })
    ),
  handleUnDelegateTxnModal: (value: boolean) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.unbond.modal = value;
      })
    ),
  handleSendIbcTxnToken: (value: any) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.sendIbc.token = value;
      })
    ),
  handleSendIbcTxnAmount: (value: any) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.sendIbc.amount = value;
      })
    ),
  handleSendIbcTxnRecipient: (value: string) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.sendIbc.recipient = value;
      })
    ),
  handleSendIbcTxnChain: (value: IBCChainInfo) =>
    set(
      produce((state: TransactionSlice) => {
        state.transactions.sendIbc.chain = value;
      })
    ),
  resetTxnSlice: () => {
    set(initialState);
  },
});
