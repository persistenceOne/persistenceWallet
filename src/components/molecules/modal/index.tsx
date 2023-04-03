import React, { useRef } from "react";
import styles from "./styles.module.css";
import { ModalTypes } from "./types";
import { emptyFunc } from "../../../helpers/utils";
import { Icon } from "../../atoms/icon";
import { useOnClickOutside } from "../../../customHooks/useOnClickOutside";

const Modal = ({
  children,
  show,
  header,
  onClose = emptyFunc,
  className,
  staticBackDrop = true,
  closeButton = true
}: ModalTypes) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, onClose);

  return show ? (
    <div>
      <div
        className={`${styles.backDrop} fixed top-0 right-0 z-10 left-0 w-full h-full`}
      />
      <div
        className={
          `${
            show ? "open" : "close"
          } modal fade2 fixed top-0 right-0 left-0 w-full h-full z-20 overflow-auto ` +
          styles.modal +
          ` ${className}`
        }
      >
        <div
          className={`${styles.modalDialog} flex items-center min-h-full w-auto m-auto relative modalDialog`}
        >
          <div
            className={`${styles.modalContent} relative flex flex-col w-full rounded-lg text-light-mid modalContent`}
            ref={staticBackDrop ? null : modalRef}
          >
            {closeButton ? (
              <button
                type="button"
                onClick={onClose}
                className={`${styles.buttonClose} buttonClose`}
              >
                <Icon iconName="close" viewClass={styles.buttonCloseIcon} />
              </button>
            ) : null}
            {header ? (
              <div
                className="header text-2xl text-light-high font-semibold
                  flex justify-between md:text-lg items-start px-8 pt-8 md:px-6 md:pt-6 rounded-t dark:border-gray-600"
              >
                <p>{header}</p>
              </div>
            ) : (
              ""
            )}
            <div className="modalBody p-8 space-y-6 md:p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
