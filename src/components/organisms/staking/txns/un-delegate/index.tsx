import React from "react";
import { useAppStore } from "../../../../../../store/store";
import Modal from "../.././../../molecules/modal";
import { shallow } from "zustand/shallow";
import Amount from "./amount";
import FeeOptions from "../../../common/fee";
import Submit from "./submit";
import { Icon } from "../../../../atoms/icon";
import Memo from "../../../common/memo";

const UnDelegateModal = () => {
  const [modal, amount] = useAppStore(
    (state) => [
      state.transactions.unbond.modal,
      state.transactions.unbond.amount,
    ],
    shallow
  );

  const handleTxnMemoValue = useAppStore((state) => state.handleTxnMemoValue);
  const handleStakingModal = useAppStore((state) => state.handleStakingModal);

  const handleUnDelegateTxnModal = useAppStore(
    (state) => state.handleUnDelegateTxnModal
  );

  const handleClose = () => {
    handleTxnMemoValue("");
    handleUnDelegateTxnModal(false);
  };

  const previousHandler = () => {
    handleTxnMemoValue("");
    handleUnDelegateTxnModal(false);
    handleStakingModal(true);
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
        <button
          className="absolute left-[50px] top-[40px]"
          onClick={previousHandler}
        >
          <Icon viewClass="arrow-right fill-[#fff]" iconName="left-arrow" />
        </button>
        <p className="text-center text-light-high font-semibold text-2xl leading-normal">
          Unbond
        </p>
      </div>
      <div className="px-8 py-6">
        <Amount />
        <Memo />
        <FeeOptions amount={"0"} />
        <Submit />
      </div>
    </Modal>
  );
};

export default UnDelegateModal;
