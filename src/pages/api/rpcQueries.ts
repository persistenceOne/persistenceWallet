import {
  QueryAccountResponse,
  QueryClientImpl,
} from "cosmjs-types/cosmos/auth/v1beta1/query";
import { BaseAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";
import {
  getDelegatedValidatorsInfo,
  getStructuredList,
  RpcClient,
} from "../../helpers/rpc";
import {
  getChainFromDenom,
  getDenomFromMinimalDenom,
  persistenceChain,
} from "../../helpers/utils";
import {
  ContinuousVestingAccount,
  DelayedVestingAccount,
  PeriodicVestingAccount,
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

import {
  QueryClientImpl as DistributionQueryClient,
  QueryDelegationTotalRewardsResponse,
} from "cosmjs-types/cosmos/distribution/v1beta1/query";

import { getDecimalize, toDec, toPrettyCoin } from "../../helpers/coin";
import { Balances, emptyPrettyCoin } from "../../../store/slices/wallet";
import { defaultChain } from "../../helpers/utils";
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
  RewardsInfo,
  RewardsList,
  UnBondingList,
  UnBondingListInfo,
  ValidatorProps,
  ValidatorsInfo,
} from "../../helpers/types";
import { setupIbcExtension, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryDenomTraceResponse } from "cosmjs-types/ibc/applications/transfer/v1/query";
import { Coin } from "@cosmjs/proto-signing";
import { CoinPretty, Dec } from "@keplr-wallet/unit";
import Long from "long";
import { Validator } from "cosmjs-types/cosmos/staking/v1beta1/staking";
import moment from "moment";
import { useAppStore } from "../../../store/store";
import { DecCoin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { Decimal } from "@cosmjs/math";

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
    console.log(accountResponse, "accountResponse");
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
        console.log(accountData, "DELAYED_VESTING_ACCOUNT");
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
    console.log(response, "all balances");
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

          const denomResponse = getDenomFromMinimalDenom(
            denomTraceResponse.denomTrace?.baseDenom!
          );

          const chain = getChainFromDenom(
            denomTraceResponse.denomTrace?.baseDenom!
          );

          console.log(denomTraceResponse, "balance1");
          balanceList.push({
            minimalDenom: balance.denom,
            denom: denomResponse.denom,
            tokenUrl: denomResponse.tokenImg,
            denomTrace: denomTraceResponse!.denomTrace,
            amount: chain
              ? toPrettyCoin(
                  balance!.amount,
                  denomTraceResponse.denomTrace?.baseDenom!,
                  chain!.chainId
                )
              : balance.amount,
          });
        } else {
          const denomResponse = getDenomFromMinimalDenom(balance.denom);
          if (balance.denom === defaultChain.currency.coinMinimalDenom) {
            xprtBalance = balance;
          }
          const chain = getChainFromDenom(balance.denom);
          balanceList.push({
            minimalDenom: balance.denom,
            denom: denomResponse.denom,
            tokenUrl: denomResponse.tokenImg,
            amount: chain
              ? toPrettyCoin(balance!.amount, balance.denom!, chain!.chainId)
              : balance.amount,
          });
        }
      }
      const account: GetAccount = await getAccount(address);

      console.log(account, "GetAccount");
      if (account) {
        vestingAmount = account.vestingBalance;
        transferableAmount = await getTransferableAmount(
          address,
          account,
          xprtBalance!.amount
        );
      }

      // set default token select
      useAppStore
        .getState()
        .handleSendTxnToken(balanceList[0] ? balanceList[0] : null);

      // set default token select
      useAppStore
        .getState()
        .handleSendIbcTxnToken(balanceList[0] ? balanceList[0] : null);

      console.log(balanceList, "xprtBalance", balanceList[0].amount.toString());
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
      console.log(response, "responsev");
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
    console.log(delegationsResponse, "delegationsResponse");
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
    console.log(delegatedValidators, "delegatedValidators123");
    return {
      validators: getStructuredList(validators),
      activeValidators: getStructuredList(activeValidators),
      inActiveValidators: getStructuredList(inActiveValidators),
      delegatedValidators,
      totalDelegatedAmount: toPrettyCoin(
        totalDelegatedAmount.toString(),
        defaultChain.currency.coinMinimalDenom,
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
    let entries: UnBondingList[] = [];
    // entries.push({
    //   id: 0,
    //   completionTime: "29 Apr 2023 03:34 PM",
    //   balance: toPrettyCoin(
    //     "4",
    //     defaultChain.currency.coinDenom,
    //     persistenceChain!.chainId
    //   ),
    //   validatorAddress: "",
    // });
    if (unBondingResponse.unbondingResponses.length > 0) {
      unBondingResponse.unbondingResponses.forEach((item, index) => {
        item.entries.forEach((entry) => {
          entries.push({
            id: index + 1,
            completionTime: moment(
              entry["completionTime"]!.seconds.toNumber()! * 1000
            ).format("DD MMM YYYY hh:mm A"),
            balance: toPrettyCoin(
              entry.balance.toString(),
              defaultChain.currency.coinMinimalDenom,
              persistenceChain!.chainId
            ),
            validatorAddress: item.validatorAddress,
          });
          totalAmount += Number(entry.balance);
        });
      });
    }
    console.log(totalAmount, "totalAmount", entries);
    return {
      unBondingList: entries,
      totalAmount: toPrettyCoin(
        totalAmount.toString(),
        defaultChain.currency.coinMinimalDenom,
        persistenceChain!.chainId
      ),
    };
  } catch (e: any) {
    return {
      unBondingList: [],
      totalAmount: emptyPrettyCoin,
    };
  }
};

export const fetchRewardsList = async (
  rpc: string,
  address: string
): Promise<RewardsInfo> => {
  try {
    const rpcClient = await RpcClient(rpc);
    const distrQueryService = new DistributionQueryClient(rpcClient);

    const rewardsResponse: QueryDelegationTotalRewardsResponse =
      await distrQueryService.DelegationTotalRewards({
        delegatorAddress: address,
      });
    let rewardsList: RewardsList[] = [];
    rewardsResponse.rewards.length > 0 &&
      rewardsResponse.rewards.forEach((reward) => {
        const xprtReward = reward.reward.find(
          (item: DecCoin) =>
            item.denom == defaultChain.currency.coinMinimalDenom
        );
        const decimalize = getDecimalize(xprtReward!.amount, 18).toString();
        if (xprtReward) {
          rewardsList.push({
            validatorAddress: reward.validatorAddress,
            reward: {
              amount: toPrettyCoin(
                decimalize,
                defaultChain.currency.coinMinimalDenom,
                persistenceChain!.chainId
              ),
              denom: xprtReward.denom,
            },
          });
        }
      });

    const xprtTotalRewards: DecCoin | undefined =
      rewardsResponse.total.length > 0
        ? rewardsResponse.total.find(
            (item: DecCoin) =>
              item.denom == defaultChain.currency.coinMinimalDenom
          )
        : undefined;

    const decimalXprtTotalRewards = getDecimalize(
      xprtTotalRewards!.amount,
      18
    ).toString();

    return {
      rewardsList: rewardsList,
      totalAmount: toPrettyCoin(
        xprtTotalRewards ? decimalXprtTotalRewards : "0",
        defaultChain.currency.coinMinimalDenom,
        persistenceChain!.chainId
      ),
    };
  } catch (e: any) {
    return {
      rewardsList: [],
      totalAmount: emptyPrettyCoin,
    };
  }
};
