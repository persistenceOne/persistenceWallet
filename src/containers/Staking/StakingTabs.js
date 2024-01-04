import React, { useEffect, useState } from "react";
import Validators from "./Validators";
import DelegatedValidators from "./Validators/DelegatedValidators";
import { Nav, Tab } from "react-bootstrap";
import InfoRefresh from "../Refresh";
import { useTranslation } from "react-i18next";
import TokenizedShares from "./Validators/TokenizedShares";
import { useSelector } from "react-redux";

const StakingTabs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("delegated");
  const delegations = useSelector((state) => state.delegations.count);

  useEffect(() => {
    if (Number(delegations) > 0) {
      setActiveTab("delegated");
    } else {
      setActiveTab("all");
    }
  }, [delegations]);

  console.log(activeTab, "activeTab--11");
  const onClick = (name) => {
    setActiveTab(name);
  };

  return (
    <div className="validators-section">
      <div className="txns-container">
        <Tab.Container id="lrr" activeKey={activeTab} onSelect={onClick}>
          <div className="tab-header main-header">
            <div className="info">
              <div className="left">
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="all" onClick={() => onClick("all")}>
                      {t("ALL_VALIDATORS")}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="delegated"
                      onClick={() => onClick("delegated")}
                    >
                      My staked XPRT
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="tokenized-shares"
                      onClick={() => onClick("tokenized-shares")}
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
  );
};
export default StakingTabs;
