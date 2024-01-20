import React, { useEffect, useState } from "react";
import Icon from "../../components/Icon";

const BannerNotice = () => {
  const [banner, setBanner] = useState(true);
  const closeBanner = () => {
    setBanner(false);
  };
  return (
    <div className={!banner ? "d-none" : "notice-banner-section"}>
      <div className={"notice-banner"}>
        <div className="content">
          <div className={"left"}>
            <p className={"title-text"}>
              Important: For users affected by geo-blocking
            </p>
            <p className={"sub-text"}>
              Users affected by geo-blocking are suggested to transfer their
              tokens to a new Keplr, Leap wallet.{" "}
            </p>
          </div>
          <div className={"right"}>
            <a
              className="link"
              href="https://blog.persistence.one/2023/12/28/how-to-transfer-staked-xprt-from-pwallet-to-keplr-leap-wallet-instantly/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn how to transfer staked XPRT
            </a>
          </div>
        </div>
        <div onClick={closeBanner}>
          <Icon viewClass="close" icon="close" />
        </div>
      </div>
    </div>
  );
};

export default BannerNotice;
