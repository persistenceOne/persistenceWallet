import {
  BALANCE_FETCH_ERROR,
  BALANCE_FETCH_IN_PROGRESS,
  BALANCE_FETCH_SUCCESS,
  BALANCE_LIST_FETCH_SUCCESS,
  TOKEN_LIST_FETCH_SUCCESS,
  TRANSFERABLE_BALANCE_LIST_FETCH_SUCCESS,
  VESTING_BALANCE_FETCH_SUCCESS
} from "../../constants/balance";
import { getTransferableAmount } from "../../utils/vestingAmount";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
  createProtobufRpcClient,
  QueryClient,
  setupIbcExtension
} from "@cosmjs/stargate";
import { QueryClientImpl } from "cosmjs-types/cosmos/bank/v1beta1/query";
import * as Sentry from "@sentry/browser";
import { stringToNumber } from "../../utils/scripts";
import {
  getAccount,
  getDenomFromMinimalDenom,
  tokenValueConversion
} from "../../utils/helper";
import {
  DefaultChainInfo as defaultChain,
  DefaultChainInfo,
  stkATOMInfo
} from "../../config";

const tendermintRPCURL = process.env.REACT_APP_TENDERMINT_RPC_ENDPOINT;

export const fetchBalanceProgress = () => {
  return {
    type: BALANCE_FETCH_IN_PROGRESS
  };
};
export const fetchBalanceSuccess = (data) => {
  return {
    type: BALANCE_FETCH_SUCCESS,
    data
  };
};

export const fetchBalanceError = (data) => {
  return {
    type: BALANCE_FETCH_ERROR,
    data
  };
};

export const fetchBalanceListSuccess = (list) => {
  return {
    type: BALANCE_LIST_FETCH_SUCCESS,
    list
  };
};

export const fetchTransferableBalanceSuccess = (data) => {
  return {
    type: TRANSFERABLE_BALANCE_LIST_FETCH_SUCCESS,
    data
  };
};

export const fetchVestingBalanceSuccess = (data) => {
  return {
    type: VESTING_BALANCE_FETCH_SUCCESS,
    data
  };
};

export const fetchTokenListSuccess = (list) => {
  return {
    type: TOKEN_LIST_FETCH_SUCCESS,
    list
  };
};

export const fetchTransferableVestingAmount = (address) => {
  return async (dispatch) => {
    dispatch(fetchBalanceProgress());
    try {
      let xprtBalance = 0;
      let vestingAmount = 0;
      let transferableAmount = 0;
      const tendermintClient = await Tendermint34Client.connect(
        tendermintRPCURL
      );
      const queryClient = new QueryClient(tendermintClient);
      const rpcClient = createProtobufRpcClient(queryClient);
      const stakingQueryService = new QueryClientImpl(rpcClient);
      const response = await stakingQueryService.AllBalances({
        address: address
      });
      if (response.balances.length) {
        let tokenList = [];
        for (let i = 0; i < response.balances.length; i++) {
          let item = response.balances[i];
          if (item.denom === DefaultChainInfo.currency.coinMinimalDenom) {
            if (item.denom === defaultChain.currency.coinMinimalDenom) {
              xprtBalance = item.amount;
            }
            item.ibcBalance = false;

            const denomResponse = getDenomFromMinimalDenom(item.denom);
            item.tokenImage = denomResponse.tokenImg;
            tokenList.push(item);
          } else if (item.denom === stkATOMInfo.coinMinimalDenom) {
            item.ibcBalance = false;
            const denomResponse = getDenomFromMinimalDenom(item.denom);
            item.tokenImage = denomResponse.tokenImg;
            tokenList.push(item);
          }
        }
        const account = await getAccount(address);
        if (account) {
          vestingAmount = account.vestingBalance;
          transferableAmount = await getTransferableAmount(
            address,
            account,
            tokenValueConversion(stringToNumber(xprtBalance))
          );
        }
        dispatch(fetchBalanceListSuccess(response.balances));
        const totalBalance = stringToNumber(xprtBalance);
        dispatch(fetchBalanceSuccess(tokenValueConversion(totalBalance)));
        dispatch(fetchTransferableBalanceSuccess(transferableAmount));
        dispatch(
          fetchVestingBalanceSuccess(tokenValueConversion(vestingAmount))
        );
        dispatch(fetchTokenListSuccess(tokenList));
      } else {
        dispatch(fetchTransferableBalanceSuccess(0));
        dispatch(fetchVestingBalanceSuccess(0));
        dispatch(fetchTokenListSuccess([]));
      }
    } catch (error) {
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
      console.log(error.message, "bal fetch");
    }
  };
};
