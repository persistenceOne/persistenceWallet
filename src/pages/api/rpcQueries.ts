import {
  QueryAccountResponse,
  QueryClientImpl,
} from "cosmjs-types/cosmos/auth/v1beta1/query";
import { BaseAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";
import { RpcClient } from "../../helpers/rpc";
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
import { BalanceList, GetAccount } from "../../helpers/types";
import { setupIbcExtension, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryDenomTraceResponse } from "cosmjs-types/ibc/applications/transfer/v1/query";
import { Coin } from "@cosmjs/proto-signing";

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
      let transferableAmount = 0;
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
          Number(xprtBalance!.amount!)
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

export const fetchVestingBalance = async (rpc: string, address: string) => {
  try {
    const account: GetAccount = await getAccount(address);
    // if (account) {
    //   const transferrableAmount = getTransferableVestingAmount(
    //     address,
    //     account,
    //   );
    // }
  } catch (e: any) {
    console.log(e.message, "error in fetchAllBalances");
  }
};
