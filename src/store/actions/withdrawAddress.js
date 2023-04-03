import {FETCH_WITHDRAW_ADDRESS_ERROR, FETCH_WITHDRAW_ADDRESS_SUCCESS} from "../../constants/withdrawAddress";
import {QueryClientImpl} from "cosmjs-types/cosmos/distribution/v1beta1/query";
import transactions from "../../utils/transactions";
import * as Sentry from "@sentry/browser";

export const fetchAddressSuccess = (address) => {
    return {
        type: FETCH_WITHDRAW_ADDRESS_SUCCESS,
        address,
    };
};
export const fetchAddressError = (data) => {
    return {
        type: FETCH_WITHDRAW_ADDRESS_ERROR,
        data,
    };
};

export const fetchWithdrawAddress = (address) => {
    return async dispatch => {
        try {
            const rpcClient = await transactions.RpcClient();

            const stakingQueryService = new QueryClientImpl(rpcClient);
            await stakingQueryService.DelegatorWithdrawAddress({
                delegatorAddress: address,
            }).then((res) => {
                if (res.withdrawAddress) {
                    dispatch(fetchAddressSuccess(res.withdrawAddress));
                }
            }).catch((error) => {
                Sentry.captureException(error.response
                    ? error.response.data.message
                    : error.message);
                dispatch(fetchAddressError(error.response
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
