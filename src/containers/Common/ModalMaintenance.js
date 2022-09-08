import {Modal} from 'react-bootstrap';
import React, {useState} from 'react';
import maitaianence from "../../assets/images/maintainence.svg";

const ModalMaintenance = () => {
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
    };

    return (
        <>
            <Modal
                animation={false}
                centered={true}
                show={show}
                backdrop="static"
                size="lg"
                className="modal-custom"
                onHide={handleClose}>
                <Modal.Body className="faq-modal-body">
                    <div className="maintainence-page">
                        <div className="info-container">
                            <img src={maitaianence} alt="maintainence"/>
                            <p className="heading">Under Maintenance</p>
                            <p>persistence wallet under maintenance and will be back soon.</p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    );
};


export default ModalMaintenance;

