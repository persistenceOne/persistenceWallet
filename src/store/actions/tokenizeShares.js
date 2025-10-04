import transactions from "../../utils/transactions";
import { QueryClientImpl as LsNativeStakingQueryClient } from "persistenceonejs/gaia/liquid/v1beta1/query";
import { QueryClientImpl as LsNativeDistributionQueryClient } from "persistenceonejs/cosmos/distribution/v1beta1/query";
import {
  TOKENIZE_SHARES_FETCH_SUCCESS,
  TOKENIZE_SHARES_REWARDS_FETCH_SUCCESS
} from "../../constants/tokenizeShares";
import * as Sentry from "@sentry/browser";
import { getTokenizedShares } from "../../utils/actions";
import { tokenValueConversion } from "../../utils/helper";
import { decimalize, stringToNumber } from "../../utils/scripts";
import {
  handleTokenizeTxButton,
  setTokenizeTxParams
} from "./transactions/tokenizeShares";
import Long from "long";
import { decodeCosmosSdkDecFromProto } from "@cosmjs/stargate";
import Decimal from 'decimal.js';

export const fetchTokenizedSharesSuccess = (list) => {
  return {
    type: TOKENIZE_SHARES_FETCH_SUCCESS,
    list
  };
};

export const fetchTokenizedSharesRewardsSuccess = (list) => {
  return {
    type: TOKENIZE_SHARES_REWARDS_FETCH_SUCCESS,
    list
  };
};

export const fetchTokenizedSharesByAddress = async (address) => {
  try {
    const rpcClient = await transactions.RpcClient();
    const lsNativeQueryService = new LsNativeStakingQueryClient(rpcClient);
    const response = await lsNativeQueryService.TokenizeShareRecordsOwned({
      owner: address
    });
    if (response) {
      return response.records.length > 0 ? response.records : [];
      // const res = {
      //   amount: tokenValueConversion(balance.amount),
      //   validatorAddress: response.record.validator,
      //   denom: balance.denom,
      //   recordId: response.record.id,
      //   owner: response.record.owner
      // };
      // responseList.push(res);
      // response.push();
    }
    return [];
  } catch (error) {
    Sentry.captureException(
      error.response ? error.response.data.message : error.message
    );
    return [];
  }
};

export const fetchTokenizedShares = (address) => {
  return async (dispatch) => {
    try {
      const list = await getTokenizedShares(address);
      dispatch(fetchTokenizedSharesSuccess(list));
    } catch (error) {
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
      console.log(error.message);
    }
  };
};

export const fetchTokenizedShareRewards = (address) => {
  return async (dispatch) => {
    try {
      const rpcClient = await transactions.RpcClient();
      const lsNativeQueryService = new LsNativeDistributionQueryClient(
        rpcClient
      );
      const response = await lsNativeQueryService.TokenizeShareRecordReward({
        ownerAddress: address
      });
      if (response) {
        let list = [];
        for (const reward of response.rewards) {
          const totalRewards = reward.reward.reduce((accumulator, object) => {
            const value = new Decimal(object?.amount);
            const result = value.div('1e18');
            const fixedRewardsResponse = tokenValueConversion(
              stringToNumber(parseInt(result.toString()))
            );
            return accumulator + fixedRewardsResponse;
          }, 0);

          const item = {
            reward: totalRewards,
            recordId: Number(reward.recordId)
          };
          list.push(item);
        }
        dispatch(fetchTokenizedSharesRewardsSuccess(list));
      }
    } catch (error) {
      console.log(error, "fetchTokenizedShareRewards error");
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
    }
  };
};

export const fetchValidatorBonds = (validatorAddr, dlgtAddress) => {
  return async (dispatch) => {
    let result = {
      valBondShares: 0,
      liquidShares: 0,
      delegatorShares: 0,
      valBondFactor: 0,
      validatorTokens: 0,
      validatorLiquidStakingCap: 0
    };
    try {
      const rpcClient = await transactions.RpcClient();
      const lsNativeQueryService = new LsNativeStakingQueryClient(rpcClient);

      let key = new Uint8Array();
      let validatorDelegations = [];
      const response = await lsNativeQueryService.Validator({
        validatorAddr: validatorAddr
      });

      const params = await lsNativeQueryService.Params();

      // const valBondShares = response.validator.validatorBondShares;
      // const valBondFactor = params.params.validatorBondFactor;
      // const delegatorShares = response.validator.delegatorShares;
      const valBondShares = decodeCosmosSdkDecFromProto(
        response.validator.validatorBondShares
      ).toString();
      const valBondFactor = decodeCosmosSdkDecFromProto(
        params.params.validatorBondFactor
      ).toString();
      const delegatorShares = decodeCosmosSdkDecFromProto(
        response.validator.delegatorShares
      ).toString();
      const liquidShares = decodeCosmosSdkDecFromProto(
        response.validator.liquidShares
      ).toString();
      const validatorTokens = response.validator.tokens;

      const validatorLiquidStakingCap = decodeCosmosSdkDecFromProto(
        params.params.validatorLiquidStakingCap
      ).toString();

      result.valBondShares = Math.trunc(Number(valBondShares));
      result.delegatorShares = Math.trunc(Number(delegatorShares));
      result.liquidShares = Math.trunc(Number(liquidShares));
      result.valBondFactor = Number(valBondFactor);
      result.validatorTokens = Number(validatorTokens);
      result.validatorLiquidStakingCap = Number(validatorLiquidStakingCap);

      dispatch(setTokenizeTxParams(result));
      return false;
    } catch (error) {
      console.log(error, "fetchValidatorBonds error");
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
      dispatch(setTokenizeTxParams(result));
    }
  };
};
