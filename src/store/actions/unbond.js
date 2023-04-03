import {
    UNBOND_DELEGATIONS_FETCH_ERROR,
    UNBOND_DELEGATIONS_FETCH_IN_PROGRESS,
    UNBOND_DELEGATIONS_FETCH_SUCCESS,
    UNBOND_DELEGATIONS_LIST
} from "../../constants/unbond";
import Lodash from "lodash";
import transactions from "../../utils/transactions";
import {QueryClientImpl} from "cosmjs-types/cosmos/staking/v1beta1/query";
import * as Sentry from "@sentry/browser";
import {tokenValueConversion} from "../../utils/helper";

export const fetchUnbondDelegationsProgress = () => {
    return {
        type: UNBOND_DELEGATIONS_FETCH_IN_PROGRESS,
    };
};
export const fetchUnbondDelegationsSuccess = (data) => {
    return {
        type: UNBOND_DELEGATIONS_FETCH_SUCCESS,
        data,
    };
};
export const fetchUnbondDelegationsError = (data) => {
    return {
        type: UNBOND_DELEGATIONS_FETCH_ERROR,
        data,
    };
};
export const fetchUnbondDelegationsList = (list) => {
    return {
        type: UNBOND_DELEGATIONS_LIST,
        list,
    };
};

export const fetchUnbondDelegations = (address) => {
    return async dispatch => {
        try {
            dispatch(fetchUnbondDelegationsProgress());
            const rpcClient = await transactions.RpcClient();
            const stakingQueryService = new QueryClientImpl(rpcClient);
            await stakingQueryService.DelegatorUnbondingDelegations({
                delegatorAddr: address,
            }).then((unbondingDelegationsResponse) => {
                if (unbondingDelegationsResponse.unbondingResponses.length) {
                    dispatch(fetchUnbondDelegationsList(unbondingDelegationsResponse.unbondingResponses));
                    const totalUnbond = Lodash.sumBy(unbondingDelegationsResponse.unbondingResponses, (item) => {
                        if (item.entries.length) {
                            return Lodash.sumBy(item.entries, (entry) => {
                                return parseInt(entry["balance"]);
                            });
                        }
                    });
                    dispatch(fetchUnbondDelegationsSuccess(tokenValueConversion(totalUnbond)));
                }
            }).catch((error) => {
                Sentry.captureException(error.response
                    ? error.response.data.message
                    : error.message);
                dispatch(fetchUnbondDelegationsError(error.response
                    ? error.response.data.message
                    : error.message));
            });
        }catch (error) {
            Sentry.captureException(error.response
                ? error.response.data.message
                : error.message);
            console.log(error.message);
        }
    };
};
