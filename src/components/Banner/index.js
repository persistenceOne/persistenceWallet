import React, { useEffect, useState } from "react";
import Icon from "../Icon";

const countries = [
  "BB",
  "BF",
  "CM",
  "CD",
  "CG",
  "GI",
  "HT",
  "IR",
  "JM",
  "KP",
  "ML",
  "MZ",
  "MM",
  "SN",
  "SS",
  "SY",
  "TZ",
  "UG",
  "YE",
  "UM",
  "US",
  "GB",
  "CU",
  "CA"
];
const Banner = () => {
  const [banner, setBanner] = useState(true);
  const [bannerOne, setBannerOne] = useState(true);
  const workerUrl = "https://worker-geofence.auditdev.workers.dev/";
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetch(workerUrl)
      .then((response) => response.json())
      .then((data) => {
        setCountry(data.country);
      })
      .catch((error) => console.error("Error fetching country:", error));
  }, [workerUrl]);

  const closeBanner = () => {
    setBanner(false);
  };

  const closeBannerOne = () => {
    setBannerOne(false);
  };

  if (countries.includes(country)) {
    return (
      <div>
        <div className={"top-banner-section initial-banner"}>
          <p className="content">
            <b>IMPORTANT NOTICE:</b> Please note that from 1 February 2024,
            applications on the persistence.one domain will no longer be
            accessible from your location. See more details{" "}
            <a
              href="https://geofence-notice.pages.dev/?ref=persistence"
              target="_blank"
              className={"link"}
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", color: "#FFFFFF" }}
            >
              here.
            </a>
          </p>
        </div>
        <div className={!bannerOne ? "d-none" : "top-banner-section"}>
          <p className="content">
            Users being affected by geo-blocking can continue to access their
            tokens via Keplr, Cosmostation, or Leap wallet. Learn more{" "}
            <a
              className={"link"}
              href="https://blog.persistence.one/2023/12/28/how-to-transfer-staked-xprt-from-pwallet-to-keplr-leap-wallet-instantly/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here.
            </a>
          </p>
          <div onClick={closeBannerOne}>
            <Icon viewClass="close" icon="close" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div
        className={!bannerOne ? "d-none" : "top-banner-section initial-banner"}
      >
        <p className="content">
          Users being affected by geo-blocking can continue to access their
          tokens via Keplr, Cosmostation, or Leap wallet. Learn more{" "}
          <a
            className={"link"}
            href="https://blog.persistence.one/2023/12/28/how-to-transfer-staked-xprt-from-pwallet-to-keplr-leap-wallet-instantly/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here.
          </a>
        </p>
        <div onClick={closeBannerOne}>
          <Icon viewClass="close" icon="close" />
        </div>
      </div>
      <div className={!banner ? "d-none" : "top-banner-section"}>
        <p className="content">
          You can now cancel your XPRT unbonding process at any time using
          pWallet. Read more{" "}
          <a
            className="link"
            href="https://blog.persistence.one/2023/12/31/how-to-cancel-xprt-unstaking-on-pwallet-and-keplr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here.
          </a>
        </p>
        <div onClick={closeBanner}>
          <Icon viewClass="close" icon="close" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
