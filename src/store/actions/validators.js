import {QueryClientImpl} from 'cosmjs-types/cosmos/staking/v1beta1/query';
import {QueryClientImpl as DistributionQueryClientImpl} from "cosmjs-types/cosmos/distribution/v1beta1/query";
import {
    FETCH_ACTIVE_VALIDATORS_SUCCESS,
    FETCH_DELEGATED_VALIDATORS_SUCCESS,
    FETCH_INACTIVE_VALIDATORS_SUCCESS,
    FETCH_VALIDATORS_ERROR,
    FETCH_VALIDATORS_IN_PROGRESS,
    FETCH_VALIDATORS_SUCCESS,
    SET_VALIDATOR_DELEGATIONS,
    SET_VALIDATOR_REWARDS,
    SET_VALIDATOR_TX_DATA,
    VALIDATOR_TX_MODAL_HIDE,
    VALIDATOR_TX_MODAL_SHOW
} from "../../constants/validators";
import Long from "long";

import helper, {tokenValueConversion} from "../../utils/helper";
import transactions from "../../utils/transactions";
import * as Sentry from "@sentry/browser";
import {decimalize, stringToNumber} from "../../utils/scripts";
import {DefaultChainInfo} from "../../config";

export const fetchValidatorsInProgress = () => {
    return {
        type: FETCH_VALIDATORS_IN_PROGRESS,
    };
};

export const fetchActiveValidatorsSuccess = (list) => {
    return {
        type: FETCH_ACTIVE_VALIDATORS_SUCCESS,
        list,
    };
};


export const fetchInactiveValidatorsSuccess = (list) => {
    return {
        type: FETCH_INACTIVE_VALIDATORS_SUCCESS,
        list,
    };
};

export const fetchTotalValidatorsSuccess = (list) => {
    return {
        type: FETCH_VALIDATORS_SUCCESS,
        list,
    };
};

export const fetchDelegatedValidators = (list) => {
    return {
        type: FETCH_DELEGATED_VALIDATORS_SUCCESS,
        list,
    };
};

export const fetchValidatorsError = (count) => {
    return {
        type: FETCH_VALIDATORS_ERROR,
        count,
    };
};

export const setValidatorTxData = (data) => {
    return {
        type: SET_VALIDATOR_TX_DATA,
        data,
    };
};

const validatorsDelegationSort = (validators, delegations) => {
    let delegatedValidators = [];
    validators.forEach((item) => {
        for (const data of delegations) {
            if (item.operatorAddress === data.delegation.validatorAddress) {
                let obj = {
                    'data': item,
                    'delegations': stringToNumber(data.balance.amount)
                };
                delegatedValidators.push(obj);
            }
        }
    });
    return delegatedValidators.sort(function (a, b) {
        return b.delegations - a.delegations;
    });
};

export const showValidatorTxModal = (data) => {
    return {
        type: VALIDATOR_TX_MODAL_SHOW,
        data,
    };
};

export const hideValidatorTxModal = (data) => {
    return {
        type: VALIDATOR_TX_MODAL_HIDE,
        data,
    };
};

export const fetchValidators = (address) => {
    return async dispatch => {
        try {
            dispatch(fetchValidatorsInProgress());
            const rpcClient = await transactions.RpcClient();

            const stakingQueryService = new QueryClientImpl(rpcClient);

            let key = new Uint8Array();
            let validators = [];

            do {
                const response = await stakingQueryService.Validators({
                    status: false,
                    pagination: {
                        key: key,
                        offset: Long.fromNumber(0, true),
                        limit: Long.fromNumber(0, true),
                        countTotal: true
                    }
                });
                key = response.pagination.nextKey;
                validators.push(...response.validators);
            } while (key.length !== 0);

            let activeValidators = [];
            let delegatedValidators = [];
            let inActiveValidators = [];
            validators.forEach((item) => {
                if (helper.isActive(item)) {
                    let activeValidatorsData = {
                        'data': item,
                        'delegations': 0
                    };
                    activeValidators.push(activeValidatorsData);
                } else {
                    let inActiveValidatorsData = {
                        'data': item,
                        'delegations': 0
                    };
                    inActiveValidators.push(inActiveValidatorsData);
                }
            });

            const delegationsResponse = await stakingQueryService.DelegatorDelegations({
                delegatorAddr: address,
            }).catch((error) => {
                Sentry.captureException(error.response
                    ? error.response.data.message
                    : error.message);
                console.log(error.response
                    ? error.response.data.message
                    : error.message);
            });

            if (delegationsResponse !== undefined && delegationsResponse.delegationResponses.length) {
                delegatedValidators = validatorsDelegationSort(validators, delegationsResponse.delegationResponses);
            } else {
                delegatedValidators = [];
            }

            dispatch(fetchDelegatedValidators(delegatedValidators));
            dispatch(fetchTotalValidatorsSuccess(validators));
            dispatch(fetchActiveValidatorsSuccess(activeValidators));
            dispatch(fetchInactiveValidatorsSuccess(inActiveValidators));
        } catch (error) {
            Sentry.captureException(error.response
                ? error.response.data.message
                : error.message);
            dispatch(fetchValidatorsError(error.response
                ? error.response.data.message
                : error.message));
            console.log(error.message);
        }

    };
};

export const setValidatorDelegations = (data) => {
    return {
        type: SET_VALIDATOR_DELEGATIONS,
        data,
    };
};

export const fetchValidatorDelegations = (address) => {
    return async (dispatch, getState) => {
        const validatorAddress = getState().validators.validator.value.operatorAddress;
        const rpcClient = await transactions.RpcClient();
        const stakingQueryService = new QueryClientImpl(rpcClient);
        await stakingQueryService.DelegatorDelegations({
            delegatorAddr: address,
        }).then(response => {
            let delegationResponseList = response.delegationResponses;
            for (const item of delegationResponseList) {
                if (item.delegation.validatorAddress === validatorAddress) {
                    dispatch(setValidatorDelegations({
                        value: tokenValueConversion(stringToNumber(item.balance.amount)),
                        status: true,
                        error: {
                            message: ''
                        }
                    }));
                }
            }
        }).catch(error => {
            Sentry.captureException(error.response
                ? error.response.data.message
                : error.message);
            console.log(error.response
                ? error.response.data.message
                : error.message);
        });
    };
};

export const setValidatorRewards = (data) => {
    return {
        type: SET_VALIDATOR_REWARDS,
        data,
    };
};

export const fetchValidatorRewards = (address, validatorAddress) => {
    return async (dispatch) => {
        const rpcClient = await transactions.RpcClient();
        const distributionQueryService = new DistributionQueryClientImpl(rpcClient);
        await distributionQueryService.DelegationRewards({
            delegatorAddress: address,
            validatorAddress: validatorAddress,
        }).then(response => {
            if (response.rewards) {
                for (const item of response.rewards) {
                    if(item && item.denom === DefaultChainInfo.currency.coinMinimalDenom){
                        let value = decimalize(item.amount);
                        const fixedRewards = stringToNumber(tokenValueConversion(value)).toFixed(6);
                        dispatch(setValidatorRewards({
                            value: fixedRewards,
                            error: {
                                message: ''
                            }
                        }));
                    }
                }
            }
        }).catch(error => {
            dispatch(setValidatorRewards({
                value: 0,
                error: {
                    message: ''
                }
            }));
            Sentry.captureException(error.response
                ? error.response.data.message
                : error.message);
            console.log(error.response
                ? error.response.data.message
                : error.message);
        });
    };
};