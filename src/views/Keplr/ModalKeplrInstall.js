import {Modal} from 'react-bootstrap';
import React, {useState} from 'react';
import Image from 'next/image';
import {useTranslation} from "react-i18next";

const ModalKeplrInstall = () => {
    const {t} = useTranslation();
    const [show, setShow] = useState(true);

    const handleClose = () => {
        window.location.reload();
        setShow(false);
    };

    return (
        <>
            <Modal
                animation={false}
                centered={true}
                show={show}
                size="lg"
                className="keplr-modal"
                onHide={handleClose}>
                <Modal.Body className="keplr-modal-body">
                    <p>{t("KEPLR_INSTALL_NOTE")}</p>
                    <div className="chrome-box">
                        <a className="chrome-link"
                            href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap"
                            rel="noopener noreferrer" target="_blank">
                            <Image src="/images/chrome.svg" alt="chrome" width={48} height={48}/>
                            <p>{t("INSTALL_CHROME")}</p>
                        </a>
                    </div>
                    <p onClick={handleClose} className="installed-note">{t("KEPLR_INSTALLED_WARNING")}</p>
                </Modal.Body>
            </Modal>
        </>

    );
};

export default ModalKeplrInstall;

