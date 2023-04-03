import {Modal as ReactModal} from 'react-bootstrap';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {feeChangeHandler, hideFeeModal} from "../../../store/actions/transactions/fee";
import Fee from "./index";
import Gas from "./Gas";
import Submit from "./Submit";
import Icon from "../../../components/Icon";
import {FeeInfo} from "../../../config";

const Modal = () => {
    const show = useSelector((state) => state.fee.modal);
    const txName = useSelector((state) => state.common.txName.value);
    const txInfo = useSelector((state) => state.common.txInfo.value);
    const response = useSelector((state) => state.common.error);

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(feeChangeHandler({
            value: {
                fee: FeeInfo.averageFee,
                feeType: "Average",
            },
            error: {
                message: '',
            },
        }));
        dispatch(hideFeeModal());
    };

    const handleBack = () => {
        dispatch(txInfo.modal);
        dispatch(hideFeeModal());
    };

    return (
        <ReactModal
            animation={false}
            backdrop="static"
            className={show ? 'show fade modal-custom' : 'fade modal-custom'}
            centered={true}
            keyboard={false}
            show={show}
            onHide={handleClose}>
            <ReactModal.Header closeButton={true}>
                {txName.name !== 'send' && txName.name !== 'ibc' ?
                    <div className="previous-section txn-header">
                        <button className="button" onClick={handleBack}>
                            <Icon
                                viewClass="arrow-right"
                                icon="left-arrow"/>
                        </button>
                    </div> : null
                }
                <p>Fee</p>
            </ReactModal.Header>
            <ReactModal.Body className="create-wallet-body import-wallet-body">
                <Fee/>
                <Gas/>
                {
                    response.error.message !== "" ?
                        <p className="form-error">{response.error.message}</p>
                        : null
                }
                <Submit/>
            </ReactModal.Body>
        </ReactModal>
    );
};


export default Modal;
