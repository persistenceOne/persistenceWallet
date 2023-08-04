import {
  KEYSTORE_MODAL_HIDE,
  KEYSTORE_MODAL_SHOW,
  TX_KEY_STORE_PASSWORD_SET,
  TX_KEY_STORE_SET
} from "../../../constants/keyStore";
import transactions from "../../../utils/transactions";
import {
  closeLoader,
  setLoginInfo,
  showTxResultModal,
  txFailed,
  txInProgress,
  txResponse,
  txSuccess
} from "./common";
import helper, {
  decryptKeyStore,
  makeHdPath,
  privateKeyReader
} from "../../../utils/helper";
import * as Sentry from "@sentry/browser";
import {
  COIN_TYPE,
  ENCRYPTED_MNEMONIC,
  LOGIN_INFO
} from "../../../constants/localStorage";
import { handleDelegationTransferModal } from "./delegationTransfer";
import { fetchTransferableVestingAmount } from "../balance";
import { pollAccountBalance } from "../../../utils/queries";
import {
  setTxTokenizeShareStatus,
  showTxTokenizeModal
} from "./tokenizeShares";
import { store } from "../../index";
import { fee } from "../../../utils/aminoMsgHelper";

export const setTxKeyStore = (data) => {
  return {
    type: TX_KEY_STORE_SET,
    data
  };
};

export const setTxKeyStorePassword = (data) => {
  return {
    type: TX_KEY_STORE_PASSWORD_SET,
    data
  };
};

export const showKeyStoreModal = (data) => {
  return {
    type: KEYSTORE_MODAL_SHOW,
    data
  };
};

export const hideKeyStoreModal = (data) => {
  return {
    type: KEYSTORE_MODAL_HIDE,
    data
  };
};

export const keyStoreTxn = async (loginAddress, msgs) => {
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const password = store.getState().keyStore.password;
  const keyStoreData = store.getState().keyStore.keyStore;
  const encryptedSeed = store.getState().common.loginInfo.encryptedSeed;

  let loginCoinType;
  if ((loginInfo && loginInfo?.addressLogin) || (loginInfo && !encryptedSeed)) {
    const { coinType } = store.getState().signInKeyStore;
    loginCoinType = coinType;
  } else {
    loginCoinType = JSON.parse(localStorage.getItem(COIN_TYPE));
  }

  const accountNumber = helper.getAccountNumber(
    store.getState().advanced.accountNumber.value
  );
  const accountIndex = helper.getAccountNumber(
    store.getState().advanced.accountIndex.value
  );
  const bip39PassPhrase = store.getState().advanced.bip39PassPhrase.value;

  const fee = store.getState().fee.fee.value.fee;
  const gas = store.getState().gas.gas.value;

  let mnemonic = "";
  if (encryptedSeed) {
    const encryptedMnemonic = localStorage.getItem(ENCRYPTED_MNEMONIC);
    const res = JSON.parse(encryptedMnemonic);
    const decryptedData = decryptKeyStore(res, password.value);
    if (decryptedData.error != null) {
      throw new Error(decryptedData.error);
    }
    mnemonic = decryptedData.mnemonic;
  } else {
    mnemonic = await privateKeyReader(
      keyStoreData.value,
      password.value,
      loginAddress,
      accountNumber,
      accountIndex,
      bip39PassPhrase,
      loginCoinType
    );
  }

  const result = await transactions.TransactionWithMnemonic(
    msgs,
    fee(Math.trunc(fee), gas),
    memo,
    mnemonic,
    makeHdPath(accountNumber, accountIndex, loginCoinType),
    bip39PassPhrase,
    loginAddress
  );

  // let result = await transactions.getTransactionResponse(
  //   loginAddress,
  //   fee,
  //   gas,
  //   mnemonic,
  //   accountNumber,
  //   accountIndex,
  //   bip39PassPhrase,
  //   loginCoinType
  // );
  return result;
};

export const keyStoreSubmit = (loginAddress) => {
  return async (dispatch, getState) => {
    dispatch(txInProgress());
    try {
      const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
      const password = getState().keyStore.password;
      const keyStoreData = getState().keyStore.keyStore;
      const balance = getState().balance.list;
      const encryptedSeed = getState().common.loginInfo.encryptedSeed;

      let loginCoinType;
      if (
        (loginInfo && loginInfo?.addressLogin) ||
        (loginInfo && !encryptedSeed)
      ) {
        const { coinType } = getState().signInKeyStore;
        loginCoinType = coinType;
      } else {
        loginCoinType = JSON.parse(localStorage.getItem(COIN_TYPE));
      }

      const accountNumber = helper.getAccountNumber(
        getState().advanced.accountNumber.value
      );
      const accountIndex = helper.getAccountNumber(
        getState().advanced.accountIndex.value
      );
      const bip39PassPhrase = getState().advanced.bip39PassPhrase.value;

      const formData = getState().common.txInfo.value.data;
      const txName = getState().common.txName.value.name;

      const fee = getState().fee.fee.value.fee;
      const gas = getState().gas.gas.value;

      let mnemonic = "";
      if (encryptedSeed) {
        const encryptedMnemonic = localStorage.getItem(ENCRYPTED_MNEMONIC);
        const res = JSON.parse(encryptedMnemonic);
        const decryptedData = decryptKeyStore(res, password.value);
        if (decryptedData.error != null) {
          throw new Error(decryptedData.error);
        }
        mnemonic = decryptedData.mnemonic;
      } else {
        mnemonic = await privateKeyReader(
          keyStoreData.value,
          password.value,
          loginAddress,
          accountNumber,
          accountIndex,
          bip39PassPhrase,
          loginCoinType
        );
      }

      let result = await transactions.getTransactionResponse(
        loginAddress,
        formData,
        fee,
        gas,
        mnemonic,
        txName,
        accountNumber,
        accountIndex,
        bip39PassPhrase,
        loginCoinType
      );
      if (result.code !== undefined && result.code === 0) {
        localStorage.setItem(COIN_TYPE, loginCoinType);
        dispatch(
          setLoginInfo({
            encryptedSeed: true,
            error: {
              message: ""
            }
          })
        );
        if (txName === "tokenize") {
          dispatch(closeLoader());
          dispatch(hideKeyStoreModal());
          dispatch(showTxTokenizeModal());
          dispatch(txResponse(result));
        } else {
          dispatch(closeLoader());
          dispatch(hideKeyStoreModal());
          dispatch(txSuccess());
          dispatch(txResponse(result));
          dispatch(showTxResultModal());
          dispatch(setTxTokenizeShareStatus(""));
        }
      } else {
        throw Error(result.rawLog);
      }
    } catch (error) {
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
      dispatch(txFailed(error.message));
    }
  };
};
