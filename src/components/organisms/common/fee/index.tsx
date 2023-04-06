import React from "react";
import Gas from "./gas";
import Button from "../../../atoms/button";
import Modal from "../../../molecules/modal";
import { useAppStore } from "../../../../../store/store";
import { shallow } from "zustand/shallow";

const FeeOptions = () => {
  const handleTxnFeeModal = useAppStore((state) => state.handleTxnFeeModal);

  const [modal, fee] = useAppStore(
    (state) => [state.transactions.fee.modal, state.transactions.fee.fee],
    shallow
  );

  const submitHandler = () => {};
  const handleClose = () => {
    handleTxnFeeModal(false);
  };
  return (
    <Modal
      show={modal}
      onClose={handleClose}
      header=""
      modalBodyClassName={"!p-0"}
      modalDialogClassName={"!max-w-[600px]"}
      staticBackDrop={true}
      closeButton={true}
    >
      <div className="px-8 pt-8 md:px-6 md:pt-6">
        <p className="text-center text-light-high font-semibold text-2xl leading-normal">
          Fee Options
        </p>
      </div>
      <div className="px-8 py-6">
        <div>
          <div className="flex items-center justify-center">
            <div className="p-4 flex-1 text-center cursor-pointer shadow-lg mx-2 bg-black-600">
              <p>Low</p>
              <p>0($0)</p>
            </div>
            <div className="p-4 flex-1 text-center  cursor-pointer shadow-lg mx-2 bg-black-600">
              <p>Avg</p>
              <p>2.23($4.5)</p>
            </div>
            <div className="p-4 bg-black-900 flex-1 text-center cursor-pointer shadow-lg mx-2">
              <p>High</p>
              <p>5($10)</p>
            </div>
          </div>
          <Gas />
          <div className={"mb-2 mt-6"}>
            <Button
              className="button md:text-sm flex items-center
            justify-center w-[250px] md:w-[200px] mx-auto mb-4"
              type="primary"
              size="medium"
              disabled={false}
              content="Submit"
              onClick={submitHandler}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FeeOptions;
