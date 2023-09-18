import { QueryClientImpl as BankQueryClientImpl } from "cosmjs-types/cosmos/bank/v1beta1/query";
import transactions from "../../utils/transactions";
import { QueryClientImpl as LsNativeStakingQueryClient } from "persistenceonejs/cosmos/staking/v1beta1/query";
import { QueryClientImpl as LsNativeDistributionQueryClient } from "persistenceonejs/cosmos/distribution/v1beta1/query";
import {
  TOKENIZE_SHARES_FETCH_SUCCESS,
  TOKENIZE_SHARES_REWARDS_FETCH_SUCCESS
} from "../../constants/tokenizeShares";
import * as Sentry from "@sentry/browser";
import { getTokenizedShares } from "../../utils/actions";
import { tokenValueConversion } from "../../utils/helper";
import { decimalize, stringToNumber } from "../../utils/scripts";
import { handleTokenizeTxButton } from "./transactions/tokenizeShares";
import Long from "long";

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
            const rewards = decimalize(object?.amount);
            const fixedRewardsResponse = tokenValueConversion(
              stringToNumber(parseInt(rewards))
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
    try {
      const rpcClient = await transactions.RpcClient();
      const lsNativeQueryService = new LsNativeStakingQueryClient(rpcClient);

      let key = new Uint8Array();
      let validatorDelegations = [];

      do {
        const response = await lsNativeQueryService.ValidatorDelegations({
          validatorAddr: validatorAddr,
          pagination: {
            key: key,
            offset: Long.fromNumber(0, true),
            limit: Long.fromNumber(0, true),
            countTotal: true
          }
        });
        key = response.pagination.nextKey;
        validatorDelegations.push(...response.delegationResponses);
      } while (key.length !== 0);
      // const response = await lsNativeQueryService.ValidatorDelegations({
      //   validatorAddr: validatorAddr
      // });
      let bondStatus = false;
      /* for loop instead of find for performance; stop iteration once we get any item as true */
      for (let i = 0; i < validatorDelegations.length; i++) {
        if (bondStatus) break;

        const validatorDelegation = validatorDelegations[i];
        if (validatorDelegation.delegation.validatorBond == true)
          bondStatus = true;
      }

      dispatch(handleTokenizeTxButton(bondStatus));
      return false;
    } catch (error) {
      console.log(error, "fetchValidatorBonds error");
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
      dispatch(handleTokenizeTxButton(false));
    }
  };
};
