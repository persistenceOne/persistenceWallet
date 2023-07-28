import { Modal } from "react-bootstrap";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import success from "../../../assets/images/success.svg";
import failed from "../../../assets/images/inactive.svg";
import { hideTxResultModal } from "../../../store/actions/transactions/common";
import { LOGIN_INFO } from "../../../constants/localStorage";
import { fetchApiData } from "../../../utils/queries";

const EXPLORER_API = process.env.REACT_APP_EXPLORER_API;

const ModalViewTxnResponse = () => {
  const { t } = useTranslation();
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const dispatch = useDispatch();
  const show = useSelector((state) => state.common.modal);
  const response = useSelector((state) => state.common.txResponse.value);
  const errorResponse = useSelector((state) => state.common.error);
  const handleClose = () => {
    dispatch(hideTxResultModal());
  };

  useEffect(() => {
    const fetchCalls = async () => {
      if (response !== undefined) {
        await fetchApiData(loginInfo && loginInfo.address, dispatch);
      }
    };
    fetchCalls();
  }, [response]);

  if (response === undefined) {
    return null;
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      className="modal-custom"
    >
      {response !== "" && response.code === 0 ? (
        <>
          <Modal.Header className="result-header success" closeButton>
            Transaction Successful
          </Modal.Header>
          <Modal.Body className="delegate-modal-body">
            <div className="result-container">
              <img src={success} alt="success-image" />
              {loginInfo && loginInfo.loginMode === "keplr" ? (
                <a
                  href={`${EXPLORER_API}/txs/${response.transactionHash}`}
                  target="_blank"
                  className="tx-hash"
                  rel="noopener noreferrer"
                >
                  Tx Hash: {response.transactionHash}
                </a>
              ) : (
                <a
                  href={`${EXPLORER_API}/txs/${response.transactionHash}`}
                  target="_blank"
                  className="tx-hash"
                  rel="noopener noreferrer"
                >
                  Tx Hash: {response.transactionHash}
                </a>
              )}
              <div className="buttons">
                <button className="button" onClick={handleClose}>
                  {t("DONE")}
                </button>
              </div>
            </div>
          </Modal.Body>
        </>
      ) : null}
      {response !== "" && response.code !== 0 ? (
        <>
          <Modal.Header className="result-header error" closeButton>
            Transaction Failed
          </Modal.Header>
          <Modal.Body className="delegate-modal-body">
            <div className="result-container">
              <img src={failed} alt="success-image" />
              <>
                <p>
                  {response.rawLog ===
                  "panic message redacted to hide potentially sensitive system info: panic"
                    ? "You cannot send vesting amount"
                    : response.rawLog}
                </p>
                <a
                  href={`${EXPLORER_API}/txs/${response.transactionHash}`}
                  target="_blank"
                  className="tx-hash"
                  rel="noopener noreferrer"
                >
                  Tx Hash: {response.transactionHash}
                </a>
              </>
              <div className="buttons">
                <button className="button" onClick={handleClose}>
                  {t("DONE")}
                </button>
              </div>
            </div>
          </Modal.Body>
        </>
      ) : null}
    </Modal>
  );
};

export default ModalViewTxnResponse;
