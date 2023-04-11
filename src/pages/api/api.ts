import Axios from "axios";

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
