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
  if (countries.includes(country)) {
    return (
      <div className={"top-banner-section"}>
        <p style={{ color: "#FFFFFF", fontSize: "12px", margin: "0" }}>
          <b>IMPORTANT NOTICE:</b> Please note that from 15 January 2024,
          applications on the persistence.one domain will no longer be
          accessible from your location. See more details{" "}
          <a
            className="content"
            href="https://geofence-notice.pages.dev/?ref=persistence"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline", color: "#FFFFFF" }}
          >
            here.
          </a>
        </p>
      </div>
    );
  }
  return (
    <div className={!banner ? "d-none" : "top-banner-section"}>
      <a
        className="content"
        href=" https://blog.persistence.one/2022/07/14/coin-type-migration-from-750-to-118-for-persistence-core-1-chain-xprt/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <b>Note:</b> as part of the Persistence v3 chain upgrade, the default
        coin-type was changed from 750 to 118. Read all about it here.
        <Icon viewClass="right-arrow" icon="right-arrow" />
      </a>
      <div onClick={closeBanner}>
        <Icon viewClass="close" icon="close" />
      </div>
    </div>
  );
};

export default Banner;
