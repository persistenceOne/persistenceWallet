import {
    BALANCE_FETCH_ERROR,
    BALANCE_FETCH_IN_PROGRESS,
    BALANCE_FETCH_SUCCESS,
    BALANCE_LIST_FETCH_SUCCESS,
    TOKEN_LIST_FETCH_SUCCESS,
    TRANSFERABLE_BALANCE_LIST_FETCH_SUCCESS,
    VESTING_BALANCE_FETCH_SUCCESS
} from "../../constants/balance";
import vestingAccount from "../../utils/vestingAmount";
import transactions from "../../utils/transactions";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {createProtobufRpcClient, QueryClient, setupIbcExtension} from "@cosmjs/stargate";
import {QueryClientImpl} from "cosmjs-types/cosmos/bank/v1beta1/query";
import * as Sentry from '@sentry/browser';
import {stringToNumber} from "../../utils/scripts";
import {getAccount, tokenValueConversion} from "../../utils/helper";
import {DefaultChainInfo} from "../../config";

const tendermintRPCURL = process.env.REACT_APP_TENDERMINT_RPC_ENDPOINT;

export const fetchBalanceProgress = () => {
    return {
        type: BALANCE_FETCH_IN_PROGRESS,
    };
};
export const fetchBalanceSuccess = (data) => {
    return {
        type: BALANCE_FETCH_SUCCESS,
        data,
    };
};
export const fetchBalanceError = (data) => {
    return {
        type: BALANCE_FETCH_ERROR,
        data,
    };
};

export const fetchBalanceListSuccess = (list) => {
    return {
        type: BALANCE_LIST_FETCH_SUCCESS,
        list,
    };
};

export const fetchBalance = (address) => {
    return async dispatch => {
        dispatch(fetchBalanceProgress());
        try {
            const rpcClient = await transactions.RpcClient();
            const bankQueryService = new QueryClientImpl(rpcClient);
            await bankQueryService.AllBalances({
                address: address,
            }).then((allBalancesResponse) => {
                if (allBalancesResponse.balances.length) {
                    dispatch(fetchBalanceListSuccess(allBalancesResponse.balances));
                    allBalancesResponse.balances.forEach((item) => {
                        if (item.denom === DefaultChainInfo.currency.coinMinimalDenom) {
                            const totalBalance = stringToNumber(item.amount);
                            dispatch(fetchBalanceSuccess(tokenValueConversion(totalBalance)));
                        }
                    });
                }
            }).catch((error) => {
                Sentry.captureException(error.response
                    ? error.response.data.message
                    : error.message);
                dispatch(fetchBalanceError(error.response
                    ? error.response.data.message
                    : error.message));
            });
        } catch (error) {
            Sentry.captureException(error.response
                ? error.response.data.message
                : error.message);
            console.log(error.message);
        }
    };
};

export const fetchTransferableBalanceSuccess = (data) => {
    return {
        type: TRANSFERABLE_BALANCE_LIST_FETCH_SUCCESS,
        data,
    };
};

export const fetchVestingBalanceSuccess = (data) => {
    return {
        type: VESTING_BALANCE_FETCH_SUCCESS,
        data,
    };
};

export const fetchTokenListSuccess = (list) => {
    return {
        type: TOKEN_LIST_FETCH_SUCCESS,
        list,
    };
};

export const fetchTransferableVestingAmount = (address) => {
    return async dispatch => {
        try {
            getAccount(address).then(async vestingAmountData => {
                const currentEpochTime = Math.floor(new Date().getTime() / 1000);
                let vestingAmount = 0;
                let transferableAmount = 0;
                if (vestingAmountData !== undefined) {
                    const tendermintClient = await Tendermint34Client.connect(tendermintRPCURL);
                    const queryClient = new QueryClient(tendermintClient);
                    const rpcClient = createProtobufRpcClient(queryClient);
                    const stakingQueryService = new QueryClientImpl(rpcClient);
                    await stakingQueryService.AllBalances({
                        address: address,
                    }).then(async (response) => {
                        if (response.balances.length) {
                            let tokenList = [];
                            for (let i = 0; i < response.balances.length; i++) {
                                let item = response.balances[i];
                                if (item.denom === DefaultChainInfo.currency.coinMinimalDenom) {
                                    item.ibcBalance = false;
                                    tokenList.push(item);
                                    vestingAmount = tokenValueConversion(vestingAccount.getAccountVestingAmount(vestingAmountData, currentEpochTime));
                                    const balance = tokenValueConversion(stringToNumber(item.amount));
                                    transferableAmount = await vestingAccount.getTransferableVestingAmount(address, balance);
                                    dispatch(fetchTransferableBalanceSuccess(transferableAmount[1]));
                                    dispatch(fetchVestingBalanceSuccess(vestingAmount));
                                } else {
                                    let denomText = item.denom.substr(item.denom.indexOf('/') + 1);
                                    const ibcExtension = setupIbcExtension(queryClient);
                                    let ibcDenomeResponse = await ibcExtension.ibc.transfer.denomTrace(denomText);

                                    let transeDenomData = {
                                        denom:item.denom,
                                        denomTrace: ibcDenomeResponse.denomTrace,
                                        amount: item.amount,
                                        ibcBalance: true,
                                    };
                                    tokenList.push(transeDenomData);
                                }
                            }
                            dispatch(fetchTokenListSuccess(tokenList));
                        }else {
                            dispatch(fetchTransferableBalanceSuccess(0));
                            dispatch(fetchVestingBalanceSuccess(0));
                            dispatch(fetchTokenListSuccess([]));
                        }
                    }).catch((error) => {
                        Sentry.captureException(error.response
                            ? error.response.data.message
                            : error.message);
                        dispatch(fetchBalanceError(error.response
                            ? error.response.data.message
                            : error.message));
                    });
                }
            }).catch(error => {
                Sentry.captureException(error.response
                    ? error.response.data.message
                    : error.message);
                console.log(error);
            });
        } catch (error) {
            Sentry.captureException(error.response
                ? error.response.data.message
                : error.message);
            console.log(error.message);
        }
    };
};
