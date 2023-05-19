import { combineReducers } from "redux";
import delegations from "./delegations";
import transactions from "./transactionsHistory";
import validators from "./validators";
import balance from "./balance";
import rewards from "./rewards";
import unbond from "./unbond";
import tokenPrice from "./tokenPrice";
import withdrawAddress from "./withdrawAddress";
import common from "./transactions/common";
import send from "./transactions/send";
import migrateAssets from "./transactions/migrateAssets";
import fee from "./transactions/fee";
import gas from "./transactions/gas";
import keyStore from "./transactions/keyStore";
import advanced from "./transactions/advanced";
import signInKeyStore from "./signIn/keyStore";
import signInModal from "./signIn/modal";
import signInLedger from "./signIn/ledger";
import signInAddress from "./signIn/address";
import signInKeplr from "./signIn/keplr";
import mulitpleRewardsWithDraw from "./transactions/withdrawTotalRewards";
import sendIbc from "./transactions/sendIbc";
import setWithdrawAddress from "./transactions/setWithdrawAddress";
import delegate from "./transactions/delegate";
import redelegate from "./transactions/redelegate";
import unbondTx from "./transactions/unbond";
import withdrawValidatorRewards from "./transactions/withdrawValidatorRewards";
import generateKeyStore from "./generateKeyStore";
import changePassword from "./changePassword";
import delegationTransfer from "./transactions/delegationTransfer";

const appReducer = combineReducers({
  delegations,
  transactions,
  validators,
  balance,
  rewards,
  unbond,
  tokenPrice,
  send,
  withdrawAddress,
  common,
  fee,
  gas,
  keyStore,
  advanced,
  signInKeyStore,
  signInModal,
  signInLedger,
  signInAddress,
  signInKeplr,
  mulitpleRewardsWithDraw,
  sendIbc,
  setWithdrawAddress,
  delegate,
  redelegate,
  unbondTx,
  withdrawValidatorRewards,
  generateKeyStore,
  changePassword,
  migrateAssets,
  delegationTransfer
});

export const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
