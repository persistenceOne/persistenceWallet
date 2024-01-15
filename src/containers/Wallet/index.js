import React from "react";
import { OverlayTrigger, Popover, Tab, Tabs } from "react-bootstrap";
import Send from "../Transactions/Send/index";
import Receive from "./Receive";
import Transactions from "./TransactionsHistory/index";
import TokenInfo from "../Common/TokenInfo";
import InfoRefresh from "../Refresh";
import SendIbc from "../Transactions/SendIbc/index";
import Icon from "../../components/Icon";
import ModalWithdraw from "../Transactions/ModalWithDrawAllRewards";
import ModalSetWithdrawAddress from "../Transactions/ModalSetWithdrawAddress";
import FeeModal from "../Common/Fee/Modal";
import KeyStoreModal from "../Common/KeyStore/Modal";
import Loader from "../../components/Loader";
import ModalViewTxnResponse from "../Common/ModalViewTxnResponse";
import ReactGA from "react-ga4";
import BannerNotice from "../Common/banner-notice";

const Wallet = () => {
  const popoverMemo = (
    <Popover id="popover-memo">
      <Popover.Content>This is experimental feature right now.</Popover.Content>
    </Popover>
  );

  const ibcTitle = <p>IBC Send</p>;

  const onClick = (key) => {
    ReactGA.event({
      category: key,
      action: `Clicked on ${key} Tab`
    });
  };

  return (
    <>
      <Loader />
      <KeyStoreModal />
      <FeeModal />
      <ModalWithdraw />
      <ModalSetWithdrawAddress />
      <ModalViewTxnResponse />
      <div className="wallet-main-section">
        <BannerNotice />

        <TokenInfo />
        <div className="tabs-section">
          <Tabs
            defaultActiveKey="Send"
            id="uncontrolled-tab-example"
            onSelect={onClick}
          >
            <Tab eventKey="Send" title="Send">
              <Send />
            </Tab>
            <Tab eventKey="IBC" title={ibcTitle} tabClassName="ibc-tab">
              <SendIbc />
            </Tab>
            <Tab eventKey="Receive" title="Receive">
              <Receive />
            </Tab>
            <Tab eventKey="Transactions" title="Transactions">
              <Transactions />
            </Tab>
          </Tabs>
          <div>
            <InfoRefresh />
          </div>
        </div>
      </div>
    </>
  );
};
export default Wallet;
