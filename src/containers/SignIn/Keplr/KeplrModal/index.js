import {Modal as ReactModal} from 'react-bootstrap';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchKeplrAddress, hideKeplrModal} from "../../../../store/actions/signIn/keplr";
import {showSignInModal} from "../../../../store/actions/signIn/modal";
import Icon from "../../../../components/Icon";
import {useTranslation} from "react-i18next";
import ButtonContinue from "./ButtonContinue";
import Button from "../../../../components/Button";
import ModalKeplrInstall from "../../../../views/Keplr/ModalKeplrInstall";

const KeplrModal = () => {
    const {t} = useTranslation();
    const show = useSelector((state) => state.signInKeplr.keplrModal);
    const info = useSelector((state) => state.signInKeplr.keplrInfo);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideKeplrModal());
    };

    window.addEventListener("keplr_keystorechange", () => {
        dispatch(fetchKeplrAddress());
    });

    const keyStorePrevious = () => {
        dispatch(hideKeplrModal());
        dispatch(showSignInModal());
    };

    useEffect(() => {
        if(show) {
            dispatch(fetchKeplrAddress());
        }
    }, [show]);

    const reconnectHandler = () =>{
        dispatch(fetchKeplrAddress());
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
                {info.error.message ?
                    <>
                        <div className="buttons mb-3">
                            <Button
                                className="button button-primary"
                                type="button"
                                value={t("CONNECT")}
                                onClick={reconnectHandler}
                            />
                        </div>
                        {
                            info.error.message === "install keplr extension" ?
                                <ModalKeplrInstall/>
                                :
                                <div>
                                    <p className="m-0 text-center">{t("KEPLR_ERROR")}</p>
                                    <p className="form-error">{info.error.message}</p>
                                </div>
                        }
                    </>
                    :
                    <>
                        <p>{t("KEPLR_ACCOUNT_NOTE")}</p>
                        <div className="buttons-list">
                            {
                                info.value !== ''
                                    ?
                                    <p>{info.value}</p>
                                    : <p>{t("FETCHING_ADDRESS")}..</p>

                            }
                        </div>
                        <div className="button-section mt-3">
                            <ButtonContinue/>
                        </div>

                    </>
                }

            </ReactModal.Body>
        </ReactModal>
    );
};

export default KeplrModal;
