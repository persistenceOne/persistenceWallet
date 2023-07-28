import React from "react";
import { Modal as ReactModal, OverlayTrigger, Popover } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleDelegationTransferModal } from "../../../../../store/actions/transactions/delegationTransfer";
import { useTranslation } from "react-i18next";
import ButtonSend from "./ButtonSend";

const TxnModal = () => {
  const { t } = useTranslation();
  const modal = useSelector((state) => state.delegationTransfer.transferModal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(handleDelegationTransferModal(false));
  };

  return (
    <ReactModal
      animation={false}
      backdrop="static"
      className="modal-custom delegate-modal modal-redelegate"
      centered={true}
      keyboard={false}
      show={modal}
      onHide={handleClose}
    >
      <ReactModal.Header closeButton>
        <h3 className="heading">Transferring Staked XPRT</h3>
      </ReactModal.Header>
      <ReactModal.Body className="delegate-modal-body">
        <p>
          Tokenization successful. Please Click on below button to send tokens.
        </p>
        <ButtonSend />
      </ReactModal.Body>
    </ReactModal>
  );
};

export default TxnModal;
