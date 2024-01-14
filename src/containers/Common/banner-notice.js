import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchDelegationsCount } from "../../store/actions/delegations";
import { fetchTransferableVestingAmount } from "../../store/actions/balance";
import { fetchRewards, fetchTotalRewards } from "../../store/actions/rewards";
import { fetchUnbondDelegations } from "../../store/actions/unbond";
import { fetchTokenPrice } from "../../store/actions/tokenPrice";
import { useTranslation } from "react-i18next";
import ModalViewUnbondDetails from "./ModalViewUnbondDetails";
import ModalViewVestingDetails from "./ModalViewVestingDetails";
import ModalViewAmountDetails from "./ModalVIewAmountDetails";
import Icon from "../../components/Icon";
import { Dropdown, OverlayTrigger, Popover } from "react-bootstrap";
import ModalViewDelegationDetails from "./ModalViewDelegationDetails";
import { fetchValidators } from "../../store/actions/validators";
import NumberView from "../../components/NumberView";
import { decimalize, formatNumber, stringTruncate } from "../../utils/scripts";
import { showTxWithDrawTotalModal } from "../../store/actions/transactions/withdrawTotalRewards";
import ReactGA from "react-ga4";
import { DefaultChainInfo, PstakeInfo } from "../../config";
import { LOGIN_INFO } from "../../constants/localStorage";
import { keyStoreLogin } from "../../store/actions/signIn/keyStore";
import { useHistory } from "react-router-dom";
import Copy from "../../components/Copy";
import ModalMigrateBalance from "../Transactions/ModalMigrateBalance";
import { tokenValueConversion } from "../../utils/helper";
import { setTxMigrateTokens } from "../../store/actions/transactions/migrateAssets";

const BannerNotice = () => {
  const [banner, setBanner] = useState(true);
  const closeBanner = () => {
    setBanner(false);
  };
  return (
    <div className={!banner ? "d-none" : "notice-banner-section container"}>
      <div className={"notice-banner"}>
        <div className="content">
          <div className={"left"}>
            <p className={"title-text"}>
              Important: For users affected by geo-blocking
            </p>
            <p className={"sub-text"}>
              Users affected by geo-blocking are suggested to transfer their
              tokens to a new Keplr, Cosmostation, or Leap wallet.{" "}
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
