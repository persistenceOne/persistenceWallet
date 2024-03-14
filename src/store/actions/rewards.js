import {
  FETCH_VALIDATOR_COMMISSION_INFO_SUCCESS,
  FETCH_VALIDATOR_WITH_ADDRESS_ERROR,
  FETCH_VALIDATORS_REWARDS_SUCCESS,
  REWARDS_FETCH_ERROR,
  REWARDS_FETCH_IN_PROGRESS,
  REWARDS_FETCH_SUCCESS,
  REWARDS_LIST_FETCH_SUCCESS
} from "../../constants/rewards";
import transactions from "../../utils/transactions";
import { QueryClientImpl } from "cosmjs-types/cosmos/distribution/v1beta1/query";
import ActionHelper from "../../utils/actions";
import { QueryClientImpl as StakingQueryClientImpl } from "cosmjs-types/cosmos/staking/v1beta1/query";
import * as Sentry from "@sentry/browser";
import { decimalize, stringToNumber } from "../../utils/scripts";
import {
  checkValidatorAccountAddress,
  getDenomFromMinimalDenom,
  tokenValueConversion
} from "../../utils/helper";
import Lodash from "lodash";
import { sortTokensByDenom } from "../../utils/validations";
import { DefaultChainInfo, PstakeInfo } from "../../config";
import { QueryClient, setupIbcExtension } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
const tendermintRPCURL = process.env.REACT_APP_TENDERMINT_RPC_ENDPOINT;

export const fetchRewardsProgress = () => {
  return {
    type: REWARDS_FETCH_IN_PROGRESS
  };
};
export const fetchRewardsListProgress = (list) => {
  return {
    type: REWARDS_LIST_FETCH_SUCCESS,
    list
  };
};
export const fetchRewardsSuccess = (data) => {
  return {
    type: REWARDS_FETCH_SUCCESS,
    data
  };
};
export const fetchRewardsError = (data) => {
  return {
    type: REWARDS_FETCH_ERROR,
    data
  };
};

export const fetchValidatorRewardsListError = (data) => {
  return {
    type: FETCH_VALIDATOR_WITH_ADDRESS_ERROR,
    data
  };
};

export const fetchValidatorRewardsListSuccess = (list) => {
  return {
    type: FETCH_VALIDATORS_REWARDS_SUCCESS,
    list
  };
};

export const fetchValidatorCommissionInfoSuccess = (list) => {
  return {
    type: FETCH_VALIDATOR_COMMISSION_INFO_SUCCESS,
    list
  };
};

export const fetchTotalRewards = (address) => {
  return async (dispatch) => {
    try {
      const MIN_BLC = 0.000001;
      dispatch(fetchRewardsProgress());
      const rpcClient = await transactions.RpcClient();
      const distributionQueryService = new QueryClientImpl(rpcClient);
      const tendermintClient = await Tendermint34Client.connect(
        tendermintRPCURL
      );
      const queryClient = new QueryClient(tendermintClient);
      await distributionQueryService
        .DelegationTotalRewards({
          delegatorAddress: address
        })
        .then(async (delegatorRewardsResponse) => {
          if (delegatorRewardsResponse.total.length) {
            console.log(delegatorRewardsResponse, "delegatorRewardsResponse");
            let allTokensRewards = [];
            for (const token of delegatorRewardsResponse.total) {
              if (token.denom.startsWith("ibc")) {
                let denomText = token.denom.substring(
                  token.denom.indexOf("/") + 1
                );
                const ibcExtension = setupIbcExtension(queryClient);
                let ibcDenomeResponse =
                  await ibcExtension.ibc.transfer.denomTrace(denomText);
                const denomResponse = getDenomFromMinimalDenom(
                  ibcDenomeResponse.denomTrace?.baseDenom
                );
                const decimalizedValue = decimalize(token.amount, 18);
                const rewards = decimalize(
                  parseInt(decimalizedValue),
                  denomResponse.decimals
                );
                if (Number(rewards) > MIN_BLC) {
                  allTokensRewards.push({
                    denom: denomResponse.denom,
                    amount: rewards
                  });
                }
              } else if (token.denom === PstakeInfo.coinMinimalDenom) {
                const decimalizedValue = decimalize(token.amount);
                const rewards = decimalize(parseInt(decimalizedValue));
                if (Number(rewards) > MIN_BLC) {
                  allTokensRewards.push({ denom: "PSTAKE", amount: rewards });
                }
              } else {
                const denomResponse = getDenomFromMinimalDenom(token.denom);
                const decimalizedValue = decimalize(token.amount);
                const rewards = decimalize(
                  parseInt(decimalizedValue),
                  denomResponse.decimals
                );
                if (Number(rewards) > MIN_BLC) {
                  allTokensRewards.push({
                    denom: denomResponse.denom,
                    amount: rewards
                  });
                }
              }
            }
            let xprtRewards = Lodash.sumBy(
              delegatorRewardsResponse.total,
              (token) => {
                if (
                  token.denom === DefaultChainInfo.currency.coinMinimalDenom
                ) {
                  let rewards = decimalize(token.amount);
                  const fixedRewardsResponse = tokenValueConversion(
                    stringToNumber(parseInt(rewards))
                  );
                  return stringToNumber(fixedRewardsResponse);
                } else {
                  return 0;
                }
              }
            );
            let ibcRewards = Lodash.sumBy(
              delegatorRewardsResponse.total,
              (token) => {
                if (token.denom === PstakeInfo.coinMinimalDenom) {
                  const decimalizedValue = decimalize(token.amount);
                  return decimalize(parseInt(decimalizedValue));
                } else if (
                  token.denom !== PstakeInfo.coinMinimalDenom &&
                  token.denom !== DefaultChainInfo.currency.coinMinimalDenom
                ) {
                  let rewards = decimalize(token.amount);
                  const fixedRewardsResponse = tokenValueConversion(
                    stringToNumber(parseInt(rewards))
                  );
                  return stringToNumber(fixedRewardsResponse);
                } else {
                  return 0;
                }
              }
            );
            const totalRewards = [
              xprtRewards.toFixed(6),
              allTokensRewards,
              stringToNumber(ibcRewards)
            ];
            dispatch(fetchRewardsSuccess(totalRewards));
          }
        })
        .catch((error) => {
          Sentry.captureException(
            error.response ? error.response.data.message : error.message
          );
          console.log(
            error.response ? error.response.data.message : error.message
          );
        });
    } catch (error) {
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
      console.log(
        error.response ? error.response.data.message : error.message,
        "in-rewar"
      );
    }
  };
};

export const fetchRewards = (address) => {
  return async (dispatch) => {
    try {
      dispatch(fetchRewardsProgress());
      const rpcClient = await transactions.RpcClient();
      const distributionQueryService = new QueryClientImpl(rpcClient);
      await distributionQueryService
        .DelegationTotalRewards({
          delegatorAddress: address
        })
        .then(async (delegatorRewardsResponse) => {
          if (delegatorRewardsResponse.rewards.length) {
            let options = [];
            for (const item of delegatorRewardsResponse.rewards) {
              let rewardItem = sortTokensByDenom(
                item,
                DefaultChainInfo.currency.coinMinimalDenom
              );
              if (rewardItem) {
                const stakingQueryService = new StakingQueryClientImpl(
                  rpcClient
                );
                await stakingQueryService
                  .Validator({
                    validatorAddr: item.validatorAddress
                  })
                  .then(async (res) => {
                    const data = {
                      label: `${res.validator.description.moniker} - 
                                    ${tokenValueConversion(
                                      decimalize(
                                        rewardItem && rewardItem.amount
                                      )
                                    ).toLocaleString(undefined, {
                                      minimumFractionDigits: 6
                                    })} ${DefaultChainInfo.currency.coinDenom}`,
                      value: res.validator.operatorAddress,
                      rewards: decimalize(rewardItem && rewardItem.amount)
                    };
                    options.push(data);
                  })
                  .catch((error) => {
                    Sentry.captureException(
                      error.response
                        ? error.response.data.message
                        : error.message
                    );
                    dispatch(
                      fetchValidatorRewardsListError(
                        error.response
                          ? error.response.data.message
                          : error.message
                      )
                    );
                  });
              }
              if (
                checkValidatorAccountAddress(item.validatorAddress, address)
              ) {
                let commissionInfo = await ActionHelper.getValidatorCommission(
                  item.validatorAddress
                );
                dispatch(
                  fetchValidatorCommissionInfoSuccess([
                    commissionInfo,
                    item.validatorAddress,
                    true
                  ])
                );
              }
            }
            dispatch(fetchValidatorRewardsListSuccess(options));
            dispatch(
              fetchRewardsListProgress(delegatorRewardsResponse.rewards)
            );
          }
        })
        .catch((error) => {
          Sentry.captureException(
            error.response ? error.response.data.message : error.message
          );
          dispatch(
            fetchRewardsError(
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
