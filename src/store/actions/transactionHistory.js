import {
  PAGE_NUMBER_FETCH_SUCCESS,
  RECEIVE_PAGE_NUMBER_FETCH_SUCCESS,
  RECEIVE_TRANSACTIONS_FETCH_ERROR,
  RECEIVE_TRANSACTIONS_FETCH_SUCCESS,
  RECEIVE_TRANSACTIONS_IN_PROGRESS,
  TRANSACTIONS_FETCH_ERROR,
  TRANSACTIONS_FETCH_SUCCESS,
  TRANSACTIONS_IN_PROGRESS
} from "../../constants/transactionQueries";
import { buildQuery } from "@cosmjs/tendermint-rpc/build/tendermint34/requests";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc";
import { decodeTxRaw, Registry } from "@cosmjs/proto-signing";
import helper, { generateHash } from "../../utils/helper";
import * as Sentry from "@sentry/browser";
import {
  MsgTokenizeShares,
  MsgRedeemTokensForShares,
  MsgTransferTokenizeShareRecord,
  MsgValidatorBond
} from "persistenceonejs/cosmos/staking/v1beta1/tx";
import { MsgWithdrawTokenizeShareRecordReward } from "persistenceonejs/cosmos/distribution/v1beta1/tx";
import {
  MsgLiquidStakeLSM,
  MsgLiquidStake,
  MsgLiquidUnstake,
  MsgRedeem
} from "persistenceonejs/pstake/liquidstakeibc/v1beta1/msgs";
const { defaultRegistryTypes } = require("@cosmjs/stargate");
const tendermintRPCURL = process.env.REACT_APP_TENDERMINT_RPC_ENDPOINT;
const vestingTx = require("cosmjs-types/cosmos/vesting/v1beta1/tx");
const tx_7 = require("cosmjs-types/ibc/core/channel/v1/tx");
const authzTx = require("cosmjs-types/cosmos/authz/v1beta1/tx");
const feeGrantTx = require("cosmjs-types/cosmos/feegrant/v1beta1/tx");

function createDefaultRegistry() {
  return new Registry([
    ...defaultRegistryTypes,
    ["/cosmos.authz.v1beta1.MsgGrant", authzTx.MsgGrant],
    [
      "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
      vestingTx.MsgCreateVestingAccount
    ],
    ["/ibc.core.channel.v1.MsgTimeout", tx_7.MsgTimeout],
    [
      "/cosmos.feegrant.v1beta1.MsgGrantAllowance",
      feeGrantTx.MsgGrantAllowance
    ],
    [
      "/cosmos.feegrant.v1beta1.MsgGrantAllowance",
      feeGrantTx.MsgGrantAllowance
    ],
    ["/gaia.liquid.v1beta1.MsgTokenizeShares", MsgTokenizeShares],
    [
      "/gaia.liquid.v1beta1.MsgRedeemTokensForShares",
      MsgRedeemTokensForShares
    ],
    ["/cosmos.authz.v1beta1.MsgExec", authzTx.MsgExec],
    ["/cosmos.authz.v1beta1.MsgRevoke", authzTx.MsgRevoke],
    [
      "/gaia.liquid.v1beta1.MsgTransferTokenizeShareRecord",
      MsgTransferTokenizeShareRecord
    ],
    ["/cosmos.staking.v1beta1.MsgValidatorBond", MsgValidatorBond],
    [
      "/cosmos.distribution.v1beta1.MsgWithdrawTokenizeShareRecordReward",
      MsgWithdrawTokenizeShareRecordReward
    ],
    [("/pstake.liquidstakeibc.v1beta1.MsgLiquidStakeLSM", MsgLiquidStakeLSM)],
    ["/pstake.liquidstakeibc.v1beta1.MsgLiquidStake", MsgLiquidStake],
    ["/pstake.liquidstakeibc.v1beta1.MsgLiquidUnstake", MsgLiquidUnstake],
    ["/pstake.liquidstakeibc.v1beta1.MsgRedeem", MsgRedeem]
  ]);
}

const registry = createDefaultRegistry();

export const fetchTransactionsProgress = () => {
  return {
    type: TRANSACTIONS_IN_PROGRESS
  };
};

export const fetchPageNumberSuccess = (number, totalPages) => {
  return {
    type: PAGE_NUMBER_FETCH_SUCCESS,
    number,
    totalPages
  };
};

export const fetchTransactionsSuccess = (list) => {
  return {
    type: TRANSACTIONS_FETCH_SUCCESS,
    list
  };
};

export const fetchTransactionsError = (list) => {
  return {
    type: TRANSACTIONS_FETCH_ERROR,
    list
  };
};

export const getTxnBody = (decodedTransaction) => {
  try {
    if (decodedTransaction.body.messages.length > 1) {
      return registry.decode(
        decodedTransaction.body.messages[
          decodedTransaction.body.messages.length - 1
        ]
      );
    } else {
      return registry.decode(decodedTransaction.body.messages[0]);
    }
  } catch (e) {
    return null;
  }
};

export const fetchTransactions = (address, limit, pageNumber) => {
  return async (dispatch) => {
    dispatch(fetchTransactionsProgress());
    try {
      const tmClient = await Tendermint37Client.connect(tendermintRPCURL);
      const txSearch = await tmClient.txSearch(
        txSearchParams(address, pageNumber, limit, "message.sender")
      );
      let txData = [];
      for (let transaction of txSearch.txs) {
        const decodedTransaction = decodeTxRaw(transaction.tx);
        const block = await tmClient.block(transaction.height);
        if (transaction.result.code === 0) {
          const txHash = generateHash(transaction.tx);
          let body;
          let typeUrl;
          if (decodedTransaction.body.messages.length > 1) {
            typeUrl =
              decodedTransaction.body.messages[
                decodedTransaction.body.messages.length - 1
              ].typeUrl;
            body = getTxnBody(decodedTransaction);
          } else {
            typeUrl = decodedTransaction.body.messages[0].typeUrl;
            body = getTxnBody(decodedTransaction);
          }
          if (body !== null) {
            const txAmount = helper.getTransactionAmount(body);
            txData.push({
              typeUrl: typeUrl,
              messageCount: decodedTransaction.body.messages.length,
              fee: decodedTransaction.authInfo.fee,
              height: transaction.height,
              hash: txHash,
              body: body,
              amount: txAmount,
              timestamp: block.block.header.time
            });
          }
        }
      }
      let txnsResponseList = txData;
      dispatch(fetchPageNumberSuccess(pageNumber, txSearch.totalCount));
      dispatch(fetchTransactionsSuccess(txnsResponseList));
    } catch (error) {
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
      console.log(error, "in snet-");
    }
  };
};

export const fetchReceiveTransactionsProgress = () => {
  return {
    type: RECEIVE_TRANSACTIONS_IN_PROGRESS
  };
};

export const fetchReceivePageNumberSuccess = (number, totalPages) => {
  return {
    type: RECEIVE_PAGE_NUMBER_FETCH_SUCCESS,
    number,
    totalPages
  };
};

export const fetchReceiveTransactionsSuccess = (list) => {
  return {
    type: RECEIVE_TRANSACTIONS_FETCH_SUCCESS,
    list
  };
};
export const fetchReceiveTransactionsError = (list) => {
  return {
    type: RECEIVE_TRANSACTIONS_FETCH_ERROR,
    list
  };
};

function txSearchParams(recipientAddress, pageNumber, perPage, type) {
  return {
    query: buildQuery({
      tags: [{ key: type, value: recipientAddress }]
    }),
    page: pageNumber,
    per_page: perPage,
    prove: true,
    order_by: "desc"
  };
}

export const fetchReceiveTransactions = (address, limit, pageNumber) => {
  return async (dispatch) => {
    dispatch(fetchReceiveTransactionsProgress());
    try {
      const tmClient = await Tendermint37Client.connect(tendermintRPCURL);
      const query = txSearchParams(
        address,
        pageNumber,
        limit,
        "transfer.recipient"
      );
      const txSearch = await tmClient.txSearch(query);
      let txData = [];
      for (let transaction of txSearch.txs) {
        const decodedTransaction = decodeTxRaw(transaction.tx);
        const block = await tmClient.block(transaction.height);

        if (transaction.result.code === 0) {
          const txHash = generateHash(transaction.tx);
          let body;
          let typeUrl;
          if (decodedTransaction.body.messages.length > 1) {
            typeUrl =
              decodedTransaction.body.messages[
                decodedTransaction.body.messages.length - 1
              ].typeUrl;
            body = registry.decode(decodedTransaction.body.messages[0]);
          } else {
            typeUrl = decodedTransaction.body.messages[0].typeUrl;
            body = getTxnBody(decodedTransaction);
          }
          if (body !== null) {
            const txAmount = helper.getTransactionAmount(body);
            txData.push({
              typeUrl: typeUrl,
              messageCount: decodedTransaction.body.messages.length,
              fee: decodedTransaction.authInfo.fee,
              height: transaction.height,
              hash: txHash,
              body: body,
              amount: txAmount,
              timestamp: block.block.header.time
            });
          }
        }
      }
      let txnsResponseList = txData;
      dispatch(fetchReceivePageNumberSuccess(pageNumber, txSearch.totalCount));
      dispatch(fetchReceiveTransactionsSuccess(txnsResponseList));
    } catch (error) {
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
      console.log(error.message, "in sendtxn");
    }
  };
};
