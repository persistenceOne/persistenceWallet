import { StateCreator } from "zustand";
import produce from "immer";
import { toPrettyCoin } from "../../src/helpers/coin";
import { DefaultChainInfo } from "../../src/helpers/config";
import { CoinPretty } from "@keplr-wallet/unit";
import {
  fetchAllBalances,
  fetchUnBondingList,
  fetchValidatorsInfo,
} from "../../src/pages/api/rpcQueries";
import {
  BalanceList,
  Delegations,
  UnBondingListInfo,
  ValidatorsInfo,
} from "../../src/helpers/types";
import { useAppStore } from "../store";
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
    accountType: accountType | null;
  } | null;
  coin750Info: {
    address: string | null;
    walletPath: string | null;
    accountType: accountType | null;
  } | null;
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
      error: string;
    };
    keyStore: {
      file: any;
      password: any;
      coinType: number;
    };
    decryptKeyStore: {
      modal: boolean;
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
    validatorsInfo: ValidatorsInfo;
    unBondingInfo: UnBondingListInfo;
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
  handleDecryptKeystoreModal: (value: boolean) => void;
  handleWalletSignInKeyStoreModal: (value: boolean) => void;
  handleWalletAccountDetails: (value: AccountDetails) => void;
  handleWalletKeyStoreLoginDetails: (value: KeyStoreLoginDetails) => void;
  fetchWalletBalances: (rpc: string, address: string) => void;
  fetchWalletDelegations: (rpc: string, address: string) => void;
  fetchWalletUnbonding: (rpc: string, address: string) => void;
}

export type WalletSlice = WalletSliceState & WalletSliceActions;

const initialState = {
  wallet: {
    advancedInfo: {
      accountNumber: "0",
      accountIndex: "0",
      bip39Passphrase: "",
      active: false,
      error: "",
    },
    keyStore: {
      file: null,
      password: null,
      coinType: 750,
    },
    decryptKeyStore: {
      modal: false,
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
        accountType: null,
      },
      coin750Info: {
        address: null,
        walletPath: null,
        accountType: null,
      },
      encryptedSeed: null,
    },
    balances: {
      totalXprt: emptyPrettyCoin,
      vestingAmount: emptyPrettyCoin,
      transferableAmount: emptyPrettyCoin,
      allBalances: [],
    },
    validatorsInfo: {
      validators: [],
      activeValidators: [],
      inActiveValidators: [],
      delegatedValidators: [],
      totalDelegatedAmount: emptyPrettyCoin,
    },
    unBondingInfo: {
      unBondingList: [],
      totalAmount: 0,
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
  handleDecryptKeystoreModal: (value: boolean) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.decryptKeyStore.modal = value;
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
    console.log(response, "Balances");
    set(
      produce((state: WalletSlice) => {
        state.wallet.balances = response;
      })
    );
  },
  fetchWalletDelegations: async (rpc: string, address: string) => {
    const response: ValidatorsInfo = await fetchValidatorsInfo(rpc, address);
    console.log(response, "fetchWalletDelegations");
    set(
      produce((state: WalletSlice) => {
        state.wallet.validatorsInfo = response;
      })
    );
  },
  fetchWalletUnbonding: async (rpc: string, address: string) => {
    const response: UnBondingListInfo = await fetchUnBondingList(rpc, address);
    console.log(response, "fetchWalletUnbonding");
    set(
      produce((state: WalletSlice) => {
        state.wallet.unBondingInfo = response;
      })
    );
  },
});
