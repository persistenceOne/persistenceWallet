import {TOKEN_PRICE_FETCH_ERROR, TOKEN_PRICE_FETCH_SUCCESS,} from "../../constants/tokenPrice";
import CoinGecko from 'coingecko-api';
import * as Sentry from "@sentry/browser";
import Axios from "axios";
export const COIN_GECKO_URL = "https://api.coingecko.com/api/v3/coins/persistence";

export const fetchTokenPriceSuccess = (data) => {
    return {
        type: TOKEN_PRICE_FETCH_SUCCESS,
        data,
    };
};
export const fetchTokenPriceError = (data) => {
    return {
        type: TOKEN_PRICE_FETCH_ERROR,
        data,
    };
};

export const fetchTokenPrice = () => (dispatch) => {
    console.log("coin-gecko, fetchTokenPrice")
    Axios.get(COIN_GECKO_URL).then((res) => {
        console.log(res, "coin-gecko");
        if (res && res.data) {
            dispatch(fetchTokenPriceSuccess(res.data.market_data.current_price.usd));
        }
    }).catch((error) => {
        console.log(error, "coin-gecko");
        Sentry.captureException(error.response
            ? error.response.data.message
            : error.message);
        dispatch(fetchTokenPriceError(error.response
            ? error.response.data.message
            : error.message));
    });
};
