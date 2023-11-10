import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const ModalTerms = () => {
  const [show, setShow] = useState(false);
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [checkBox3, setCheckBox3] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (
      sessionStorage.getItem("terms-conditions") === "disabled" ||
      sessionStorage.getItem("terms-conditions") === null
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("terms-conditions", "disabled");
    setShow(false);
  };

  const handleCheckBox = (evt) => {
    setCheckAll((state) => !state);
    setCheckBox1(evt.target.checked),
      setCheckBox2(evt.target.checked),
      setCheckBox3(evt.target.checked);
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop={false}
        className="terms-modal modal-custom "
      >
        <Modal.Header className="info-modal-header " closeButton>
          <p className={"heading"}>Terms & Privacy policy</p>
        </Modal.Header>
        <Modal.Body className="pt-3 pb-3">
          <div className="content">
            <p className={"sub-heading"}>
              <span className={"font-medium"}>Important Disclaimer:</span>{" "}
              Before proceeding, please confirm your agreement to the terms by
              checking the boxes below. If you do not agree, please leave the
              website:
            </p>
            <div className={"check-box"}>
              <label>
                <input
                  type="checkbox"
                  checked={checkBox1}
                  onChange={() => {
                    setCheckBox1((state) => !state);
                    if (checkAll) {
                      setCheckAll(false);
                    }
                  }}
                />
              </label>
              <p className={"text"}>
                I have read and understood, and hereby agree to be legally bound
                as a ‘User’ to all the terms contained in the{" "}
                <a
                  href="https://persistence.one/terms"
                  target="_blank"
                  rel="noreferrer"
                  className={"underline"}
                >
                  Terms and Conditions
                </a>
                (including the{" "}
                <a
                  href="https://persistence.one/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className={"underline"}
                >
                  Privacy Policy
                </a>
                ) without qualification.
              </p>
            </div>
            <div className={"check-box"}>
              <label>
                <input
                  type="checkbox"
                  checked={checkBox2}
                  onChange={() => {
                    setCheckBox2((state) => !state);
                    if (checkAll) {
                      setCheckAll(false);
                    }
                  }}
                />
              </label>
              <p className={"text"}>
                I declare that I am not an Excluded Person as defined in the{" "}
                <a
                  href="https://persistence.one/terms"
                  target="_blank"
                  rel="noreferrer"
                  className={"underline"}
                >
                  Terms and Conditions.
                </a>
              </p>
            </div>
            <div className={"check-box"}>
              <label>
                <input
                  type="checkbox"
                  checked={checkBox3}
                  onChange={() => {
                    setCheckBox3((state) => !state);
                    if (checkAll) {
                      setCheckAll(false);
                    }
                  }}
                />
              </label>
              <p className={"text"}>
                I agree that my use and continued use of this site is subject to
                my continued agreement to the prevailing{" "}
                <a
                  href="https://persistence.one/terms"
                  target="_blank"
                  rel="noreferrer"
                  className={"underline"}
                >
                  Terms and Conditions
                </a>{" "}
                (which may change from time to time) and will apply to all
                actions I take on the site without requiring my confirmation in
                each specific instance.
              </p>
            </div>
            <div className={"check-box"}>
              <label>
                <input
                  type="checkbox"
                  checked={checkBox1 && checkBox2 && checkBox3}
                  onChange={handleCheckBox}
                />
              </label>
              <p className={"text"}>Select All</p>
            </div>
          </div>
          <div className="text-center mb-4">
            <button
              className="button button-primary"
              disabled={!checkBox1 || !checkBox2 || !checkBox3}
              onClick={handleClose}
            >
              Continue
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ModalTerms;
