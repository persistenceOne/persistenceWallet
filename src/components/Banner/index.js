import React, { useEffect, useState } from "react";
import Icon from "../Icon";
import { useSelector } from "react-redux";

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
  "CA",
  "IN"
];
const Banner = () => {
  const unbond = useSelector((state) => state.unbond.unbond);
  const [banner, setBanner] = useState(false);
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

  useEffect(() => {
    if (unbond > 0) {
      setBanner(true);
    }
  }, [unbond]);

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
      </div>
    );
  }
  return (
    <div>
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
