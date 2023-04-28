import React, { useState } from "react";
import { useAppStore } from "../../../../../../store/store";
import Modal from "../.././../../molecules/modal";
import { shallow } from "zustand/shallow";
import Amount from "./amount";
import FeeOptions from "../../../common/fee";
import Submit from "./submit";
import { Icon } from "../../../../atoms/icon";
import Validators, { DataState } from "./validators";
import { defaultChain } from "../../../../../helpers/utils";

const ClaimModal = () => {
  const [selected, setSelected] = useState<DataState[]>([]);

  const [modal, rewardsInfo] = useAppStore(
    (state) => [state.transactions.claim.modal, state.wallet.rewardsInfo],
    shallow
  );

  const handleClaimTxnModal = useAppStore((state) => state.handleClaimTxnModal);
  const handleStakingModal = useAppStore((state) => state.handleStakingModal);

  const handleClose = () => {
    handleClaimTxnModal(false);
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
          Claim Rewards
        </p>
      </div>
      <div className="px-8 py-6">
        <div className="flex items-center mb-4">
          <p className="text-center text-light-high font-semibold leading-normal mr-4">
            Claimable Rewards:
          </p>
          <p className="text-center text-light-emphasis font-semibold leading-normal">
            {rewardsInfo.totalAmount.toString()}{" "}
            {defaultChain.currency.coinDenom}
          </p>
        </div>
        <Validators setSelected={setSelected} selected={selected} />
        <FeeOptions amount={"0"} />
        <Submit selected={selected} />
      </div>
    </Modal>
  );
};

export default ClaimModal;
