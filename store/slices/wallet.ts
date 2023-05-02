import { StateCreator } from "zustand";
import produce from "immer";
import { toPrettyCoin } from "../../src/helpers/coin";
import { defaultChain } from "../../src/helpers/utils";
import { CoinPretty } from "@keplr-wallet/unit";
import {
  fetchAllBalances,
  fetchRewardsList,
  fetchUnBondingList,
  fetchValidatorsInfo,
  getValidatorCommission,
} from "../../src/pages/api/rpcQueries";
import {
  BalanceList,
  Delegations,
  RewardsInfo,
  UnBondingListInfo,
  ValidatorProps,
  ValidatorsInfo,
  CommissionInfo,
} from "../../src/helpers/types";
import { useAppStore } from "../store";
import { TransactionNames } from "./transactions";
export type CoinType = 118 | 750;

export type loginType = "keplr" | "keyStore" | "ledger";

export type accountType = "vesting" | "non-vesting";

export const emptyPrettyCoin = toPrettyCoin(
  "0",
  defaultChain.currency.coinMinimalDenom,
  defaultChain.counterpartyChainId
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
      txnName: TransactionNames;
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
    rewardsInfo: RewardsInfo;
    validatorCommission: CommissionInfo;
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
  handleDecryptKeystoreModal: (
    value: boolean,
    txnName: TransactionNames
  ) => void;
  handleWalletSignInKeyStoreModal: (value: boolean) => void;
  handleWalletAccountDetails: (value: AccountDetails) => void;
  handleWalletKeyStoreLoginDetails: (value: KeyStoreLoginDetails) => void;
  fetchWalletBalances: (rpc: string, address: string) => void;
  fetchWalletDelegations: (rpc: string, address: string) => void;
  fetchWalletUnbonding: (rpc: string, address: string) => void;
  fetchWalletRewards: (rpc: string, address: string) => void;
  fetchValidatorCommission: (
    validators: ValidatorProps[],
    rpc: string,
    address: string
  ) => void;
  resetWalletSlice: () => void;
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
      password: "",
      coinType: 750,
    },
    decryptKeyStore: {
      modal: false,
      txnName: null,
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
      totalAmount: emptyPrettyCoin,
    },
    rewardsInfo: {
      rewardsList: [],
      totalAmount: emptyPrettyCoin,
    },
    validatorCommission: {
      commission: emptyPrettyCoin,
      isValidator: false,
      validatorAddress: "",
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
  handleDecryptKeystoreModal: (value: boolean, txnName: TransactionNames) =>
    set(
      produce((state: WalletSlice) => {
        state.wallet.decryptKeyStore = {
          modal: value,
          txnName: txnName,
        };
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
  fetchWalletRewards: async (rpc: string, address: string) => {
    const response: RewardsInfo = await fetchRewardsList(rpc, address);
    console.log(response, "fetchWalletRewards");
    set(
      produce((state: WalletSlice) => {
        state.wallet.rewardsInfo = response;
      })
    );
  },
  fetchValidatorCommission: async (
    validators: ValidatorProps[],
    rpc: string,
    address: string
  ) => {
    const response: CommissionInfo = await getValidatorCommission(
      validators,
      address,
      rpc
    );
    console.log(response, "fetchWalletRewards");
    set(
      produce((state: WalletSlice) => {
        state.wallet.validatorCommission = response;
      })
    );
  },
  resetWalletSlice: () => {
    set(initialState);
  },
});
