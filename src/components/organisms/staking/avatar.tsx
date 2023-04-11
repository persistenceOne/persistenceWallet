import * as PropTypes from "prop-types";
import Axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  identity: any;
  validatorName: any;
}
const Avatar = ({ identity, validatorName }: Props) => {
  const [avatarURL, setAvatarURL] = useState("");

  useEffect(() => {
    if (identity === "") {
      setAvatarURL("");
      return;
    }

    const url =
      "https://keybase.io/_/api/1.0/user/lookup.json" +
      `?key_suffix=${identity}&fields=pictures`;

    const getAvatar = async () => {
      await Axios.get(url)
        .then((res) => {
          const url = res?.data?.them[0]?.pictures?.primary?.url;
          if (url) {
            setAvatarURL(url);
          }
        })
        .catch(console.error);
    };
    getAvatar();
  }, [identity]);

  return avatarURL ? (
    <img
      alt="moniker-image"
      className="w-[34px] h-[34px] rounded-full"
      src={avatarURL}
    />
  ) : (
    <div
      className={
        "w-[34px] h-[34px] bg-red flex items-center justify-center rounded-full"
      }
    >
      <span className="text-light-mid text-base">
        {validatorName.substring(0, 1)}
      </span>
    </div>
  );
};

Avatar.propTypes = {
  identity: PropTypes.string.isRequired,
};

export default Avatar;
