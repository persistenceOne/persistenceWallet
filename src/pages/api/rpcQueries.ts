import {
  QueryAccountResponse,
  QueryClientImpl,
} from "cosmjs-types/cosmos/auth/v1beta1/query";
import { BaseAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";
import { getDelegatedValidatorsInfo, RpcClient } from "../../helpers/rpc";
import { persistenceChain } from "../../helpers/utils";
import {
  ContinuousVestingAccount,
  DelayedVestingAccount,
  PeriodicVestingAccount,
  BaseVestingAccount,
} from "cosmjs-types/cosmos/vesting/v1beta1/vesting";

import {
  QueryAllBalancesResponse,
  QueryClientImpl as BankQueryClient,
} from "cosmjs-types/cosmos/bank/v1beta1/query";
import {
  QueryClientImpl as StakingQueryClient,
  QueryDelegatorDelegationsResponse,
  QueryDelegatorUnbondingDelegationsResponse,
  QueryValidatorsResponse,
} from "cosmjs-types/cosmos/staking/v1beta1/query";
import { toPrettyCoin } from "../../helpers/coin";
import { Balances, emptyPrettyCoin } from "../../../store/slices/wallet";
import { DefaultChainInfo } from "../../helpers/config";
import {
  BASE_ACCOUNT,
  CONTINUOUS_VESTING_ACCOUNT,
  DELAYED_VESTING_ACCOUNT,
  PERIODIC_VESTING_ACCOUNT,
} from "../../../appConstants";
import {
  getContinuousVestingAmount,
  getDelayedVestingAmount,
  getPeriodicVestingAmount,
  getTransferableAmount,
} from "../../helpers/vestingAmount";
import {
  BalanceList,
  GetAccount,
  GetDelegatedValidatorInfo,
  UnBondingListInfo,
  ValidatorsInfo,
} from "../../helpers/types";
import { setupIbcExtension, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryDenomTraceResponse } from "cosmjs-types/ibc/applications/transfer/v1/query";
import { Coin } from "@cosmjs/proto-signing";
import { Dec } from "@keplr-wallet/unit";
import Long from "long";
import {
  UnbondingDelegationEntry,
  Validator,
} from "cosmjs-types/cosmos/staking/v1beta1/staking";
import { Timestamp } from "cosmjs-types/google/protobuf/timestamp";
import moment from "moment";

const currentEpochTime = Math.floor(new Date().getTime() / 1000);

export const getAccount = async (address: string): Promise<GetAccount> => {
  try {
    const rpcClient = await RpcClient(persistenceChain!.rpc);
    const authAccountService = new QueryClientImpl(rpcClient);
    const accountResponse: QueryAccountResponse =
      await authAccountService.Account({
        address: address,
      });
    let typeUrl: string = " ";
    let accountData: any = null;
    let vestingBalance: any = 0;
    switch (accountResponse.account!.typeUrl) {
      case BASE_ACCOUNT:
        typeUrl = accountResponse.account?.typeUrl!;
        accountData = BaseAccount.decode(accountResponse.account!.value);
        console.log(accountData, "accountData");
        vestingBalance = 0;
        break;
      case PERIODIC_VESTING_ACCOUNT:
        typeUrl = accountResponse.account?.typeUrl!;
        accountData = PeriodicVestingAccount.decode(
          accountResponse.account!.value
        );
        vestingBalance = getPeriodicVestingAmount(
          accountData,
          currentEpochTime
        );
        break;
      case DELAYED_VESTING_ACCOUNT:
        typeUrl = accountResponse.account?.typeUrl!;
        accountData = DelayedVestingAccount.decode(
          accountResponse.account!.value
        );
        vestingBalance = getDelayedVestingAmount(accountData, currentEpochTime);
        break;
      case CONTINUOUS_VESTING_ACCOUNT:
        typeUrl = accountResponse.account?.typeUrl!;
        accountData = ContinuousVestingAccount.decode(
          accountResponse.account!.value
        );
        vestingBalance = getContinuousVestingAmount(
          accountData,
          currentEpochTime
        );
        break;
      default:
        break;
    }
    return {
      typeUrl: typeUrl,
      accountData: accountData,
      vestingBalance: vestingBalance,
    };
  } catch (error: any) {
    console.log(error.message, "getAccount");
    return {
      typeUrl: "",
      accountData: null,
      vestingBalance: 0,
    };
  }
};

export const fetchAllBalances = async (
  rpc: string,
  address: string
): Promise<Balances> => {
  try {
    const rpcClient = await RpcClient(rpc);
    const tendermintClient = await Tendermint34Client.connect(rpc);
    const queryClient = new QueryClient(tendermintClient);
    const bankQueryService = new BankQueryClient(rpcClient);
    const response: QueryAllBalancesResponse =
      await bankQueryService.AllBalances({
        address: address,
      });
    if (response.balances.length) {
      let balanceList: BalanceList[] = [];
      let xprtBalance: Coin;
      let vestingAmount = 0;
      let transferableAmount: Dec = new Dec("0");
      for (const balance of response.balances) {
        // check fot ibc balance
        if (
          !persistenceChain!.currencies.some(
            (currency) => currency.coinMinimalDenom === balance.denom
          )
        ) {
          // fetch ibc denom trace
          let denomText = balance.denom.substring(
            balance.denom.indexOf("/") + 1
          );
          const ibcExtension = setupIbcExtension(queryClient);
          let denomTraceResponse: QueryDenomTraceResponse =
            await ibcExtension.ibc.transfer.denomTrace(denomText);
          balanceList.push({
            denom: balance.denom,
            denomTrace: denomTraceResponse!.denomTrace,
            amount: balance.amount,
          });
        } else {
          if (balance.denom === DefaultChainInfo.currency.coinMinimalDenom) {
            xprtBalance = balance;
          }
          balanceList.push({
            denom: balance.denom,
            amount: balance.amount,
          });
        }
      }
      const account: GetAccount = await getAccount(address);
      if (account) {
        vestingAmount = account.vestingBalance;
        transferableAmount = await getTransferableAmount(
          address,
          account,
          xprtBalance!.amount
        );
      }
      return {
        totalXprt: toPrettyCoin(
          xprtBalance!.amount,
          xprtBalance!.denom,
          persistenceChain!.chainId
        ),
        allBalances: balanceList,
        transferableAmount: toPrettyCoin(
          transferableAmount.toString(),
          xprtBalance!.denom,
          persistenceChain!.chainId
        ),
        vestingAmount: toPrettyCoin(
          vestingAmount.toString(),
          xprtBalance!.denom,
          persistenceChain!.chainId
        ),
      };
    }
    return {
      totalXprt: emptyPrettyCoin,
      allBalances: [],
      vestingAmount: emptyPrettyCoin,
      transferableAmount: emptyPrettyCoin,
    };
  } catch (e: any) {
    console.log(e.message, "error in fetchAllBalances");
    return {
      totalXprt: emptyPrettyCoin,
      allBalances: [],
      vestingAmount: emptyPrettyCoin,
      transferableAmount: emptyPrettyCoin,
    };
  }
};

export const fetchValidatorsInfo = async (
  rpc: string,
  address: string
): Promise<ValidatorsInfo> => {
  try {
    const rpcClient = await RpcClient(rpc);
    const stakingQueryService = new StakingQueryClient(rpcClient);
    let key = new Uint8Array();
    let validators: Validator[] = [];
    do {
      const response: QueryValidatorsResponse =
        await stakingQueryService.Validators({
          status: "",
          pagination: {
            key: key,
            offset: Long.fromNumber(0, true),
            limit: Long.fromNumber(0, true),
            countTotal: true,
            reverse: false,
          },
        });
      key = response!.pagination!.nextKey;
      validators.push(...response.validators);
    } while (key.length !== 0);

    const activeValidators = validators.filter(
      (validator) => !validator.jailed && validator.status === 3
    );
    const inActiveValidators = validators.filter(
      (validator) => validator.jailed || validator.status !== 3
    );

    const delegationsResponse: QueryDelegatorDelegationsResponse =
      await stakingQueryService.DelegatorDelegations({
        delegatorAddr: address,
      });

    let delegatedValidators: GetDelegatedValidatorInfo[] = [];
    let totalDelegatedAmount = 0;
    if (delegationsResponse.delegationResponses.length > 0) {
      delegatedValidators = await getDelegatedValidatorsInfo(
        validators,
        delegationsResponse.delegationResponses
      );

      totalDelegatedAmount = delegationsResponse.delegationResponses.reduce(
        (accumulator, object) => {
          return accumulator + Number(object.balance?.amount);
        },
        0
      );
    }
    return {
      validators: validators,
      activeValidators: activeValidators,
      inActiveValidators: inActiveValidators,
      delegatedValidators,
      totalDelegatedAmount: toPrettyCoin(
        totalDelegatedAmount.toString(),
        DefaultChainInfo.currency.coinDenom,
        persistenceChain!.chainId
      ),
    };
  } catch (e: any) {
    return {
      validators: [],
      activeValidators: [],
      inActiveValidators: [],
      delegatedValidators: [],
      totalDelegatedAmount: emptyPrettyCoin,
    };
  }
};

export const fetchUnBondingList = async (
  rpc: string,
  address: string
): Promise<UnBondingListInfo> => {
  try {
    const rpcClient = await RpcClient(rpc);
    const stakingQueryService = new StakingQueryClient(rpcClient);
    const unBondingResponse: QueryDelegatorUnbondingDelegationsResponse =
      await stakingQueryService.DelegatorUnbondingDelegations({
        delegatorAddr: address,
      });
    console.log(unBondingResponse, "unBondingResponse");
    let totalAmount: number = 0;
    let entries: { completionTime?: any; balance: string }[] = [];
    if (unBondingResponse.unbondingResponses.length > 0) {
      unBondingResponse.unbondingResponses.forEach((item) => {
        item.entries.forEach((entry) => {
          entries.push({
            completionTime: moment(
              entry["completionTime"]!.seconds.toNumber()! * 1000
            ).format("DD MMM YYYY hh:mm A"),
            balance: entry.balance,
          });
          totalAmount += Number(entry.balance);
        });
      });
    }
    console.log(totalAmount, "totalAmount", entries);
    return {
      unBondingList: entries,
      totalAmount,
    };
  } catch (e: any) {
    return {
      unBondingList: [],
      totalAmount: 0,
    };
  }
};
