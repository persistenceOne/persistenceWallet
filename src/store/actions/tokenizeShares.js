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
    console.log("called123", "called");
    const rpcClient = await transactions.RpcClient();
    const lsNativeQueryService = new LsNativeStakingQueryClient(rpcClient);
    const response = await lsNativeQueryService.TokenizeShareRecordsOwned({
      owner: address
    });
    if (response) {
      console.log(response, "fetchTokenizedSharesByAddress");
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
      console.log(address, "fetchTokenizedShareRewards clled ");
      const rpcClient = await transactions.RpcClient();
      const lsNativeQueryService = new LsNativeDistributionQueryClient(
        rpcClient
      );
      const response = await lsNativeQueryService.TokenizeShareRecordReward({
        ownerAddress: address
      });
      console.log(response, "fetchTokenizedShareRewards");
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
            recordId: reward.recordId
          };
          list.push(item);
        }
        console.log(list, "fetchTokenizedShareRewards2");
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
      console.log(dlgtAddress, "fetchValidatorBonds clled ", validatorAddr);
      const rpcClient = await transactions.RpcClient();
      const lsNativeQueryService = new LsNativeStakingQueryClient(rpcClient);
      const response = await lsNativeQueryService.ValidatorDelegations({
        validatorAddr: validatorAddr
      });
      console.log(response, "fetchValidatorBonds response");
      let bondStatus = false;
      if (
        response &&
        response.delegationResponses &&
        response.delegationResponses.length > 0
      ) {
        const responseItem = response.delegationResponses.find(
          (item) => item.delegation.delegatorAddress === dlgtAddress
        );
        console.log(responseItem, "fetchValidatorBonds responseItem");
        if (responseItem) {
          bondStatus = responseItem.delegation.validatorBond;
        }
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