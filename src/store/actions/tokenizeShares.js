import { QueryClientImpl as BankQueryClientImpl } from "cosmjs-types/cosmos/bank/v1beta1/query";
import transactions from "../../utils/transactions";
import { QueryClientImpl as LsNativeStakingQueryClient } from "../../protos/lsnative/staking/v1beta1/query";
import { TOKENIZE_SHARES_FETCH_SUCCESS } from "../../constants/tokenizeShares";
import * as Sentry from "@sentry/browser";
import { tokenValueConversion } from "../../utils/helper";

export const fetchTokenizedSharesSuccess = (list) => {
  return {
    type: TOKENIZE_SHARES_FETCH_SUCCESS,
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
      const responseList = [];
      const rpcClient = await transactions.RpcClient();
      const bankQueryService = new BankQueryClientImpl(rpcClient);
      const balancesResponse = await bankQueryService.AllBalances({
        address: address
      });
      console.log(balancesResponse, "response-balancesResponse");
      const lsNativeQueryService = new LsNativeStakingQueryClient(rpcClient);
      if (balancesResponse.balances.length > 0) {
        for (const balance of balancesResponse.balances) {
          if (balance.denom.startsWith("persistence")) {
            const response =
              await lsNativeQueryService.TokenizeShareRecordByDenom({
                denom: balance.denom
              });
            console.log(response, "response-lsNativeQueryService");
            if (response) {
              const res = {
                amount: tokenValueConversion(balance.amount),
                validatorAddress: response.record.validator,
                denom: balance.denom,
                recordId: response.record.id,
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
            (filterItem) =>
              filterItem.validatorAddress === item.validatorAddress
          );
          console.log(newListCheck, "newListCheck");
          if (!newListCheck) {
            const uniqList = responseList.filter(
              (filterItem) =>
                filterItem.validatorAddress === item.validatorAddress
            );
            let total = 0;
            if (uniqList.length > 0) {
              uniqList.forEach((item) => {
                total += item.amount;
              });
            }
            newList.push({
              amount: total,
              validatorAddress: item.validatorAddress,
              list: uniqList
            });
          }
        });

      // const output =
      //   responseList.length > 0 &&
      //   responseList.reduce((accumulator, cur) => {
      //     let validatorAddress = cur.validatorAddress;
      //     let found = accumulator.find(
      //       (elem) => elem.validatorAddress === validatorAddress
      //     );
      //     // console.log(found, "response-found", cur);
      //     if (found) found.amount += cur.amount;
      //     else accumulator.push(cur);
      //     return accumulator;
      //   }, []);
      console.log(responseList, "response-tokenzied", newList);
      dispatch(fetchTokenizedSharesSuccess(newList));
    } catch (error) {
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
      console.log(error.message);
    }
  };
};
