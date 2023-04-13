import Axios from "axios";
import { toPrettyCoin } from "../../helpers/coin";
export const XPRT_PRICE_URL =
  "https://api.coingecko.com/api/v3/coins/persistence";

export const getAvatar = async (identity: string) => {
  try {
    const urlLink =
      "https://keybase.io/_/api/1.0/user/lookup.json" +
      `?key_suffix=${identity}&fields=pictures`;
    const res = await Axios.get(urlLink);
    const url = res?.data?.them[0]?.pictures?.primary?.url;
    if (url) {
      return url;
    }
    return "/images/profile.svg"; // return profile icon if url not exists
  } catch (e) {
    return "/images/profile.svg";
  }
};

export const fetchXPRTPrice = async (): Promise<number> => {
  try {
    const res = await Axios.get(XPRT_PRICE_URL);
    if (res && res.data) {
      console.log(res.data.market_data.current_price.usd, "TEstig");
      return res.data.market_data.current_price.usd;
    }
    return 0;
  } catch (e) {
    return 0;
  }
};
