import { Modal } from "react-bootstrap";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';
import { hideTxResultModal } from "../../../store/actions/transactions/common";
import { LOGIN_INFO } from "../../../constants/localStorage";
import { fetchApiData } from "../../../utils/queries";
import { stringTruncate } from "../../../utils/scripts";

const EXPLORER_API = process.env.NEXT_PUBLIC_EXPLORER_API;

const ModalViewTxnResponse = () => {
  const { t } = useTranslation();
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const dispatch = useDispatch();
  const show = useSelector((state) => state.common.modal);
  const txName = useSelector((state) => state.common.txName.value.name);
  const response = useSelector((state) => state.common.txResponse.value);
  const txnInfo = useSelector((state) => state.tokenizeShares.txnInfo);
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
              <Image src="/images/success.svg" alt="success-image" width={64} height={64} />
              {txnInfo.txnTokenizeHash !== "" ? (
                <div className={"mt-4"}>
                  <div className={"mb-2"}>
                    <p className="mb-0">Tokenizing</p>
                    <a
                      href={`${EXPLORER_API}/txs/${txnInfo.txnTokenizeHash}`}
                      target="_blank"
                      className="tx-hash"
                      rel="noopener noreferrer"
                    >
                      Tx Hash: {stringTruncate(txnInfo.txnTokenizeHash, 10)}
                    </a>
                  </div>
                  <p className="mb-0">Transferring</p>
                  <a
                    href={`${EXPLORER_API}/txs/${response.transactionHash}`}
                    target="_blank"
                    className="tx-hash"
                    rel="noopener noreferrer"
                  >
                    Tx Hash: {stringTruncate(response.transactionHash, 10)}
                  </a>
                </div>
              ) : (
                <a
                  href={`${EXPLORER_API}/txs/${response.transactionHash}`}
                  target="_blank"
                  className="tx-hash"
                  rel="noopener noreferrer"
                >
                  Tx Hash: {stringTruncate(response.transactionHash, 10)}
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
              <Image src="/images/inactive.svg" alt="success-image" width={64} height={64} />
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
