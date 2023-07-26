import React from "react";
import { Modal as ReactModal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideValidatorTxModal } from "../../../../../store/actions/validators";
import { useTranslation } from "react-i18next";
import { showTxDelegateModal } from "../../../../../store/actions/transactions/delegate";
import { showTxReDelegateModal } from "../../../../../store/actions/transactions/redelegate";

const ModalTokenizeActions = () => {
  const { t } = useTranslation();
  const show = useSelector((state) => state.redeemShares.tokenizeActionsModal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideValidatorTxModal());
  };

  const handleRoute = (tx) => {
    if (tx === "Transfer") {
      dispatch(hideValidatorTxModal());
      dispatch(showTxDelegateModal());
    } else if (tx === "Redeem") {
      dispatch(hideValidatorTxModal());
      dispatch(showTxReDelegateModal());
    }
  };

  return (
    <ReactModal
      animation={false}
      className="actions-modal modal-action"
      centered={true}
      keyboard={false}
      show={show}
      onHide={handleClose}
    >
      <ReactModal.Body className="actions-modal-body">
        <div className="buttons-group">
          <button
            onClick={() => handleRoute("Transfer")}
            className="button button-primary"
          >
            Transfer
          </button>

          <button
            className="button button-primary"
            onClick={() => handleRoute("Redeem")}
          >
            {t("Redeem")}
          </button>
        </div>
      </ReactModal.Body>
    </ReactModal>
  );
};

export default ModalTokenizeActions;
