import { StateCreator } from "zustand";
import produce from "immer";
import { toPrettyCoin } from "../../src/helpers/coin";
import { DefaultChainInfo } from "../../src/helpers/config";
import { CoinPretty } from "@keplr-wallet/unit";
import { fetchAllBalances } from "../../src/pages/api/rpcQueries";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { QueryDenomTraceResponse } from "cosmjs-types/ibc/applications/transfer/v1/query";
import { BalanceList } from "../../src/helpers/types";
export type CoinType = 118 | 750;

export type loginType = "keplr" | "keyStore" | "ledger";

export type accountType = "vesting" | "non-vesting";

export const emptyPrettyCoin = toPrettyCoin(
  "0",
  DefaultChainInfo.currency.coinMinimalDenom,
  DefaultChainInfo.counterpartyChainId
);

export type AccountDetails = {
  loginType: loginType | null;
  accountType: accountType | null;
  address: string | null;
  accountNumber?: string | null;
  accountIndex?: string | null;
  bipPasPhrase?: string | null;
  defaultFee?: string | null;
};

export type KeyStoreLoginDetails = {
  coin118Info: {
    address: string | null;
    walletPath: string | null;
  };
  coin750Info: {
    address: string | null;
    walletPath: string | null;
  };
  encryptedSeed?: string | null;
};

export interface Balances {
  totalXprt: CoinPretty;
  vestingAmount: CoinPretty;
  transferableAmount: CoinPretty;
  allBalances: BalanceList[];
}

export interface WalletSliceState {
  wallet: {
    advancedInfo: {
      accountNumber: string;
      accountIndex: string;
      bip39Passphrase: string;
      active: boolean;
    };
    keyStore: {
      file: any;
      password: any;
      coinType: number;
    };
    changePassword: {
      modal: boolean;
    };
    signIn: {
      modal: boolean;
      keyStoreModal: boolean;
    };
    accountDetails: AccountDetails;
    keyStoreLoginDetails: KeyStoreLoginDetails;
    balances: Balances;
  };
}

export interface WalletSliceActions {
  handleWalletChangePassWordModal: (value: boolean) => void;
  handleWalletAdvanceMode: (value: boolean) => void;
  handleWalletAccountNumber: (value: string) => void;
  handleWalletAccountIndex: (value: string) => void;
  handleWalletAccountPassPhrase: (value: string) => void;
  handleWalletKeyStoreFile: (value: any) => void;
  handleWalletKeyStoreFilePassword: (value: any) => void;
  handleWalletKeyStoreCoinType: (value: CoinType) => void;
  handleWalletSignInModal: (value: boolean) => void;
  handleWalletSignInKeyStoreModal: (value: boolean) => void;
  handleWalletAccountDetails: (value: AccountDetails) => void;
  handleWalletKeyStoreLoginDetails: (value: KeyStoreLoginDetails) => void;
  fetchWalletBalances: (rpc: string, address: string) => void;
}

export type WalletSlice = WalletSliceState & WalletSliceActions;

const initialState = {
  wallet: {
    advancedInfo: {
      accountNumber: "0",
      accountIndex: "0",
      bip39Passphrase: "",
      active: false,
    },
    keyStore: {
      file: null,
      password: null,
      coinType: 750,
    },
    changePassword: {
      modal: false,
    },
    signIn: {
      modal: false,
      keyStoreModal: false,
    },
    accountDetails: {
      accountType: null,
      loginType: null,
      address: null,
      accountNumber: null,
      accountIndex: null,
      bipPasPhrase: null,
      defaultFee: null,
    },
    keyStoreLoginDetails: {
      coin118Info: {
        address: null,
        walletPath: null,
      },
      coin750Info: {
        address: null,
        walletPath: null,
      },
      encryptedSeed: null,
    },
    balances: {
      totalXprt: emptyPrettyCoin,
      vestingAmount: emptyPrettyCoin,
      transferableAmount: emptyPrettyCoin,
      allBalances: [],
    },
  },
};

export const createWalletSlice: StateCreator<WalletSlice> = (set) => ({
  ...initialState,
  handleWalletAccountNumber: (value: string) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.advancedInfo.accountNumber = value;
      })
    ),
  handleWalletAccountIndex: (value: string) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.advancedInfo.accountIndex = value;
      })
    ),
  handleWalletAdvanceMode: (value: boolean) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.advancedInfo.active = value;
      })
    ),
  handleWalletAccountPassPhrase: (value: string) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.advancedInfo.bip39Passphrase = value;
      })
    ),
  handleWalletKeyStoreFile: (value: any) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.keyStore.file = value;
      })
    ),
  handleWalletKeyStoreFilePassword: (value: any) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.keyStore.password = value;
      })
    ),
  handleWalletKeyStoreCoinType: (value: CoinType) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.keyStore.coinType = value;
      })
    ),
  handleWalletChangePassWordModal: (value: boolean) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.changePassword.modal = value;
      })
    ),
  handleWalletSignInModal: (value: boolean) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.signIn.modal = value;
      })
    ),
  handleWalletSignInKeyStoreModal: (value: boolean) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.signIn.keyStoreModal = value;
      })
    ),
  handleWalletAccountDetails: (value: AccountDetails) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.accountDetails = value;
      })
    ),
  handleWalletKeyStoreLoginDetails: (value: KeyStoreLoginDetails) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.keyStoreLoginDetails = value;
      })
    ),
  fetchWalletBalances: async (rpc: string, address: string) => {
    const response: Balances = await fetchAllBalances(rpc, address);
    set(
      produce((state: WalletSlice) => {
        state.wallet.balances = response;
      })
    );
  },
});
