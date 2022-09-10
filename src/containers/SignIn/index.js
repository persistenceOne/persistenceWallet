import {Modal} from 'react-bootstrap';
import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import KeyStore from "./KeyStore";
import {showKeyStoreModal} from "../../store/actions/signIn/keyStore";
import {useDispatch, useSelector} from "react-redux";
import {hideSignInModal} from "../../store/actions/signIn/modal";
import LedgerModal from "./Ledger/LedgerModal";
import Keplr from "./Keplr";
import {setLedgerAppName, showLedgerModal} from "../../store/actions/signIn/ledger";
import {showAddressModal} from "../../store/actions/signIn/address";
import Address from "./Address";
import {showKeplrModal} from "../../store/actions/signIn/keplr";
import {DefaultChainInfo, ExternalChains} from "../../config";

const SignIn = (props) => {
    const {t} = useTranslation();
    const show = useSelector((state) => state.signInModal.modal);
    const [withAddress, setWithAddress] = useState(false);
    const [withKeyStore, setWithKeyStore] = useState(false);
    const [withLedger, setWithLedger] = useState(false);
    const [withKeplr, setWithKeplr] = useState(false);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideSignInModal());
        props.setRoutName("");
    };

    const handleRoute = async (key, ledgerAppName) => {
        if (key === "withAddress") {
            dispatch(showAddressModal());
            dispatch(hideSignInModal());
            setWithAddress(true);
        }
        if (key === "ledger") {
            dispatch(hideSignInModal());
            dispatch(showLedgerModal());
            setWithLedger(true);
            dispatch(setLedgerAppName({value: ledgerAppName}));
        }
        if (key === "withKeyStore") {
            dispatch(showKeyStoreModal());
            dispatch(hideSignInModal());
            setWithKeyStore(true);
        }
        if (key === "withKeplr") {
            dispatch(showKeplrModal());
            dispatch(hideSignInModal());
            setWithKeplr(true);
        }
    };

    const cosmos = ExternalChains.find(chain => chain.chainName === 'Cosmos');

    return (
        <>
            <Modal backdrop="static" show={show} onHide={handleClose} centered
                className="create-wallet-modal seed">
                <>
                    <Modal.Header closeButton>
                        <h3 className="heading"> {t("SIGN_IN")}</h3>
                    </Modal.Header>
                    <Modal.Body className="create-wallet-body create-wallet-form-body sign-in-buttons">
                        <div className="buttons">
                            <button className="button button-primary large"
                                onClick={() => handleRoute("ledger", cosmos && cosmos.ledgerAppName)}>{t("USE_COSMO_LEDGER")}
                            </button>
                        </div>
                        <div className="buttons">
                            <button className="button button-primary large"
                                onClick={() => handleRoute("ledger", DefaultChainInfo && DefaultChainInfo.ledgerAppName)}>{t("USE_PERSISTENCE_LEDGER")}
                            </button>
                        </div>
                        <div className="buttons">
                            <button className="button button-primary"
                                onClick={() => handleRoute("withKeplr")}>{t("USE_KEPLR")}
                            </button>
                        </div>
                        <div className="buttons">
                            <button className="button button-primary large"
                                onClick={() => handleRoute("withKeyStore")}>Use KeyStore File
                            </button>
                        </div>
                        <div className="buttons">
                            <button className="button button-primary large"
                                onClick={() => handleRoute("withAddress")}>{t("CONTINUE_WITH_ADDRESS")}
                            </button>
                        </div>
                    </Modal.Body>
                </>
            </Modal>
            {withAddress ?
                <Address setWithAddress={setWithAddress} handleClose={handleClose}
                />
                : null
            }
            {withLedger ?
                <LedgerModal setWithLedger={setWithLedger} handleClose={handleClose}
                />
                : null
            }
            {withKeyStore ?
                <KeyStore setWithLedger={setWithLedger} handleClose={handleClose}
                />
                : null
            }
            {withKeplr ?
                <Keplr setWithLedger={setWithLedger} handleClose={handleClose}
                />
                : null
            }
        </>
    );
};


export default SignIn;
