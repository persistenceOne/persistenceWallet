import React from "react";
import TokenInfo from "../Common/TokenInfo";
import Validators from "./Validators";
import DelegatedValidators from "./Validators/DelegatedValidators";
import { Nav, Tab } from "react-bootstrap";
import InfoRefresh from "../Refresh";
import { useTranslation } from "react-i18next";
import ModalValidator from "./Validators/ModalValidator";
import ModalDelegate from "../Transactions/ModalDelegate";
import ModalTokenize from "../Transactions/ModalTokenize";
import FeeModal from "../Common/Fee/Modal";
import KeyStoreModal from "../Common/KeyStore/Modal";
import ModalViewTxnResponse from "../Common/ModalViewTxnResponse";
import ModalReDelegate from "../Transactions/ModalReDelegate";
import ModalUnbond from "../Transactions/ModalUnbond";
import ModalValidatorWithdraw from "../Transactions/ModalWithdrawValidatorRewards";
import ModalWithDraw from "../Transactions/ModalWithDrawAllRewards";
import ModalSetWithdrawAddress from "../Transactions/ModalSetWithdrawAddress";
import Loader from "../../components/Loader";
import ReactGA from "react-ga4";
import TokenizedShares from "./Validators/TokenizedShares";
import ModalRedeemShares from "../Transactions/ModalRedeemShares";
import ModalTransferShares from "../Transactions/ModalTransferShares";

const Staking = () => {
  const { t } = useTranslation();

  const onClick = (name) => {
    ReactGA.event({
      category: `${name} Validators`,
      action: `Clicked on ${name} Validators`
    });
  };

  return (
    <div className="staking-main-section">
      <Loader />
      <ModalValidator />
      <ModalDelegate />
      <ModalReDelegate />
      <ModalRedeemShares />
      <ModalTransferShares />
      <ModalTokenize />
      <TokenInfo />
      <FeeModal />
      <KeyStoreModal />
      <ModalUnbond />
      <ModalWithDraw />
      <ModalViewTxnResponse />
      <ModalValidatorWithdraw />
      <ModalSetWithdrawAddress />
      <div className="validators-section">
        <div className="txns-container">
          <Tab.Container id="lrr" defaultActiveKey="all" onSelect={onClick}>
            <div className="tab-header main-header">
              <div className="info">
                <div className="left">
                  <Nav variant="pills">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="all"
                        onClick={() => onClick(t("ALL_VALIDATORS"))}
                      >
                        {t("ALL_VALIDATORS")}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="delegated"
                        onClick={() => onClick(t("DELEGATED"))}
                      >
                        {t("DELEGATED")}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="tokenized-shares"
                        onClick={() => onClick(t("tokenized-shares"))}
                      >
                        Tokenized Shares
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
                <div>
                  <InfoRefresh />
                </div>
              </div>
            </div>
            <Tab.Content className="main-tab-content">
              <Tab.Pane eventKey="all">
                <Validators />
              </Tab.Pane>
              <Tab.Pane eventKey="delegated">
                <DelegatedValidators />
              </Tab.Pane>
              <Tab.Pane eventKey="tokenized-shares">
                <TokenizedShares />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};
export default Staking;
