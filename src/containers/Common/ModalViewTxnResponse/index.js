import { Modal } from "react-bootstrap";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import success from "../../../assets/images/success.svg";
import failed from "../../../assets/images/inactive.svg";
import { fetchDelegationsCount } from "../../../store/actions/delegations";
import { fetchTransferableVestingAmount } from "../../../store/actions/balance";
import {
  fetchRewards,
  fetchTotalRewards
} from "../../../store/actions/rewards";
import { fetchUnbondDelegations } from "../../../store/actions/unbond";
import { fetchTokenPrice } from "../../../store/actions/tokenPrice";
import {
  fetchReceiveTransactions,
  fetchTransactions
} from "../../../store/actions/transactionHistory";
import { hideTxResultModal } from "../../../store/actions/transactions/common";
import { LOGIN_INFO } from "../../../constants/localStorage";
import { updateFee } from "../../../utils/helper";
import { fetchValidators } from "../../../store/actions/validators";
import { fetchTokenizedShares } from "../../../store/actions/tokenizeShares";
import { fetchApiData } from "../../../utils/queries";

const EXPLORER_API = process.env.REACT_APP_EXPLORER_API;

const ModalViewTxnResponse = () => {
  const { t } = useTranslation();
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const dispatch = useDispatch();
  const show = useSelector((state) => state.common.modal);
  const response = useSelector((state) => state.common.txResponse.value);
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
      className="modal-custom ranh"
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
              {loginInfo && loginInfo.loginMode === "keplr" ? (
                <>
                  <p>{response.rawLog}</p>
                  <a
                    href={`${EXPLORER_API}/txs/${response.transactionHash}`}
                    target="_blank"
                    className="tx-hash"
                    rel="noopener noreferrer"
                  >
                    Tx Hash: {response.transactionHash}
                  </a>
                </>
              ) : (
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
    </Modal>
  );
};

export default ModalViewTxnResponse;
