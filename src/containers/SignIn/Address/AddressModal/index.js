import {Modal as ReactModal} from 'react-bootstrap';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {hideAddressModal} from "../../../../store/actions/signIn/address";
import {showSignInModal} from "../../../../store/actions/signIn/modal";
import Icon from "../../../../components/Icon";
import {useTranslation} from "react-i18next";
import Address from "./Address";
import ButtonSubmit from "./ButtonSubmit";

const AddressModal = () => {
    const {t} = useTranslation();
    const show = useSelector((state) => state.signInAddress.addressModal);
    const error = useSelector((state) => state.common.loginInfo.error);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideAddressModal());
    };

    const keyStorePrevious = () => {
        dispatch(hideAddressModal());
        dispatch(showSignInModal());
    };


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
                <Address/>
                {
                    error.message ?
                        <p className="form-error">{error.message}</p>
                        : ""
                }
                <div className="buttons">
                    <ButtonSubmit/>
                </div>
            </ReactModal.Body>
        </ReactModal>
    );
};

export default AddressModal;
