import {
  DELEGATIONS_FETCH_ERROR,
  DELEGATIONS_FETCH_SUCCESS,
  DELEGATIONS_STATUS_SUCCESS
} from "../../constants/delegations";
import Lodash from "lodash";
import transactions from "../../utils/transactions";
import { QueryClientImpl as StakingQueryClient } from "cosmjs-types/cosmos/staking/v1beta1/query";
import { QueryClientImpl as LsNativeStakingQueryClient } from "persistenceonejs/cosmos/staking/v1beta1/query";
import * as Sentry from "@sentry/browser";
import { stringToNumber } from "../../utils/scripts";
import { tokenValueConversion } from "../../utils/helper";
import { queryTokenizeSharesRecordId } from "../../utils/queries";

export const fetchDelegationsCountSuccess = (count) => {
  return {
    type: DELEGATIONS_FETCH_SUCCESS,
    count
  };
};
export const fetchProposalsCountError = (count) => {
  return {
    type: DELEGATIONS_FETCH_ERROR,
    count
  };
};

export const fetchDelegationStatusSuccess = (value) => {
  return {
    type: DELEGATIONS_STATUS_SUCCESS,
    value
  };
};

export const fetchDelegationsTransfer = async (address) => {
  try {
    const rpcClient = await transactions.RpcClient();
    const lsNativeQueryService = new LsNativeStakingQueryClient(rpcClient);
    await queryTokenizeSharesRecordId();
    const response = await lsNativeQueryService.TokenizeShareRecordsOwned({
      owner: address
    });
  } catch (e) {
    console.log(e, "error in fetchDelegationsTransfer");
  }
};

export const fetchDelegationsCount = (address) => {
  fetchDelegationsTransfer(address);
  return async (dispatch) => {
    try {
      const rpcClient = await transactions.RpcClient();
      const stakingQueryService = new StakingQueryClient(rpcClient);
      await stakingQueryService
        .DelegatorDelegations({
          delegatorAddr: address
        })
        .then((delegationsResponse) => {
          if (delegationsResponse.delegationResponses.length) {
            dispatch(fetchDelegationStatusSuccess(true));
            let totalDelegationsCount = Lodash.sumBy(
              delegationsResponse.delegationResponses,
              (delegation) => {
                return stringToNumber(delegation.balance.amount);
              }
            );
            dispatch(
              fetchDelegationsCountSuccess(
                tokenValueConversion(totalDelegationsCount)
              )
            );
          }
        })
        .catch((error) => {
          Sentry.captureException(
            error.response ? error.response.data.message : error.message
          );
          dispatch(
            fetchProposalsCountError(
              error.response ? error.response.data.message : error.message
            )
          );
        });
    } catch (error) {
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
      console.log(error.message);
    }
  };
};
