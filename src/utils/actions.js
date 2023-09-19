import transactions from "./transactions";
import {
  QueryClientImpl as DistributionQueryClient,
  QueryClientImpl
} from "cosmjs-types/cosmos/distribution/v1beta1/query";
import * as Sentry from "@sentry/browser";
import { LOGIN_INFO } from "../constants/localStorage";
import { decimalize, stringToNumber } from "./scripts";
import { tokenValueConversion } from "./helper";
import { DefaultChainInfo } from "../config";
import { QueryClientImpl as BankQueryClientImpl } from "cosmjs-types/cosmos/bank/v1beta1/query";
import { QueryClientImpl as LsNativeStakingQueryClient } from "persistenceonejs/cosmos/staking/v1beta1/query";
import { QueryClientImpl as StakingQueryClientImpl } from "cosmjs-types/cosmos/staking/v1beta1/query";
import { decodeCosmosSdkDecFromProto } from "@cosmjs/stargate";

async function getValidatorRewards(validatorAddress) {
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const rpcClient = await transactions.RpcClient();
  const stakingQueryService = new QueryClientImpl(rpcClient);
  let amount = 0;
  await stakingQueryService
    .DelegationRewards({
      delegatorAddress: loginInfo && loginInfo.address,
      validatorAddress: validatorAddress
    })
    .then((response) => {
      if (response.rewards.length) {
        let rewards = decimalize(response.rewards[0].amount);
        amount = tokenValueConversion(stringToNumber(rewards));
      }
    })
    .catch((error) => {
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
      console.log(error.response);
    });
  return amount;
}

async function getValidatorCommission(address) {
  const rpcClient = await transactions.RpcClient();
  const stakingQueryService = new DistributionQueryClient(rpcClient);
  let commission = 0;
  await stakingQueryService
    .ValidatorCommission({
      validatorAddress: address
    })
    .then((res) => {
      if (res.commission.commission) {
        for (const item of res.commission.commission) {
          if (
            item &&
            item.denom === DefaultChainInfo.currency.coinMinimalDenom
          ) {
            commission = decimalize(item.amount);
            commission = stringToNumber(
              tokenValueConversion(stringToNumber(commission)).toFixed(6)
            );
          }
        }
      }
    })
    .catch((error) => {
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
      console.log(error.response ? error.response.data.message : error.message);
    });
  return commission;
}

export const getTokenizedShares = async (address) => {
  try {
    const responseList = [];
    const rpcClient = await transactions.RpcClient();
    const bankQueryService = new BankQueryClientImpl(rpcClient);
    const stakingQueryService = new StakingQueryClientImpl(rpcClient);
    const balancesResponse = await bankQueryService.AllBalances({
      address: address
    });
    const lsNativeQueryService = new LsNativeStakingQueryClient(rpcClient);
    if (balancesResponse.balances.length > 0) {
      for (const balance of balancesResponse.balances) {
        if (balance.denom.startsWith("persistence")) {
          const response =
            await lsNativeQueryService.TokenizeShareRecordByDenom({
              denom: balance.denom
            });
          if (response) {
            const validatorResponse = await stakingQueryService.Validator({
              validatorAddr: response.record.validator
            });

            const validatorShares = decodeCosmosSdkDecFromProto(
              validatorResponse.validator.delegatorShares
            ).toString();

            const tokens =
              (Number(balance.amount) *
                Number(validatorResponse.validator.tokens)) /
              Number(validatorShares);

            const res = {
              tokens: tokenValueConversion(Math.ceil(Number(tokens))),
              decAmount: balance.amount,
              amount: tokenValueConversion(balance.amount),
              validatorAddress: response.record.validator,
              denom: balance.denom,
              recordId: Number(response.record.id),
              owner: response.record.owner
            };
            responseList.push(res);
            // response.push();
          }
        }
      }
    }
    let newList = [];
    responseList.length > 0 &&
      responseList.forEach((item) => {
        const newListCheck = newList.find(
          (filterItem) => filterItem.validatorAddress === item.validatorAddress
        );
        if (!newListCheck) {
          const uniqList = responseList.filter(
            (filterItem) =>
              filterItem.validatorAddress === item.validatorAddress
          );
          let total = 0;
          if (uniqList.length > 0) {
            uniqList.forEach((item) => {
              total += item.tokens;
            });
          }
          newList.push({
            amount: total,
            validatorAddress: item.validatorAddress,
            list: uniqList
          });
        }
      });
    return newList;
  } catch (e) {
    return [];
  }
};

export default {
  getValidatorRewards,
  getValidatorCommission
};
