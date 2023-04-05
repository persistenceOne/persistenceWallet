import React, { useEffect, useState } from "react";
import { Icon } from "../../../../atoms/icon";
import { Spinner } from "../../../../atoms/spinner";

const AccountInfo = ({ accountResponse }: any) => {
  useEffect(() => {}, []);
  return (
    <>
      <div className="px-8 pt-8 md:px-6 md:pt-6">
        <p className="text-center text-light-high font-semibold text-2xl leading-normal">
          Account Details
        </p>
      </div>
      <div className="px-8 py-6">
        <p className="text-sm mb-2">
          As part of the Persistence v3 chain upgrade, the default coin-type was
          changed from 750 to 118, which means a new address (coin-type 118) was
          generated based on your KeyStore.
        </p>
        <div>
          <p className="text-left pt-0 pb-2">
            <span className="">New address: </span>
            {accountResponse?.coin118Data?.address}
          </p>
          <p className="text-left pt-0 pb-2">
            <span className="">Wallet path: </span>
            {accountResponse?.coin118Data?.walletPath}
          </p>
          <p className="text-left pt-0 pb-2">
            <span className="">Coin-type: </span>118{" "}
          </p>
          <p className="text-left p-0 d-flex align-items-center">
            <span className="m-0">Balance:&nbsp;</span>
            {true ? <Spinner size={"small"} /> : <>{123} XPRT</>}
          </p>
        </div>
        <div>
          <p className="text-left pt-0 pb-2">
            <span className="">Original address: </span>
            {accountResponse?.coin750Data?.address}
          </p>
          <p className="text-left pt-0 pb-2">
            <span className="">Wallet path: </span>
            {accountResponse?.coin118Data?.walletPath}
          </p>
          <p className="text-left pt-0 pb-2">
            <span className="">Coin-type: </span>750{" "}
          </p>
          <p className="text-left p-0 d-flex align-items-center">
            <span className="m-0">Balance:&nbsp;</span>
            {true ? <Spinner size={"small"} /> : <>{123} XPRT</>}
          </p>
        </div>
        <p>
          <b>Note: </b>Fungibility of assets is NOT impacted and both coin-types
          are still supported. Each address can hold assets, and assets can be
          transferred between account types. Read all details{" "}
        </p>
      </div>
    </>
  );
};

export default AccountInfo;
