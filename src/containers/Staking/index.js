import React from "react";
import TokenInfo from "../Common/TokenInfo";
import Validators from "./Validators";
import DelegatedValidators from "./Validators/DelegatedValidators";
import {Nav, Tab} from "react-bootstrap";
import InfoRefresh from "../Refresh";
import {useTranslation} from "react-i18next";
import ModalValidator from "./Validators/ModalValidator";
import ModalDelegate from "./Validators/ModalDelegate";
import FeeModal from "../Common/Fee/Modal";
import KeyStoreModal from "../Common/KeyStore/Modal";
import ModalViewTxnResponse from "../Common/ModalViewTxnResponse";
import ModalReDelegate from "./Validators/ModalReDelegate";
import ModalUnbond from "./Validators/ModalUnbond";
import ModalValidatorWithdraw from "./Validators/ModalWithdraw";
import ModalWithdraw from "../Wallet/ModalWithdraw";
import ModalSetWithdrawAddress from "../Wallet/ModalSetWithdrawAddress";
import Loader from "../../components/Loader";

const Staking = () => {
    const {t} = useTranslation();
    return (
        <div className="staking-main-section">
            <Loader/>
            <ModalValidator/>
            <ModalDelegate/>
            <ModalReDelegate/>
            <TokenInfo/>
            <FeeModal/>
            <KeyStoreModal/>
            <ModalUnbond/>
            <ModalWithdraw/>
            <ModalViewTxnResponse/>
            <ModalValidatorWithdraw/>
            <ModalSetWithdrawAddress/>
            <div className="validators-section">
                <div className="txns-container">
                    <Tab.Container id="lrr" defaultActiveKey="all">
                        <div className="tab-header main-header">
                            <div className="info">
                                <div className="left">
                                    <Nav variant="pills">
                                        <Nav.Item>
                                            <Nav.Link eventKey="all">{t("ALL_VALIDATORS")}</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="delegated">{t("DELEGATED")}</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                                <div>
                                    <InfoRefresh/>
                                </div>
                            </div>

                        </div>
                        <Tab.Content className="main-tab-content">
                            <Tab.Pane eventKey="all">
                                <Validators/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="delegated">
                                <DelegatedValidators/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>


            </div>
        </div>
    );
};
export default Staking;
