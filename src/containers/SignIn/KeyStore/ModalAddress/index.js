import {Modal as ReactModal} from 'react-bootstrap';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    hideKeyStoreResultModal,
    keyStoreLogin, setCoinType,
    showKeyStoreModal
} from "../../../../store/actions/signIn/keyStore";
import Icon from "../../../../components/Icon";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

const ModalAddress = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const {coinType} = useSelector((state) => state.signInKeyStore);
    const show = useSelector((state) => state.signInKeyStore.keyStoreResultModal);
    const response = useSelector((state) => state.signInKeyStore.response.value);
    // const [newCoinType, setNewCoinType] = useState('118');
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideKeyStoreResultModal());
    };

    const handleLogin = () => {
        const address = coinType === 118 ? response.coin118Response?.address : response.coin750Response?.address ;
        dispatch(keyStoreLogin(history, address));
    };

    const keyStorePrevious = () => {
        dispatch(hideKeyStoreResultModal());
        dispatch(showKeyStoreModal());
    };

    const handleChange = (event) => {
        dispatch(setCoinType(parseInt(event.target.value)));
    };

    return (
        <ReactModal
            animation={false}
            backdrop="static"
            className="modal-custom"
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
                <h3 className="heading">{t("LOGIN_WITH_KEYSTORE")}</h3>
            </ReactModal.Header>

            <ReactModal.Body className="create-wallet-body import-wallet-body">
                <div className="form-field radio">
                    <div className="d-flex mb-3">
                        <input
                            type='checkbox'
                            id='type118'
                            name='type118'
                            value="118"
                            onChange={handleChange}
                            className='mr-3'
                            checked={coinType === 118}
                        />
                        <div>
                            <p className="mnemonic-result text-left">
                                <b>{t("WALLET_PATH")}: </b>{response.coin118Response?.walletPath}</p>
                            <p className="mnemonic-result text-left p-0"><b>{t("ADDRESS")}: </b>{response.coin118Response?.address}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="form-field radio">
                    <div className="d-flex mb-3">
                        <input
                            type='checkbox'
                            id='type750'
                            name='type750'
                            value="750"
                            onChange={handleChange}
                            className='mr-3'
                            checked={coinType === 750}
                        />
                        <div>
                            <p className="mnemonic-result text-left">
                                <b>{t("WALLET_PATH")}: </b>{response.coin750Response?.walletPath}</p>
                            <p className="mnemonic-result text-left p-0"><b>{t("ADDRESS")} : </b>{response.coin750Response?.address}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button className="button button-primary" onClick={handleLogin}>{t("LOGIN")}</button>
                </div>
            </ReactModal.Body>
        </ReactModal>
    );
};


export default ModalAddress;
