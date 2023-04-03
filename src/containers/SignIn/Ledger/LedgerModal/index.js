import {Modal as ReactModal} from 'react-bootstrap';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchLedgerAddress, hideLedgerModal} from "../../../../store/actions/signIn/ledger";
import {showSignInModal} from "../../../../store/actions/signIn/modal";
import Icon from "../../../../components/Icon";
import {useTranslation} from "react-i18next";
import ButtonContinue from "./ButtonContinue";
import Advanced from "../Advanced";

const LedgerModal = () => {
    const {t} = useTranslation();
    const show = useSelector((state) => state.signInLedger.ledgerModal);
    const info = useSelector((state) => state.signInLedger.ledgerInfo);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideLedgerModal());
    };

    const keyStorePrevious = () => {
        dispatch(hideLedgerModal());
        dispatch(showSignInModal());
    };

    useEffect(() => {
        if(show) dispatch(fetchLedgerAddress());
    }, [show]);

    return (
        <ReactModal
            animation={false}
            backdrop="static"
            className="create-wallet-modal seed"
            centered={true}
            keyboard={false}
            show={show}
            onHide={handleClose}>
            <ReactModal.Header closeButton>
                <div className="previous-section">
                    <button className="button" onClick={() => keyStorePrevious("advancedForm")}>
                        <Icon
                            viewClass="arrow-right"
                            icon="left-arrow"/>
                    </button>
                </div>
                <h3 className="heading">{t("SIGN_IN")}</h3>
            </ReactModal.Header>

            <ReactModal.Body className="create-wallet-body create-wallet-form-body">
                {info.error.message ?
                    <p className="form-error">{info.error.message}</p>
                    :
                    info.value !== "" ?
                        <>
                            <div className="buttons-list">
                                <p>{info.value}</p>
                                <ButtonContinue/>
                            </div>
                            <Advanced/>
                        </>
                        :
                        <p className="fetching">{t("FETCHING_ADDRESS")}</p>
                }

            </ReactModal.Body>
        </ReactModal>
    );
};

export default LedgerModal;
